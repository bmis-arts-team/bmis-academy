import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../core/models/course.model';
import { IconComponent } from '../../shared/components/icon.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, IconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private courseService = inject(CourseService);
  courses = this.courseService.getCourses();

  totalLessons(course: Course): number {
    return course.sections.reduce((sum, s) => sum + s.lessons.length, 0);
  }
}
