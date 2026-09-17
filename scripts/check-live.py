#!/usr/bin/env python3
"""Compare production HTML, metadata, and AI exports with the deployed artifact."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1] / "out"
ORIGIN = "https://getagentfarm.com"


def main():
    sitemap = ET.parse(ROOT / "sitemap.xml")
    pages = [urllib.parse.urlparse(loc.text).path for loc in
             sitemap.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
    paths = {path: ROOT / ("index.html" if path == "/" else path.lstrip("/") + ".html")
             for path in pages}
    for folder in ["raw", "docs/raw"]:
        paths.update({"/" + file.relative_to(ROOT).as_posix(): file
                      for file in (ROOT / folder).glob("*.md")})
    paths.update({"/" + name: ROOT / name for name in
                  ["llms.txt", "llms-full.txt", "sitemap.xml", "robots.txt", "opengraph-image.png"]})

    def check(item):
        path, local = item
        expected = local.read_bytes()
        for attempt in range(6):
            try:
                request = urllib.request.Request(ORIGIN + path, headers={"Cache-Control": "no-cache"})
                with urllib.request.urlopen(request, timeout=30) as response:
                    if path.endswith(".md") and response.headers.get_content_type() != "text/markdown":
                        raise ValueError("Markdown content type missing")
                    if response.read() != expected:
                        raise ValueError("Content differs from the verified build")
                return path
            except (OSError, ValueError):
                if attempt == 5:
                    raise
                time.sleep(5)

    with ThreadPoolExecutor(max_workers=6) as pool:
        for path in pool.map(check, paths.items()):
            print(f"Verified {ORIGIN}{path}", flush=True)
    print(f"Verified all {len(pages)} public pages and {len(paths) - len(pages)} exports/assets.")


if __name__ == "__main__":
    main()
