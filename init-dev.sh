#!/bin/bash

# Run back-end
cd  src/core
npm run server &
pid1=$!

# Run front-end
cd ../app
npm start &
pid2=$!

stop (){
    kill $pid1
    kill $pid2
}

trap stop SIGINT

# Esperar a que los subprocesos terminen
wait