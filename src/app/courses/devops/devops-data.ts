import { Course } from '../../core/models/course.model';

export const DEVOPS_COURSE: Course = {
  id: 'devops',
  title: 'DevOps, Kubernetes & Production',
  subtitle: 'Du conteneur au cluster en production',
  icon: 'terminal',
  color: '#4a85cc',
  sections: [
    {
      title: 'Docker',
      icon: 'package',
      lessons: [
        { number: 1, title: 'Images & Containers', subtitle: 'Comprendre Docker en profondeur - layers, caching, multi-stage builds', route: '01' },
        { number: 2, title: 'Volumes & Networking', subtitle: 'Persistance des données et communication inter-conteneurs', route: '02' },
      ]
    },
    {
      title: 'Kubernetes - Fondamentaux',
      icon: 'cpu',
      lessons: [
        { number: 3, title: 'Architecture Kubernetes', subtitle: 'Control Plane, Worker Nodes et Pods', route: '03' },
        { number: 4, title: 'Workloads', subtitle: 'Deployments, StatefulSets, DaemonSets et Jobs', route: '04' },
        { number: 5, title: 'Services & Ingress', subtitle: 'Exposer et router le trafic réseau', route: '05' },
        { number: 6, title: 'ConfigMaps & Secrets', subtitle: 'Externaliser la configuration et protéger les données sensibles', route: '06' },
        { number: 7, title: 'Storage & Namespaces', subtitle: 'Volumes persistants et isolation logique', route: '07' },
      ]
    },
    {
      title: 'Déploiement & CI/CD',
      icon: 'git-branch',
      lessons: [
        { number: 8, title: 'Déployer un Système Complet', subtitle: 'Architecture multi-composants sur Kubernetes', route: '08' },
        { number: 9, title: 'CI/CD - GitHub Actions', subtitle: 'Pipeline automatisé de build, test et déploiement', route: '09' },
      ]
    },
    {
      title: 'Observabilité',
      icon: 'activity',
      lessons: [
        { number: 10, title: 'Métriques - Prometheus & Grafana', subtitle: 'Monitoring, PromQL et dashboards', route: '10' },
        { number: 11, title: 'Logging & Alerting - ELK Stack', subtitle: 'Logs centralisés, Elasticsearch et alertes', route: '11' },
      ]
    },
    {
      title: 'Réseau, Sécurité & Production',
      icon: 'shield',
      lessons: [
        { number: 12, title: 'Networking & Sécurité', subtitle: 'Network Policies, RBAC et Pod Security', route: '12' },
        { number: 13, title: 'CDN & Distribution', subtitle: 'Performance, caching et distribution globale', route: '13' },
        { number: 14, title: 'Bonnes Pratiques Production', subtitle: 'Scaling, résilience, SLO et zero-downtime', route: '14' },
      ]
    },
  ]
};
