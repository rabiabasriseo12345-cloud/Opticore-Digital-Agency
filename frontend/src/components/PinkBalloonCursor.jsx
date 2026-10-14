import React, { useEffect, useRef, useState } from 'react';

/**
 * PinkBalloonCursor - Hollow Outline Sketch Balloon with Loose Floating Inertia
 * 
 * Requirements Addressed:
 * 1. "full balon nahi bnana tha... andar c fill nahi karna tha, just line, darmian c nechy background ki beshak website nazar ati":
 *    - 100% Hollow / Transparent center (fill: none).
 *    - The website text, cards, and colors behind the balloon are completely visible right through it!
 *    - Sketched shocking pink (#ff007f / #ff1493) and baby pink (#ff69b4) outline pencil strokes.
 * 
 * 2. "our edr udhr khnchty he lose sa edr udhr huta hu":
 *    - Loose spring inertia physics (lerp with momentum).
 *    - Dynamic tilt and sway reacting to horizontal drag velocity.
 *    - 4-segment physics-based wavy string that bends and trails loosely when dragged across the screen.
 *    - Idle gentle helium floating bob when mouse is still.
 *    - Squash & bounce reaction on mouse click.
 * 
 * 3. Precision:
 *    - Delicate 5px shocking pink precision dot right at the exact mouse coordinate for effortless link and button clicking.
 *    - pointer-events: none ensures zero obstruction to clicks, selections, or form inputs.
 */
export default function PinkBalloonCursor() {
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef(null);
  const balloonDomRef = useRef(null);
  const stringBackPathRef = useRef(null);
  const stringPathRef = useRef(null);
  const precisionDotRef = useRef(null);
  const sparkleRef = useRef(null);

  // High performance refs (zero re-render overhead during mouse moves)
  const mouseRef = useRef({ x: -100, y: -100 });
  const balloonRef = useRef({ x: -100, y: -100, vx: 0, vy: 0, angle: 0 });
  const hoverRef = useRef(false);
  const clickRef = useRef(false);
  const visibleRef = useRef(false);

  // Multi-joint chain for loose waving string physics
  const stringRef = useRef([
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 }
  ]);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setMounted(true);
    document.body.classList.add('has-balloon-cursor');

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      if (!visibleRef.current) {
        visibleRef.current = true;
        if (containerRef.current) containerRef.current.style.opacity = '1';
      }

      // Check if hovering over clickable / interactive elements
      const target = e.target;
      if (target) {
        const isInteractive = target.closest('a, button, [role="button"], .btn, input, select, textarea, label, summary, .interactive');
        const hovering = Boolean(isInteractive);
        if (hoverRef.current !== hovering) {
          hoverRef.current = hovering;
          if (sparkleRef.current) {
            sparkleRef.current.style.display = hovering ? 'block' : 'none';
          }
        }
      }
    };

    const onMouseDown = () => {
      clickRef.current = true;
    };

    const onMouseUp = () => {
      clickRef.current = false;
    };

    const onMouseLeave = () => {
      visibleRef.current = false;
      if (containerRef.current) containerRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      visibleRef.current = true;
      if (containerRef.current) containerRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animId = null;

    const loop = (currentTime) => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const b = balloonRef.current;

      // Initial placement
      if (b.x < 0 && mx > 0) {
        b.x = mx + 8;
        b.y = my - 28;
        stringRef.current.forEach((pt) => {
          pt.x = b.x;
          pt.y = b.y + 36;
        });
      }

      // Target position: floats gracefully near the cursor tip
      const targetX = mx + 10;
      const targetY = my - 28;

      // Loose spring inertia ("loose sa idhar udhar hota ho")
      const spring = 0.11;
      const friction = 0.79;
      const dx = targetX - b.x;
      const dy = targetY - b.y;

      b.vx = b.vx * friction + dx * spring;
      b.vy = b.vy * friction + dy * spring;

      b.x += b.vx;
      b.y += b.vy;

      // Gentle floating helium bobbing when mouse is still or moving slowly
      const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
      const idleBob = Math.sin(currentTime * 0.0035) * 4.5;
      const idleSway = Math.cos(currentTime * 0.0025) * 3;

      const displayY = b.y + (speed < 2.0 ? idleBob : 0);
      const displayX = b.x + (speed < 2.0 ? idleSway : 0);

      // Dynamic tilt based on horizontal velocity ("loose sa idhar udhar jhulta ho")
      const targetAngle = Math.max(-30, Math.min(30, b.vx * 1.9));
      b.angle += (targetAngle - b.angle) * 0.12;

      // Update Balloon DOM transform
      if (balloonDomRef.current) {
        const scale = clickRef.current ? 0.88 : (hoverRef.current ? 1.15 : 1.0);
        balloonDomRef.current.style.transform = `translate3d(${displayX}px, ${displayY}px, 0) rotate(${b.angle}deg) scale(${scale})`;
      }

      // Update Precision Click Dot at exact mouse coordinates
      if (precisionDotRef.current) {
        precisionDotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }

      // Multi-joint rope physics for loose trailing wavy string
      const rad = (b.angle * Math.PI) / 180;
      const knotLocalX = 0;
      const knotLocalY = 25;
      const knotWorldX = displayX + (knotLocalX * Math.cos(rad) - knotLocalY * Math.sin(rad));
      const knotWorldY = displayY + (knotLocalX * Math.sin(rad) + knotLocalY * Math.cos(rad));

      const str = stringRef.current;
      str[0].x = knotWorldX;
      str[0].y = knotWorldY;

      // Successive rope joints lag behind loosely
      for (let i = 1; i < str.length; i++) {
        const prev = str[i - 1];
        const cur = str[i];

        // Tendency to lag behind motion and hang downward
        const desiredX = prev.x - b.vx * 0.35 * (i / str.length);
        const desiredY = prev.y + 11;

        cur.x += (desiredX - cur.x) * (0.24 - i * 0.035);
        cur.y += (desiredY - cur.y) * 0.32;
      }

      // Render smooth bezier curve for the wavy trailing string
      const pathData = `M ${str[0].x.toFixed(1)} ${str[0].y.toFixed(1)} Q ${str[1].x.toFixed(1)} ${str[1].y.toFixed(1)}, ${str[2].x.toFixed(1)} ${str[2].y.toFixed(1)} T ${str[3].x.toFixed(1)} ${str[3].y.toFixed(1)}`;
      if (stringPathRef.current) stringPathRef.current.setAttribute('d', pathData);
      if (stringBackPathRef.current) stringBackPathRef.current.setAttribute('d', pathData);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('has-balloon-cursor');
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="pink-balloon-cursor-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999999,
        overflow: 'hidden',
        opacity: 0,
        transition: 'opacity 0.25s ease'
      }}
    >
      {/* SVG Canvas for Loose Trailing String */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        <defs>
          <filter id="looseStringGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#ff007f" flood-opacity="0.5"/>
          </filter>
        </defs>

        {/* White backing for string so it is visible over dark navy footer/navbar */}
        <path
          ref={stringBackPathRef}
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />

        {/* Shocking Pink Hand-drawn Loose String */}
        <path
          ref={stringPathRef}
          stroke="#ff007f"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          filter="url(#looseStringGlow)"
        />
      </svg>

      {/* Floating Hollow Sketched Balloon (NO INSIDE FILL - 100% transparent center) */}
      <div
        ref={balloonDomRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '44px',
          height: '54px',
          marginLeft: '-22px',
          marginTop: '-27px',
          willChange: 'transform',
          transition: 'transform 0.04s linear'
        }}
      >
        <svg
          width="44"
          height="54"
          viewBox="0 0 44 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="hollowNeonGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#ff007f" flood-opacity="0.55"/>
            </filter>
          </defs>

          {/* White outline backing for high contrast on dark blue sections */}
          <g opacity="0.95">
            <path
              d="M 22 3 C 12 3 5 9.5 5 18 C 5 26 12 31.8 19 33.2 L 18 35.8 L 22 34.8 L 26 35.8 L 25 33.2 C 32 31.8 39 26 39 18 C 39 9.5 32 3 22 3 Z"
              stroke="#ffffff"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>

          {/* MAIN HOLLOW SHOCKING PINK BALLOON OUTLINE (fill="none") */}
          <g filter="url(#hollowNeonGlow)">
            <path
              d="M 22 3 C 12 3 5 9.5 5 18 C 5 26 12 31.8 19 33.2 L 18 35.8 L 22 34.8 L 26 35.8 L 25 33.2 C 32 31.8 39 26 39 18 C 39 9.5 32 3 22 3 Z"
              stroke="#ff007f"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Secondary Hand-drawn Sketch Pen Line (Baby Pink pencil stroke) */}
            <path
              d="M 21 4.5 C 12.5 5 6.5 10.8 6.5 18.5 C 6.5 25.2 12.8 30.5 19.5 31.8"
              stroke="#ff69b4"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="4 2"
              fill="none"
            />

            {/* Sketched Light Reflection Highlight (White chalk arc & dot) */}
            <path
              d="M 10.5 10.5 C 8.5 13.8 8.5 18 10 21"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="13" cy="8" r="1.3" fill="#ffffff" />

            {/* Tied Knot Detail at Bottom (Hollow) */}
            <path
              d="M 18 34 Q 22 35.8 26 34"
              stroke="#ff007f"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Sparkle Star shown when hovering over clickable links/buttons */}
          <g
            ref={sparkleRef}
            transform="translate(34, 1)"
            style={{ display: 'none' }}
          >
            <path
              d="M 4 0 L 5 2.8 L 8 4 L 5 5.2 L 4 8 L 3 5.2 L 0 4 L 3 2.8 Z"
              fill="#ff007f"
              stroke="#ffffff"
              strokeWidth="0.8"
            />
          </g>
        </svg>
      </div>

      {/* Precision Click Dot right at exact mouse coordinates */}
      <div
        ref={precisionDotRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '7px',
          height: '7px',
          marginLeft: '-3.5px',
          marginTop: '-3.5px',
          borderRadius: '50%',
          backgroundColor: '#ff007f',
          boxShadow: '0 0 7px rgba(255, 0, 127, 0.9), 0 0 0 1.5px #ffffff',
          willChange: 'transform',
          transition: 'transform 0.01s linear'
        }}
      />
    </div>
  );
}
