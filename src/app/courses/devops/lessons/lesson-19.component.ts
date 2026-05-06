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
      q: 'Pourquoi definit-on des resource requests ET des limits dans un Deployment Kubernetes ?',
      options: [
        'Les requests sont pour le CPU, les limits pour la memoire',
        'Les requests garantissent un minimum de ressources au pod, les limits empechent qu il en consomme trop et impacte les autres pods',
        'Les requests sont pour le developpement, les limits pour la production',
        'C est redondant, un seul suffit',
      ],
      correct: 1,
      explanation:
        'Les requests influencent le scheduling (le scheduler place le pod sur un noeud ayant assez de ressources disponibles). Les limits sont des plafonds : si un conteneur depasse sa limit memoire, il est OOMKilled.',
    },
    {
      q: 'Pourquoi configure-t-on une readinessProbe sur le backend Spring Boot ?',
      options: [
        'Pour redemarrer le pod si l application crashe',
        'Pour que Kubernetes n envoie du trafic au pod que lorsque l application est completement demarree et prete',
        'Pour mesurer le temps de demarrage',
        'Pour collecter des metriques Prometheus',
      ],
      correct: 1,
      explanation:
        'Spring Boot peut mettre 20-30 secondes a demarrer. Sans readinessProbe, Kubernetes enverrait du trafic a un pod pas encore pret, causant des erreurs 503. La probe verifie /actuator/health avant d ajouter le pod au Service.',
    },
    {
      q: 'Quelle est la difference entre startupProbe et livenessProbe ?',
      options: [
        'startupProbe est pour le CPU, livenessProbe pour la memoire',
        'startupProbe laisse le temps a l app de demarrer (bloque liveness/readiness). livenessProbe surveille ensuite si l app reste vivante et redemarre le conteneur si elle ne repond plus',
        'Ce sont des synonymes',
        'livenessProbe est declenchee avant startupProbe',
      ],
      correct: 1,
      explanation:
        'Sans startupProbe, la livenessProbe tuerait un pod Spring Boot avant qu il ait fini de demarrer (la JVM et le contexte Spring prennent du temps). startupProbe desactive liveness/readiness pendant le demarrage.',
    },
    {
      q: 'Pourquoi le StatefulSet est-il utilise pour PostgreSQL plutot qu un Deployment ?',
      options: [
        'Parce que PostgreSQL ne fonctionne pas dans un Deployment',
        'Parce qu un StatefulSet garantit une identite stable (nom DNS, PVC persistant) a chaque pod, indispensable pour une base de donnees',
        'Parce qu un Deployment ne peut pas monter de volumes',
        'Pour des raisons de performance uniquement',
      ],
      correct: 1,
      explanation:
        'Avec un StatefulSet, chaque pod a un nom ordonne (postgres-0) et un PVC dedie qui persiste meme apres suppression du pod. Un Deployment recreerait un pod avec un PVC different ou partage.',
    },
    {
      q: 'Quelle est la difference entre port et targetPort dans un Service Kubernetes ?',
      options: [
        'Ce sont des synonymes, les deux font reference au port du conteneur',
        'port est le port sur lequel le Service lui-meme ecoute (accessible depuis le cluster), targetPort est le port du conteneur vers lequel le trafic est redirige',
        'port est pour TCP, targetPort pour UDP',
        'port est pour l externe, targetPort pour l interne',
      ],
      correct: 1,
      explanation:
        'Un Service peut exposer n importe quel port a l interieur du cluster (port: 80) tout en routant vers un port different sur le conteneur (targetPort: 8080). C est utile pour standardiser les ports des Services independamment des ports des apps.',
    },
    {
      q: 'Pourquoi utiliser Sealed Secrets plutot que kubectl create secret dans un pipeline GitOps ?',
      options: [
        'Parce que kubectl create secret ne fonctionne pas avec Kubernetes',
        'Parce qu un Secret Kubernetes n est qu encode en base64 (non chiffre) — le committer dans Git exposerait les credentials. Sealed Secrets chiffre avec la cle publique du cluster : le fichier resultant est safe a commiter',
        'Pour des raisons de performance uniquement',
        'Parce que Sealed Secrets supporte plus de types de secrets',
      ],
      correct: 1,
      explanation:
        'Base64 n est pas du chiffrement. N importe qui ayant acces au repo Git peut decoder un Secret non chiffre. Sealed Secrets utilise un chiffrement asymetrique : la cle publique chiffre (connue de tous), seule la cle privee du controleur peut dechiffrer.',
    },
    {
      q: 'Pourquoi les manifestes Kubernetes de production doivent-ils vivre dans un repo-infra dedie et non dans le repo applicatif ?',
      options: [
        'Parce que Kubernetes ne peut pas lire des fichiers depuis un repo applicatif',
        'Pour que les developpeurs n aient aucun acces aux manifestes de production, eviter la duplication entre apps, et avoir une vue globale de l etat du cluster',
        'Uniquement pour des raisons de performance Git',
        'Parce que Flux ne peut pas surveiller plusieurs repos',
      ],
      correct: 1,
      explanation:
        'La separation des responsabilites (SoC) est fondamentale : les developpeurs gerent le code, les DevOps gerent l infra. Un repo dedie permet un controle d acces fin, une vision globale du cluster et evite la duplication des templates entre chaque repo applicatif.',
    },
    {
      q: 'Un backend Spring Boot stocke les fichiers uploades dans /app/uploads. Pourquoi faut-il monter un PersistentVolumeClaim a cet emplacement ?',
      options: [
        'Pour ameliorer les performances de lecture',
        'Parce que le systeme de fichiers d un pod Kubernetes est ephemere — si le pod redemarre ou est recree, tous les fichiers stockes localement sont perdus. Un PVC persiste independamment du cycle de vie du pod',
        'Parce que Spring Boot ne peut pas ecrire sur le disque sans PVC',
        'Uniquement pour des raisons de securite',
      ],
      correct: 1,
      explanation:
        'Le disque d un conteneur est temporaire : un pod recree repart d une image vierge. Sans PVC, les fichiers uploades par les utilisateurs disparaissent au prochain deploiement ou crash. Le PVC monte un volume persistant sur le noeud (local-path sur K3s) qui survit aux redemarrages du pod.',
    },
  ];
}