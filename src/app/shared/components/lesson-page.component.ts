import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { LessonNav } from '../../core/models/course.model';
import { HighlightDirective } from '../directives/highlight.directive';

@Component({
  selector: 'app-lesson-page',
  imports: [RouterLink, HighlightDirective, DecimalPipe],
  template: `
    @let d = data();
    @if (d) {
      <div class="lesson-header">
        <div class="lesson-meta">
          <span class="lesson-number">Leçon {{ d.lesson.number | number:'2.0-0' }}</span>
          <span>{{ d.section }}</span>
        </div>
        <h1>{{ d.lesson.title }}</h1>
        <p class="lesson-subtitle">{{ d.lesson.subtitle }}</p>
      </div>

      <div class="lesson-body" appHighlight>
        <ng-content />
      </div>

      <div class="lesson-nav">
        @if (d.prev) {
          <a [routerLink]="d.prev.route">
            <span class="nav-dir">← Leçon précédente</span>
            <span class="nav-title">{{ d.prev.title }}</span>
          </a>
        }
        @if (d.next) {
          <a [routerLink]="d.next.route" class="nav-next">
            <span class="nav-dir">Leçon suivante →</span>
            <span class="nav-title">{{ d.next.title }}</span>
          </a>
        }
      </div>
    }
  `
})
export class LessonPageComponent {
  data = input.required<LessonNav>();
}
