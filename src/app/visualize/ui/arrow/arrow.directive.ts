import {
  Directive,
  ElementRef,
  OnInit,
  computed,
  inject,
  input,
} from '@angular/core';
import { VisualizerConfig } from '../../../shared/enums/visualizer';

@Directive({
  selector: '[nodeArrow]',
  standalone: true,
})
export class ArrowDirective implements OnInit {
  el = inject(ElementRef);

  toValue = input<string>();
  toX = input.required<number>();
  toY = input.required<number>();
  fromX = input.required<number>();
  fromY = input.required<number>();

  dx = computed(() => this.toX() - this.fromX());
  dy = computed(() => this.toY() - this.fromY());

  isLeftArrow = computed(() => (this.dx() < 0 ? true : false));
  isStraightLine = computed(() => (this.dx() === 0 ? true : false));

  nodeRadius = VisualizerConfig.NODE_RADIUS as number;
  gap = VisualizerConfig.ARROW_GAP + this.nodeRadius;
  cornerRadius = VisualizerConfig.ARROW_CORNER_RADIUS as number;

  startPoint = computed(() => `M${this.fromX()},${this.fromY() + this.gap}`);
  firstVerticalLine = computed(
    () => `V${this.fromY() + this.dy() / 2 - this.cornerRadius}`
  );
  firstArc = computed(
    () =>
      `A${this.cornerRadius},${this.cornerRadius} 0 0 ${
        this.isLeftArrow() ? 1 : 0
      } ${
        this.fromX() +
        (this.isLeftArrow() ? -this.cornerRadius : this.cornerRadius)
      },${this.fromY() + this.dy() / 2}`
  );
  horizontalLine = computed(
    () =>
      `H${
        this.toX() +
        (this.isLeftArrow() ? this.cornerRadius : -this.cornerRadius)
      }`
  );
  secondArc = computed(
    () =>
      `A${this.cornerRadius},${this.cornerRadius} 0 0 ${
        this.isLeftArrow() ? 0 : 1
      } ${this.toX()},${this.fromY() + this.dy() / 2 + this.cornerRadius}`
  );
  endPoint = computed(() => `V${this.toY() - this.gap}`);

  ngOnInit() {
    this.el.nativeElement.setAttribute(
      'd',
      `${this.startPoint()} 
      ${!this.isStraightLine() ? this.firstVerticalLine() : ''} 
      ${!this.isStraightLine() ? this.firstArc() : ''} 
      ${!this.isStraightLine() ? this.horizontalLine() : ''} 
      ${!this.isStraightLine() ? this.secondArc() : ''} 
      ${this.endPoint()}`
    );
    this.el.nativeElement.setAttribute('fill', 'transparent');
    this.el.nativeElement.setAttribute('stroke', VisualizerConfig.ARROW_COLOR);
    this.el.nativeElement.setAttribute('stroke-width', '2');
    this.el.nativeElement.setAttribute('marker-end', 'url(#arrow)');
    this.el.nativeElement.setAttribute('to-value', this.toValue());
  }
}
