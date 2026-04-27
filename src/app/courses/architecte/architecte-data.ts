import { Course } from '../../core/models/course.model';

export const ARCHITECTE_COURSE: Course = {
  id: 'architecte-backend',
  title: 'De Développeur à Architecte Backend',
  subtitle: 'Architecture, Microservices, DevOps et Observabilité - Spring Boot Edition',
  icon: 'server',
  color: '#0f4c81',
  sections: [
    {
      title: 'Fondamentaux Backend',
      icon: 'book-open',
      lessons: [
        { number: 1, title: 'Prérequis & Introduction', subtitle: 'Positionnement du développeur et environnement requis', route: '01' },
        { number: 2, title: 'Backend Solide et Maintenable', subtitle: 'Clean Architecture, séparation des responsabilités, validation et tests', route: '02' },
      ]
    },
    {
      title: 'Architecture & Design',
      icon: 'layers',
      lessons: [
        { number: 3, title: 'Projet Fil Rouge - TaskFlow', subtitle: 'Modélisation, structure et exercices pratiques', route: '03' },
        { number: 4, title: 'Architectures Distribuées', subtitle: 'Microservices, communication, brokers et patterns essentiels', route: '04' },
      ]
    },
    {
      title: 'DevOps & Production',
      icon: 'cloud',
      lessons: [
        { number: 5, title: 'DevOps, Cloud et Observabilité', subtitle: 'IaC, CI/CD, Kubernetes et monitoring', route: '05' },
      ]
    },
    {
      title: 'Expertise Avancée',
      icon: 'zap',
      lessons: [
        { number: 6, title: 'Scalabilité et Patterns Avancés', subtitle: 'Kafka avancé, SAGA, CQRS, Circuit Breaker, Redis', route: '06' },
        { number: 7, title: 'Cahier Pratique Final', subtitle: 'Exercices guidés TaskFlow Entreprise', route: '07' },
        { number: 8, title: 'Glossaire Technique', subtitle: 'Définitions des termes clés du parcours', route: '08' },
      ]
    },
  ]
};
