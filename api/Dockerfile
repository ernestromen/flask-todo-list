FROM python:3.7
RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
RUN pip install --upgrade pip && \
    pip install -r requirements.txt && \
    pip install psycopg2-binary && \
    pip install flask-cors && \
    pip install -U Flask-SQLAlchemy
COPY . .
