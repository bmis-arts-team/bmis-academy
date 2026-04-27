import { Directive, ElementRef, AfterViewInit, inject } from '@angular/core';
import { HighlightService } from '../../core/services/highlight.service';

@Directive({ selector: '[appHighlight]' })
export class HighlightDirective implements AfterViewInit {
  private el = inject(ElementRef);
  private hl = inject(HighlightService);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.hl.highlightAll(this.el.nativeElement);
      this.hl.addCopyButtons(this.el.nativeElement);
    });
  }
}
