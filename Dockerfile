FROM mysql:5.7

COPY ./app/db/assets/data2.sql /docker-entrypoint-initdb.d

EXPOSE 3306