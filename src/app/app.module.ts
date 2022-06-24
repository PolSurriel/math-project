import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { KatexComponent, KatexModule } from 'ng-katex';
import { MathExpressionComponent } from './components/math-expression/math-expression.component';

import { AppComponent } from './app.component';
import { SqrtExpressionComponent } from './components/sqrt-expression/sqrt-expression.component';


@NgModule({
  declarations: [AppComponent, MathExpressionComponent, SqrtExpressionComponent],
  imports: [BrowserModule, IonicModule.forRoot(), KatexModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
