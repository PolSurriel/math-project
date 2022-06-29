import { Component } from '@angular/core';
import { FracElement } from './model/Math/FracElement';
import { MathExpression } from './model/Math/MathExpression';
import { MathExpressionElement } from './model/Math/MathExpressionElement';
import { Operation } from './model/Math/Operation';
import { ParenthesisElement } from './model/Math/ParenthesisElement';
import { SQRTElement } from './model/Math/SQRTElement';
import { TestUtils } from './model/test/TestUtils';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  expression : MathExpression = TestUtils.getTestingMathExpression()
  
  constructor() {

    this.expression = MathExpression.generateMathExpression([
      new MathExpressionElement('a'),
      new Operation('+'),
      new MathExpressionElement('b^2'),
      new Operation('·'),
      new ParenthesisElement(MathExpression.generateMathExpression([

        new MathExpressionElement('c'),
        new Operation('+'),
        new SQRTElement(MathExpression.generateMathExpression([
          new MathExpressionElement('x'),
          new Operation('+'),
          new MathExpressionElement('y^2'),
        ])),
      ])),
      new Operation('+'),
      new SQRTElement(MathExpression.generateMathExpression([
        new FracElement(
          MathExpression.generateMathExpression([
            new MathExpressionElement('a'),
            new Operation('+'),
            new MathExpressionElement('b^2'),
            new Operation('·'),
            new MathExpressionElement('c'),
          ]),
          MathExpression.generateMathExpression([
            new MathExpressionElement('a'),
            new Operation('+'),
            new MathExpressionElement('b^2'),
            new Operation('·'),
            new MathExpressionElement('c'),
          ])
        ),
      ])
    ),
    ]);

  }

}
