# bmis-academy — Supports de cours

> Plateforme e-learning professionnelle pour les développeurs — **bmis-academy**

---

## À propos

**bmis-academy** est une plateforme de formation e-learning destinée aux développeurs souhaitant monter en compétences, que ce soit sur des technologies backend, frontend, DevOps ou sur des concepts d'architecture logicielle transverses.

Les supports de cours sont conçus et rédigés par **Gilles Kemgoum**, avec un accent sur la pratique, la clarté pédagogique et l'applicabilité directe en entreprise.

---

## Catalogue des cours

### Backend — Java / Spring Boot

| Cours | Description | Niveau |
|---|---|---|
| **De Développeur à Architecte Backend** *(disponible)* | Clean Architecture, microservices, Kafka, Docker, Kubernetes, CQRS, SAGA, observabilité | Intermédiaire → Avancé |
| Spring Boot Fondamentaux *(à venir)* | IoC, REST, JPA, sécurité de base | Débutant |
| Spring Security & Auth avancée *(à venir)* | OAuth2, OIDC, JWT, Keycloak | Avancé |
| Spring Batch & Scheduling *(à venir)* | Traitements batch, pipelines de données | Intermédiaire |

### Frontend — Angular

| Cours | Description | Niveau |
|---|---|---|
| Angular Fondamentaux *(à venir)* | Composants, services, routing, RxJS | Débutant |
| Angular Architecture d'entreprise *(à venir)* | Nx, mono-repo, state management (NgRx), lazy loading | Avancé |
| Angular + Spring Boot Full Stack *(à venir)* | Intégration complète, auth, déploiement | Intermédiaire |

### DevOps & Cloud

| Cours | Description | Niveau |
|---|---|---|
| Docker & Kubernetes pratique *(à venir)* | Conteneurisation, orchestration, Helm | Intermédiaire |
| CI/CD avec GitHub Actions *(à venir)* | Pipelines automatisés, tests, déploiement continu | Intermédiaire |
| Observabilité & Monitoring *(à venir)* | Prometheus, Grafana, Jaeger, OpenTelemetry | Avancé |

### Architecture Logicielle

| Cours | Description | Niveau |
|---|---|---|
| Clean Architecture & DDD *(à venir)* | Domain-Driven Design, use cases, bounded contexts | Avancé |
| Patterns de conception *(à venir)* | GoF, patterns d'intégration, anti-patterns | Intermédiaire |
| Architecture des systèmes distribués *(à venir)* | CAP, eventual consistency, event sourcing | Avancé |

---

## Structure du dépôt

Chaque cours est organisé dans son propre dossier :

```
bmis-academy/
├── java-architecte-backend/
│   ├── cours-architecte-backend.html   # Support interactif (HTML autonome)
│   └── ...
├── angular-fondamentaux/               # (à venir)
├── devops-docker-kubernetes/           # (à venir)
└── README.md
```

> Ce dépôt est actuellement en démarrage — le premier cours **"De Développeur à Architecte Backend"** est disponible.

---

## Format des supports

Chaque support de cours est un **fichier HTML autonome** — aucun serveur ni build nécessaire. Il suffit de l'ouvrir dans un navigateur.

**Fonctionnalités communes :**
- Navigation rapide par chapitre (barre sticky)
- Barre de progression de lecture
- Coloration syntaxique adaptée à la technologie enseignée
- Bouton "Copier" sur chaque bloc de code
- Glossaire des termes clés
- Optimisé pour l'impression PDF

---

## Stack technique des supports

| Outil | Rôle |
|---|---|
| HTML5 / CSS3 | Support de cours interactif |
| [Highlight.js](https://highlightjs.org/) | Coloration syntaxique (Java, TypeScript, YAML, Dockerfile…) |
| [Google Fonts](https://fonts.google.com/) | Typographie (Inter, Source Serif 4, JetBrains Mono) |
| Node.js + pdf-parse | Extraction de contenu depuis des sources PDF |

---

## Auteur

**Gilles Kemgoum**
Formateur, Architecte Logiciel & fondateur de bmis-academy

---

## Licence

© 2026 bmis-academy — Gilles Kemgoum. Tous droits réservés.
Les supports sont destinés à un usage pédagogique dans le cadre de bmis-academy. Toute reproduction ou redistribution sans autorisation est interdite.
