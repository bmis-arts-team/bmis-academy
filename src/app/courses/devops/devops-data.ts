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
        { number: 1, title: 'Images & Containers', subtitle: 'Comprendre Docker en profondeur - layers, caching, multi-stage builds', route: 'images-et-containers' },
        { number: 2, title: 'Volumes & Networking', subtitle: 'Persistance des données et communication inter-conteneurs', route: 'volumes-et-networking' },
      ]
    },
    {
      title: 'Kubernetes - Fondamentaux',
      icon: 'cpu',
      lessons: [
        { number: 3, title: 'Environnement & Outils', subtitle: 'kubectl, Kind et mise en place du cluster local', route: 'environnement-et-outils' },
        { number: 4, title: 'Architecture Kubernetes', subtitle: 'Control Plane, Worker Nodes et Pods', route: 'architecture-kubernetes' },
        { number: 5, title: 'Workloads', subtitle: 'Deployments, StatefulSets, DaemonSets et Jobs', route: 'workloads' },
        { number: 6, title: 'Services & Ingress', subtitle: 'Exposer et router le trafic réseau', route: 'services-et-ingress' },
        { number: 7, title: 'ConfigMaps & Secrets', subtitle: 'Externaliser la configuration et protéger les données sensibles', route: 'configmaps-et-secrets' },
        { number: 8, title: 'Storage & Namespaces', subtitle: 'Volumes persistants et isolation logique', route: 'storage-et-namespaces' },
      ]
    },
    {
      title: 'Déploiement & CI/CD',
      icon: 'git-branch',
      lessons: [
        { number: 9, title: 'Déployer un Système Complet', subtitle: 'Architecture multi-composants sur Kubernetes', route: 'deployer-un-systeme-complet' },
        { number: 10, title: 'CI/CD - GitHub Actions', subtitle: 'Pipeline automatisé de build, test et déploiement', route: 'cicd-github-actions' },
      ]
    },
    {
      title: 'Observabilité',
      icon: 'activity',
      lessons: [
        { number: 11, title: 'Métriques - Prometheus & Grafana', subtitle: 'Monitoring, PromQL et dashboards', route: 'metriques-prometheus-grafana' },
        { number: 12, title: 'Logging & Alerting - ELK Stack', subtitle: 'Logs centralisés, Elasticsearch et alertes', route: 'logging-et-alerting-elk' },
      ]
    },
    {
      title: 'Réseau, Sécurité & Production',
      icon: 'shield',
      lessons: [
        { number: 13, title: 'Networking & Sécurité', subtitle: 'Network Policies, RBAC et Pod Security', route: 'networking-et-securite' },
        { number: 14, title: 'CDN & Distribution', subtitle: 'Performance, caching et distribution globale', route: 'cdn-et-distribution' },
        { number: 15, title: 'Bonnes Pratiques Production', subtitle: 'Scaling, résilience, SLO et zero-downtime', route: 'bonnes-pratiques-production' },
      ]
    },
    {
      title: 'Résilience & Chaos',
      icon: 'zap',
      lessons: [
        { number: 16, title: 'Chaos Engineering', subtitle: 'Tester la résilience en production avec Chaos Mesh', route: 'chaos-engineering' },
      ]
    },
    {
      title: 'Mise en œuvre : Migration de l\'environnement DeleevX sur K8s',
      icon: 'server',
      lessons: [
        { number: 17, title: 'Structure & Dockerisation', subtitle: 'Organisation du projet et Dockerfiles production-grade', route: 'structure-et-dockerisation' },
        { number: 18, title: 'Installation K3s & Kustomize', subtitle: 'Cluster k3s sur VPS, namespaces et structure Kustomize', route: 'installation-k3s-et-kustomize' },
        { number: 19, title: 'Manifestes, Secrets & PVC', subtitle: 'Deployments, Services, PostgreSQL, Redis et Sealed Secrets', route: 'manifestes-secrets-et-pvc' },
        { number: 20, title: 'Ingress HTTPS & GitOps Flux CD', subtitle: 'cert-manager, Let\'s Encrypt, K3s et synchronisation automatique', route: 'ingress-https-et-gitops' },
        { number: 21, title: 'Autoscaling & Observabilité', subtitle: 'HPA, Prometheus, Grafana et métriques Spring Boot', route: 'autoscaling-et-observabilite' },
        { number: 22, title: 'Logging centralisé', subtitle: 'stdout, Loki, Promtail et requêtes LogQL', route: 'logging-centralise' },
        { number: 23, title: 'CI/CD Pipeline', subtitle: 'GitHub Actions, Kustomize et déploiement multi-environnements', route: 'cicd-pipeline' },
        { number: 24, title: 'Hardening Production', subtitle: 'Quotas, Secrets, NetworkPolicies et rate limiting', route: 'hardening-production' },
      ]
    },
  ]
};
