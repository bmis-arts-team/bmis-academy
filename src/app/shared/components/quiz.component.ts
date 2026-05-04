import { Component, computed, effect, input, signal } from '@angular/core';
import { NgClass } from '@angular/common';

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

@Component({
  selector: 'app-quiz',
  imports: [NgClass],
  template: `
    <section class="quiz-section">

      <div class="quiz-header">
        <span class="quiz-badge">Quiz</span>
        <span class="quiz-title">{{ title() }}</span>
        @if (submitted()) {
          <span class="quiz-score-badge" [ngClass]="scoreClass()">
            {{ score() }}/{{ questions().length }}
          </span>
        }
      </div>

      @if (submitted()) {
        <div class="quiz-result-bar">
          <div class="quiz-result-fill" [style.width.%]="scorePercent()"></div>
        </div>
        <p class="quiz-result-label">{{ scoreLabel() }}</p>
      }

      <div class="quiz-body">
        @for (q of questions(); track $index; let qi = $index) {
          <div class="quiz-q"
               [ngClass]="{
                 'quiz-q-correct': submitted() && answers()[qi] === q.correct,
                 'quiz-q-wrong':   submitted() && answers()[qi] !== null && answers()[qi] !== q.correct
               }">

            <p class="quiz-q-text">
              <span class="quiz-q-num">{{ qi + 1 }}</span>
              {{ q.q }}
            </p>

            <div class="quiz-options">
              @for (opt of q.options; track $index; let oi = $index) {
                <button class="quiz-opt"
                        [ngClass]="{
                          'quiz-opt-selected':   !submitted() && answers()[qi] === oi,
                          'quiz-opt-correct':    submitted() && oi === q.correct,
                          'quiz-opt-wrong':      submitted() && answers()[qi] === oi && oi !== q.correct,
                          'quiz-opt-unselected': submitted() && answers()[qi] !== oi && oi !== q.correct
                        }"
                        [disabled]="submitted()"
                        (click)="select(qi, oi)">
                  <span class="quiz-opt-key">{{ optLabel(oi) }}</span>
                  <span>{{ opt }}</span>
                  @if (submitted() && oi === q.correct) {
                    <span class="quiz-opt-icon correct">✓</span>
                  }
                  @if (submitted() && answers()[qi] === oi && oi !== q.correct) {
                    <span class="quiz-opt-icon wrong">✗</span>
                  }
                </button>
              }
            </div>

            @if (submitted()) {
              <div class="quiz-explanation">
                <span>💡</span>
                <span>{{ q.explanation }}</span>
              </div>
            }

          </div>
        }
      </div>

      <div class="quiz-footer">
        @if (!submitted()) {
          <button class="quiz-submit" [disabled]="!allAnswered()" (click)="submit()">
            Vérifier mes réponses
            <span class="quiz-counter">{{ answeredCount() }}/{{ questions().length }}</span>
          </button>
        } @else {
          <button class="quiz-retry" (click)="reset()">↺ Recommencer</button>
        }
      </div>

    </section>
  `
})
export class QuizComponent {
  questions = input.required<QuizQuestion[]>();
  title = input('Quiz de validation');

  answers = signal<(number | null)[]>([]);
  submitted = signal(false);

  constructor() {
    effect(() => {
      this.answers.set(this.questions().map(() => null));
      this.submitted.set(false);
    }, { allowSignalWrites: true });
  }

  allAnswered = computed(() => this.answers().every(a => a !== null));
  answeredCount = computed(() => this.answers().filter(a => a !== null).length);

  score = computed(() =>
    this.submitted()
      ? this.questions().filter((q, i) => this.answers()[i] === q.correct).length
      : 0
  );

  scorePercent = computed(() =>
    this.questions().length > 0
      ? Math.round((this.score() / this.questions().length) * 100)
      : 0
  );

  scoreLabel = computed(() => {
    const p = this.scorePercent();
    if (p === 100) return '🏆 Score parfait - architecture maîtrisée !';
    if (p >= 80)   return '✅ Très bien - quelques détails à consolider';
    if (p >= 60)   return '📚 Bonne base - relisez les sections incorrectes';
    return '🔄 À retravailler - relire la leçon et recommencer';
  });

  scoreClass = computed(() => {
    const p = this.scorePercent();
    if (p === 100) return 'score-perfect';
    if (p >= 60)   return 'score-good';
    return 'score-low';
  });

  optLabel(j: number): string {
    return String.fromCharCode(65 + j);
  }

  select(qi: number, oi: number): void {
    if (this.submitted()) return;
    const a = [...this.answers()];
    a[qi] = oi;
    this.answers.set(a);
  }

  submit(): void {
    if (!this.allAnswered()) return;
    this.submitted.set(true);
  }

  reset(): void {
    this.answers.set(this.questions().map(() => null));
    this.submitted.set(false);
  }
}
