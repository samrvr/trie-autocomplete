import { Component, input } from '@angular/core';
import { VisualizerConfig } from '../../../shared/enums/visualizer';

@Component({
  selector: '[node-circle]',
  standalone: true,
  imports: [],
  templateUrl: './node.component.html',
  styleUrl: './node.component.scss',
})
export class NodeComponent {
  x = input.required<string>();
  y = input.required<string>();
  radius = VisualizerConfig.NODE_RADIUS;
}
