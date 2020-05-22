#Angular Prerender by Fruitylab.fr

Angular prerender by https://fruitylab.fr is seedapp project for rendering angular app seo friendly. The project use the open source prerender.io server and the middleware prerender-node.

##Install
Install dependency
```shell script
yarn
``` 
Copy and rename **.env.exemple** to **.env** <br><br>
Paste your moviedb api key in .env file:
```text
API_KEY=XXYOURAPIKEYMOVIEDBXXX
```
####Build without prefix href:
```shell script
yarn build:prod
yarn start:dev
``` 
####Build with prefix app
Replace angular-prerender with your desired prefix build
In package.json:
```json
"build:prod:base": "yarn build --prod --base-href /angular-prerender/ --outputPath dist/angular-prerender && yarn build:server",
```
In .env file:
```text
ANGULAR_BUILD_NAME=YOUR-BUILD-NAME-HERE
```
```shell script
yarn start:dev
``` 
