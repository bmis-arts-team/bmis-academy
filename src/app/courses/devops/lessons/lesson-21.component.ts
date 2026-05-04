import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { QuizComponent, QuizQuestion } from '../../../shared/components/quiz.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-21',
  imports: [LessonPageComponent, QuizComponent],
  templateUrl: './lesson-21.component.html'
})
export class Lesson21Component {
  data = inject(CourseService).getLessonNav('devops', 21)!;

  quiz: QuizQuestion[] = [
    {
      q: 'Pourquoi est-il obligatoire de logger sur stdout/stderr dans un conteneur Kubernetes ?',
      options: [
        'Parce que les fichiers de log ne sont pas supportés par Linux',
        'Parce que Kubernetes capture automatiquement stdout/stderr et les rend accessibles via kubectl logs et les collecteurs (Loki, Fluentd…)',
        'Parce que stdout est plus rapide que l\'écriture fichier',
        'Parce que les volumes ne sont pas disponibles dans les pods',
      ],
      correct: 1,
      explanation:
        'Les conteneurs sont éphémères. Les logs fichier disparaissent avec le pod. En loggant sur stdout, le container runtime (containerd) capture les logs, kubectl logs les affiche, et les collecteurs comme Loki les agrègent.',
    },
    {
      q: 'Quelle est la stack Loki recommandée pour centraliser les logs dans Grafana ?',
      options: [
        'Loki + Elasticsearch + Kibana',
        'Promtail (collecte) + Loki (stockage/indexation) + Grafana (visualisation)',
        'Fluentd + Loki + Prometheus',
        'Loki seul suffit pour tout',
      ],
      correct: 1,
      explanation:
        'Promtail est un agent DaemonSet qui collecte les logs de chaque nœud et les envoie à Loki. Loki les indexe par labels (pas en full-text comme Elasticsearch). Grafana permet de les visualiser avec LogQL.',
    },
    {
      q: 'Dans un pipeline GitHub Actions, pourquoi build et push l\'image Docker AVANT de déployer sur Kubernetes ?',
      options: [
        'Pour vérifier que le code compile',
        'Parce que Kubernetes ne peut déployer que des images déjà disponibles dans un registry (GHCR, Docker Hub…)',
        'Parce que GitHub Actions ne peut pas accéder au cluster directement',
        'Pour économiser de la bande passante',
      ],
      correct: 1,
      explanation:
        'Le kubelet du nœud doit pouvoir pull l\'image spécifiée dans le Deployment. Si l\'image n\'est pas dans un registry accessible, le pod reste en ImagePullBackOff.',
    },
    {
      q: 'Quelle stratégie CDN est recommandée pour les assets Angular en production ?',
      options: [
        'Servir les assets directement depuis le pod Angular',
        'Mettre Cloudflare en proxy devant le domaine pour cacher les assets statiques au plus près des utilisateurs',
        'Copier les assets sur un serveur FTP séparé',
        'Utiliser un CDN uniquement pour les images',
      ],
      correct: 1,
      explanation:
        'Cloudflare (ou un autre CDN) en mode proxy intercepte les requêtes, met en cache les fichiers statiques (JS, CSS, images) sur ses edge servers mondiaux, et réduit la latence et la charge sur le VPS.',
    },
    {
      q: 'Comment Kubernetes met-il à jour un Deployment sans interruption de service ?',
      options: [
        'Il arrête tous les anciens pods puis démarre les nouveaux',
        'Il utilise un Rolling Update : création progressive des nouveaux pods et suppression des anciens, en maintenant le nombre minimum de pods disponibles',
        'Il redirige le trafic vers un autre cluster pendant la mise à jour',
        'Il met le Service en mode maintenance',
      ],
      correct: 1,
      explanation:
        'La stratégie RollingUpdate crée de nouveaux pods avec la nouvelle image, attend qu\'ils soient Ready (readinessProbe OK), puis supprime les anciens progressivement. Le Service route automatiquement vers les pods Ready.',
    },
  ];
}
