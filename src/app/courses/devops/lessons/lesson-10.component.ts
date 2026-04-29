import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { OsTabsComponent } from '../../../shared/components/os-tabs.component';
import { CourseService } from '../../../core/services/course.service';
@Component({ selector: 'app-lesson-10', imports: [LessonPageComponent, OsTabsComponent], templateUrl: './lesson-10.component.html' })
export class Lesson10Component { data = inject(CourseService).getLessonNav('devops', 10)!; }
