import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-01',
  imports: [LessonPageComponent],
  templateUrl: './lesson-01.component.html'
})
export class Lesson01Component {
  data = inject(CourseService).getLessonNav('architecte-backend', 1)!;
}
