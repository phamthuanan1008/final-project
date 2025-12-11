FROM maven:3.9.9-amazoncorretto-21-alpine AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src
RUN mvn clean package -Dmaven.skip.test

# ------------ STAGE 2 ------------

FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=build /app/target/back-end-0.0.1-SNAPSHOT.jar .
COPY --from=build /app/src/main/resources/application-prod.yml .

CMD java -jar back-end-0.0.1-SNAPSHOT.jar --spring.config.location=file:///app/application-prod.yml --spring.profiles.active=prod
