import { ImageResponse } from "next/og";

export const alt = "Prizic. From possibility to working systems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function PrizicMark() {
  return (
    <svg
      aria-hidden="true"
      height="116"
      viewBox="-15 0 500 500"
      width="116"
    >
      <g fill="#edeff5" transform="translate(0 500) scale(.1 -.1)">
        <path d="M302 4318l3-533 683-1c375 0 681 3 680 7-3 7-128 103-633 490-465 356-581 446-663 512l-72 58 2-533z" />
        <path d="M2441 4833c0-5 95-84 211-178 116-93 337-273 492-398 154-126 332-270 394-320l114-91-104-101c-57-55-193-185-303-290-110-104-267-256-350-336-82-80-305-295-495-479-190-183-383-371-430-417l-85-85 976 4 977 4 67 57c135 116 276 288 358 437 309 563 196 1290-269 1730-264 250-598 405-973 454-128 17-582 23-580 9z" />
        <path d="M1740 3470l-475-5-105-81c-198-152-375-289-435-336-33-26-108-85-166-130-58-46-140-110-182-143l-77-60V1441c0-1181 1-1273 17-1267 9 4 185 97 392 208s484 259 616 330c132 70 239 131 237 135-4 12-81 106-460 562l-353 424 313 316c172 174 421 426 553 561 132 135 355 361 495 503 140 141 253 257 250 257-64 5-232 4-620 0z" />
      </g>
      <g fill="#00d9ff" transform="translate(0 500) scale(.1 -.1)">
        <path d="M340 4820c41-36 245-195 695-539 498-381 630-483 632-490 3-7 395 0 1315 25 345 9 631 13 636 10 5-3 15 0 21 8 9 10-12 32-101 104-106 85-409 330-884 717-115 93-212 173-215 177-3 5-484 11-1070 14l-1064 5 35-31z" />
        <path d="M750 1837c0-3 147-182 328-399 180-216 365-439 411-496 56-68 87-99 95-94 6 5 128 71 271 147 143 76 298 159 345 185 47 26 166 90 265 143 392 207 840 449 849 457 15 15-106 19-639 25-582 6-1427 21-1727 31-109 3-198 3-198 1z" />
      </g>
    </svg>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#0a0e1a",
        color: "#edeff5",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "0",
          display: "flex",
          border: "24px solid #141a2e",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "72px",
          left: "78px",
          display: "flex",
        }}
      >
        <PrizicMark />
      </div>

      <div
        style={{
          position: "absolute",
          left: "78px",
          bottom: "76px",
          display: "flex",
          width: "680px",
          fontSize: "76px",
          fontWeight: 600,
          letterSpacing: "-3px",
          lineHeight: 1.02,
        }}
      >
        From possibility to working systems.
      </div>

      <svg
        aria-hidden="true"
        height="500"
        style={{ position: "absolute", right: "38px", top: "70px" }}
        viewBox="0 0 390 500"
        width="390"
      >
        <path
          d="M58 404 C58 320 58 279 121 279 H265 C315 279 332 245 332 199 C332 148 306 113 253 113 H103 C73 113 58 98 58 69"
          fill="none"
          stroke="#2a3350"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="46"
        />
        <path
          d="M58 404 C58 320 58 279 121 279 H265 C315 279 332 245 332 199 C332 148 306 113 253 113 H103 C73 113 58 98 58 69"
          fill="none"
          stroke="#00d9ff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
        />
        <circle cx="58" cy="404" fill="#0a0e1a" r="19" stroke="#00d9ff" strokeWidth="7" />
        <circle cx="58" cy="69" fill="#00d9ff" r="11" />
      </svg>
    </div>,
    size,
  );
}
