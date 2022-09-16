import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @Input('appTooltip') tooltipTitle!: string;
  @Input() placement!: 'top' | 'bottom' | 'left' | 'right';
  @Input() delay!: number;
  @Input() offset!: number;
  tooltip!: HTMLElement | null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) {
      this.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) {
      this.hide();
    }
  }

  show() {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
  }

  hide() {
    this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
    this.renderer.removeChild(document.body, this.tooltip);
    this.tooltip = null;
  }

  create() {
    this.tooltip = this.renderer.createElement('span');

    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(this.tooltipTitle) // textNode
    );

    this.renderer.appendChild(document.body, this.tooltip);
    // this.renderer.appendChild(this.el.nativeElement, this.tooltip);

    this.renderer.addClass(this.tooltip, 'ng-tooltip');
    this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);

    // delay setting
    this.renderer.setStyle(
      this.tooltip,
      '-webkit-transition',
      `opacity ${String(this.delay)}ms`
    );
    this.renderer.setStyle(
      this.tooltip,
      '-moz-transition',
      `opacity ${String(this.delay)}ms`
    );
    this.renderer.setStyle(
      this.tooltip,
      '-o-transition',
      `opacity ${String(this.delay)}ms`
    );
    this.renderer.setStyle(
      this.tooltip,
      'transition',
      `opacity ${String(this.delay)}ms`
    );
  }

  setPosition() {
    // Host element size and position information
    const hostPos = this.el.nativeElement.getBoundingClientRect();

    // Tooltip element size and position information
    const tooltipPos = this.tooltip!.getBoundingClientRect();

    // scroll to the top of window
    // The getBoundingClientRect method returns the relative position in the viewport.
    // When scrolling occurs, the vertical scroll coordinate value should be reflected on the top of the tooltip element.
    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    let top, left;

    if (this.placement === 'top') {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'bottom') {
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'left') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (this.placement === 'right') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }

    // When scrolling occurs, the vertical scroll coordinate value should be reflected on the top of the tooltip element.
    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
}
