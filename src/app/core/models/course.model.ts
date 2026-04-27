export interface Course {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  sections: CourseSection[];
}

export interface CourseSection {
  title: string;
  icon: string;
  lessons: LessonMeta[];
}

export interface LessonMeta {
  number: number;
  title: string;
  subtitle: string;
  route: string;
}

export interface LessonNav {
  lesson: LessonMeta;
  section: string;
  prev?: LessonLink;
  next?: LessonLink;
}

export interface LessonLink {
  title: string;
  route: string;
}
