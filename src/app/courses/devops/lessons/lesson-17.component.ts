import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { QuizComponent, QuizQuestion } from '../../../shared/components/quiz.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-17',
  imports: [LessonPageComponent, QuizComponent],
  templateUrl: './lesson-17.component.html'
})
export class Lesson17Component {
  data = inject(CourseService).getLessonNav('devops', 17)!;

  quiz: QuizQuestion[] = [
    {
      q: 'Pourquoi utilise-t-on un multi-stage build dans un Dockerfile ?',
      options: [
        'Pour exécuter plusieurs conteneurs en parallèle',
        'Pour séparer la phase de build (lourde) de l\'image finale (légère), réduisant drastiquement la taille',
        'Pour compiler le code dans plusieurs langages',
        'Pour supporter plusieurs architectures CPU',
      ],
      correct: 1,
      explanation:
        'Le multi-stage build permet d\'utiliser une image lourde avec tous les outils de build (Maven, Node…) puis de copier uniquement les artefacts produits dans une image finale minimale (eclipse-temurin:21-jre, nginx:alpine…).',
    },
    {
      q: 'Quel est l\'avantage de copier pom.xml et mvnw AVANT le code source dans un Dockerfile Spring Boot ?',
      options: [
        'Cela permet de compiler plus vite',
        'Cela isole les dépendances Maven dans un layer Docker mis en cache, évitant de les retélécharger à chaque modification de code',
        'C\'est obligatoire pour que Maven fonctionne',
        'Cela réduit la taille de l\'image finale',
      ],
      correct: 1,
      explanation:
        'Docker met en cache chaque layer. Si pom.xml n\'a pas changé, le layer des dépendances est réutilisé. Seul le COPY du code source invalide le cache, ce qui accélère considérablement les builds successifs.',
    },
    {
      q: 'Quelle image de base est recommandée pour le runtime d\'une application Spring Boot en production ?',
      options: [
        'ubuntu:latest',
        'eclipse-temurin:21-jdk',
        'eclipse-temurin:21-jre-alpine',
        'openjdk:17',
      ],
      correct: 2,
      explanation:
        'En production, on utilise le JRE (pas le JDK) car on n\'a pas besoin du compilateur. La variante Alpine est la plus légère (~200 MB au lieu de ~800 MB).',
    },
    {
      q: 'Dans le Dockerfile Angular, pourquoi utilise-t-on nginx:alpine comme image finale ?',
      options: [
        'Parce que Angular a besoin de Node.js pour fonctionner en production',
        'Parce qu\'Angular produit des fichiers statiques (HTML/CSS/JS) qu\'un serveur web comme NGINX sert directement',
        'Parce que nginx est le seul serveur compatible avec Angular',
        'Pour pouvoir faire du Server-Side Rendering',
      ],
      correct: 1,
      explanation:
        'La commande ng build produit des fichiers statiques dans dist/. En production, Node.js n\'est plus nécessaire - un serveur web léger comme NGINX suffit pour servir ces fichiers.',
    },
    {
      q: 'Quelle est la structure de dossiers recommandée pour séparer les fichiers Kubernetes par environnement ?',
      options: [
        'Un seul dossier k8s/ avec tout dedans',
        'k8s/base/ pour les ressources communes et k8s/overlays/{dev,staging,prod}/ pour les spécificités par environnement',
        'Un dépôt Git séparé par environnement',
        'Un namespace différent suffit, pas besoin de dossiers séparés',
      ],
      correct: 1,
      explanation:
        'La structure base/overlays (pattern Kustomize) permet de factoriser les ressources communes et de ne surcharger que ce qui change par environnement (replicas, limites, variables…).',
    },
  ];
}
