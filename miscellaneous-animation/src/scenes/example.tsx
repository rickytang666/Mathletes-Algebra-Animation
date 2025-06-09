import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Rect, Txt} from '@motion-canvas/2d/lib/components';
import {all, createRef, easeOutCubic, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  // Simple 3x3 magic square
  const magicNumbers = [
    [2, 7, 6],
    [9, 5, 1], 
    [4, 3, 8]
  ];

  // Create simple grid
  const cells = [];
  const texts = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = createRef<Rect>();
      const text = createRef<Txt>();
      
      // Position cells in grid
      const x = (j - 1) * 100;
      const y = (i - 1) * 100;
      
      view.add(
        <Rect
          ref={cell}
          width={80}
          height={80}
          x={x}
          y={y}
          fill={'#2c3e50'}
          stroke={'#3498db'}
          opacity={0}
        >
          <Txt
            ref={text}
            text={magicNumbers[i][j].toString()}
            fontSize={24}
            fill={'white'}
            opacity={0}
          />
        </Rect>
      );
      
      cells.push(cell);
      texts.push(text);
    }
  }

  // Simple animation - show cells one by one
  for (let i = 0; i < 9; i++) {
    yield* all(
      cells[i]().opacity(1, 0.3, easeOutCubic),
      cells[i]().scale(1.2, 0.15).to(1, 0.15)
    );
    yield* texts[i]().opacity(1, 0.2);
  }

  // Wait a bit then highlight all
  yield* waitFor(0.5);
  
  yield* all(
    ...cells.map(cell => cell().fill('#e74c3c', 0.5)),
    ...texts.map(text => text().fill('#ffffff', 0.5))
  );
});