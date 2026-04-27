import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-02',
  imports: [LessonPageComponent],
  templateUrl: './lesson-02.component.html'
})
export class Lesson02Component {
  data = inject(CourseService).getLessonNav('devops', 2)!;
}
