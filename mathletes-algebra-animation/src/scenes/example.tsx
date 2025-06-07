import {Latex, makeScene2D} from '@motion-canvas/2d';
import {createRef, waitFor, all} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const equation = createRef<Latex>();
  const x_1 = createRef<Latex>();
  const x_2 = createRef<Latex>();
  const sumFormula = createRef<Latex>();
  const productFormula = createRef<Latex>();

  // Add quadratic equation with colored coefficients

  view.add(
    <Latex
      ref={equation}
      tex={[
        '\\textcolor{Goldenrod}{a}', 'x^2', '+',
        '\\textcolor{LimeGreen}{b}', 'x', '+',
        '\\textcolor{ProcessBlue}{c}', '=', '0',
      ]}
      fill="white"
      y={-350}
      fontSize={70}
      opacity={0}
    />
  );

  yield* equation().opacity(1, 1);

  // Add x_1 and x_2 using quadratic formulas

  view.add(
    <Latex
      ref={x_1}
      tex={['x_1', '=']}
      position={[-400, -100]}
      fill="white"
      fontSize={48}
      opacity={0}
    />
  );

  view.add(
    <Latex
      ref={x_2}
      tex={['x_2', '=']}
      position={[400, -100]}
      fill="white"
      fontSize={48}
      opacity={0}
    />
  );

  yield* all(
    x_1().opacity(1, 0.5),
    x_2().opacity(1, 0.5),
  );

  yield* waitFor(0.5);
  
  yield* all(
    x_1().tex(['x_1', '=', '\\frac{-b+\\sqrt{b^2-4ac}}{2a}'], 0.5),
    x_2().tex(['x_2', '=', '\\frac{-b-\\sqrt{b^2-4ac}}{2a}'], 0.5),
  );  

  // Animate sum and product formulas

  view.add(
    <Latex
      ref={sumFormula}
      tex={[
        'x_1', '+', 'x_2', '=', 
        '?'
      ]}
      fill="white"
      y={100}
      fontSize={48}
      opacity={0}
    />
  );

  view.add(
    <Latex
      ref={productFormula}
      tex={['{{x_1}}', '{{x_2}}', '=', '?']}
      fill="white"
      y={300}
      fontSize={48}
      opacity={0}
    />
  );

  yield* all(
    sumFormula().opacity(1, 0.5),
    productFormula().opacity(1, 0.5),
  )

  yield* waitFor(0.2);
  
  // sum and product step 1

  yield* all(
    sumFormula().tex([
      '{{x_1}}', '+', '{{x_2}}', '=', '\\frac{',
      '{{-b}}', '+', '{{\\sqrt{b^2 - 4ac}}}', '-',
      '{{b}}', '-', '{{\\sqrt{b^2 - 4ac}}}',
      '}{', '{{2a}}', '}'
    ], 0.5),
    productFormula().tex([
      'x_1', 'x_2', '=', '\\frac{',
      '(-b+\\sqrt{b^2-4ac})(-b-\\sqrt{b^2-4ac})',
      '}{', '4','a^2','}',
    ], 0.5),
  );

  yield* waitFor(0.4);

  // product step 2

  yield* productFormula().tex([
    'x_1', 'x_2', '=', '\\frac{b^2 - (b^2 - 4ac)}{4a^2}',
  ], 0.5);

  yield* waitFor(0.2);

  // sum step 2

  yield* sumFormula().tex(
    ['x_1', '+', 'x_2', '=', '\\frac{', '-2b','}{2a}'], 
    0.5);

  yield* waitFor(0.2);

  // product step 3

  yield* productFormula().tex([
    'x_1', 'x_2', '=', '\\frac{4ac}{4a^2}',
  ], 0.5);

  yield* waitFor(0.4);

  yield* all(
    sumFormula().tex(
    ['x_1', '+', 'x_2', '=', '\\frac{', '-b','}{a}'], 
    1),
    productFormula().tex([
      'x_1', 'x_2', '=', '\\frac{',
      'c', '}{a}'
    ], 1),
  );

  yield* waitFor(1);
  
});
