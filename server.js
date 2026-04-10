const express = require("express");

const app = express();
const PORT = 3000;

// 👉 biến đếm phải ở đây
let views = 0;

app.get("/view.svg", (req, res) => {
  // 👉 mỗi lần truy cập +1
  views++;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="260" height="40">
  <defs>
    <linearGradient id="gold" x1="0" x2="1">
      <stop offset="0%" stop-color="#ffd700"/>
      <stop offset="100%" stop-color="#ffb700"/>
    </linearGradient>

    <filter id="glow">
      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <style>
      .pulse {
        animation: pulse 1.5s infinite;
      }
      @keyframes pulse {
        0% { opacity: 0.8; }
        50% { opacity: 1; }
        100% { opacity: 0.8; }
      }

      text {
        font-family: "Segoe UI", Arial, sans-serif;
        font-weight: bold;
      }
    </style>
  </defs>

  <rect rx="10" width="260" height="40" fill="#1a1a1a"/>
  <rect rx="10" width="260" height="40" fill="url(#gold)" opacity="0.25"/>

  <!-- icon -->
  <text x="10" y="26" font-size="18">⚡</text>

  <!-- label -->
  <text x="110" y="26" fill="#ffd700" font-size="14" text-anchor="middle" filter="url(#glow)">
    PROTOTYPE VIEWS
  </text>

  <!-- value -->
  <text x="210" y="26" fill="#fff" font-size="14" text-anchor="middle" class="pulse">
    ${views}
  </text>
</svg>
`;

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
});

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT + "/view.svg");
});