import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { QuizComponent, QuizQuestion } from '../../../shared/components/quiz.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-18',
  imports: [LessonPageComponent, QuizComponent],
  templateUrl: './lesson-18.component.html'
})
export class Lesson18Component {
  data = inject(CourseService).getLessonNav('devops', 18)!;

  quiz: QuizQuestion[] = [
    {
      q: 'Pourquoi k3s est-il recommandé pour un déploiement sur un VPS unique ?',
      options: [
        'Parce qu\'il est gratuit contrairement à k8s',
        'Parce qu\'il est une distribution Kubernetes certifiée optimisée pour les environnements à ressources limitées (~512 MB RAM)',
        'Parce qu\'il ne supporte pas les fonctionnalités avancées inutiles',
        'Parce qu\'il est plus rapide que Docker Swarm',
      ],
      correct: 1,
      explanation:
        'k3s est un Kubernetes certifié CNCF, compilé en un seul binaire de ~70 MB, optimisé pour les VPS et l\'edge computing. Il inclut tout (containerd, Traefik, CoreDNS) et consomme très peu de ressources.',
    },
    {
      q: 'Après l\'installation de k3s, où se trouve le fichier kubeconfig ?',
      options: [
        '~/.kube/config',
        '/etc/kubernetes/admin.conf',
        '/etc/rancher/k3s/k3s.yaml',
        '/var/lib/k3s/kubeconfig',
      ],
      correct: 2,
      explanation:
        'k3s place son kubeconfig dans /etc/rancher/k3s/k3s.yaml. On le copie ensuite vers ~/.kube/config pour que kubectl le trouve automatiquement.',
    },
    {
      q: 'À quoi servent les namespaces dev, staging et prod dans un cluster k3s unique ?',
      options: [
        'À créer des clusters virtuels complètement isolés',
        'À isoler logiquement les environnements dans un même cluster, avec des quotas et des politiques réseau distincts',
        'À répartir la charge sur différents nœuds',
        'À sauvegarder automatiquement les données',
      ],
      correct: 1,
      explanation:
        'Les namespaces offrent une isolation logique : chaque environnement a ses propres Deployments, Services, Secrets et ResourceQuotas. Ce n\'est pas une isolation physique complète, mais c\'est suffisant pour un VPS unique.',
    },
    {
      q: 'Que vérifie la commande kubectl get nodes --watch après l\'installation de k3s ?',
      options: [
        'Le nombre de pods en cours d\'exécution',
        'Que le nœud est en statut Ready, confirmant que le cluster est opérationnel',
        'La version de Docker installée',
        'Les règles de firewall actives',
      ],
      correct: 1,
      explanation:
        'kubectl get nodes affiche l\'état des nœuds. Le statut "Ready" confirme que le kubelet fonctionne, que le container runtime est opérationnel et que le nœud peut accueillir des pods.',
    },
    {
      q: 'Quelle est la différence entre k8s/base/ et k8s/overlays/ dans la structure Kustomize ?',
      options: [
        'base/ contient les fichiers de test, overlays/ les fichiers de production',
        'base/ contient les manifestes communs à tous les environnements, overlays/ contient les patches spécifiques par environnement',
        'base/ contient les anciens fichiers, overlays/ les nouveaux',
        'Il n\'y a aucune différence, c\'est juste une convention',
      ],
      correct: 1,
      explanation:
        'Dans le pattern Kustomize, base/ définit les ressources « par défaut » (Deployments, Services…) et chaque overlay (dev/, staging/, prod/) surcharge uniquement ce qui change : nombre de replicas, limites de ressources, variables d\'environnement…',
    },
  ];
}
