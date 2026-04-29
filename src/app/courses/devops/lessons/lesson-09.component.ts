import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { CourseService } from '../../../core/services/course.service';
@Component({ selector: 'app-lesson-09', imports: [LessonPageComponent], templateUrl: './lesson-09.component.html', interpolation: ['[[', ']]'] })
export class Lesson09Component { data = inject(CourseService).getLessonNav('devops', 9)!; }
