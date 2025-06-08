import {makeScene2D, Txt, Rect, Layout, Latex} from '@motion-canvas/2d';
import {createRef, beginSlide, waitUntil, sequence, all, waitFor} from '@motion-canvas/core';
import {Scene2D} from '@motion-canvas/2d/lib/scenes';

export default makeScene2D(function* (view) {
  const equation = createRef<Latex>();
  
  view.add(<Latex 
    ref={equation}
    fill="white"
    tex={['\\text{num} =', '\\text{ABCDE}']}
    fontSize={55}
    opacity={0}
  />);

  yield* equation().opacity(1, 0.5);

  yield* equation().tex([
    '\\text{num} =',
    '10000', 'A', '+',
    '1000', 'B', '+',
    '100', 'C', '+',
    '10', 'D', '+',
    'E'
  ], 0.3);

  yield* equation().tex([
    '\\text{num} =',
    '(', '9999', 'A', '+', 'A', ')', '+',
    '(', '999', 'B', '+', 'B', ')', '+',
    '(', '99', 'C', '+', 'C', ')', '+',
    '(', '9', 'D', '+', 'D', ')', '+', 'E'
  ], 0.7);

  yield* equation().tex([
    '\\text{num} =',
    '9999', 'A', '+',
    '999', 'B', '+',
    '99', 'C', '+',
    '9', 'D', '+',
    'A', '+', 'B', '+', 'C', '+', 'D', '+', 'E'
  ], 0.5);

  yield* equation().tex([
    '\\text{num} =',
    '\\textcolor{CornflowerBlue}{', 
    '9999', 'A', '+',
    '999', 'B', '+',
    '99', 'C', '+',
    '9', 'D', '}', '+',
    'A', '+', 'B', '+', 'C', '+', 'D', '+', 'E'
  ], 0.3);
  
  yield* equation().tex([
        '\\text{num}', '\\equiv{}',
        'A', '+', 'B', '+', 'C', '+', 'D', '+', 'E', '\\quad', '(\\bmod\\ 9)'
      ], 0.5);
  
  yield* all(
    equation().scale(1.3, 0.3),
    equation().fill("EF58A0", 0.3),
  );

  yield* equation().scale(1.1, 0.2);

  yield* waitFor(1);
});
