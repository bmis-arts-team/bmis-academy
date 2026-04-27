import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { CourseService } from '../../../core/services/course.service';
@Component({ selector: 'app-lesson-11', imports: [LessonPageComponent], templateUrl: './lesson-11.component.html' })
export class Lesson11Component { data = inject(CourseService).getLessonNav('devops', 11)!; }
