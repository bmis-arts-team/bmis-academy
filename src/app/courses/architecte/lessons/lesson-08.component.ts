import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-08',
  imports: [LessonPageComponent],
  templateUrl: './lesson-08.component.html'
})
export class Lesson08Component {
  data = inject(CourseService).getLessonNav('architecte-backend', 8)!;
}
