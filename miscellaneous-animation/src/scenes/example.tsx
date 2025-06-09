import {makeScene2D, Rect, Txt} from '@motion-canvas/2d';
import {all, createRef, waitFor, tween, easeOutBack} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const squareSize = 130;
  const spacing = 14;
  const numbers = [
    [2, 7, 6],
    [9, 5, 1],
    [4, 3, 8]
  ];

  const knownMask = [
    [true, true, true],
    [true, false, false],
    [false, true, true]
  ];

  const cells: Rect[][] = [];
  const labels: Txt[][] = [];

  const enterAnimations = [];

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
          fill="#222"
          shadowColor="#ffffff40"
          shadowBlur={12}
          stroke="#ffffff"
          lineWidth={4}
          radius={18}
          scale={0}
        >
          <Txt
            ref={label}
            fontSize={46}
            fontWeight={700}
            fill={knownMask[row][col] ? "#ffffff" : "#ffaa00"}
            text={knownMask[row][col] ? numbers[row][col].toString() : "?"}
            opacity={0}
          />
        </Rect>
      );

      enterAnimations.push(
        tween(0.3, value => rect().scale(easeOutBack(value))),
        tween(0.3, value => label().opacity(value))
      );

      cellRow.push(rect());
      labelRow.push(label());
    }
    cells.push(cellRow);
    labels.push(labelRow);
  }

  const message = createRef<Txt>();
  const ruleText = createRef<Txt>();

  view.add(
    <Txt
      ref={message}
      y={squareSize * 2 + 40}
      fontSize={42}
      fontWeight={600}
      fill="#ffffff"
      text="Solve it?"
      opacity={0}
    />
  );

  view.add(
    <Txt
      ref={ruleText}
      y={squareSize * 2 + 90}
      fontSize={28}
      fontWeight={500}
      fill="#bbbbbb"
      text="All rows, columns, and diagonals must add up to the same number."
      opacity={0}
    />
  );

  yield* all(...enterAnimations);
  yield* all(
    message().opacity(1, 0.3),
    ruleText().opacity(1, 0.3)
  );
  yield* waitFor(0.5);

  const updates = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (!knownMask[row][col]) {
        updates.push(
          labels[row][col].text(numbers[row][col].toString(), 0.3),
          labels[row][col].fill("#33ff99", 0.3)
        );
      }
    }
  }

  yield* all(...updates);

  yield* all(
    message().text("You got it! ✅", 0.4),
    message().fill("#33ff99", 0.4)
  );

  yield* waitFor(0.5);
});
