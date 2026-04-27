# JAVA HOTEL MANAGEMENT SYSTEM
## Next-Generation Hospitality Platform

A comprehensive, enterprise-ready hotel management system built with Spring Boot microservices architecture and modern React frontend. Features real-time data synchronization, role-based access control, and advanced analytics.

## 🏨 System Overview

The JAVA HOTEL MANAGEMENT SYSTEM is a complete solution for modern hotel operations, featuring:

- **Multi-Role Dashboard System**: Admin, Manager, Reception, Housekeeping, and Guest interfaces
- **Real-Time Data Synchronization**: Live updates across all user roles
- **Advanced Analytics**: Revenue tracking, occupancy analysis, and performance metrics
- **Comprehensive Service Management**: Room service, maintenance, concierge, and guest services
- **Modern UI/UX**: Responsive design with dark/light themes and gradient backgrounds
- **Indian Localization**: Rupee currency formatting and Indian number system

## 🚀 Quick Start

### Prerequisites
- **Java 17+** (OpenJDK recommended)
- **Maven 3.9+** 
- **Node.js 18+** (with npm)
- **Docker** (optional, for containerized deployment)
- **Git** (for cloning the repository)

### 📋 Step-by-Step Setup Instructions

#### 1. **Clone the Repository**
```bash
git clone <repository-url>
cd HOTEL-MANAGEMENT-SYSTEM
```

#### 2. **Backend Setup (Spring Boot Services)**

**Build all microservices:**
```bash
# Build all services
mvn clean install

# Verify build success (should see "BUILD SUCCESS")
```

**Start Backend Services (Choose one method):**

**Method A: Start All Services at Once**
```bash
# Start all Spring Boot services
mvn spring-boot:run -pl auth-service &
mvn spring-boot:run -pl booking-service &
mvn spring-boot:run -pl room-service &
mvn spring-boot:run -pl analytics-service &
```

**Method B: Start Services Individually (Recommended for Development)**
```bash
# Terminal 1 - Auth Service
mvn -pl auth-service spring-boot:run

# Terminal 2 - Booking Service  
mvn -pl booking-service spring-boot:run

# Terminal 3 - Room Service
mvn -pl room-service spring-boot:run

# Terminal 4 - Analytics Service
mvn -pl analytics-service spring-boot:run
```

**Verify Backend Services:**
- Auth Service: http://localhost:8081/actuator/health
- Booking Service: http://localhost:8082/actuator/health
- Room Service: http://localhost:8083/actuator/health
- Analytics Service: http://localhost:8084/actuator/health

#### 3. **Frontend Setup (React Application)**

**Navigate to frontend directory:**
```bash
cd web-frontend
```

**Install dependencies:**
```bash
npm install
```

**Start the development server:**
```bash
npm run dev
```

**Verify Frontend:**
- Web Interface: http://localhost:5173 (Vite default port)
- The application should open automatically in your browser

#### 4. **Access the Complete System**

**Main Application URLs:**
- **Web Interface**: http://localhost:5173
- **API Documentation (Swagger UI)**:
  - Auth Service: http://localhost:8081/swagger-ui/index.html
  - Booking Service: http://localhost:8082/swagger-ui/index.html
  - Room Service: http://localhost:8083/swagger-ui/index.html
  - Analytics Service: http://localhost:8084/swagger-ui/index.html

### 🔐 Login Credentials

**Demo User Accounts:**
- **Admin**: `admin1` / `password`
- **Manager**: `mgr1` / `password`  
- **Reception**: `rec1` / `password`
- **Housekeeping**: `hk1` / `password`
- **Guest**: `guest1` / `password`

### 🐳 Docker Deployment (Alternative)

**For containerized deployment:**
```bash
# Build and start all services
docker compose build
docker compose up -d

# Check running containers
docker compose ps

# View logs
docker compose logs -f
```

**Docker Access:**
- Web Interface: http://localhost:5999
- All backend services run on their respective ports

## 👥 User Roles & Features

### 🔐 Authentication System

**Demo Login Credentials**:
- **Admin**: `admin1` / `password`
- **Manager**: `mgr1` / `password`
- **Reception**: `rec1` / `password`
- **Housekeeping**: `hk1` / `password`
- **Guest**: `guest1` / `password`

### 🎯 Admin Dashboard

**Core Features**:
- ✅ **User Management**: Create, edit, delete users with role assignment
- ✅ **System Settings**: Hotel information, notifications, maintenance mode
- ✅ **Analytics Dashboard**: Revenue tracking, occupancy rates, guest satisfaction
- ✅ **Notifications**: System updates, inventory alerts, maintenance requests
- ✅ **Real-Time Monitoring**: Live system status and performance metrics

**Quick Actions**:
- Manage Users with full CRUD operations
- Configure system settings and preferences
- View comprehensive reports and analytics
- Handle system notifications and alerts

### 📊 Manager Dashboard

**Core Features**:
- ✅ **Room Management**: Live room status, assignment, and maintenance tracking
- ✅ **Analytics Dashboard**: Revenue, occupancy, and guest analytics
- ✅ **Staff Management**: Performance tracking and schedule management
- ✅ **Reports**: Daily and weekly management reports
- ✅ **Real-Time Updates**: Live occupancy and revenue tracking

**Quick Actions**:
- Assign rooms to staff members
- Mark rooms as clean or schedule maintenance
- View live analytics and performance metrics
- Generate management reports

### 🏨 Reception Dashboard

**Core Features**:
- ✅ **Check-in/Check-out**: Complete guest processing with payment handling
- ✅ **Reservation Management**: Create and manage room reservations
- ✅ **Guest Search**: Find guests by multiple criteria
- ✅ **Room Availability**: Real-time room status and availability
- ✅ **Payment Processing**: Integrated billing and payment system

**Quick Actions**:
- Process guest check-ins with room assignment
- Handle check-outs with payment processing
- Create new reservations with room type selection
- Search and locate guests quickly

### 🧹 Housekeeping Dashboard

**Core Features**:
- ✅ **Room Cleaning Management**: Live room status and cleaning assignments
- ✅ **Supplies Management**: Inventory tracking and supply requests
- ✅ **Maintenance System**: Issue reporting and maintenance tracking
- ✅ **Task Management**: Cleaning schedules and staff assignments
- ✅ **Real-Time Updates**: Live room status synchronization

**Quick Actions**:
- Start and complete room cleaning tasks
- Request supplies and manage inventory
- Report maintenance issues with priority levels
- Track cleaning schedules and staff assignments

### 👤 Guest Dashboard

**Core Features**:
- ✅ **Service Requests**: Room service, maintenance, concierge services
- ✅ **Real-Time Status**: Live tracking of service requests
- ✅ **Feedback System**: Rating and review submission
- ✅ **Hotel Services**: Access to all hotel amenities and services
- ✅ **Booking System**: Room booking with payment processing

**Quick Actions**:
- Order room service and request amenities
- Report maintenance issues
- Book concierge services
- Submit feedback and ratings

## 🔄 Real-Time Data System

### Cross-Role Synchronization

The system features a comprehensive real-time data management system:

- **Guest Request** → **Housekeeping Task** → **Manager Analytics**
- **Room Status Changes** → **All Dashboards Update**
- **Task Completion** → **Room Availability Update**
- **Service Requests** → **Staff Notifications**

### Live Updates

- **Room Status**: Real-time across all roles
- **Task Progress**: Live task status updates
- **Service Requests**: Real-time request tracking
- **Analytics**: Live performance metrics

## 🏗️ Technical Architecture

### Backend Services

- **auth-service**: JWT-based authentication, role management
- **booking-service**: Reservation management, availability tracking
- **room-service**: Room inventory, status management
- **analytics-service**: Performance metrics, reporting
- **common**: Shared DTOs and utilities

### Frontend Technology

- **React 18**: Modern UI framework
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing

### Database

- **Development**: H2 in-memory database
- **Production**: PostgreSQL with JPA/Hibernate
- **Real-Time**: Context-based state management

## 📱 User Interface Features

### Design System

- **Modern UI**: Clean, professional interface
- **Responsive Design**: Works on all screen sizes
- **Dark Theme**: Consistent dark theme across all dashboards
- **Gradient Backgrounds**: Beautiful gradient backgrounds for each role
- **Indian Localization**: Rupee currency (₹) and Indian number formatting

### Interactive Elements

- **Modal Dialogs**: Functional modals for all operations
- **Form Validation**: Complete input validation and error handling
- **Real-Time Updates**: Live data synchronization
- **Status Indicators**: Visual status indicators for all states
- **Hover Effects**: Smooth hover animations and transitions

## 🎮 Feature Completeness

### ✅ All Features Working

**Admin Dashboard**:
- User management with full CRUD operations
- System settings with live updates
- Comprehensive analytics dashboard
- Notification management system

**Manager Dashboard**:
- Room management with real-time status
- Staff management and performance tracking
- Live analytics and reporting
- Task assignment and monitoring

**Reception Dashboard**:
- Complete check-in/check-out process
- Reservation management system
- Guest search and lookup
- Payment processing integration

**Housekeeping Dashboard**:
- Room cleaning management
- Supplies inventory system
- Maintenance issue reporting
- Task scheduling and tracking

**Guest Dashboard**:
- Service request system
- Real-time status tracking
- Feedback and rating system
- Hotel service access

## 🚀 Deployment

### 🏃‍♂️ Quick Start Scripts

**Create a startup script for easy development:**

**`start-all.sh` (Linux/Mac):**
```bash
#!/bin/bash
echo "Starting JAVA HOTEL MANAGEMENT SYSTEM..."

# Start backend services
echo "Starting backend services..."
mvn spring-boot:run -pl auth-service &
mvn spring-boot:run -pl booking-service &
mvn spring-boot:run -pl room-service &
mvn spring-boot:run -pl analytics-service &

# Wait for services to start
sleep 30

# Start frontend
echo "Starting frontend..."
cd web-frontend
npm run dev &

echo "All services started!"
echo "Web Interface: http://localhost:5173"
echo "API Docs: http://localhost:8081/swagger-ui/index.html"
```

**`start-all.bat` (Windows):**
```batch
@echo off
echo Starting JAVA HOTEL MANAGEMENT SYSTEM...

start "Auth Service" cmd /k "mvn -pl auth-service spring-boot:run"
start "Booking Service" cmd /k "mvn -pl booking-service spring-boot:run"
start "Room Service" cmd /k "mvn -pl room-service spring-boot:run"
start "Analytics Service" cmd /k "mvn -pl analytics-service spring-boot:run"

timeout /t 30

start "Frontend" cmd /k "cd web-frontend && npm run dev"

echo All services started!
echo Web Interface: http://localhost:5173
pause
```

### 🐳 Docker Deployment

**Production Docker Setup:**
```bash
# Build all services
docker compose build

# Start all services
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f

# Stop services
docker compose down
```

**Docker Access Points:**
- Web Interface: http://localhost:5999
- Auth Service: http://localhost:8081
- Booking Service: http://localhost:8082
- Room Service: http://localhost:8083
- Analytics Service: http://localhost:8084

### ☁️ Cloud Deployment

**AWS ECR/EKS Deployment:**
```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com

# Tag and push images
docker tag java-hotel-management-system:latest <account>.dkr.ecr.us-east-1.amazonaws.com/java-hotel-management-system:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/java-hotel-management-system:latest

# Deploy to EKS
kubectl apply -f k8s/
```

**Azure Container Instances:**
```bash
# Create resource group
az group create --name hotel-rg --location eastus

# Deploy container
az container create --resource-group hotel-rg --name hotel-app --image <image> --ports 8080 8081 8082 8083 8084
```

### 🔧 Environment Configuration

**Development Environment:**
```yaml
# application-dev.yml
spring:
  profiles:
    active: dev
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password: 
```

**Production Environment:**
```yaml
# application-prod.yml
spring:
  profiles:
    active: prod
  datasource:
    url: jdbc:postgresql://localhost:5432/hotel_db
    driver-class-name: org.postgresql.Driver
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
```

## 📊 API Documentation

Each service provides comprehensive API documentation:

- **Auth Service**: http://localhost:8081/swagger-ui/index.html
- **Booking Service**: http://localhost:8082/swagger-ui/index.html
- **Room Service**: http://localhost:8083/swagger-ui/index.html
- **Analytics Service**: http://localhost:8084/swagger-ui/index.html

## 🔧 Development

### Building
```bash
mvn clean install
```

### Running Individual Services
```bash
mvn -pl auth-service spring-boot:run
mvn -pl booking-service spring-boot:run
mvn -pl room-service spring-boot:run
mvn -pl analytics-service spring-boot:run
```

### Frontend Development
```bash
cd web-frontend
npm install
npm run dev
```

## 🛠️ Troubleshooting

### Common Issues & Solutions

#### **Backend Issues**

**1. Port Already in Use Error**
```bash
# Check what's using the port
lsof -i :8081
lsof -i :8082
lsof -i :8083
lsof -i :8084

# Kill the process
kill -9 <PID>

# Or use different ports by updating application.yml files
```

**2. Maven Build Failures**
```bash
# Clean and rebuild
mvn clean install -U

# Skip tests if needed
mvn clean install -DskipTests

# Check Java version
java -version
mvn -version
```

**3. Service Won't Start**
```bash
# Check logs
mvn -pl auth-service spring-boot:run -X

# Verify database connection (H2 should start automatically)
# Check application.yml configuration
```

#### **Frontend Issues**

**1. npm install Fails**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Use specific Node version
nvm use 18
```

**2. Frontend Won't Start**
```bash
# Check if port 5173 is available
lsof -i :5173

# Try different port
npm run dev -- --port 3000

# Check for TypeScript errors
npm run build
```

**3. API Connection Issues**
```bash
# Verify backend services are running
curl http://localhost:8081/actuator/health
curl http://localhost:8082/actuator/health
curl http://localhost:8083/actuator/health
curl http://localhost:8084/actuator/health

# Check CORS settings in backend
# Verify API endpoints in frontend code
```

#### **Database Issues**

**1. H2 Database Connection**
```bash
# H2 console access (if enabled)
http://localhost:8081/h2-console
# JDBC URL: jdbc:h2:mem:testdb
# Username: sa
# Password: (leave empty)
```

**2. Data Not Persisting**
```bash
# H2 is in-memory by default
# Data resets on service restart
# For persistence, configure PostgreSQL
```

### 🔄 Development Workflow

#### **Recommended Development Process**

**1. Start Backend Services**
```bash
# Terminal 1
mvn -pl auth-service spring-boot:run

# Terminal 2  
mvn -pl booking-service spring-boot:run

# Terminal 3
mvn -pl room-service spring-boot:run

# Terminal 4
mvn -pl analytics-service spring-boot:run
```

**2. Start Frontend**
```bash
# Terminal 5
cd web-frontend
npm run dev
```

**3. Verify Everything Works**
- Open http://localhost:5173
- Login with demo credentials
- Test all user roles and features

#### **Hot Reload Development**

**Backend Hot Reload:**
```bash
# Add to application.yml
spring:
  devtools:
    restart:
      enabled: true
    livereload:
      enabled: true
```

**Frontend Hot Reload:**
```bash
# Vite provides hot reload by default
npm run dev
# Changes reflect immediately
```

### 📊 Monitoring & Debugging

#### **Health Checks**
```bash
# Check all services
curl http://localhost:8081/actuator/health
curl http://localhost:8082/actuator/health  
curl http://localhost:8083/actuator/health
curl http://localhost:8084/actuator/health
```

#### **Logs**
```bash
# View service logs
tail -f auth-service/target/logs/application.log
tail -f booking-service/target/logs/application.log
tail -f room-service/target/logs/application.log
tail -f analytics-service/target/logs/application.log
```

#### **API Testing**
```bash
# Test authentication
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin1","password":"password"}'

# Test room service
curl http://localhost:8083/api/rooms

# Test booking service  
curl http://localhost:8082/api/bookings
```

## 🎯 Key Features Summary

- ✅ **Complete Role-Based System**: All 5 user roles fully functional
- ✅ **Real-Time Data Sync**: Live updates across all dashboards
- ✅ **Comprehensive Service Management**: All hotel services integrated
- ✅ **Modern UI/UX**: Professional, responsive design
- ✅ **Indian Localization**: Rupee currency and Indian formatting
- ✅ **Full Feature Completeness**: Every button, form, and interaction works
- ✅ **Enterprise-Ready**: Production-ready architecture and deployment

## 🎯 Complete System Overview

### 🏨 **What You Get**

**A fully functional hotel management system with:**

✅ **5 Complete User Roles**:
- **Admin**: Full system control, user management, analytics
- **Manager**: Operations oversight, staff management, reporting  
- **Reception**: Guest check-in/out, reservations, payments
- **Housekeeping**: Room cleaning, maintenance, supplies
- **Guest**: Service requests, bookings, feedback

✅ **Real-Time Data Synchronization**:
- Live updates across all dashboards
- Cross-role data sharing
- Instant status changes
- Real-time analytics

✅ **Complete Service Management**:
- Room Service (Food & Beverage)
- Pool Access (Swimming & Poolside Services)
- Spa Booking (Massage & Wellness Packages)
- Valet Parking (Vehicle Services)
- Maintenance Requests
- Concierge Services

✅ **Modern Technology Stack**:
- **Backend**: Spring Boot microservices
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Database**: H2 (dev) / PostgreSQL (prod)
- **Authentication**: JWT + Spring Security
- **API Documentation**: OpenAPI/Swagger

### 🚀 **Quick Start (TL;DR)**

```bash
# 1. Clone the repository
git clone <repository-url>
cd HOTEL-MANAGEMENT-SYSTEM

# 2. Start everything (Windows)
# This automatically builds the project, starts MySQL, backend services, and frontend
start.bat

# 3. Access the system
# Web Interface: http://localhost:5173
# Login: admin1 / password
```

### 📋 **System Requirements**

- **Java 17+** (OpenJDK recommended)
- **Maven 3.9+**
- **Node.js 18+** (with npm)
- **8GB RAM** (minimum)
- **2GB free disk space**

### 🔧 **Development Commands**

```bash
# Build all services
mvn clean install

# Start individual services
mvn -pl auth-service spring-boot:run
mvn -pl booking-service spring-boot:run
mvn -pl room-service spring-boot:run
mvn -pl analytics-service spring-boot:run

# Start frontend
cd web-frontend
npm install
npm run dev

# Stop all services
./stop-all.sh  # Linux/Mac
stop-all.bat   # Windows
```

### 🌟 **Key Features Highlights**

- **🎨 Beautiful UI**: Modern gradient design with Indian localization
- **⚡ Real-Time**: Live data updates across all user roles
- **🔐 Secure**: JWT authentication with role-based access control
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile
- **🏨 Complete**: Every hotel operation covered from check-in to checkout
- **💰 Indian Ready**: Rupee currency, Indian number formatting, local staff names
- **🚀 Production Ready**: Docker support, cloud deployment ready

### 📊 **System Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Spring Boot    │    │   H2 Database   │
│   (Port 5173)    │◄──►│   Microservices │◄──►│   (In-Memory)   │
│                 │    │  Ports 8081-8084 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │                       │
    ┌────▼────┐            ┌────▼────┐
    │  Auth   │            │  API    │
    │ Context │            │ Gateway │
    └─────────┘            └─────────┘
```

### 🎮 **Demo Walkthrough**

1. **Start the system** using `./start-all.sh` or `start-all.bat`
2. **Open** http://localhost:5173
3. **Login** as Admin (`admin1` / `password`)
4. **Explore** all features:
   - User management
   - System analytics
   - Real-time monitoring
5. **Switch roles** and test different functionalities
6. **Try guest services**: Room service, pool access, spa booking, valet parking

### 📞 Support & Documentation

- **API Documentation**: Available at each service's Swagger UI
- **Health Checks**: `/actuator/health` endpoints
- **Logs**: Available in `logs/` directory
- **Troubleshooting**: See comprehensive troubleshooting section above

### 🏆 **Project Status**

**✅ PRODUCTION READY** - All features implemented and tested

- ✅ Authentication & Authorization
- ✅ Role-Based Access Control  
- ✅ Real-Time Data Synchronization
- ✅ Complete CRUD Operations
- ✅ Modern UI/UX Design
- ✅ Indian Localization
- ✅ Docker Support
- ✅ API Documentation
- ✅ Error Handling
- ✅ Responsive Design

---

**JAVA HOTEL MANAGEMENT SYSTEM** - Redefining Hospitality Through Technology

*Built with ❤️ using Spring Boot, React, and modern web technologies*