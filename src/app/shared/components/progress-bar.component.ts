import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: `<div class="progress-bar" [style.width.%]="progress()"></div>`,
  styles: [`
    .progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--color-accent), #3b82f6);
      z-index: 200;
      transition: width 0.1s linear;
    }
  `]
})
export class ProgressBarComponent {
  progress = signal(0);

  @HostListener('window:scroll')
  onScroll(): void {
    const h = document.documentElement;
    const scrollTop = h.scrollTop || document.body.scrollTop;
    const scrollHeight = h.scrollHeight - h.clientHeight;
    this.progress.set(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
  }
}
