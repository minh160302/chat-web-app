# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

# Add the two entries below
# RUN mkdir -p node_modules/node-sass/vendor/linux-x64-51
# RUN curl -L https://github.com/sass/node-sass/releases/download/v4.5.0/linux-x64-51_binding.node -o node_modules/node-sass/vendor/linux-x64-51/binding.node

RUN npm install
# RUN npm rebuild node-sass
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]
EXPOSE 3000