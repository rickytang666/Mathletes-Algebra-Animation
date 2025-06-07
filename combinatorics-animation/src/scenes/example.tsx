import {
  makeScene2D,
  Circle,
  Line,
} from '@motion-canvas/2d';
import {
  createRef,
  all,
  easeInOutCubic,
  Vector2,
  waitFor,
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
  const cellSize = 55;

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
  const path1 = 'RRURRRUURRURURRRUURRRU'.split('');
  const path2 = 'UUURURURRUURRRRURRRRRR'.split('');

  // Convert paths to canvas coordinates
  const coords1 = pathToCoords(path1, cellSize, gridW, gridH);
  const coords2 = pathToCoords(path2, cellSize, gridW, gridH);

  // Create refs for each walker and path line
  const walker1 = createRef<Circle>();
  const walker2 = createRef<Circle>();
  const line1 = createRef<Line>();
  const line2 = createRef<Line>();

  // Add walkers and glowing lines to scene
  view.add(
    <>
      <Line
        ref={line1}
        points={[coords1[0]]}
        stroke="#FF4D4D"
        lineWidth={10}
        shadowColor="#FF4D4D"
        shadowBlur={25}
      />
      <Circle
        ref={walker1}
        position={coords1[0]}
        width={18}
        height={18}
        fill="#FF4D4D"
      />

      <Line
        ref={line2}
        points={[coords2[0]]}
        stroke="#4DA6FF"
        lineWidth={10}
        shadowColor="#4DA6FF"
        shadowBlur={25}
      />
      <Circle
        ref={walker2}
        position={coords2[0]}
        width={18}
        height={18}
        fill="#4DA6FF"
      />
    </>
  );

  // Animate walkers and lines step-by-step
  for (let i = 1; i < coords1.length; i++) {
    yield* all(
      walker1().position(coords1[i], 0.04, easeInOutCubic),
      walker2().position(coords2[i], 0.04, easeInOutCubic),
    );

    line1().points([...line1().points(), coords1[i]]);
    line2().points([...line2().points(), coords2[i]]);
  }

  yield* waitFor(1);
});
