#!/bin/bash

cd /home/peter/Documents/Turtle_Stranding/

python3 turtle_forecast.py

mv forecast.html ../nextjs_site/public/

cd ../nextjs_site/

git add .

git commit -m 'update forecast'

git push

