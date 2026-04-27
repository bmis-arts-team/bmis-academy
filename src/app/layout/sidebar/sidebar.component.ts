import { Component, inject, input, output, signal, OnInit, DestroyRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CourseService } from '../../core/services/course.service';
import { IconComponent } from '../../shared/components/icon.component';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  open = input(false);
  closed = output();

  private router = inject(Router);
  private courseService = inject(CourseService);
  private destroyRef = inject(DestroyRef);

  courses = this.courseService.getCourses();
  expandedCourses = signal<Set<string>>(new Set());
  expandedSections = signal<Set<string>>(new Set());

  ngOnInit(): void {
    this.updateExpansion(this.router.url);
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((e) => {
      this.updateExpansion((e as NavigationEnd).urlAfterRedirects);
    });
  }

  toggleCourse(id: string): void {
    this.expandedCourses.update(set => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  toggleSection(key: string): void {
    this.expandedSections.update(set => {
      const next = new Set(set);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  isCourseExpanded(id: string): boolean {
    return this.expandedCourses().has(id);
  }

  isSectionExpanded(key: string): boolean {
    return this.expandedSections().has(key);
  }

  onNavigate(): void {
    this.closed.emit();
  }

  private updateExpansion(url: string): void {
    for (const course of this.courses) {
      if (url.includes(`/courses/${course.id}`)) {
        this.expandedCourses.update(s => new Set([...s, course.id]));
        const match = url.match(/\/courses\/[\w-]+\/(\d+)/);
        if (match) {
          const num = parseInt(match[1], 10);
          for (const section of course.sections) {
            if (section.lessons.some(l => l.number === num)) {
              this.expandedSections.update(s => new Set([...s, `${course.id}:${section.title}`]));
            }
          }
        } else {
          // On course landing, expand all sections
          for (const section of course.sections) {
            this.expandedSections.update(s => new Set([...s, `${course.id}:${section.title}`]));
          }
        }
      }
    }
  }
}
