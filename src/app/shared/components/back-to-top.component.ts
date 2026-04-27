import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  template: `
    @if (visible()) {
      <button class="back-to-top" (click)="scrollTop()" aria-label="Retour en haut">↑</button>
    }
  `,
  styles: [`
    .back-to-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--color-accent);
      color: #fff;
      border: none;
      font-size: 1.1rem;
      cursor: pointer;
      z-index: 80;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover { background: var(--color-accent-hover); transform: translateY(-2px); }
    }
  `]
})
export class BackToTopComponent {
  visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.visible.set(window.scrollY > 400);
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
