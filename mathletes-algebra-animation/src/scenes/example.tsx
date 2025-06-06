import {Latex, makeScene2D} from '@motion-canvas/2d';
import {createRef, waitFor, chain} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const equation = createRef<Latex>();
  const sumFormula = createRef<Latex>();
  const productFormula = createRef<Latex>();

  // 1. Add quadratic equation with colored coefficients
  view.add(
    <Latex
      ref={equation}
      tex={[
        '\\textcolor{red}{a}', 'x^2', '+',
        '\\textcolor{blue}{b}', 'x', '+',
        '\\textcolor{green}{c}', '=', '0',
      ]}
      fill="white"
      y={-150}
      fontSize={60}
    />
  );

  yield* waitFor(0.5);

  // 2. Add Vieta's formulas below

  view.add(
    <Latex
      ref={sumFormula}
      tex={[
        'x_1', '+', 'x_2', '=', 
        '-\\frac{\\textcolor{blue}{b}}{\\textcolor{red}{a}}'
      ]}
      fill="white"
      y={0}
      fontSize={48}
      opacity={0}
    />
  );

  view.add(
    <Latex
      ref={productFormula}
      tex={[
        'x_1', '\\cdot','{x_2}', '=', 
        '\\frac{\\textcolor{green}{c}}{\\textcolor{red}{a}}'
      ]}
      fill="white"
      y={150}
      fontSize={48}
      opacity={0}
    />
  );

  // 3. Animate formulas fading in
  
  yield* chain(
    sumFormula().opacity(1, 1),
    productFormula().opacity(1, 1),
  );
});
