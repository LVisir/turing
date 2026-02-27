use rubrica;

create table utente(
	id int auto_increment primary key,
	username VARCHAR(50) UNIQUE not null,
	password VARCHAR(50) not null
);

create table persona(
	id int auto_increment primary key,
    utente_id int not null,
    foreign key(utente_id)
    references utente(id)
    on delete cascade,
    nome varchar(50) not null,
    cognome varchar(50) not null,
    indirizzo varchar(50) not null,
    telefono varchar(50) not null,
    eta int not null
);

select * from utente;