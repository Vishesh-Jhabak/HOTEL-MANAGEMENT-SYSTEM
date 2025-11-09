#!/bin/bash
echo "Stopping JAVA HOTEL MANAGEMENT SYSTEM..."

# Kill all Java processes (Spring Boot services)
echo "Stopping backend services..."
pkill -f "spring-boot:run"

# Kill Node.js processes (React dev server)
echo "Stopping frontend service..."
pkill -f "npm run dev"
pkill -f "vite"

# Kill processes on specific ports
echo "Killing processes on ports 8081-8084 and 5173..."
lsof -ti:8081 | xargs kill -9 2>/dev/null || true
lsof -ti:8082 | xargs kill -9 2>/dev/null || true
lsof -ti:8083 | xargs kill -9 2>/dev/null || true
lsof -ti:8084 | xargs kill -9 2>/dev/null || true
lsof -ti:5173 | xargs kill -9 2>/dev/null || true

echo "✅ All services stopped successfully!"
echo "You can now run ./start-all.sh to start the system again."
