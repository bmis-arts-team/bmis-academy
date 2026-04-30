import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-05',
  imports: [LessonPageComponent],
  templateUrl: './lesson-05.component.html'
})
export class Lesson05Component {
  data = inject(CourseService).getLessonNav('devops', 5)!;
}
