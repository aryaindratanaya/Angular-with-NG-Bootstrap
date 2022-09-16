import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() appHighlight!: string;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    highlight(this.appHighlight, this.el);
  }

  @HostListener('mouseleave') onMouseLeave() {
    highlight('unset', this.el);
  }
}

function highlight(color: string, el: ElementRef) {
  el.nativeElement.style.backgroundColor = color;
}
