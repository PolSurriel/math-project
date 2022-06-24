import { Component, Input, OnInit } from '@angular/core';
import { MathExpression } from '../../model/Math/MathExpression';

@Component({
  selector: 'frac-expression',
  templateUrl: './frac-expression.component.html',
  styleUrls: ['./frac-expression.component.css']
})
export class FracExpressionComponent implements OnInit {

  @Input() nominator : MathExpression
  @Input() denominator : MathExpression

  constructor() { }

  ngOnInit() {
  }

}
