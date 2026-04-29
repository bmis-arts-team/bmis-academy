import { Routes } from '@angular/router';

export const ARCHITECTE_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./landing/architecte-landing.component').then(m => m.ArchitecteLandingComponent) },
  { path: 'prerequis-et-introduction', loadComponent: () => import('./lessons/lesson-01.component').then(m => m.Lesson01Component) },
  { path: 'backend-solide-et-maintenable', loadComponent: () => import('./lessons/lesson-02.component').then(m => m.Lesson02Component) },
  { path: 'projet-fil-rouge-taskflow', loadComponent: () => import('./lessons/lesson-03.component').then(m => m.Lesson03Component) },
  { path: 'architectures-distribuees', loadComponent: () => import('./lessons/lesson-04.component').then(m => m.Lesson04Component) },
  { path: 'devops-cloud-et-observabilite', loadComponent: () => import('./lessons/lesson-05.component').then(m => m.Lesson05Component) },
  { path: 'scalabilite-et-patterns-avances', loadComponent: () => import('./lessons/lesson-06.component').then(m => m.Lesson06Component) },
  { path: 'cahier-pratique-final', loadComponent: () => import('./lessons/lesson-07.component').then(m => m.Lesson07Component) },
  { path: 'glossaire-technique', loadComponent: () => import('./lessons/lesson-08.component').then(m => m.Lesson08Component) },
];
