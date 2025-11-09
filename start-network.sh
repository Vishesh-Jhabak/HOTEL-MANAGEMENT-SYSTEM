#!/bin/bash
echo "Starting JAVA HOTEL MANAGEMENT SYSTEM (Network Access)..."
echo "=========================================================="

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Get local IP address
LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
if [ -z "$LOCAL_IP" ]; then
    LOCAL_IP=$(hostname -I | awk '{print $1}')
fi

echo "🌐 Your local IP address: $LOCAL_IP"
echo ""

# Build the project first
echo "📦 Building the project..."
mvn clean install -DskipTests

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo "✅ Build successful! Starting services..."
echo ""

# Create logs directory if it doesn't exist
mkdir -p logs

# Start backend services (accessible on all network interfaces)
echo "🔧 Starting backend services (Network Access)..."
echo "   Auth Service on http://0.0.0.0:8081 (http://$LOCAL_IP:8081)"
mvn spring-boot:run -pl auth-service > logs/auth-service.log 2>&1 &
AUTH_PID=$!

echo "   Booking Service on http://0.0.0.0:8082 (http://$LOCAL_IP:8082)"
mvn spring-boot:run -pl booking-service > logs/booking-service.log 2>&1 &
BOOKING_PID=$!

echo "   Room Service on http://0.0.0.0:8083 (http://$LOCAL_IP:8083)"
mvn spring-boot:run -pl room-service > logs/room-service.log 2>&1 &
ROOM_PID=$!

echo "   Analytics Service on http://0.0.0.0:8084 (http://$LOCAL_IP:8084)"
mvn spring-boot:run -pl analytics-service > logs/analytics-service.log 2>&1 &
ANALYTICS_PID=$!

# Wait for services to start
echo ""
echo "⏳ Waiting for backend services to start (30 seconds)..."
sleep 30

# Check if services are running
echo ""
echo "🔍 Checking service health..."
curl -s http://localhost:8081/actuator/health > /dev/null && echo "✅ Auth Service: Running" || echo "❌ Auth Service: Failed"
curl -s http://localhost:8082/actuator/health > /dev/null && echo "✅ Booking Service: Running" || echo "❌ Booking Service: Failed"
curl -s http://localhost:8083/actuator/health > /dev/null && echo "✅ Room Service: Running" || echo "❌ Room Service: Failed"
curl -s http://localhost:8084/actuator/health > /dev/null && echo "✅ Analytics Service: Running" || echo "❌ Analytics Service: Failed"

# Start frontend (network access enabled)
echo ""
echo "🎨 Starting frontend (Network Access)..."
cd web-frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

echo "   Frontend on http://0.0.0.0:5999 (http://$LOCAL_IP:5999)"
npm run dev -- --host > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!

cd ..

echo ""
echo "🎉 All services started successfully!"
echo ""
echo "📱 Access Points (Localhost):"
echo "   Web Interface: http://localhost:5999"
echo "   Auth Service: http://localhost:8081"
echo "   Booking Service: http://localhost:8082"
echo "   Room Service: http://localhost:8083"
echo "   Analytics Service: http://localhost:8084"
echo ""
echo "🌐 Access Points (Network - Other Devices):"
echo "   Web Interface: http://$LOCAL_IP:5999"
echo "   Auth Service: http://$LOCAL_IP:8081"
echo "   Booking Service: http://$LOCAL_IP:8082"
echo "   Room Service: http://$LOCAL_IP:8083"
echo "   Analytics Service: http://$LOCAL_IP:8084"
echo ""
echo "📚 API Documentation:"
echo "   - Auth: http://$LOCAL_IP:8081/swagger-ui/index.html"
echo "   - Booking: http://$LOCAL_IP:8082/swagger-ui/index.html"
echo "   - Room: http://$LOCAL_IP:8083/swagger-ui/index.html"
echo "   - Analytics: http://$LOCAL_IP:8084/swagger-ui/index.html"
echo ""
echo "🔐 Demo Login: admin1 / password"
echo ""
echo "⚠️  Network Access: Make sure your firewall allows these ports!"
echo "   Ports: 5999, 8081, 8082, 8083, 8084"
echo ""
echo "📁 Logs: logs/ directory"
echo "🛑 To stop: ./stop-all.sh or kill the PIDs above"
echo ""

# Keep script running
wait

