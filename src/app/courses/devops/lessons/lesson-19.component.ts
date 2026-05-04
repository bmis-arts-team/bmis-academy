import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { QuizComponent, QuizQuestion } from '../../../shared/components/quiz.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-19',
  imports: [LessonPageComponent, QuizComponent],
  templateUrl: './lesson-19.component.html'
})
export class Lesson19Component {
  data = inject(CourseService).getLessonNav('devops', 19)!;

  quiz: QuizQuestion[] = [
    {
      q: 'Pourquoi définit-on des resource requests ET des limits dans un Deployment Kubernetes ?',
      options: [
        'Les requests sont pour le CPU, les limits pour la mémoire',
        'Les requests garantissent un minimum de ressources au pod, les limits empêchent qu\'il en consomme trop et impacte les autres pods',
        'Les requests sont pour le développement, les limits pour la production',
        'C\'est redondant, un seul suffit',
      ],
      correct: 1,
      explanation:
        'Les requests influencent le scheduling (le scheduler place le pod sur un nœud ayant assez de ressources disponibles). Les limits sont des plafonds : si un conteneur dépasse sa limit mémoire, il est OOMKilled.',
    },
    {
      q: 'Quel type de Service expose une application backend à l\'intérieur du cluster uniquement ?',
      options: [
        'NodePort',
        'LoadBalancer',
        'ClusterIP',
        'ExternalName',
      ],
      correct: 2,
      explanation:
        'ClusterIP (type par défaut) crée une IP virtuelle accessible uniquement depuis l\'intérieur du cluster. Le backend n\'a pas besoin d\'être exposé directement - l\'Ingress route le trafic externe vers lui.',
    },
    {
      q: 'Quel composant gère automatiquement les certificats HTTPS avec Let\'s Encrypt dans Kubernetes ?',
      options: [
        'kube-proxy',
        'cert-manager avec un ClusterIssuer configuré pour Let\'s Encrypt',
        'NGINX Ingress Controller seul',
        'Le kubelet du nœud',
      ],
      correct: 1,
      explanation:
        'cert-manager surveille les ressources Ingress annotées, crée automatiquement des Certificate resources, effectue le challenge ACME avec Let\'s Encrypt, et stocke le certificat dans un Secret TLS.',
    },
    {
      q: 'Dans un Ingress, à quoi sert l\'annotation nginx.ingress.kubernetes.io/ssl-redirect: "true" ?',
      options: [
        'À activer SSL sur le backend',
        'À rediriger automatiquement tout trafic HTTP (port 80) vers HTTPS (port 443)',
        'À désactiver le HTTP complètement',
        'À forcer l\'utilisation de TLS 1.3',
      ],
      correct: 1,
      explanation:
        'Cette annotation configure l\'Ingress Controller NGINX pour retourner un redirect 301 de HTTP vers HTTPS, garantissant que tout le trafic utilisateur est chiffré.',
    },
    {
      q: 'Pourquoi configure-t-on une readinessProbe sur le backend Spring Boot ?',
      options: [
        'Pour redémarrer le pod si l\'application crashe',
        'Pour que Kubernetes n\'envoie du trafic au pod que lorsque l\'application est complètement démarrée et prête',
        'Pour mesurer le temps de démarrage',
        'Pour collecter des métriques Prometheus',
      ],
      correct: 1,
      explanation:
        'Spring Boot peut mettre 20-30 secondes à démarrer. Sans readinessProbe, Kubernetes enverrait du trafic à un pod pas encore prêt, causant des erreurs 503. La probe vérifie /actuator/health avant d\'ajouter le pod au Service.',
    },
  ];
}
