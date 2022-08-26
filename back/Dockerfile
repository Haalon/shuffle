FROM python:3.10.5
ENV PYTHONUNBUFFERED 1
WORKDIR /app

COPY requirements.txt /app/

RUN pip install -r requirements.txt

COPY  . /app/

WORKDIR /app/punchline_shuffle
RUN python manage.py migrate