FROM python:3.9

RUN mkdir /code
WORKDIR /code

COPY Pipfile Pipfile.lock ./

RUN pip install -U pip
RUN pip install pipenv
RUN pipenv requirements > requirements.txt
RUN pip install -r requirements.txt

COPY . ./
EXPOSE 5000
CMD ["python","main.py"]
