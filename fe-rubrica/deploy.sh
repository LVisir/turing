#!/bin/bash -e

docker build -t fe-turing-rubrica .

docker run --rm -it -p 4200:4200 fe-turing-rubrica