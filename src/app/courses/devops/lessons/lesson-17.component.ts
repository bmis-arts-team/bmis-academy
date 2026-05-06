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
        'k8s/namespaces/ pour les namespaces et k8s/apps/{app}/base/ + k8s/apps/{app}/overlays/{dev,staging,prod}/ pour les manifestes',
        'Un dépôt Git séparé par environnement',
        'Un namespace différent suffit, pas besoin de dossiers séparés',
      ],
      correct: 1,
      explanation:
        'La structure namespaces/ + apps/{app}/base/ + apps/{app}/overlays/ (pattern Kustomize) isole les namespaces (réutilisables entre apps) des manifestes applicatifs. Ajouter une nouvelle app = créer k8s/apps/nouvelle-app/ sans toucher au reste.',
    },
    {
      q: 'Pourquoi l\'instruction USER appuser est-elle ajoutée dans le Dockerfile Spring Boot ?',
      options: [
        'Pour donner plus de permissions au processus Java',
        'Pour éviter que le processus tourne en root, réduisant la surface d\'attaque si le conteneur est compromis',
        'Pour que Spring Boot démarre plus vite',
        'C\'est obligatoire sinon Docker refuse de builder',
      ],
      correct: 1,
      explanation:
        'Exécuter un processus en root dans un conteneur est dangereux : si l\'attaquant sort du conteneur, il a des privilèges root sur le nœud. Un utilisateur non-root limite les dégâts potentiels.',
    },
    {
      q: 'Pourquoi une seule image Docker est-elle déployée dans les 3 environnements (dev/staging/prod) pour le frontend Angular ?',
      options: [
        'Pour économiser de l\'espace disque',
        'Parce que la configuration runtime (API URL, env) est injectée via des variables d\'environnement au démarrage du conteneur, pas compilée dans le build',
        'Parce qu\'Angular génère le même code pour tous les environnements',
        'Parce que le Dockerfile ne supporte pas plusieurs cibles',
      ],
      correct: 1,
      explanation:
        'Le principe "build once, deploy anywhere" : l\'image est identique partout. Au démarrage, le docker-entrypoint.sh génère /assets/environment.json à partir des variables d\'environnement du pod Kubernetes.',
    },
    {
      q: 'Quel est le rôle du .dockerignore dans un projet Spring Boot ?',
      options: [
        'Il liste les fichiers à inclure dans l\'image',
        'Il exclut target/, .git/ et autres fichiers inutiles du contexte de build, réduisant la taille envoyée au daemon Docker et évitant d\'invalider le cache',
        'Il désactive certaines instructions du Dockerfile',
        'Il configure le réseau Docker',
      ],
      correct: 1,
      explanation:
        'Sans .dockerignore, le dossier target/ (des centaines de MB) serait envoyé au daemon à chaque build. Le cache layer serait aussi invalidé par des changements dans .git/ qui n\'impactent pas le code.',
    },
  ];
}
