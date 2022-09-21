# How to run the code
## Prerequisting
- Please make sure you have `docker` and `docker-compose` installed in your machine.
- Please make sure you can execute `docker-compose` without `sudo`

## Run the app
First you have to clone this repo and then run the following bash script. This will start docker-compose and set service permissions for you
```
./start_dev_app.sh
```
After the app started, you need sample data in the database to make it works.
Please run the following command to create tables and insert some seed rows
```
./migrate_db.sh
```
Now the app should be up and running! (in dev mode)

## How to access the app
### Express / Node
is running on port `3001`
### React.js
is running on port `3002`
### Postgres
is running on port `5432`
### Simple Postgres DB viewer (Adminer)
is running on port `8080`


***You Should follow this link to view the app http://localhost:3002***
Thank you for your time reviewing the code!
