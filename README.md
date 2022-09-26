# Punchline-shuffle

Fullstack app for shuffling punchlines in unfunny newspaper jokes. 
That makes them a little bit funnier sometimes.

## Start

`docker-compose up -d --build`

## Load existing data

Ensure you have django installed, or use `venv` for the next command.

It needs to be done only once, during initial setup, to add data to database container from json data dump.

`python back/punchline_shuffle/manage.py loaddata data/data.json`
