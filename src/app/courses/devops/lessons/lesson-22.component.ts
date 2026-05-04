import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { QuizComponent, QuizQuestion } from '../../../shared/components/quiz.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-22',
  imports: [LessonPageComponent, QuizComponent],
  templateUrl: './lesson-22.component.html'
})
export class Lesson22Component {
  data = inject(CourseService).getLessonNav('devops', 22)!;

  quiz: QuizQuestion[] = [
    {
      q: 'Pourquoi ne doit-on JAMAIS stocker de secrets en clair dans les manifestes Kubernetes versionnés dans Git ?',
      options: [
        'Parce que Git ne supporte pas les fichiers YAML',
        'Parce que quiconque a accès au dépôt peut lire les mots de passe, tokens et clés API en clair',
        'Parce que les Secrets Kubernetes sont déjà chiffrés automatiquement',
        'Parce que cela ralentit le déploiement',
      ],
      correct: 1,
      explanation:
        'Les Secrets Kubernetes sont encodés en base64, pas chiffrés. Si les manifestes sont dans Git, les secrets sont exposés. On utilise Sealed Secrets (Bitnami) ou External Secrets Operator pour les chiffrer avant de les committer.',
    },
    {
      q: 'Que fait un LimitRange dans un namespace Kubernetes ?',
      options: [
        'Il limite le nombre de namespaces dans le cluster',
        'Il définit des valeurs par défaut et des limites min/max pour les ressources des conteneurs dans un namespace',
        'Il limite le nombre d\'utilisateurs pouvant accéder au namespace',
        'Il limite la bande passante réseau',
      ],
      correct: 1,
      explanation:
        'Un LimitRange impose des contraintes sur chaque conteneur individuel : si un Deployment ne définit pas de requests/limits, le LimitRange applique les valeurs par défaut. Il peut aussi imposer un minimum et un maximum.',
    },
    {
      q: 'Quelle est la différence entre un ResourceQuota et un LimitRange ?',
      options: [
        'Ce sont des synonymes',
        'Le ResourceQuota limite les ressources TOTALES d\'un namespace, le LimitRange limite les ressources de chaque pod/conteneur individuel',
        'Le ResourceQuota est pour la production, le LimitRange pour le développement',
        'Le ResourceQuota s\'applique au cluster entier',
      ],
      correct: 1,
      explanation:
        'ResourceQuota = budget total du namespace (ex: max 4 CPU, 8Gi RAM pour tout le namespace). LimitRange = contraintes individuelles (ex: chaque conteneur doit avoir entre 64Mi et 512Mi de mémoire).',
    },
    {
      q: 'Pourquoi configurer des NetworkPolicies entre les namespaces dev, staging et prod ?',
      options: [
        'Pour accélérer le réseau entre les pods',
        'Pour empêcher les pods d\'un environnement de communiquer avec ceux d\'un autre environnement, renforçant l\'isolation',
        'Pour router le trafic via un VPN',
        'Pour activer le chiffrement TLS entre les pods',
      ],
      correct: 1,
      explanation:
        'Par défaut, tous les pods d\'un cluster peuvent communiquer entre eux. Les NetworkPolicies créent des règles de pare-feu : les pods de dev ne doivent pas pouvoir contacter la base de données prod.',
    },
    {
      q: 'Quel est le rôle du rate limiting au niveau de l\'Ingress en production ?',
      options: [
        'Accélérer les réponses de l\'API',
        'Limiter le nombre de requêtes par seconde par IP pour protéger contre les attaques DDoS et les abus',
        'Compresser les réponses HTTP',
        'Mettre en cache les réponses API',
      ],
      correct: 1,
      explanation:
        'Les annotations NGINX comme nginx.ingress.kubernetes.io/limit-rps limitent les requêtes par seconde par IP source. Cela protège l\'API contre les pics abusifs sans bloquer le trafic légitime.',
    },
  ];
}
