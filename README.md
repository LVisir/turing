Progetto rubrica

tecnologie:

angular 18

spring boot 3.5.9

mysql

docker



prerequisiti:

avere docker installato

avere mysql installato

posizionarsi sulla cartella del progetto

importare schema_database.sql in mysql

modificare file turing/src/main/resources/application-docker.properties sotto le seguenti voci nel caso in cui mysql giri su un'altra porta (di default è 3306) e le credenziali per accederci

  - spring.datasource.url=jdbc:mysql://host.docker.internal:3306/rubrica?serverTimezone=Europe/Rome
  - spring.datasource.username=root
  - spring.datasource.password=1234



come farlo partire:

cd turing

./docker-build.sh

./docker-run.sh

una volta che si è constatato che spring boot è su controllare http://localhost:8091/swagger-ui/index.html per vedere se carica swagger per averne la certezza

cd ../fe-rubrica

./deploy.sh

una volta che angular sta su le credenziali per il login sono (username e password corrispettivamente):
  - Edoardo
  - 1234

ora si può usare l'app




