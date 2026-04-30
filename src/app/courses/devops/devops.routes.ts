import { Routes } from '@angular/router';

export const DEVOPS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./landing/devops-landing.component').then(m => m.DevOpsLandingComponent) },
  { path: 'images-et-containers', loadComponent: () => import('./lessons/lesson-01.component').then(m => m.Lesson01Component) },
  { path: 'volumes-et-networking', loadComponent: () => import('./lessons/lesson-02.component').then(m => m.Lesson02Component) },
  { path: 'environnement-et-outils', loadComponent: () => import('./lessons/lesson-03.component').then(m => m.Lesson03Component) },
  { path: 'architecture-kubernetes', loadComponent: () => import('./lessons/lesson-04.component').then(m => m.Lesson04Component) },
  { path: 'workloads', loadComponent: () => import('./lessons/lesson-05.component').then(m => m.Lesson05Component) },
  { path: 'services-et-ingress', loadComponent: () => import('./lessons/lesson-06.component').then(m => m.Lesson06Component) },
  { path: 'configmaps-et-secrets', loadComponent: () => import('./lessons/lesson-07.component').then(m => m.Lesson07Component) },
  { path: 'storage-et-namespaces', loadComponent: () => import('./lessons/lesson-08.component').then(m => m.Lesson08Component) },
  { path: 'deployer-un-systeme-complet', loadComponent: () => import('./lessons/lesson-09.component').then(m => m.Lesson09Component) },
  { path: 'cicd-github-actions', loadComponent: () => import('./lessons/lesson-10.component').then(m => m.Lesson10Component) },
  { path: 'metriques-prometheus-grafana', loadComponent: () => import('./lessons/lesson-11.component').then(m => m.Lesson11Component) },
  { path: 'logging-et-alerting-elk', loadComponent: () => import('./lessons/lesson-12.component').then(m => m.Lesson12Component) },
  { path: 'networking-et-securite', loadComponent: () => import('./lessons/lesson-13.component').then(m => m.Lesson13Component) },
  { path: 'cdn-et-distribution', loadComponent: () => import('./lessons/lesson-14.component').then(m => m.Lesson14Component) },
  { path: 'bonnes-pratiques-production', loadComponent: () => import('./lessons/lesson-15.component').then(m => m.Lesson15Component) },
  { path: 'chaos-engineering', loadComponent: () => import('./lessons/lesson-16.component').then(m => m.Lesson16Component) },
];
