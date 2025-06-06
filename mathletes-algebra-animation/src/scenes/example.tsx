import {Latex, makeScene2D} from '@motion-canvas/2d';
import {createRef, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const tex = createRef<Latex>();
  view.add(<Latex ref={tex} tex={['a^2', '+', '2a', '+', '1', '=', '0']} fill="white" />);

  yield* waitFor(0.5);
  yield* tex().tex(['(', 'a', '+', '1', ')^2', '=', '0'], 1);

  yield* waitFor(0.5);
  yield* tex().tex(['a', '+', '1', '=', '0'], 1);

  yield* waitFor(0.5);
  yield* tex().tex(['a', '=', '-1'], 1);
});