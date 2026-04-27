import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-06',
  imports: [LessonPageComponent],
  templateUrl: './lesson-06.component.html'
})
export class Lesson06Component {
  data = inject(CourseService).getLessonNav('architecte-backend', 6)!;
}
