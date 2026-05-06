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
    {
      q: 'Que signifie stabilizationWindowSeconds dans la configuration du HPA ?',
      options: [
        'Le temps maximum avant qu\'un scale up soit déclenché',
        'La fenêtre de temps pendant laquelle les métriques doivent rester stables avant de réduire ou d\'augmenter le nombre de replicas, évitant les oscillations',
        'Le délai entre deux collectes de métriques par Prometheus',
        'Le timeout de démarrage d\'un nouveau pod',
      ],
      correct: 1,
      explanation:
        'Sans stabilizationWindow, le HPA pourrait scale down immédiatement après un pic, puis scale up à nouveau (oscillations). Une fenêtre de 300s (5min) pour le scale down évite ce comportement erratique.',
    },
    {
      q: 'Quelle requête PromQL permet de calculer le taux de requêtes HTTP par seconde du backend ?',
      options: [
        'http_server_requests_seconds_count',
        'rate(http_server_requests_seconds_count[1m])',
        'sum(http_server_requests_seconds_count)',
        'avg(http_requests_total)',
      ],
      correct: 1,
      explanation:
        'rate() calcule le taux moyen par seconde sur une fenêtre de temps donnée. rate(http_server_requests_seconds_count[1m]) donne le nombre de requêtes par seconde en moyenne sur la dernière minute.',
    },
    {
      q: 'Pourquoi configure-t-on un scaleDown.stabilizationWindowSeconds plus long que scaleUp ?',
      options: [
        'Par limitation technique du HPA',
        'Pour éviter de supprimer des pods trop rapidement après un pic : un traffic burst qui dure 1 minute ne doit pas provoquer un scale down immédiat qui nécessiterait un nouveau scale up',
        'Parce que créer un pod est plus rapide que d\'en supprimer un',
        'Pour respecter les SLO de disponibilité',
      ],
      correct: 1,
      explanation:
        'Le scale down est plus risqué que le scale up : trop agressif, il dégrade la disponibilité. On privilégie la précaution (5min de calme avant réduction) sur l\'optimisation des coûts immédiats.',
    },
  ];
}
