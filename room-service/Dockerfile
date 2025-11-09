FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /workspace
COPY . .
RUN mvn -q -DskipTests -pl room-service -am package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /workspace/room-service/target/*.jar /app/app.jar
EXPOSE 8083
ENTRYPOINT ["java","-XX:+UseG1GC","-XX:MaxRAMPercentage=75","-jar","/app/app.jar"]


