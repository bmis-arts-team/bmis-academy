import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { CourseService } from '../../../core/services/course.service';
@Component({ selector: 'app-lesson-12', imports: [LessonPageComponent], templateUrl: './lesson-12.component.html' })
export class Lesson12Component { data = inject(CourseService).getLessonNav('devops', 12)!; }
