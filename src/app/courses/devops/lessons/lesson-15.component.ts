import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { CourseService } from '../../../core/services/course.service';
@Component({ selector: 'app-lesson-15', imports: [LessonPageComponent], templateUrl: './lesson-15.component.html' })
export class Lesson15Component { data = inject(CourseService).getLessonNav('devops', 15)!; }
