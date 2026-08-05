import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#16607D",
        color: "#F1DFBF",
        fontFamily: "Arial, sans-serif",
        fontSize: 82,
        fontWeight: 800,
        letterSpacing: "-0.08em",
      }}
    >
      MR
    </div>,
    size,
  );
}
