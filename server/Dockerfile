FROM node:13
WORKDIR server/
COPY package* ./
RUN npm i
COPY . ./
CMD ["node", "index.js"]
