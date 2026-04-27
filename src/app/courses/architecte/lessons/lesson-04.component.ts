import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-04',
  imports: [LessonPageComponent],
  templateUrl: './lesson-04.component.html'
})
export class Lesson04Component {
  data = inject(CourseService).getLessonNav('architecte-backend', 4)!;
}
