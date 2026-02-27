FROM maven:3.9.9-eclipse-temurin-21 AS build

# mvn files
COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jdk

COPY entrypoint.sh /entrypoint.sh

COPY src/main/resources/application-docker.properties /config/application.properties

COPY --from=build /target/turing-0.0.1-SNAPSHOT.jar /turing-0.0.1-SNAPSHOT.jar

CMD ["/entrypoint.sh"]