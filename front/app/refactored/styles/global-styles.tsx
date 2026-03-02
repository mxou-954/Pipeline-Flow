"use client";

export default function GlobalStyles() {
  return (
    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap");

      * {
        box-sizing: border-box;
      }

      body {
        font-family: "Manrope", -apple-system, system-ui, sans-serif;
        background: #0a0a0a;
        color: #ffffff;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(30px) scale(0.96);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes swipeLeft {
        to {
          transform: translateX(-150%) rotate(-20deg);
          opacity: 0;
        }
      }

      @keyframes swipeRight {
        to {
          transform: translateX(150%) rotate(20deg);
          opacity: 0;
        }
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.4;
        }
      }

      .gradient-border {
        position: relative;
        background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
      }

      .gradient-border::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 1px;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
        -webkit-mask:
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0.6;
        pointer-events: none;
      }
    `}</style>
  );
}