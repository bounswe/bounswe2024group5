# build stage
FROM maven:3.8.7-openjdk-18

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src src

RUN mvn package

# production stage
FROM openjdk:18-jdk

WORKDIR /app

COPY --from=0 /app/target/melodify-0.0.1-SNAPSHOT.jar .

CMD ["java", "-jar", "melodify-0.0.1-SNAPSHOT.jar"]
