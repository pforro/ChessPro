create table if not exists users
(
	id serial not null
		constraint users_pkey
			primary key,
	username text not null,
	email text not null,
	password text,
	confirmed boolean
);


create unique index if not exists users_id_uindex
	on users (id);

create unique index if not exists users_email_uindex
	on users (email);

create unique index if not exists users_username_uindex
	on users (username);

create table if not exists rooms
(
	id serial not null
		constraint rooms_pkey
			primary key,
	board_name text not null,
	status text not null
);


create unique index if not exists rooms_id_uindex
	on rooms (id);

create unique index if not exists rooms_board_name_uindex
	on rooms (board_name);

create table if not exists owners
(
	owner_id integer
		constraint owners_users_id_fk
			references users,
	room_id integer
		constraint owners_rooms_id_fk
			references rooms
);


create table if not exists new_board
(
	id text not null
		constraint table_name_pkey
			primary key,
	ycor text not null,
	xcor text,
	cellid text not null,
	color text not null,
	type text not null,
	status boolean
);


create unique index if not exists table_name_id_uindex
	on new_board (id);

