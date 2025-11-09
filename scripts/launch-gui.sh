#!/bin/bash

# JAVA HOTEL MANAGEMENT SYSTEM - Java GUI Launcher
# This script launches the Java Swing GUI application

echo "🏨 JAVA HOTEL MANAGEMENT SYSTEM - Java GUI"
echo "=========================================="

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17 or higher."
    exit 1
fi

# Check Java version
JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2 | cut -d'.' -f1)
if [ "$JAVA_VERSION" -lt 17 ]; then
    echo "❌ Java 17 or higher is required. Current version: $JAVA_VERSION"
    exit 1
fi

echo "✅ Java version: $(java -version 2>&1 | head -n 1)"

# Build the Java GUI module
echo "🔨 Building Java GUI module..."
cd java-gui
mvn clean package -q

if [ $? -ne 0 ]; then
    echo "❌ Failed to build Java GUI module"
    exit 1
fi

echo "✅ Java GUI module built successfully"

# Launch the GUI application
echo "🚀 Launching Java GUI application..."
echo ""
echo "📋 Available Features:"
echo "   • Admin Dashboard - Revenue tracking"
echo "   • Manager Dashboard - Check-in list & revenue summary"
echo "   • Reception Dashboard - Check-in/Check-out lists"
echo "   • Housekeeping Dashboard - Supplies & cleaning status"
echo "   • Guest Portal - Room booking & features"
echo ""

java -jar target/java-gui-1.0.0.jar

echo ""
echo "👋 Java GUI application closed. Thank you for using JAVA HOTEL MANAGEMENT SYSTEM!"
