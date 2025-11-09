# Cloud Deployment Guide

## Prerequisites
- Java 17+, Node 20+
- Docker and Docker Compose
- Cloud: AWS account, ECR, EKS (or ECS Fargate), Route53, ACM
- CI/CD: GitHub Actions with OIDC to AWS

## Build Artifacts
- Backend services: container images (auth, booking, room)
- Frontend: static build served by Nginx (image)

## Local Docker
```bash
docker compose build
docker compose up -d
```

## AWS ECR
1. Create repositories: auth-service, booking-service, room-service, web-frontend
2. Push images:
```bash
docker build -t $ACCOUNT.dkr.ecr.$REG.amazonaws.com/auth-service:$(git rev-parse --short HEAD) auth-service
# repeat for other modules
```

## Kubernetes (EKS)
- Create cluster via eksctl or AWS Console
- Apply manifests (example skeleton):
```bash
kubectl create ns hotel
kubectl apply -f k8s/postgres.yml -n hotel
kubectl apply -f k8s/auth-service.yml -n hotel
kubectl apply -f k8s/booking-service.yml -n hotel
kubectl apply -f k8s/room-service.yml -n hotel
kubectl apply -f k8s/web-frontend.yml -n hotel
```
- Use AWS Load Balancer Controller for Ingress + ACM TLS

## GitHub Actions (CI/CD)
- Build on push to main
- Login to ECR, build, push, then `kubectl set image` against EKS

## Secrets & Config
- Store JWT secrets and DB creds in AWS Secrets Manager/SSM
- Mount via Kubernetes Secrets and Env Vars

## Observability
- Use CloudWatch, or Grafana/Prometheus stack in-cluster
- Add health checks on `/actuator/health`

## Notes
- For dev, services use H2. For prod, set PostgreSQL URLs via env vars
- Enforce HTTPS at the Ingress (ACM cert)


