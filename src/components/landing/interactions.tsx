"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Copy, Menu, X } from "lucide-react";

export function CopyButton({
  text,
  label = "Copy code",
  showLabel = false,
}: {
  text: string;
  label?: string;
  showLabel?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    timer.current = setTimeout(() => setStatus("idle"), 3500);
  }

  return (
    <span className="copy-control">
      <button
        type="button"
        className="copy-button"
        onClick={copy}
        aria-label={status === "copied" ? "Copied" : label}
        title={label}
      >
        {status === "copied" ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}
        {showLabel && <span>{status === "copied" ? "Copied" : "Copy"}</span>}
      </button>
      <span
        role="status"
        className={status === "error" ? "copy-error" : "sr-only"}
      >
        {status === "copied"
          ? "Copied to clipboard."
          : status === "error"
            ? "Couldn’t copy. Select the code and copy it manually."
            : ""}
      </span>
    </span>
  );
}

export function MobileNav({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <div
      className="mobile-navigation"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <button
        ref={toggle}
        type="button"
        className="menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Mobile navigation"
        hidden={!open}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        <a href="/guide">Field guide</a>
        <a href="/configuration">Configuration</a>
        <a href="/compare">Compare</a>
        <a href="/resources">Resources</a>
        <a href="https://github.com/dcouple/agent-farm">GitHub ↗</a>
        <a className="button button-primary" href={home ? "#get-started" : "/#get-started"}>
          Get started <ArrowRight size={16} aria-hidden="true" />
        </a>
      </nav>
    </div>
  );
}

const profiles = ["planner", "implementer", "reviewer"];
type DemoStep =
  "profile" | "workspace" | "directory" | "building" | "launched" | "codex";

export function TerminalDemo() {
  const [step, setStep] = useState<DemoStep>("profile");
  const [profile, setProfile] = useState("planner");
  const [workspace, setWorkspace] = useState("None");
  const [directory, setDirectory] = useState("~/my-project");
  const [selected, setSelected] = useState(0);
  const screen = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLParagraphElement>(null);
  const interacted = useRef(false);

  function go(next: DemoStep) {
    interacted.current = true;
    setSelected(0);
    setStep(next);
  }

  useEffect(() => {
    if (
      interacted.current &&
      (!["launched", "codex"].includes(step) ||
        screen.current?.contains(document.activeElement))
    )
      heading.current?.focus({ preventScroll: true });
    if (step !== "building" && step !== "launched") return;
    const timer = setTimeout(
      () => setStep(step === "building" ? "launched" : "codex"),
      step === "building" ? 900 : 650,
    );
    return () => clearTimeout(timer);
  }, [step]);

  function back() {
    if (step === "workspace") go("profile");
    else if (step === "directory") go("workspace");
    else go("profile");
  }

  const options = step === "profile" ? profiles : ["None", "bloomtext"];
  const title = {
    profile: "Choose a profile",
    workspace: "Workspace",
    directory: "Repository directory",
    building: "Building configuration…",
    launched: `Launching ${profile}`,
    codex: "OpenAI Codex",
  }[step];

  return (
    <div
      ref={screen}
      className="terminal-demo"
      role="region"
      aria-label="Interactive CLI simulation"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          back();
        }
        if (step !== "profile" && step !== "workspace") return;
        const choices =
          screen.current?.querySelectorAll<HTMLButtonElement>(
            ".profile-option",
          );
        if (!choices?.length) return;
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
          event.preventDefault();
          const index =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? choices.length - 1
                : (selected +
                    (event.key === "ArrowDown" ? 1 : -1) +
                    choices.length) %
                  choices.length;
          choices[index].focus();
        } else if (event.key === "Enter" && event.target === heading.current) {
          event.preventDefault();
          choices[selected].click();
        }
      }}
    >
      <div className="terminal-chrome">
        <span className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>{step === "codex" ? "Codex" : "agent-farm"}</span>
        <span aria-hidden="true">⌘</span>
      </div>
      <div className="terminal-content">
        <p className="terminal-command">
          <span className="syntax-green">{step === "codex" ? ">_" : "$"}</span>{" "}
          {step === "codex" ? "OpenAI Codex" : "agent-farm"}
        </p>
        <div className={`demo-stage ${step === "codex" ? "codex-stage" : ""}`}>
          <p
            ref={heading}
            tabIndex={-1}
            className={step === "codex" ? "sr-only" : "demo-title"}
          >
            {title}
          </p>
          {(step === "profile" || step === "workspace") && (
            <div className="profile-picker" role="group" aria-label={title}>
              {options.map((option, index) => (
                <button
                  type="button"
                  key={option}
                  className={`profile-option ${index === selected ? "selected" : ""}`}
                  onFocus={() => setSelected(index)}
                  onMouseEnter={() => setSelected(index)}
                  onClick={() => {
                    if (step === "profile") {
                      setProfile(option);
                      go("workspace");
                    } else {
                      setWorkspace(option);
                      go("directory");
                    }
                  }}
                >
                  <span className="profile-arrow" aria-hidden="true">
                    {index === selected ? "›" : " "}
                  </span>
                  {option}
                  <span className="profile-check" aria-hidden="true">
                    ↵
                  </span>
                </button>
              ))}
              {step === "workspace" && (
                <p className="demo-note">
                  {selected === 0
                    ? "No extra tools"
                    : "Linear + Sentry (sample)"}
                </p>
              )}
            </div>
          )}
          {step === "directory" && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (directory.trim()) go("building");
              }}
            >
              <input
                className="demo-directory"
                aria-label="Repository directory (simulated)"
                value={directory}
                onChange={(event) => setDirectory(event.target.value)}
                required
                pattern={".*\\S.*"}
                maxLength={100}
                autoComplete="off"
                spellCheck={false}
              />
              <p className="demo-note">
                {profile} · {workspace === "None" ? "no workspace" : workspace}
              </p>
              <button className="demo-launch" type="submit">
                Launch <span aria-hidden="true">↵</span>
              </button>
            </form>
          )}
          {(step === "building" || step === "launched") && (
            <div className="demo-output" role="status">
              <p>
                <span className="syntax-green">
                  {step === "building" ? "◌" : "✓"}
                </span>{" "}
                {step === "building"
                  ? "Preparing profile + tools"
                  : "Bundle ready"}
              </p>
              <p className="demo-location">{directory.trim()}</p>
            </div>
          )}
          {step === "codex" && (
            <CodexSession profile={profile} directory={directory.trim()} />
          )}
        </div>
        <div className="demo-controls">
          <span>
            {step === "profile"
              ? "Click or ↑↓ + Enter"
              : step === "codex"
                ? `${profile} · ${workspace === "None" ? "local" : workspace}`
                : step === "building" || step === "launched"
                  ? ""
                  : "Esc to go back"}
          </span>
          {step !== "profile" && (
            <button type="button" onClick={back}>
              {["launched", "building", "codex"].includes(step)
                ? "Restart"
                : "Back"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Scripted terminal content: no network requests or commands are executed.
const sampleSessions: Record<string, { prompt: string; reply: string }> = {
  planner: {
    prompt: "Plan a settings page",
    reply: "1. Define fields\n2. Build the form\n3. Test validation",
  },
  implementer: {
    prompt: "Build a settings page",
    reply: "I'll start with the form, then add validation.",
  },
  reviewer: {
    prompt: "Review the settings page",
    reply: "I'll check validation, accessibility, and edge cases.",
  },
};

function CodexSession({
  profile,
  directory,
}: {
  profile: string;
  directory: string;
}) {
  const [running, setRunning] = useState(false);
  const [length, setLength] = useState(0);
  const { prompt, reply } = sampleSessions[profile] ?? sampleSessions.planner;
  const transcript = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!running) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timer = setInterval(
      () => {
        setLength((current) => {
          const next = reduced
            ? reply.length
            : Math.min(current + 3, reply.length);
          if (next === reply.length) clearInterval(timer);
          return next;
        });
      },
      reduced ? 1 : 65,
    );
    return () => clearInterval(timer);
  }, [running, reply]);

  useEffect(() => {
    if (running && transcript.current)
      transcript.current.scrollTop = transcript.current.scrollHeight;
  }, [length, running]);

  return (
    <div className="codex-session">
      <p className="codex-directory" title={directory}>
        directory: {directory}
      </p>
      <div
        className="codex-transcript"
        ref={transcript}
        tabIndex={0}
        aria-label="Codex sample conversation"
      >
        {!running ? (
          <>
            <p className="codex-ready">What would you like to build?</p>
            <button
              className="codex-prompt"
              type="button"
              onClick={() => setRunning(true)}
            >
              <span aria-hidden="true">›</span> {prompt}{" "}
              <span aria-hidden="true">↵</span>
            </button>
          </>
        ) : (
          <>
            <p className="codex-sent">› {prompt}</p>
            <p className="codex-reply" aria-hidden="true">
              {length ? reply.slice(0, length) : "Thinking…"}
              {length < reply.length && <span className="codex-cursor">▌</span>}
            </p>
            <span className="sr-only" role="status">
              {length === reply.length ? reply : "Codex is thinking."}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

// Content is visible without JavaScript. Only animate as it enters the viewport.
export function ScrollReveals() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
