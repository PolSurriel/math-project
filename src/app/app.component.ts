import { Component } from '@angular/core';
import { MathExpression } from './model/Math/MathExpression';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  expression : MathExpression = MathExpression.getTestingMathExpression()
}
