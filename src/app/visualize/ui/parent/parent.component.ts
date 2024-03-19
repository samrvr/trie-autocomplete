import {
  Component,
  ElementRef,
  OnInit,
  computed,
  inject,
  input,
  viewChild,
  viewChildren,
} from '@angular/core';
import { TrieNode } from '../../../shared/models/trieObj';
import { NodeComponent } from '../node/node.component';
import { VisualizerConfig } from '../../../shared/enums/visualizer';
import { CommonModule } from '@angular/common';
import { ArrowDirective } from '../../ui/arrow/arrow.directive';
import { TrieService } from '../../../shared/services/trie.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import {} from 'ngx-panzoom';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [NodeComponent, CommonModule, ArrowDirective, MatTooltipModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent implements OnInit {
  gEl = viewChild<ElementRef>('nodeEl');
  arrowEls = viewChildren<ElementRef<SVGGElement>>('arrowEl');
  childComps = viewChildren<ParentComponent>('childEl');
  trie = inject(TrieService).nameTrie;

  node = input.required<TrieNode>();
  prefix = input.required<string>();
  x = input.required<number>();
  y = input.required<number>();

  parent = input.required<ParentComponent | null>();

  comp = this;

  nodeRadius = VisualizerConfig.NODE_RADIUS as number;
  nodeColor = computed(() =>
    this.node().word
      ? VisualizerConfig.WORD_NODE_COLOR
      : VisualizerConfig.NODE_COLOR
  );
  svgPadding = VisualizerConfig.SVG_PADDING as number;
  nodeGap = VisualizerConfig.NODE_GAP as number;
  nodeTextColor = VisualizerConfig.NODE_TEXT_COLOR;
  wordTextColor = VisualizerConfig.WORD_NODE_TEXT_COLOR;

  svgFullPadding = this.svgPadding + this.nodeRadius;

  svgX = computed(() => this.x() * this.nodeGap + this.svgFullPadding);
  svgY = computed(() => this.y() * this.nodeGap + this.svgFullPadding);

  el = inject(ElementRef);

  ngOnInit() {
    let nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement!;
    // get all children and move them out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);

    console.log(this.getChildX(this.node()));
  }

  getChildrenAmount(node: TrieNode) {
    return Object.keys(node.children).length;
  }

  getChildX(node: TrieNode) {
    return this.trie()
      .getNodesAtLevel(this.y() + 1)
      .findIndex((n) => n === node);
  }

  highlightBranch(component: ParentComponent, caller?: ParentComponent) {
    let nativeElement: HTMLElement = component.gEl()?.nativeElement;
    nativeElement.classList.add('highlight');

    if (component !== this) {
      let nativeArrowElements: SVGGElement[] = component
        .arrowEls()
        .map((el) => el.nativeElement);
      nativeArrowElements.forEach((el) => {
        let path = el.querySelector('path');
        if (path?.getAttribute('to-value') === caller?.node().value) {
          let parent = el.ownerSVGElement;
          parent?.removeChild(el);
          let pathWrapper = parent?.appendChild(el);
          pathWrapper?.classList.add('highlight');
          path?.setAttribute('marker-end', 'url(#highlight-arrow)');
        }
      });
    }

    if (component?.parent()) {
      this.highlightBranch(component.parent()!, component);
    }
  }

  unhighlightBranch(component: ParentComponent) {
    let nativeElement: HTMLElement = component.gEl()?.nativeElement;
    nativeElement.classList.remove('highlight');

    let nativeArrowElements: SVGGElement[] = component
      .arrowEls()
      .map((el) => el.nativeElement);
    nativeArrowElements.forEach((el) => {
      el.classList.remove('highlight');
      el.querySelector('path')?.setAttribute('marker-end', 'url(#arrow)');
    });

    if (component?.parent()) {
      this.unhighlightBranch(component.parent()!);
    }
  }

  lowlightBranch(component: ParentComponent) {
    let nativeElements: HTMLElement[] = component
      .childComps()
      .map((component) => component.gEl()?.nativeElement);
    nativeElements.forEach((el) => el.classList.add('lowlight'));
    let nativeArrowElements: SVGGElement[] = component
      .arrowEls()
      .map((el) => el.nativeElement);
    nativeArrowElements.forEach((el) => {
      let parent = el.ownerSVGElement;
      parent?.removeChild(el);
      let pathWrapper = parent?.appendChild(el);
      pathWrapper?.classList.add('lowlight');
      pathWrapper
        ?.querySelector('path')
        ?.setAttribute('marker-end', 'url(#lowlight-arrow)');
    });
    component.childComps().forEach((comp) => this.lowlightBranch(comp));
  }

  unlowlightBranch(component: ParentComponent) {
    let nativeElements: HTMLElement[] = component
      .childComps()
      .map((component) => component.gEl()?.nativeElement);
    nativeElements.forEach((el) => el.classList.remove('lowlight'));

    let nativeArrowElements: SVGGElement[] = component
      .arrowEls()
      .map((el) => el.nativeElement);
    nativeArrowElements.forEach((el) => {
      el.classList.remove('lowlight');
      el.querySelector('path')?.setAttribute('marker-end', 'url(#arrow)');
    });

    component.childComps().forEach((comp) => this.unlowlightBranch(comp));
  }

  onEnter() {
    console.log('enter');
    this.highlightBranch(this);
    this.lowlightBranch(this);
  }

  onLeave() {
    this.unhighlightBranch(this);
    this.unlowlightBranch(this);
  }
}
