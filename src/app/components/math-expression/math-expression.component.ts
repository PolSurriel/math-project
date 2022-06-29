import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MathExpression } from 'src/app/model/Math/MathExpression';
import { MathExpressionElement } from 'src/app/model/Math/MathExpressionElement';
import { MathExpressionInputHandler } from 'src/app/model/Math/MathExpressionInputHandler';
import { Operation } from 'src/app/model/Math/Operation';
import { ParenthesisElement } from 'src/app/model/Math/ParenthesisElement';
import { Separator } from 'src/app/model/Math/Separator';
import { SQRTElement } from 'src/app/model/Math/SQRTElement';
import { FracElement } from '../../model/Math/FracElement';

@Component({
  selector: 'math-expression',
  templateUrl: './math-expression.component.html',
  styleUrls: ['./math-expression.component.css']
})
export class MathExpressionComponent implements OnInit {

  @Input() expression : MathExpression
  @Input() isRoot : boolean = false
  @Input() root : MathExpressionComponent;

  @ViewChild('freespaceContainer') freespaceContainer : ElementRef; 
  
  public input : MathExpressionInputHandler =  new MathExpressionInputHandler(this);
  lastClosestSeparator : Separator;

  constructor() { }

  ngOnInit() {
    if(this.isRoot){
      this.root = this;

    }else {
      this.input = this.root.input;
    }

  }

  ngAfterViewInit(){
    for(var sep of this.expression.separators){
      sep.htmlElement = document.getElementById(sep.htmlID);
    }
  }
  

  // NG UTILS

  public extractSQRTExpression(element :MathExpressionElement):MathExpression{
    return (element as SQRTElement).expression;
  }

  public extractParenthesisExpression(element :MathExpressionElement):MathExpression{
    return (element as ParenthesisElement).expression;
  }

  public isSQRT(element : MathExpressionElement):boolean{
    return element instanceof SQRTElement; 
  }

  public isParenthesis(element : MathExpressionElement):boolean{
    return element instanceof ParenthesisElement; 
  }

  public extractFracNominator(element :MathExpressionElement):MathExpression{
    return (element as FracElement).nominator;
  }

  public extractFracDenominator(element :MathExpressionElement):MathExpression{
    return (element as FracElement).denominator;
  }

  public isFrac(element : MathExpressionElement):boolean{
    return element instanceof FracElement; 
  }

  public isSeparator(element:MathExpressionElement):boolean{
    return element instanceof Separator;
  }


  // INPUT AND EVENTS

  private onPressed(element : MathExpressionElement, htmlElement){

    if(!element.isGrabbable)
      return;
    
    
    this.root.freespaceContainer.nativeElement.innerHTML = htmlElement.innerHTML;
    htmlElement.style.opacity = '0.5'
    this.root.input.draggedElement = htmlElement
    this.root.input.draggedMathElement = element
    this.root.input.draggingElement = true
    this.updateFreeContainerPosition();
  }
  
  public onReleased(){
    if(this.root.input.draggingElement){
      this.cleanDragSeparator();
      this.root.input.draggedElement.style.opacity = '1';
      this.root.freespaceContainer.nativeElement.innerHTML = ''
      this.root.input.draggingElement = false;
    }

  }
  
  private updateFreeContainerPosition(){

    this.root.freespaceContainer.nativeElement.style.left = (this.root.input.x - this.root.input.deltaToClickedElement.x)+'px';
    this.root.freespaceContainer.nativeElement.style.top = (this.root.input.y- this.root.input.deltaToClickedElement.y)+'px';    
  }

  private getElementPos(element:HTMLElement){
    var elementBounds = element.getBoundingClientRect();
    return {x: elementBounds.left + elementBounds.width*0.5, y:elementBounds.top + elementBounds.height*0.5};
  }

  private inputDistTo(p1){
    let xdist = p1.x - this.root.input.x;
    let ydist = p1.y - this.root.input.y;
    let dist = Math.sqrt(xdist*xdist + ydist*ydist);
    return dist;
  }

  private getClosestSeparator() : Separator{

    let closest : Separator = null;
    let closestDist : number = Number.MAX_VALUE;
    for (var sep of this.expression.separators) {
      sep.htmlElement.style.width = "0px";
      let pos = this.getElementPos(sep.htmlElement);
      let dist = this.root.inputDistTo(pos);

      if(dist < closestDist && dist < this.separatorMinDist){
        closest = sep;
        closestDist = dist;
      }
    }

    return closest;
  }


 
  
  private separatorMinDist : number = 30; 

  private cleanDragSeparator(){
    if(this.lastClosestSeparator){
      this.lastClosestSeparator.htmlElement.style.width = "0px";
      this.lastClosestSeparator.katex = '';
    }
  }

  
  private updateClosesSeparator(){
    
    let sep = this.getClosestSeparator();
    if(sep == null){
      this.cleanDragSeparator();
      return;
    }
    
    sep.htmlElement.style.width = (this.root.input.draggedElement.getBoundingClientRect().width + 20)+"px";
    if(sep.left instanceof Operation || sep.left === null || sep.left === undefined){
      sep.katex = this.root.input.draggedMathElement.katex+ "+";

    }else {
      sep.katex = "+" + this.root.input.draggedMathElement.katex;

    }
    
    if(sep != this.lastClosestSeparator && this.lastClosestSeparator){
      this.cleanDragSeparator();
    }
    this.lastClosestSeparator = sep;
  }

  public onInputMoves(){
    if(this.root.input.draggingElement){
      this.updateFreeContainerPosition();
      this.updateClosesSeparator();
    }
    
  }


  public onPressedEventHandler(event, element) : void{
    if(this.root.input.pressed === true || this.root.input.ignoreMouseDown && event instanceof MouseEvent)
      return;

    if(event instanceof TouchEvent){
      this.root.input.ignoreMouseDown = true
    }
    this.root.input.pressed = true;
    
    var elementBounds = event.currentTarget.parentElement.getBoundingClientRect();

    if(event instanceof MouseEvent){
      this.root.input.x = event.clientX;
      this.root.input.y = event.clientY;
      
    }else {
      this.root.input.x = event.touches[0].clientX;
      this.root.input.y = event.touches[0].clientY;
    }

    this.root.input.deltaToClickedElement.x = this.root.input.x - elementBounds.left;
    this.root.input.deltaToClickedElement.y = this.root.input.y - elementBounds.top;
    this.onPressed(element, event.currentTarget.parentElement)
  }
  

  @HostListener('document:mouseup', ['$event'])
  globalOnMouseUp(event) { this.root.input.globalOnMouseUp(event) }
  
  @HostListener('document:touchend', ['$event'])
  globalOnTouchEnd(event) { this.root.input.globalOnTouchEnd(event) }

  @HostListener('document:mousemove', ['$event'])
  globalOnMouseMove(event) { this.root.input.globalOnMouseMove(event) }
  
  @HostListener('document:touchmove', ['$event'])
  globalOnTouchMove(event) { this.root.input.globalOnTouchMove(event) }

}
