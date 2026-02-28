# 📞 Rubrica Web App

Applicazione full-stack REST API per la gestione di una rubrica telefonica, realizzata come esercizio.

---

## 🧰 Tecnologie utilizzate

* **Frontend:** Angular 18
* **Backend:** Spring Boot 3.5.9 (Java 21)
* **Database:** MySQL
* **Containerizzazione:** Docker

---

## ⚙️ Prerequisiti

Prima di avviare il progetto è necessario avere installato:

* Docker
* MySQL Server

---

# 🗄️ Configurazione Database Manuale

## 1️⃣ Importare lo schema MySQL

Dalla root del progetto eseguire:

```bash
mysql -u root -p < schema_database.sql
```

Questo comando creerà automaticamente:

* Database `rubrica`
* Tabelle
* Dati iniziali di test

---

## 2️⃣ Configurare le credenziali MySQL

Aprire il file:

```
turing/src/main/resources/application-docker.properties
```

Modificare le seguenti proprietà con le credenziali del proprio MySQL:

```properties
spring.datasource.url=jdbc:mysql://host.docker.internal:3306/rubrica?serverTimezone=Europe/Rome
spring.datasource.username=root
spring.datasource.password=1234
```

⚠️ Se MySQL utilizza una porta diversa da **3306**, modificarla nella URL.

---

# 🚀 Avvio Backend (Spring Boot)

Aprire il terminale nella root del progetto ed eseguire:

```bash
cd turing
./docker-build.sh
./docker-run.sh
```

Quando il backend sarà avviato correttamente, verificare se swagger sta su aprendo nel browser:

```
http://localhost:8091/swagger-ui/index.html
```

---

## 🔐 Verifica connessione database

Da Swagger eseguire la chiamata:

```
POST /utente/login
```

Credenziali di test:

```
username: Edoardo
password: 1234
```

Se la richiesta va a buon fine, la connessione al database è configurata correttamente.

---

# 💻 Avvio Frontend (Angular)

Aprire un nuovo terminale e posizionarsi nella cartella frontend:

```bash
cd turing/fe-rubrica
./deploy.sh
```

Una volta che Angular sta su aprire il browser e accedere a:

```
http://localhost:4200
```

---

# 👤 Credenziali di accesso all'applicazione

```
Username: Edoardo
Password: 1234
```

---

# ✅ Applicazione pronta all’uso

Dopo aver completato tutti gli step:

1. Database importato
2. Credenziali configurate
3. Backend avviato
4. Frontend avviato

L’applicazione sarà completamente funzionante e pronta per l’utilizzo.
