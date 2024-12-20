FROM node:18-alpine
LABEL authors="bruno szilagyi"

WORKDIR /breast-cancer-recommendation-frontend/

COPY public/ /breast-cancer-recommendation-frontend/public
COPY src/ /breast-cancer-recommendation-frontend/src
COPY package.json /breast-cancer-recommendation-frontend/

RUN npm install --force

CMD ["npm", "start"]