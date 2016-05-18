--Rplace xxxx with password
create user nodetestuser encrypted password xxxx;

create database nodetestdb owner nodetestuser;

insert into resulttypes (resulttypeid, description, good, "createdAt", "updatedAt") values (1, 'Haven''t used it yet', null, now(), now());
insert into resulttypes (resulttypeid, description, good, "createdAt", "updatedAt") values (2, 'Good', true, now(), now());
insert into resulttypes (resulttypeid, description, good, "createdAt", "updatedAt") values (3, 'Acne', FALSE, now(), now());
insert into resulttypes (resulttypeid, description, good, "createdAt", "updatedAt") values (4, 'Spontaneous Combustion', FALSE, now(), now());
insert into resulttypes (resulttypeid, description, good, "createdAt", "updatedAt") values (5, 'Greasy', FALSE, now(), now());
insert into resulttypes (resulttypeid, description, good, "createdAt", "updatedAt") values (6, 'Dandruff', FALSE, now(), now());
insert into resulttypes (resulttypeid, description, good, "createdAt", "updatedAt") values (7, 'Itchy', FALSE, now(), now());
insert into resulttypes (resulttypeid, description, good, "createdAt", "updatedAt") values (8, 'Dry', FALSE, now(), now());

insert into brands (brandid, name, "createdAt", "updatedAt") values (1,'Suave', now(), now());

