import {
  makeScene2D,
  Line,
  Latex,
} from '@motion-canvas/2d';
import {
  createRef,
  Vector2,
  waitFor,
  all,
  chain,
} from '@motion-canvas/core';

// Converts a path like ['R','U','R'] into an array of screen-space coordinates
function pathToCoords(path: string[], size: number, gridW: number, gridH: number): Vector2[] {
  let x = 0, y = 0;
  const coords = [new Vector2(x, y)];
  for (const move of path) {
    if (move === 'R') x++;
    else if (move === 'U') y++;
    coords.push(new Vector2(x, y));
  }
  // Transform to canvas coordinates (centered origin)
  return coords.map(v =>
    new Vector2(
      v.x * size - gridW * size / 2,
      -(v.y * size - gridH * size / 2),
    )
  );
}

export default makeScene2D(function* (view) {
  const gridW = 14;
  const gridH = 8;
  const cellSize = 80;
  const math = createRef<Latex>();

  // Add math display
  view.add(
    <Latex
      ref={math}
      tex={['\\text{\\# Paths}=', '?']}
      fill="white"
      y={420}
      fontSize={50}
    />
  );

  // Draw vertical grid lines
  for (let x = 0; x <= gridW; x++) {
    const xPos = x * cellSize - gridW * cellSize / 2;
    view.add(
      <Line
        points={[[xPos, -gridH * cellSize / 2], [xPos, gridH * cellSize / 2]]}
        stroke="#ffffff"
        lineWidth={1}
        zIndex={-1}
      />
    );
  }
  // Draw horizontal grid lines
  for (let y = 0; y <= gridH; y++) {
    const yPos = y * cellSize - gridH * cellSize / 2;
    view.add(
      <Line
        points={[[-gridW * cellSize / 2, yPos], [gridW * cellSize / 2, yPos]]}
        stroke="#ffffff"
        lineWidth={1}
        zIndex={-1}
      />
    );
  }

  // Wriggly non-intersecting paths from bottom-left to top-right (14 R, 8 U = 22 steps)
  const path1 = 'RRURRRUURRUUURURRRRURR'.split('');
  const path2 = 'UURURRURRRRRRURRURRRUU'.split('');

  // Convert paths to canvas coordinates
  const coords1 = pathToCoords(path1, cellSize, gridW, gridH);
  const coords2 = pathToCoords(path2, cellSize, gridW, gridH);

  // Create refs for each path line
  const line1 = createRef<Line>();
  const line2 = createRef<Line>();

  // Add glowing lines to scene (no walkers anymore)
  view.add(
    <>
      <Line
        ref={line1}
        points={[coords1[0]]}
        stroke="#FF5C5C"
        lineWidth={14}
        lineCap="round"
        lineJoin="round"
        shadowColor="#FF5C5C"
        shadowBlur={100}
        shadowOffset={[0, 0]}
      />

      <Line
        ref={line2}
        points={[coords2[0]]}
        stroke="#33CCFF"
        lineWidth={14}
        lineCap="round"
        lineJoin="round"
        shadowColor="#33CCFF"
        shadowBlur={100}
        shadowOffset={[0, 0]}
      />
    </>
  );

  // Animate lines step-by-step (no tweening to avoid freeze)
  for (let i = 1; i < coords1.length; i++) {
    line1().points([...line1().points(), coords1[i]]);
    line2().points([...line2().points(), coords2[i]]);
    yield* waitFor(0.03);
  }

  // Animate math
  yield* math().tex(['\\text{\\# Paths}=', '\\binom{', '7', '}{', '3', '}^2'], 0.4);

  yield* math().tex(['\\text{\\# Paths}=', '\\left( \\frac{7!}{3!4!} \\right)^2'], 0.6);

  yield* math().tex(['\\text{\\# Paths}=', '35^2'], 0.4);

  yield* all(
    math().tex(['\\textbf{\\# Paths}=', '\\mathbf{1225}'], 0.3),
    math().scale(1.4, 0.3),
    math().fill('#ffce2e', 0.3),
  );

  yield* all(
    math().scale(1.1, 0.3),
    math().fill('#e3fa7f', 0.3),
  );

  yield* waitFor(1);

});
