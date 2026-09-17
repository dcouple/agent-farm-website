import type { SVGProps } from "react";

export type BlockKind = "Profile" | "Agent" | "Skill" | "Workspace";

export function FarmMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 36 40" fill="none" aria-hidden="true" {...props}>
      <path
        d="M18 3v34M18 24C7 24 3 17 4 10c9 0 14 6 14 14ZM18 31c11 0 15-7 14-14-9 0-14 6-14 14Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 3c-7 6-7 12 0 17 7-5 7-11 0-17Z" fill="currentColor" />
    </svg>
  );
}

export function BlockDrawing({
  kind,
  className = "",
}: {
  kind: BlockKind;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 140 110"
      className={className}
      fill="none"
      aria-hidden="true"
      stroke="#203e36"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 99c32-4 80-3 116 0" stroke="#899e78" strokeWidth="1.4" />
      <g className="drawing-sprig">
        <path
          d="M27 97c-1-14-4-28-9-38M25 82C13 83 9 75 10 70c8 0 13 5 15 12ZM22 72c-1-10 2-17 7-20 5 7 2 14-7 20Z"
          fill="#98ad7c"
          strokeWidth="1.5"
        />
        <path
          d="M19 63C10 58 11 48 14 44c6 4 8 10 5 19Z"
          fill="#efbf59"
          strokeWidth="1.5"
        />
        <path
          d="M109 96c1-13 5-26 11-35m-9 24c-11-2-13-10-10-15 8 3 10 8 10 15Zm5-12c0-9 6-15 12-15 1 8-4 12-12 15Z"
          fill="#b0bd8c"
          strokeWidth="1.5"
        />
      </g>
      {kind === "Profile" && (
        <g>
          <path d="m52 29 42 8-8 57-43-6Z" fill="#bdc9a4" />
          <path d="m44 20 44 6-4 62-45-4Z" fill="#e7dfb9" />
          <path d="M36 15h35l12 13v59H36Z" fill="#fbf3dd" />
          <path d="M71 15v14h12M47 39h24M47 48h24M47 57h24M47 66h17" />
          <path d="M39 18h29" stroke="#b3c1a1" />
        </g>
      )}
      {kind === "Agent" && (
        <g>
          <path d="M68 27V15" />
          <circle cx="68" cy="12" r="5" fill="#edbb53" />
          <path d="M47 73h44v22H47Z" fill="#6d9684" />
          <path
            d="M37 37c0-8 6-12 13-12h37c9 0 13 4 13 12v25c0 8-5 13-13 13H50c-8 0-13-5-13-13Z"
            fill="#91aa87"
          />
          <rect x="44" y="33" width="49" height="33" rx="8" fill="#f2c663" />
          <path d="M36 40h-6v20h6m65-20h6v20h-6" fill="#779884" />
          <circle cx="56" cy="46" r="3" fill="#203e36" />
          <circle cx="81" cy="46" r="3" fill="#203e36" />
          <path d="M60 58h16M55 94V82m28 12V82M64 82h9" />
        </g>
      )}
      {kind === "Skill" && (
        <g>
          <path
            d="m61 17 15-1 3 10 8 4 10-4 10 11-5 10 3 8 11 3-1 15-11 3-4 8 4 10-11 10-10-5-8 3-3 10-15-1-3-11-8-4-10 4-10-11 5-10-3-8-10-3 1-15 10-3 4-8-4-10 11-10 10 5 8-3Z"
            transform="translate(6 0) scale(.9)"
            fill="#719281"
          />
          <circle cx="69" cy="57" r="22" fill="#d6ddbb" />
          <circle cx="69" cy="57" r="12" fill="#f9f1dc" />
        </g>
      )}
      {kind === "Workspace" && (
        <g>
          <path
            d="M35 33c0-5 3-8 8-8h18l9 10h31c4 0 6 3 6 7v47H35Z"
            fill="#749886"
          />
          <path d="M42 42h64l-6 48H38Z" fill="#efc35e" />
          <path d="M47 46h53M42 87h52" stroke="#d19e3c" />
          <path d="M49 32h11" stroke="#b9c6a0" />
        </g>
      )}
    </svg>
  );
}

export function FieldLines({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 230"
      preserveAspectRatio="none"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 9 }, (_, i) => (
        <path
          key={i}
          d={`M-100 ${105 + i * 18}C160 ${-95 + i * 24} 290 ${295 + i * 7} 590 ${134 + i * 15}S960 ${46 + i * 14} 1310 ${105 + i * 17}`}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
