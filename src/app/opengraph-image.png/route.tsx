import { ImageResponse } from "next/og";
import { FarmMark } from "@/components/landing/artwork";

export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#183c32",
          color: "#f8f5ed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 76px",
          borderBottom: "12px solid #f3bf50",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 30,
            color: "#f3bf50",
          }}
        >
          <FarmMark width={36} height={40} /> Agent Farm
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 94,
            letterSpacing: -4,
            lineHeight: 1.05,
          }}
        >
          <span>Your agents.</span>
          <span>Your setup.</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 23,
            color: "#d2dec8",
          }}
        >
          <span>Claude Code & Codex. Your native terminal.</span>
          <span>getagentfarm.com</span>
        </div>
      </div>
    ),
    size,
  );
}
