FROM mysql:5.7

COPY ./db/assets/data.sql /docker-entrypoint-initdb.d

EXPOSE 3306