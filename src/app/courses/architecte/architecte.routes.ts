import { Routes } from '@angular/router';

export const ARCHITECTE_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./landing/architecte-landing.component').then(m => m.ArchitecteLandingComponent) },
  { path: '01', loadComponent: () => import('./lessons/lesson-01.component').then(m => m.Lesson01Component) },
  { path: '02', loadComponent: () => import('./lessons/lesson-02.component').then(m => m.Lesson02Component) },
  { path: '03', loadComponent: () => import('./lessons/lesson-03.component').then(m => m.Lesson03Component) },
  { path: '04', loadComponent: () => import('./lessons/lesson-04.component').then(m => m.Lesson04Component) },
  { path: '05', loadComponent: () => import('./lessons/lesson-05.component').then(m => m.Lesson05Component) },
  { path: '06', loadComponent: () => import('./lessons/lesson-06.component').then(m => m.Lesson06Component) },
  { path: '07', loadComponent: () => import('./lessons/lesson-07.component').then(m => m.Lesson07Component) },
  { path: '08', loadComponent: () => import('./lessons/lesson-08.component').then(m => m.Lesson08Component) },
];
