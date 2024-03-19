import { Component, computed, inject } from '@angular/core';
import { NodeComponent } from './ui/node/node.component';
import { ParentComponent } from './ui/parent/parent.component';
import { TrieService } from '../shared/services/trie.service';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { VisualizerConfig } from '../shared/enums/visualizer';
import { TrieNode } from '../shared/models/trieObj';
import { PanZoomComponent, PanZoomConfig } from 'ngx-panzoom';

@Component({
  selector: 'app-visualize',
  standalone: true,
  imports: [NodeComponent, ParentComponent, CommonModule, PanZoomComponent],
  templateUrl: './visualize.component.html',
  styleUrl: './visualize.component.scss',
})
export class VisualizeComponent {
  trieService = inject(TrieService);

  trie = this.trieService.nameTrie;

  nodeRadius = VisualizerConfig.NODE_RADIUS as number;
  svgPadding = VisualizerConfig.SVG_PADDING as number;

  svgFullPadding = this.svgPadding + this.nodeRadius;

  arrowColor = VisualizerConfig.ARROW_COLOR;
  lowArrowColor = VisualizerConfig.LOW_ARROW_COLOR;
  highArrowColor = VisualizerConfig.HIGH_ARROW_COLOR;

  svgHeight = computed(
    () =>
      (this.trie().depth - 1) * VisualizerConfig.NODE_GAP +
      this.svgFullPadding * 2
  );

  svgWidth = computed(
    () =>
      (this.trie().maxNodeWidth - 1) * VisualizerConfig.NODE_GAP +
      this.svgFullPadding * 2
  );

  panZoomConfig = new PanZoomConfig({
    zoomLevels: 6,
    neutralZoomLevel: 3,
    initialZoomLevel: 3,
    scalePerZoomLevel: 1.5,
    freeMouseWheel: false,
    invertMouseWheel: true,
  });
}
