CREATE DATABASE db_salt;

DROP TABLE IF EXISTS envio_mensagem;

DROP TABLE if exists usuarios;

CREATE TABLE usuarios (
	id serial primary key,
 	nome varchar(100) NOT NULL,
  	numero integer NOT NULL UNIQUE,
  	senha varchar(100) NOT NULL
);


CREATE TABLE envio_mensagem (
	id serial primary key,
   	contato_id integer NOT NULL references usuarios(id),
  	status_mensagem  text NOT NULL,
  	data_mensagem_criada timestamp NOT NULL default now(),
  	data_mensagem_enviada timestamp,
  	mensagem text NOT NULL
);
