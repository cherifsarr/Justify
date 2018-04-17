//import { Directive } from '@angular/core';
//
//@Directive({
//  selector: '[ahsAutofocus]'
//})
//export class AutofocusDirective {
//
//  constructor() { }
//
//}


import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
    selector: '[ahsAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
    constructor(private el: ElementRef) {
    }
    ngAfterViewInit() {
        this.el.nativeElement.focus();
    }
}
