import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { QuizComponent, QuizQuestion } from '../../../shared/components/quiz.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-04',
  imports: [LessonPageComponent, QuizComponent],
  templateUrl: './lesson-04.component.html'
})
export class Lesson04Component {
  data = inject(CourseService).getLessonNav('devops', 4)!;

  quiz: QuizQuestion[] = [
    {
      q: "Quel composant est le seul et unique point d'entrée pour toutes les opérations sur le cluster ?",
      options: [
        'kube-scheduler',
        'kube-apiserver',
        'etcd',
        'Controller Manager',
      ],
      correct: 1,
      explanation:
        "Toutes les requêtes — kubectl, scheduler, kubelet, controller — passent obligatoirement par l'API Server. C'est le seul composant accessible de l'extérieur du cluster.",
    },
    {
      q: 'Un pod est en état Pending depuis plusieurs minutes. Quelle est la cause la plus probable ?',
      options: [
        'Le conteneur a crashé juste après le démarrage',
        "Le Scheduler n'a pas trouvé de node éligible (ressources insuffisantes ou contrainte d'affinité non satisfaite)",
        'etcd est inaccessible',
        'La readiness probe a échoué',
      ],
      correct: 1,
      explanation:
        "Pending = le pod existe dans etcd mais n'est assigné à aucun node. Un pod crashé serait en CrashLoopBackOff. Si etcd était inaccessible, kubectl ne répondrait pas du tout.",
    },
    {
      q: 'Quelle est la différence fondamentale entre une liveness probe et une readiness probe ?',
      options: [
        'La liveness surveille le CPU, la readiness surveille la mémoire',
        'La liveness redémarre le conteneur si elle échoue ; la readiness le retire du Service sans le redémarrer',
        "La liveness s'exécute uniquement au démarrage, la readiness en continu",
        'Elles sont identiques mais sur des chemins HTTP différents',
      ],
      correct: 1,
      explanation:
        "Liveness = « le process est-il vivant ? » → redémarrage du conteneur si non. Readiness = « le conteneur est-il prêt à recevoir du trafic ? » → retrait du Service si non, sans redémarrer.",
    },
    {
      q: 'Votre cluster etcd tombe sans backup disponible. Qu’est-ce qui est irrémédiablement perdu ?',
      options: [
        "Uniquement les pods en cours d'exécution",
        'Les données applicatives stockées dans les volumes',
        "L'intégralité de l'état du cluster : Deployments, Services, Secrets, RBAC…",
        'Uniquement les namespaces personnalisés',
      ],
      correct: 2,
      explanation:
        "etcd est la source de vérité unique du cluster. Tous les objets Kubernetes y sont stockés. Sans backup, aucune récupération n'est possible. Les pods en cours d'exécution peuvent temporairement survivre (le kubelet les gère localement) mais tout l'état déclaratif est perdu.",
    },
    {
      q: 'Le taint node-role.kubernetes.io/control-plane:NoSchedule signifie :',
      options: [
        'Le node est en maintenance et sera bientôt arrêté',
        'Aucun pod sans toleration explicite ne peut être schedulé sur ce node',
        'Le node ne peut pas rejoindre le cluster',
        'Les pods sur ce node sont isolés du réseau',
      ],
      correct: 1,
      explanation:
        'Un taint repousse les pods sans toleration correspondante. Le Control Plane l’utilise pour s’isoler des pods applicatifs. C’est pourquoi kubectl run ne place jamais un pod sur le control-plane node.',
    },
  ];
}
