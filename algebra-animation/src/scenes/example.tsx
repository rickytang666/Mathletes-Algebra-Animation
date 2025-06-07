import {Latex, makeScene2D} from '@motion-canvas/2d';
import {createRef, waitFor, all} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const a = '\\textcolor{Rhodamine}{a}';
  const b = '\\textcolor{LimeGreen}{b}';
  const c = '\\textcolor{ProcessBlue}{c}';

  const equation = createRef<Latex>();
  const x_1 = createRef<Latex>();
  const x_2 = createRef<Latex>();
  const sumFormula = createRef<Latex>();
  const productFormula = createRef<Latex>();

  view.add(
    <Latex
      ref={equation}
      tex={[a, 'x^2', '+', b, 'x', '+', c, '=', '0']}
      fill="white"
      y={-350}
      fontSize={70}
      opacity={0}
    />
  );

  view.add(
    <Latex
      ref={x_1}
      tex={['x_1', '=', `\\frac{-${b}+\\sqrt{${b}^2-4${a}${c}}}{2${a}}`]}
      position={[-300, -150]}
      fill="white"
      fontSize={35}
      opacity={0}
    />
  );

  view.add(
    <Latex
      ref={x_2}
      tex={['x_2', '=', `\\frac{-${b}-\\sqrt{${b}^2-4${a}${c}}}{2${a}}`]}
      position={[300, -150]}
      fill="white"
      fontSize={35}
      opacity={0}
    />
  );

  yield* all(
    equation().opacity(1, 0.6),
    x_1().opacity(1, 0.6),
    x_2().opacity(1, 0.6),
  );

  view.add(
    <Latex
      ref={sumFormula}
      tex={['x_1', '+', 'x_2', '=', '?']}
      fill="white"
      y={100}
      fontSize={55}
      opacity={0}
    />
  );

  view.add(
    <Latex
      ref={productFormula}
      tex={['x_1', 'x_2', '=', '?']}
      fill="white"
      y={350}
      fontSize={55}
      opacity={0}
    />
  );

  yield* all(
    sumFormula().opacity(1, 0.2),
    productFormula().opacity(1, 0.2),
  );

  yield* all(
    sumFormula().tex([
      'x_1', '+', 'x_2', '=', '\\frac{', `-${b}`, '+', `\\sqrt{${b}^2 - 4${a}${c}}`, '-', `${b}`, '-', `\\sqrt{${b}^2 - 4${a}${c}}`, '}{', `2${a}`, '}'
    ], 0.6),
    productFormula().tex([
      'x_1', 'x_2', '=', '\\frac{', `(-${b}+\\sqrt{${b}^2-4${a}${c}})(-${b}-\\sqrt{${b}^2-4${a}${c}})`, '}{', '4', `${a}^2`, '}'
    ], 0.6),
  );

  yield* productFormula().tex([
    'x_1', 'x_2', '=', `\\frac{${b}^2 - (${b}^2 - 4${a}${c})}{4${a}^2}`
  ], 0.4);

  yield* sumFormula().tex([
    'x_1', '+', 'x_2', '=', `\\frac{-2${b}}{2${a}}`
  ], 0.5);

  yield* productFormula().tex([
    'x_1', 'x_2', '=', `\\frac{4${a}${c}}{4${a}^2}`
  ], 0.1);

  yield* all(
    sumFormula().tex(['x_1', '+', 'x_2', '=', '\\frac{', `\\mathbf{-${b}}`, '}{', `\\mathbf{${a}}}`], 0.5),
    productFormula().tex(['x_1', 'x_2', '=', '\\frac{', `\\mathbf{${c}}`, '}{', `\\mathbf{${a}}`, '}'], 0.5),
  );

  yield* all(
    sumFormula().scale(1.2, 0.3),
    productFormula().scale(1.2, 0.3),
    sumFormula().fill('#ffde59', 0.3),
    productFormula().fill('#ffde59', 0.3),
  );

  yield* all(
    sumFormula().scale(1, 0.3),
    productFormula().scale(1, 0.3),
  );

  yield* waitFor(1);
});