# build stage
FROM maven:latest

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src src

RUN mvn package -DskipTests

# production stage
FROM openjdk:21-jdk

WORKDIR /app

COPY --from=0 /app/target/melodify-0.0.1-SNAPSHOT.jar .

CMD ["java", "-jar", "melodify-0.0.1-SNAPSHOT.jar"]
