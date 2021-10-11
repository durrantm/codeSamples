FROM ruby

WORKDIR /tmp
COPY certs/slm_int.pem slm_int.pem
COPY certs/slm_root.pem slm_root.pem
RUN cat slm_int.pem slm_root.pem >> /usr/lib/ssl/certs/ca-certificates.crt

ADD . /tests
WORKDIR /tests

RUN bundle install
