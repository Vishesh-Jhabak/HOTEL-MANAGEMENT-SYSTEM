#!/bin/bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "[dev] Building backend modules..."
cd "$ROOT_DIR"
mvn -q -DskipTests clean install

echo "[dev] Stopping any previous dev processes..."
pkill -f "spring-boot:run" || true
pkill -f "vite" || true

mkdir -p "$ROOT_DIR/.logs"

echo "[dev] Starting auth-service (dev)..."
cd "$ROOT_DIR/auth-service"
nohup mvn -q -Dspring-boot.run.profiles=dev spring-boot:run > "$ROOT_DIR/.logs/auth-service.log" 2>&1 &

echo "[dev] Starting booking-service (dev)..."
cd "$ROOT_DIR/booking-service"
nohup mvn -q -Dspring-boot.run.profiles=dev spring-boot:run > "$ROOT_DIR/.logs/booking-service.log" 2>&1 &

echo "[dev] Starting room-service (dev)..."
cd "$ROOT_DIR/room-service"
nohup mvn -q -Dspring-boot.run.profiles=dev spring-boot:run > "$ROOT_DIR/.logs/room-service.log" 2>&1 &

echo "[dev] Starting React dev server on port 5999..."
cd "$ROOT_DIR/web-frontend"
nohup npm run -s dev > "$ROOT_DIR/.logs/web-frontend.log" 2>&1 &

echo "[dev] Services launching. Logs in $ROOT_DIR/.logs"
echo "[dev] UI:        http://localhost:5999"
echo "[dev] Auth API:  http://localhost:8081/swagger-ui/index.html"
echo "[dev] Bookings:  http://localhost:8082/swagger-ui/index.html"
echo "[dev] Rooms:     http://localhost:8083/swagger-ui/index.html"


