# restaurant-list


## Preface 

It's A8 HW for Semester 2-3.
I use Node.js + Express + Handlebars + Mogoose to implement a project named "餐廳清單".

## Prerequisites

The versions of various tools are listed below

* Node.js: v12.18.3
* npm: 6.14.8
* body-parser: 1.19.0
* express: 4.17.1
* express-handlebars: 5.1.0
* mongoose: 5.10.3
* method-override: 3.0.0

## Installation and execution

0. Check if you have install Mogodb and execute `mongod --dbpath [your-db-folder]`.
1. `git clone [this-repo]`
2. `cd ac_exercise/restaurant_list` and `npm install .`
The npm would install the tools I mentioned above.
3. `npm run seed`
It would run models/seeds/restaurantsSeeder.js, build a database named res-list depending on models/seeds/restaurants.json.
3. `npm run start`
It would start web-server at localhost:3000.
4. Input `http://localhost:3000/` in your web browser.
5. Check the result

![demo](https://s1.imgs.cc/img/aaaabSRiQ.gif?_w=750)

## Features

* Search for restaurants with keyword
* Create the restaurant
* View the detail of restaurant
* Edit the info of restaurant
* Delete the restaurant
* RESTful router style
* Independent router system
* Sorting by restaurants' name 

## Reference

* AC tutorial for todo-list(mongodb-version) project.
