# Asset Database Backend

## Development

First, make sure to spin up our development `docker-compose.yml`. In the project's root directory, run:

```bash
$ docker-compose up -d
```

We use FastAPI for our backend. To get started, `cd` into this `backend` folder, create a virtualenv with `pipenv install`, and enter a shell using `pipenv shell`.

To start a dev server, run:

```bash
$ uvicorn main:app --reload
```
