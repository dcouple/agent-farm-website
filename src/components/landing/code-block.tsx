import { CopyButton } from "./interactions";

// Small, static examples need no client-side syntax-highlighting library.
function HighlightedCode({
  code,
  language,
}: {
  code: string;
  language: "shell" | "yaml";
}) {
  const tokens = code.split(
    /(#[^\n]*|"[^"\n]*"|'[^'\n]*'|https?:\/\/[^\s]+|--[\w-]+|\b[\w-]+(?=:)|\b(?:agent-farm|git|cd|pnpm|mkdir|ln|export)\b)/g,
  );
  return (
    <>
      {tokens.map((token, index) => {
        let className = "";
        if (token.startsWith("#")) className = "syntax-comment";
        else if (/^["']|^https?:/.test(token)) className = "syntax-gold";
        else if (token.startsWith("--")) className = "syntax-blue";
        else if (language === "yaml" && index % 2 === 1)
          className = "syntax-blue";
        else if (/^(agent-farm|git|cd|pnpm|mkdir|ln|export)$/.test(token))
          className = "syntax-green";
        return className ? (
          <span className={className} key={index}>
            {token}
          </span>
        ) : (
          token
        );
      })}
    </>
  );
}

export function CodeBlock({
  code,
  title,
  language = "shell",
}: {
  code: string;
  title: string;
  language?: "shell" | "yaml";
}) {
  return (
    <div className="code-block">
      <div className="code-heading">
        <span>{title}</span>
        <CopyButton text={code} label={`Copy ${title}`} />
      </div>
      <pre tabIndex={0} aria-label={title}>
        <code>
          <HighlightedCode code={code} language={language} />
        </code>
      </pre>
    </div>
  );
}
