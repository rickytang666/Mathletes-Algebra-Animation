import {makeScene2D, Txt, Rect, Layout, Latex} from '@motion-canvas/2d';
import {createRef, beginSlide, waitUntil, sequence, all, waitFor} from '@motion-canvas/core';
import {Scene2D} from '@motion-canvas/2d/lib/scenes';

export default makeScene2D(function* (view) {
  const equation = createRef<Latex>();
  
  view.add(<Latex 
    ref={equation}
    fill="white"
    tex={['\\text{num}=', '\\text{ABCDE}']}
    fontSize={55}
    opacity={0}
  />);

  yield* equation().opacity(1, 1);

  yield* equation().tex(['\\text{num}=', '10000A+1000B+100C+10D+E'], 1);
  
  yield* equation().tex(['\\text{num}=', '(9999A', '+A', ')+(999B', '+B', ')+(99C','+C', ')+(9D', '+D', ')', '+E'], 1);

  yield* equation().tex(['\\text{num}=', '9999A', '+999B', '+99C', '+9D','+A', '+B', '+C', '+D', '+E'], 1);

  yield* equation().tex(['\\text{num}=', '\\textcolor{CornflowerBlue}{9999A+999B+99C+9D}','+A', '+B', '+C', '+D', '+E'], 1);

  yield* equation().tex(['\\text{num}', '\\equiv{}', 'A', '+B', '+C', '+D', '+E', '\\quad', '(\\bmod 9)'], 1);

  yield* waitFor(1);
});
