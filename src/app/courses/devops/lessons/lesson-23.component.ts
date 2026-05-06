import { Component, inject } from '@angular/core';
import { LessonPageComponent } from '../../../shared/components/lesson-page.component';
import { QuizComponent, QuizQuestion } from '../../../shared/components/quiz.component';
import { CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-lesson-23',
  imports: [LessonPageComponent, QuizComponent],
  templateUrl: './lesson-23.component.html'
})
export class Lesson23Component {
  data = inject(CourseService).getLessonNav('devops', 23)!;

  backendWorkflow = `name: Backend — Build & Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE: ghcr.io/\${{ github.repository_owner }}/deleevx-backend

jobs:

  # ── JOB 1 : Tests
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 21
          cache: maven
      - run: ./mvnw verify -B

  # ── JOB 2 : Build & Push image
  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'push'
    permissions:
      contents: read
      packages: write
    outputs:
      tag: \${{ steps.tag.outputs.TAG }}
    steps:
      - uses: actions/checkout@v4

      - uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Définir le tag image (SHA court)
        id: tag
        run: |
          PREFIX=$([ "$GITHUB_REF_NAME" = "main" ] && echo "v" || echo "develop-")
          echo "TAG=\${PREFIX}$(echo $GITHUB_SHA | head -c 7)" >> $GITHUB_OUTPUT

      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ env.IMAGE }}:\${{ steps.tag.outputs.TAG }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # ── JOB 3 : Mettre à jour repo-infra (develop → dev + staging)
  update-infra-dev:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
      - name: Checkout repo-infra
        uses: actions/checkout@v4
        with:
          repository: ITCloud-Consulting/repo-infra
          token: \${{ secrets.INFRA_REPO_TOKEN }}
          ref: main

      - name: Mettre à jour les overlays development et staging
        run: |
          TAG=\${{ needs.build.outputs.tag }}
          for ENV in development staging; do
            cd apps/overlays/$ENV/backend
            kustomize edit set image \${{ env.IMAGE }}=\${{ env.IMAGE }}:$TAG
            cd -
          done

      - name: Commit & push repo-infra
        run: |
          git config user.name  "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add apps/overlays/development/backend/kustomization.yaml \\
                  apps/overlays/staging/backend/kustomization.yaml
          git commit -m "chore(backend/dev+staging): deploy \${{ needs.build.outputs.tag }}"
          git push
      # Flux détecte le commit et déploie sur deleevx-dev et deleevx-staging

  # ── JOB 4 : Mettre à jour repo-infra (main → prod, approbation manuelle)
  update-infra-prod:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - name: Checkout repo-infra
        uses: actions/checkout@v4
        with:
          repository: ITCloud-Consulting/repo-infra
          token: \${{ secrets.INFRA_REPO_TOKEN }}
          ref: main

      - name: Mettre à jour l'overlay production
        run: |
          TAG=\${{ needs.build.outputs.tag }}
          cd apps/overlays/production/backend
          kustomize edit set image \${{ env.IMAGE }}=\${{ env.IMAGE }}:$TAG

      - name: Commit & push repo-infra
        run: |
          git config user.name  "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add apps/overlays/production/backend/kustomization.yaml
          git commit -m "chore(backend/prod): deploy \${{ needs.build.outputs.tag }}"
          git push
      # Flux détecte le commit et déploie sur deleevx-prod`;

  frontendWorkflow = `name: Frontend — Build & Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE: ghcr.io/\${{ github.repository_owner }}/deleevx-frontend

jobs:

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run test -- --watch=false --browsers=ChromeHeadless

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'push'
    permissions:
      contents: read
      packages: write
    outputs:
      tag: \${{ steps.tag.outputs.TAG }}
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - name: Définir le tag image
        id: tag
        run: |
          PREFIX=$([ "$GITHUB_REF_NAME" = "main" ] && echo "v" || echo "develop-")
          echo "TAG=\${PREFIX}$(echo $GITHUB_SHA | head -c 7)" >> $GITHUB_OUTPUT
      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ env.IMAGE }}:\${{ steps.tag.outputs.TAG }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  update-infra-dev:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
      - uses: actions/checkout@v4
        with:
          repository: ITCloud-Consulting/repo-infra
          token: \${{ secrets.INFRA_REPO_TOKEN }}
          ref: main
      - name: Mettre à jour les overlays frontend
        run: |
          TAG=\${{ needs.build.outputs.tag }}
          for ENV in development staging; do
            cd apps/overlays/$ENV/frontend
            kustomize edit set image \${{ env.IMAGE }}=\${{ env.IMAGE }}:$TAG
            cd -
          done
      - run: |
          git config user.name  "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add apps/overlays/development/frontend/kustomization.yaml \\
                  apps/overlays/staging/frontend/kustomization.yaml
          git commit -m "chore(frontend/dev+staging): deploy \${{ needs.build.outputs.tag }}"
          git push

  update-infra-prod:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/checkout@v4
        with:
          repository: ITCloud-Consulting/repo-infra
          token: \${{ secrets.INFRA_REPO_TOKEN }}
          ref: main
      - name: Mettre à jour l'overlay frontend production
        run: |
          TAG=\${{ needs.build.outputs.tag }}
          cd apps/overlays/production/frontend
          kustomize edit set image \${{ env.IMAGE }}=\${{ env.IMAGE }}:$TAG
      - run: |
          git config user.name  "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add apps/overlays/production/frontend/kustomization.yaml
          git commit -m "chore(frontend/prod): deploy \${{ needs.build.outputs.tag }}"
          git push`;

  quiz: QuizQuestion[] = [
    {
      q: 'Dans un pipeline GitHub Actions, pourquoi build et push l image Docker AVANT de deployer sur Kubernetes ?',
      options: [
        'Pour verifier que le code compile',
        'Parce que Kubernetes ne peut deployer que des images deja disponibles dans un registry (GHCR, Docker Hub...)',
        'Parce que GitHub Actions ne peut pas acceder au cluster directement',
        'Pour economiser de la bande passante',
      ],
      correct: 1,
      explanation:
        'Le kubelet du noeud doit pouvoir pull l image specifiee dans le Deployment. Si l image n est pas dans un registry accessible, le pod reste en ImagePullBackOff.',
    },
    {
      q: 'Comment Kubernetes met-il a jour un Deployment sans interruption de service ?',
      options: [
        'Il arrete tous les anciens pods puis demarre les nouveaux',
        'Il utilise un Rolling Update : creation progressive des nouveaux pods et suppression des anciens, en maintenant le nombre minimum de pods disponibles',
        'Il redirige le trafic vers un autre cluster pendant la mise a jour',
        'Il met le Service en mode maintenance',
      ],
      correct: 1,
      explanation:
        'La strategie RollingUpdate cree de nouveaux pods avec la nouvelle image, attend qu ils soient Ready (readinessProbe OK), puis supprime les anciens progressivement. Le Service route automatiquement vers les pods Ready.',
    },
    {
      q: 'Dans le pipeline CI/CD avec repo-infra, que fait concrètement la CI après avoir construit l\'image Docker ?',
      options: [
        'Elle exécute kubectl apply -k sur le cluster directement',
        'Elle clone repo-infra, met à jour le newTag dans l\'overlay concerné avec kustomize edit set image, committe et pousse — Flux détecte le changement et déploie',
        'Elle copie les manifestes dans le repo applicatif',
        'Elle envoie une notification à Kubernetes pour déclencher un redéploiement',
      ],
      correct: 1,
      explanation:
        'La CI ne parle jamais directement au cluster. Elle met à jour repo-infra (la source de vérité GitOps). Flux CD, qui surveille repo-infra en continu, détecte le nouveau tag et applique le rolling update. Le cluster n\'est jamais exposé à internet pour les déploiements.',
    },
    {
      q: 'Pourquoi le pipeline CI/CD a-t-il besoin d\'un secret INFRA_REPO_TOKEN distinct du GITHUB_TOKEN automatique ?',
      options: [
        'Parce que GITHUB_TOKEN est trop puissant et doit être remplacé',
        'Parce que GITHUB_TOKEN n\'a accès qu\'au repo courant — pour écrire dans repo-infra depuis repo-backend ou repo-frontend, un PAT ou GitHub App Token avec droits Write sur repo-infra est nécessaire',
        'Pour des raisons de performance uniquement',
        'Parce que Flux ne reconnaît que les tokens personnels',
      ],
      correct: 1,
      explanation:
        'GitHub Actions génère automatiquement un GITHUB_TOKEN scoped au repo du workflow. Pour écrire dans un autre repo (repo-infra), un token séparé est obligatoire. Préférez un GitHub App Token en production : il est lié à l\'organisation et ne dépend pas d\'un compte personnel.',
    },
    {
      q: 'Comment sont securisees les cles d API (KUBECONFIG, GHCR token) dans GitHub Actions ?',
      options: [
        'En les encodant en base64 dans le fichier workflow',
        'En les stockant dans les Secrets GitHub du depot et en les referencant avec ${{ secrets.NOM_SECRET }} dans le workflow',
        'En les chiffrant dans le code source',
        'GitHub Actions les detecte et les securise automatiquement',
      ],
      correct: 1,
      explanation:
        'GitHub Secrets sont chiffres au repos et masques dans les logs du pipeline. Ils ne sont jamais exposes dans le code, les logs ou les PR. C est le mecanisme standard pour les tokens et cles sensibles.',
    },
  ];
}