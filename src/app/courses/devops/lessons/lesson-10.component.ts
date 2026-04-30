import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { CourseService } from '../../../core/services/course.service';
@Component({ selector: 'app-lesson-10', imports: [LessonPageComponent], templateUrl: './lesson-10.component.html', interpolation: ['[[', ']]'] })
export class Lesson10Component { data = inject(CourseService).getLessonNav('devops', 10)!; }
