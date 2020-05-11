#!/bin/bash
IMAGE='registry.gitlab.com/fruitylab/book/angular-prerender:'$(date '+%s')
docker build -t $IMAGE .
docker login registry.gitlab.com -u yoanndh
docker push $IMAGE
