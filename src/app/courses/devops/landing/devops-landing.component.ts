import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course.model';
import { IconComponent } from '../../../shared/components/icon.component';

@Component({
  selector: 'app-devops-landing',
  imports: [RouterLink, IconComponent],
  templateUrl: './devops-landing.component.html',
  styleUrl: './devops-landing.component.scss'
})
export class DevOpsLandingComponent {
  course: Course = inject(CourseService).getCourse('devops')!;

  totalLessons(): number {
    return this.course.sections.reduce((sum, s) => sum + s.lessons.length, 0);
  }
}
