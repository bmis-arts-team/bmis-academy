import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { QuizComponent, QuizQuestion } from '../../../shared/components/quiz.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-24',
  imports: [LessonPageComponent, QuizComponent],
  templateUrl: './lesson-24.component.html'
})
export class Lesson24Component {
  data = inject(CourseService).getLessonNav('devops', 24)!;

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
    {
      q: 'Quelle est la différence entre Sealed Secrets et External Secrets Operator ?',
      options: [
        'Ce sont deux outils identiques',
        'Sealed Secrets chiffre le secret en YAML commitable dans Git (déchiffré dans le cluster). External Secrets récupère les secrets depuis un vault externe (AWS SSM, HashiCorp Vault…) au runtime',
        'Sealed Secrets est pour Kubernetes, External Secrets pour Docker',
        'External Secrets est plus sécurisé mais uniquement disponible sur les cloud providers',
      ],
      correct: 1,
      explanation:
        'Les deux résolvent le problème de GitOps avec les secrets, mais différemment : Sealed Secrets = secret chiffré dans Git, déchiffré par un opérateur dans le cluster. External Secrets = secret stocké hors Git, injecté au moment du déploiement.',
    },
    {
      q: 'Qu\'arrive-t-il à un pod qui dépasse sa memory limit Kubernetes ?',
      options: [
        'Il est throttlé (ralenti) comme pour le CPU',
        'Il est terminé par le kernel Linux avec un signal OOMKilled (Out Of Memory), et Kubernetes le redémarre',
        'Il est migré automatiquement sur un autre nœud',
        'Il reçoit un avertissement mais continue à fonctionner',
      ],
      correct: 1,
      explanation:
        'La mémoire ne peut pas être throttlée (contrairement au CPU). Si un pod dépasse sa limit mémoire, le cgroup OOM killer tue le process. Kubernetes redémarre le pod (CrashLoopBackOff si répétitif).',
    },
    {
      q: 'Pourquoi une NetworkPolicy default-deny est-elle recommandée en production ?',
      options: [
        'Pour couper l\'accès à internet depuis les pods',
        'Pour adopter une posture "zero trust" : tout trafic est bloqué par défaut, et seuls les flux explicitement autorisés (backend vers postgres, frontend vers backend) sont permis',
        'Pour améliorer les performances réseau',
        'Parce que Kubernetes bloque déjà tout le trafic inter-pods par défaut',
      ],
      correct: 1,
      explanation:
        'Par défaut, Kubernetes autorise tout trafic entre pods (même entre namespaces). Une policy default-deny inverse ce comportement. On liste ensuite uniquement les flux autorisés, réduisant massivement la surface d\'attaque.',
    },
    {
      q: 'Que vérifie la commande kubectl auth can-i create pods --as system:serviceaccount:deleevx-prod:github-deployer ?',
      options: [
        'Si le namespace deleevx-prod existe',
        'Si le ServiceAccount github-deployer a la permission de créer des pods dans le namespace courant, selon les RoleBindings configurés',
        'Si le pod github-deployer est en cours d\'exécution',
        'Si les RBAC sont activés sur le cluster',
      ],
      correct: 1,
      explanation:
        'kubectl auth can-i impersonne un compte spécifique et vérifie ses droits RBAC sans modifier quoi que ce soit. Utile pour valider que le ServiceAccount CI/CD a exactement les droits nécessaires, ni plus ni moins.',
    },
    {
      q: 'Pourquoi configure-t-on concurrencyPolicy: Forbid sur le CronJob de backup PostgreSQL ?',
      options: [
        'Pour interdire l\'exécution du job en dehors des heures de bureau',
        'Pour empêcher un nouveau job de démarrer si le précédent tourne encore, évitant deux pg_dump simultanés qui satureraient la base et le réseau',
        'Pour que le job ne tourne qu\'en production',
        'C\'est obligatoire pour les CronJobs Kubernetes',
      ],
      correct: 1,
      explanation:
        'Un pg_dump peut prendre plusieurs minutes. Sans Forbid, si le job du matin n\'est pas terminé quand celui du soir démarre, deux dumps tournent en parallèle — surchargeant la base, le réseau, et pouvant corrompre les fichiers sur GCS.',
    },
    {
      q: 'Quel service Google est recommandé pour stocker des backups automatisés de base de données depuis Kubernetes ?',
      options: [
        'Firebase Storage — gratuit et intégré à l\'écosystème Google',
        'Google Drive — accessible depuis n\'importe où',
        'Google Cloud Storage (GCS) — stockage objet robuste avec CLI gsutil, lifecycle policies et accès depuis un compte Workspace',
        'Google One — inclus dans Workspace',
      ],
      correct: 2,
      explanation:
        'Firebase Storage est limité à 1 GB (plan gratuit) et conçu pour les assets applicatifs. Google Drive n\'est pas fait pour du scripting CLI robuste. GCS est le stockage objet de GCP : CLI gsutil, lifecycle policies pour la rétention, ~0,02 $/GB/mois, et directement accessible depuis un compte Google Workspace.',
    },
  ];
}
