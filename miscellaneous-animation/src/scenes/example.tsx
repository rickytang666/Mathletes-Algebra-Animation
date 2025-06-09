import {makeScene2D, Rect, Txt} from '@motion-canvas/2d';
import {all, chain, createRef, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const squareSize = 120;
  const spacing = 10;
  const numbers = [
    [2, 7, 6],
    [9, 5, 1],
    [4, 3, 8]
  ];

  const cells: Rect[][] = [];
  const labels: Txt[][] = [];

  for (let row = 0; row < 3; row++) {
    const cellRow: Rect[] = [];
    const labelRow: Txt[] = [];
    for (let col = 0; col < 3; col++) {
      const rect = createRef<Rect>();
      const label = createRef<Txt>();

      view.add(
        <Rect
          ref={rect}
          x={col * (squareSize + spacing) - squareSize - spacing}
          y={row * (squareSize + spacing) - squareSize - spacing}
          width={squareSize}
          height={squareSize}
          fill="#ffffff10"
          stroke="#ffffff"
          lineWidth={4}
          radius={12}
        >
          <Txt
            ref={label}
            fontSize={40}
            fill="#ffffff"
            text={""}
          />
        </Rect>
      );

      cellRow.push(rect());
      labelRow.push(label());
    }
    cells.push(cellRow);
    labels.push(labelRow);
  }

  yield* waitFor(0.5);
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      yield* labels[row][col].text(numbers[row][col].toString(), 0.3);
    }
  }

  yield* waitFor(0.5);
});