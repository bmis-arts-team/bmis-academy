import { Injectable } from '@angular/core';
import { Course, LessonNav } from '../models/course.model';
import { DEVOPS_COURSE } from '../../courses/devops/devops-data';
import { ARCHITECTE_COURSE } from '../../courses/architecte/architecte-data';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly courses: Course[] = [DEVOPS_COURSE, ARCHITECTE_COURSE];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourse(id: string): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  getLessonNav(courseId: string, lessonNumber: number): LessonNav | undefined {
    const course = this.getCourse(courseId);
    if (!course) return undefined;

    const allLessons = course.sections.flatMap(s =>
      s.lessons.map(l => ({ ...l, section: s.title }))
    );
    const idx = allLessons.findIndex(l => l.number === lessonNumber);
    if (idx === -1) return undefined;

    const current = allLessons[idx];
    return {
      lesson: current,
      section: current.section,
      prev: idx > 0
        ? { title: allLessons[idx - 1].title, route: `../${allLessons[idx - 1].route}` }
        : undefined,
      next: idx < allLessons.length - 1
        ? { title: allLessons[idx + 1].title, route: `../${allLessons[idx + 1].route}` }
        : undefined,
    };
  }

  getTotalLessons(courseId: string): number {
    const course = this.getCourse(courseId);
    return course ? course.sections.reduce((sum, s) => sum + s.lessons.length, 0) : 0;
  }
}
