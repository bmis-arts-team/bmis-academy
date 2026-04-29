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
        { number: 1, title: 'Prérequis & Introduction', subtitle: 'Positionnement du développeur et environnement requis', route: 'prerequis-et-introduction' },
        { number: 2, title: 'Backend Solide et Maintenable', subtitle: 'Clean Architecture, séparation des responsabilités, validation et tests', route: 'backend-solide-et-maintenable' },
      ]
    },
    {
      title: 'Architecture & Design',
      icon: 'layers',
      lessons: [
        { number: 3, title: 'Projet Fil Rouge - TaskFlow', subtitle: 'Modélisation, structure et exercices pratiques', route: 'projet-fil-rouge-taskflow' },
        { number: 4, title: 'Architectures Distribuées', subtitle: 'Microservices, communication, brokers et patterns essentiels', route: 'architectures-distribuees' },
      ]
    },
    {
      title: 'DevOps & Production',
      icon: 'cloud',
      lessons: [
        { number: 5, title: 'DevOps, Cloud et Observabilité', subtitle: 'IaC, CI/CD, Kubernetes et monitoring', route: 'devops-cloud-et-observabilite' },
      ]
    },
    {
      title: 'Expertise Avancée',
      icon: 'zap',
      lessons: [
        { number: 6, title: 'Scalabilité et Patterns Avancés', subtitle: 'Kafka avancé, SAGA, CQRS, Circuit Breaker, Redis', route: 'scalabilite-et-patterns-avances' },
        { number: 7, title: 'Cahier Pratique Final', subtitle: 'Exercices guidés TaskFlow Entreprise', route: 'cahier-pratique-final' },
        { number: 8, title: 'Glossaire Technique', subtitle: 'Définitions des termes clés du parcours', route: 'glossaire-technique' },
      ]
    },
  ]
};
