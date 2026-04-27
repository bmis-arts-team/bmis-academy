import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { CourseService } from '../../../core/services/course.service';
@Component({ selector: 'app-lesson-13', imports: [LessonPageComponent], templateUrl: './lesson-13.component.html' })
export class Lesson13Component { data = inject(CourseService).getLessonNav('devops', 13)!; }
