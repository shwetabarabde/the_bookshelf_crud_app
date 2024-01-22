FROM python:3.11.0a6-alpine3.15

RUN mkdir /usr/src/flask-app 
WORKDIR /usr/src/flask-app

RUN pip install --upgrade pip
RUN pip install flask
RUN pip install flask_cors

COPY . /usr/src/flask-app

CMD ["python","app.py"]