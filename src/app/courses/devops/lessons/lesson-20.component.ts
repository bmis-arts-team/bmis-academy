import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { QuizComponent, QuizQuestion } from '../../../shared/components/quiz.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-20',
  imports: [LessonPageComponent, QuizComponent],
  templateUrl: './lesson-20.component.html'
})
export class Lesson20Component {
  data = inject(CourseService).getLessonNav('devops', 20)!;

  quiz: QuizQuestion[] = [
    {
      q: 'Que fait un HorizontalPodAutoscaler (HPA) quand l\'utilisation CPU moyenne dépasse le seuil configuré ?',
      options: [
        'Il augmente les ressources CPU du pod existant (scaling vertical)',
        'Il crée de nouveaux pods (réplicas) pour répartir la charge (scaling horizontal)',
        'Il redémarre les pods surchargés',
        'Il alerte l\'administrateur par email',
      ],
      correct: 1,
      explanation:
        'Le HPA surveille les métriques (CPU, mémoire) via le Metrics Server et ajuste le nombre de réplicas du Deployment. C\'est du scaling horizontal : plus de pods, pas des pods plus gros.',
    },
    {
      q: 'Quel composant doit être installé pour que le HPA puisse fonctionner ?',
      options: [
        'kube-proxy',
        'Metrics Server',
        'Prometheus',
        'Grafana',
      ],
      correct: 1,
      explanation:
        'Le Metrics Server collecte les métriques CPU/mémoire des kubelets et les expose via l\'API metrics.k8s.io. Sans lui, le HPA ne peut pas connaître l\'utilisation des ressources.',
    },
    {
      q: 'Dans Prometheus, qu\'est-ce qu\'un ServiceMonitor ?',
      options: [
        'Un dashboard de monitoring',
        'Une ressource CRD qui indique à Prometheus quels Services scraper et sur quel endpoint',
        'Un agent installé dans chaque pod',
        'Un type de Service Kubernetes',
      ],
      correct: 1,
      explanation:
        'Le ServiceMonitor est un CRD (Custom Resource Definition) du Prometheus Operator. Il définit les labels, le port et le path (/metrics, /actuator/prometheus) à scraper automatiquement.',
    },
    {
      q: 'Comment accéder à Grafana depuis l\'extérieur du cluster sur un VPS ?',
      options: [
        'Grafana est accessible par défaut sur le port 3000',
        'Via un Ingress configuré avec un sous-domaine (ex: grafana.mondomaine.com) ou via kubectl port-forward',
        'En ouvrant le port 3000 dans le firewall uniquement',
        'En installant Grafana directement sur le VPS sans Kubernetes',
      ],
      correct: 1,
      explanation:
        'En production, on crée un Ingress dédié pour Grafana. Pour du debug rapide, kubectl port-forward svc/grafana 3000:80 crée un tunnel temporaire sans exposer le port publiquement.',
    },
    {
      q: 'Quel endpoint Spring Boot Actuator expose les métriques au format Prometheus ?',
      options: [
        '/actuator/health',
        '/actuator/metrics',
        '/actuator/prometheus',
        '/metrics',
      ],
      correct: 2,
      explanation:
        'Le starter micrometer-registry-prometheus expose /actuator/prometheus avec toutes les métriques JVM, HTTP, pool de connexions… au format que Prometheus peut scraper directement.',
    },
  ];
}
