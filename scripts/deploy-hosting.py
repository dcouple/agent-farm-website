#!/usr/bin/env python3
"""Deploy the built out/ directory using the signed-in dcouple gcloud account.

Run pnpm build first. Uses the Firebase Hosting REST deployment protocol:
https://firebase.google.com/docs/hosting/api-deploy
"""
import gzip
import hashlib
import json
from pathlib import Path
import subprocess
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

ROOT = Path(__file__).resolve().parents[1]
PROJECT = "dcouple-agent-farm"
ACCOUNT = "parsa@dcouple.ai"
API = "https://firebasehosting.googleapis.com/v1beta1/"


def main():
    hosting = json.loads((ROOT / "firebase.json").read_text())["hosting"]
    site = hosting["site"]
    output = ROOT / hosting["public"]
    if not (output / "index.html").is_file():
        raise SystemExit("Missing out/index.html. Run pnpm build first.")
    token = subprocess.check_output(
        ["gcloud", "auth", "print-access-token", f"--account={ACCOUNT}"], text=True
    ).strip()

    def request(path, method="POST", payload=None, binary=False):
        url = path if path.startswith("https://") else API + path
        if urllib.parse.urlparse(url).hostname not in {
            "firebasehosting.googleapis.com", "upload-firebasehosting.googleapis.com"
        }:
            raise ValueError("Unexpected Hosting endpoint")
        data = payload if binary else json.dumps(payload or {}).encode()
        req = urllib.request.Request(url, data=data, method=method, headers={
            "Authorization": "Bearer " + token,
            "x-goog-user-project": PROJECT,
            "Content-Type": "application/octet-stream" if binary else "application/json",
        })
        with urllib.request.urlopen(req, timeout=90) as response:
            body = response.read()
            return json.loads(body) if body and not binary else None

    files, content = {}, {}
    for path in sorted(output.rglob("*")):
        relative = path.relative_to(output)
        if not path.is_file() or path.is_symlink() or any(p.startswith(".") for p in relative.parts):
            continue
        compressed = gzip.compress(path.read_bytes(), mtime=0)
        digest = hashlib.sha256(compressed).hexdigest()
        files["/" + relative.as_posix()] = digest
        content[digest] = compressed

    config = {"cleanUrls": hosting.get("cleanUrls", False), "headers": [
        {"glob": entry["source"], "headers": {h["key"]: h["value"] for h in entry["headers"]}}
        for entry in hosting.get("headers", [])
    ]}
    version = request(f"sites/{site}/versions", payload={"config": config})["name"]
    print(f"Created {version}; uploading {len(files)} static files.", flush=True)
    entries = list(files.items())
    for start in range(0, len(entries), 1000):
        populated = request(version + ":populateFiles", payload={"files": dict(entries[start:start + 1000])})
        def upload(digest):
            request(populated["uploadUrl"] + "/" + digest, payload=content[digest], binary=True)
        with ThreadPoolExecutor(max_workers=6) as pool:
            list(pool.map(upload, populated.get("uploadRequiredHashes", [])))
    finalized = request(version + "?updateMask=status", method="PATCH", payload={"status": "FINALIZED"})
    if finalized["status"] != "FINALIZED":
        raise RuntimeError("Hosting did not finalize the version")
    release = request(f"sites/{site}/releases?" + urllib.parse.urlencode({"versionName": version}))
    print(json.dumps({"release": release["name"], "version": version, "url": f"https://{site}.web.app"}, indent=2))


if __name__ == "__main__":
    try:
        main()
    except urllib.error.HTTPError as error:
        raise SystemExit(f"Hosting API error {error.code}: {error.read().decode()}") from None
