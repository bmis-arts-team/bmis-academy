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

  deployDevWorkflow = `name: Build and Deploy to Dev

# Déclenché uniquement sur push vers develop.
# Les PRs et autres branches ne déploient pas sur le cluster.
on:
  push:
    branches:
      - develop

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ITCloud-Consulting/deleevx-backend

jobs:

  build-and-push:
    name: Build Docker image
    runs-on: ubuntu-latest

    # Nécessaire pour pousser sur GHCR avec le token GitHub Actions
    permissions:
      contents: read
      packages: write

    outputs:
      # Expose le tag à l'étape suivante (update-infra)
      image_tag: \${{ steps.meta.outputs.version }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Extract image metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}
          tags: |
            # Tag : "develop-abc1234" — branche + sha court = immutable et traçable
            type=sha,prefix=develop-,format=short

      - name: Build and push image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          # Cache les layers Docker entre les runs — builds plus rapides
          cache-from: type=gha
          cache-to: type=gha,mode=max

  update-infra:
    name: Update dev overlay in repo-infra
    runs-on: ubuntu-latest
    needs: build-and-push   # Ne s'exécute que si le build a réussi

    # Nécessaire pour écrire dans repo-infra via le token
    permissions:
      contents: read

    steps:
      - name: Checkout repo-infra
        uses: actions/checkout@v4
        with:
          # Clone repo-infra, pas le repo courant (repo-backend)
          repository: ITCloud-Consulting/repo-infra
          # Token avec droits Write sur repo-infra (stocké dans les secrets)
          token: \${{ secrets.INFRA_REPO_TOKEN }}
          ref: main

      - name: Update image tag in development overlay
        run: |
          NEW_TAG="\${{ needs.build-and-push.outputs.image_tag }}"

          # Mise à jour du tag dans le kustomization.yaml de l'overlay dev
          sed -i "s|newTag:.*|newTag: \${NEW_TAG}|" \\
            apps/overlays/development/backend/kustomization.yaml

          echo "Image tag mis à jour : \${NEW_TAG}"

      - name: Commit and push
        run: |
          git config user.name  "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add apps/overlays/development/backend/kustomization.yaml
          git commit -m "chore(dev): deploy backend \${{ needs.build-and-push.outputs.image_tag }}"
          git push`;

  quiz: QuizQuestion[] = [
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
      q: 'Pourquoi configure-t-on un second Ingress dédié pour les routes SSE plutôt que de modifier l\'Ingress principal ?',
      options: [
        'Parce que Kubernetes limite le nombre de routes par Ingress',
        'Parce que les annotations NGINX (proxy-buffering, timeout) s\'appliquent à toutes les routes de l\'Ingress : désactiver le buffering globalement dégraderait les performances du frontend et des API REST',
        'Pour éviter les conflits de certificats TLS',
        'Pour des raisons de sécurité uniquement',
      ],
      correct: 1,
      explanation:
        'Un Ingress = un ensemble d\'annotations appliquées à toutes ses routes. proxy-buffering: off est nécessaire pour SSE mais inutile (voire mauvais) pour les autres endpoints. Un Ingress séparé isole la configuration.',
    },
    {
      q: 'Pourquoi les domaines ne sont-ils pas définis dans base/ingress.yaml mais dans les overlays ?',
      options: [
        'Parce que les Ingress ne supportent pas les noms de domaine dans la base',
        'Parce que base/ est commun à tous les environnements : coder les URLs de prod en dur dans la base serait faux pour dev et staging',
        'Pour des raisons de performance DNS',
        'Parce que cert-manager ne peut pas lire les hosts dans la base',
      ],
      correct: 1,
      explanation:
        'La base définit la structure (services cibles, annotations). Chaque overlay patche les hosts avec ses propres domaines : dev.deleevx.com pour dev, staging.deleevx.com pour staging, deleevx.com pour prod.',
    },
    {
      q: 'Qu\'est-ce que GitOps avec Flux CD apporte concrètement par rapport à kubectl apply manuel ?',
      options: [
        'Des déploiements plus rapides uniquement',
        'Flux synchronise automatiquement l\'état du cluster avec la branche main — tout changement dans Git est appliqué automatiquement, toute dérive manuelle est détectée et corrigée. L\'audit trail est dans Git.',
        'Une interface graphique pour gérer les déploiements',
        'La possibilité de déployer sans Kubernetes',
      ],
      correct: 1,
      explanation:
        'Avec GitOps, Git est la source de vérité unique. Si quelqu\'un modifie un pod manuellement (kubectl edit), Flux le détecte et revert. Chaque déploiement est tracé dans l\'historique Git : qui, quoi, quand. kubectl apply manuel est imprévisible et non auditable.',
    },
    {
      q: 'Quelle est la particularité critique de K3s concernant le stockage de l\'état du cluster ?',
      options: [
        'K3s utilise MongoDB pour stocker l\'état du cluster',
        'K3s utilise SQLite par défaut (pas etcd) — le fichier state.db doit être sauvegardé régulièrement car sa perte entraîne la perte de l\'état complet du cluster',
        'K3s ne stocke pas d\'état — il est stateless',
        'K3s utilise PostgreSQL comme backend de stockage',
      ],
      correct: 1,
      explanation:
        'Contrairement aux clusters cloud qui utilisent etcd avec HA, K3s utilise SQLite par défaut (/var/lib/rancher/k3s/server/db/state.db). Ce fichier et la clé Sealed Secrets sont les deux points de défaillance critiques sur un VPS — automatisez leur sauvegarde.',
    },
    {
      q: 'Dans un pipeline GitOps, pourquoi la CI met-elle à jour un fichier dans repo-infra plutôt que d\'appliquer kubectl apply directement sur le cluster ?',
      options: [
        'Parce que kubectl n\'est pas disponible dans GitHub Actions',
        'Parce que le cluster n\'a pas besoin d\'être exposé à internet — il tire ses déploiements depuis Git (pull). La CI fait une seule chose : commiter le nouveau tag. Flux détecte le changement et applique. Git reste la seule source de vérité.',
        'Pour des raisons de performance uniquement',
        'Parce que Flux ne supporte pas kubectl',
      ],
      correct: 1,
      explanation:
        'Le pattern GitOps inverse le flux : au lieu que la CI pousse des déploiements vers le cluster (push), c\'est le cluster qui tire depuis Git (pull). Avantages : le cluster n\'est pas exposé à l\'extérieur, tout déploiement est tracé dans l\'historique Git, et toute dérive manuelle est détectée et corrigée par Flux.',
    },
  ];
}