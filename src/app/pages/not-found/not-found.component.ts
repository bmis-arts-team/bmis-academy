import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <h1>404</h1>
      <p>Cette page n'existe pas.</p>
      <a routerLink="/">Retour à l'accueil</a>
    </div>
  `,
  styles: [`
    .not-found {
      text-align: center;
      padding: 4rem 1rem;
      h1 { font-size: 5rem; color: var(--color-accent); margin-bottom: 0.5rem; }
      p { font-size: 1.2rem; color: var(--color-text-light); margin-bottom: 2rem; }
      a {
        display: inline-block;
        padding: 0.6rem 1.5rem;
        background: var(--color-accent);
        color: #fff;
        border-radius: 6px;
        text-decoration: none;
        font-family: var(--font-ui);
        font-weight: 500;
        &:hover { background: var(--color-accent-hover); }
      }
    }
  `]
})
export class NotFoundComponent {}
