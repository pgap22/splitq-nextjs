FROM node:22

WORKDIR /app

COPY . /app

RUN npm i

# ENV DATABASE_URL="postgres://postgres:root@192.168.0.2:5432/splitq"
# ENV AUTH_SECRET=pollito
# ENV API_IMAGE_LOCAL=http://192.168.0.3:5000
# ENV NEXT_PUBLIC_SOCKET_IO_SERVER=http://192.168.0.4:4000
ENV DEPLOYMENT=local

EXPOSE 3000

RUN chmod +x ./start.sh

CMD [ "./start.sh" ]