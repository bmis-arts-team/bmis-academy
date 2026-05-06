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
      q: 'Pourquoi est-il obligatoire de logger sur stdout/stderr dans un conteneur Kubernetes ?',
      options: [
        'Parce que les fichiers de log ne sont pas supportes par Linux',
        'Parce que Kubernetes capture automatiquement stdout/stderr et les rend accessibles via kubectl logs et les collecteurs (Loki, Fluentd...)',
        'Parce que stdout est plus rapide que l ecriture fichier',
        'Parce que les volumes ne sont pas disponibles dans les pods',
      ],
      correct: 1,
      explanation:
        'Les conteneurs sont ephemeriques. Les logs fichier disparaissent avec le pod. En loggant sur stdout, le container runtime (containerd) capture les logs, kubectl logs les affiche, et les collecteurs comme Loki les aggregent.',
    },
    {
      q: 'Quelle est la stack Loki recommandee pour centraliser les logs dans Grafana ?',
      options: [
        'Loki + Elasticsearch + Kibana',
        'Promtail (collecte) + Loki (stockage/indexation) + Grafana (visualisation)',
        'Fluentd + Loki + Prometheus',
        'Loki seul suffit pour tout',
      ],
      correct: 1,
      explanation:
        'Promtail est un agent DaemonSet qui collecte les logs de chaque noeud et les envoie a Loki. Loki les indexe par labels (pas en full-text comme Elasticsearch). Grafana permet de les visualiser avec LogQL.',
    },
    {
      q: 'Quelle est la difference entre LogQL et PromQL ?',
      options: [
        'Ce sont les memes langages de requete utilises pour Loki et Prometheus',
        'LogQL est le langage de requete de Loki pour filtrer et agreger des logs texte, PromQL est le langage de Prometheus pour interroger des series temporelles de metriques numeriques',
        'LogQL est plus puissant que PromQL',
        'PromQL peut aussi interroger des logs',
      ],
      correct: 1,
      explanation:
        'LogQL = Loki Query Language. {app="backend"} |= "ERROR" filtre les logs par label et sous-chaine. PromQL = Prometheus Query Language. rate(counter[5m]) calcule des taux sur des metriques numeriques. Deux outils complementaires dans Grafana.',
    },
  ];
}