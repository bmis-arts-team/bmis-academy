import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-03',
  imports: [LessonPageComponent],
  templateUrl: './lesson-03.component.html'
})
export class Lesson03Component {
  data = inject(CourseService).getLessonNav('architecte-backend', 3)!;
}
