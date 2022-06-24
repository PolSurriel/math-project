import { Component, Input, OnInit } from '@angular/core';
import { MathExpression } from 'src/app/model/Math/MathExpression';

@Component({
  selector: 'sqrt-expression',
  templateUrl: './sqrt-expression.component.html',
  styleUrls: ['./sqrt-expression.component.css']
})
export class SqrtExpressionComponent implements OnInit {

  @Input() expression : MathExpression;

  constructor() { }

  ngOnInit() {
  }

}
