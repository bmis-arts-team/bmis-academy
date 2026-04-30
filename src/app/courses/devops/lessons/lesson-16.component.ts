import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { OsTabsComponent } from '../../../shared/components/os-tabs.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-16',
  imports: [LessonPageComponent, OsTabsComponent],
  templateUrl: './lesson-16.component.html'
})
export class Lesson16Component {
  data = inject(CourseService).getLessonNav('devops', 16)!;
}
