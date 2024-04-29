#!/bin/bash

# Run back-end
cd  src/core
npm start &
pid1=$!

# Run tests
cd ../../tests
npm run tests &
pid2=$!

stop (){
    kill $pid1
    kill $pid2
}

trap stop SIGINT

# Esperar a que los subprocesos terminen
wait