# Minor WebDev | Web Of Things
Dave Bitter | Camille Niessen | Zishan K. Pasha | Tristan Jacobs | Ioannis Kapritsias

    V 1.0.0

## Islands

 ![Islands app](https://raw.githubusercontent.com/DaveBitter/minor-webdev_web-of-things/master/readme-img/hero.png)

### General
This repository holds the seperate exercises for the course 'Web Of Things', part of the minor "Webdevelopment" at the [HvA](http://www.hva.nl/)
All exercise folders are standalone projects and work as such. You can navigate through the folder structure or through the navigation below.

### About the Islands application
In every development agency you will find a senior developer or 2. And for every senior there are 2 or more junior developers bugging them for help. With Islands we have created a different experience in the office for handling these junior-senior requests.

Islands allows all people in a specific workgroup to create an 'Island', a digital representation of said workgroup.
By using the IslandBox a color signal can be sent to the senior developer whenever a Junior requires help of has a question.
The Senior can then respond with a color signal indicating whether or not he/she is available. Juniors and Seniors choose a color representing themselves for identification purposes.

![Islands](https://raw.githubusercontent.com/DaveBitter/minor-webdev_web-of-things/master/readme-img/islands.jpg)

#### Example User Story
1. It's 9:31 in the morning. The 3 juniors and senior of CodeCowboys' development section arrive at the office.
2. They take to their desks getting ready for work.
3. The Senior starts up the Islands app and sets his color to purple.
4. All Juniors start up the app and pick their own color. Junior 1 has chosen yellow.
5. It is now 11:32 and Junior 1 can't figure something out and needs help.
6. He presses his IslandBox to request help from the Senior. A yellow color signal is sent to the Senior
7. The Senior is available and hits the button on his IslandBox, sending a flashing green signal to Junior 1.
8. The Senior's IslandBox turns yellow, indicating he is not available to others because he is helping Junior 1.
9. After they are done, the Senior pushes the button and is again available for help.

### Features
* Client side application for user creation/login and storing user settings (e.g. box id and color)
* Server side application for handling logic (e.g. handling event of message from senior to junior and vice versa)
* Websockets to connect the client, server and NodeMCU to each other
* Custom firmware on NodeMCU for handling socket events

### Flow
This is the flow as it stands now. A Junior employee can send requests for help to senior employees and the senior can either send a green signal or a red signal, depending on their availability.

![Current flow of app](https://raw.githubusercontent.com/DaveBitter/minor-webdev_web-of-things/master/readme-img/flow1.jpg)

This is the flow as it would stand with a working queue system. If a Senior employee sends a red signal then the Junior is added to the queue list. If he sends a green signal then the Junior is helped and removed from the queue list.

![Preferred flow of app](https://raw.githubusercontent.com/DaveBitter/minor-webdev_web-of-things/master/readme-img/flow2.jpg)

### Known Issues

We highly encourage adding issues to this repo in the case of finding one. We are always up for improving our code.

### Getting started
#### Clone this repo, duh
    git clone https://github.com/DaveBitter/minor-webdev_web-of-thingsreal-time-web.git
    cd minor-webdev_web-of-things

#### Install the dependencies
    npm i

#### Start up the server
When you run this command, changes in serverside JS files will be watched and the server will restart automatically, changes in clientside JS files will be watched and browserified and the server will be restarted.

    npm run startDev

#### Additional commands
Browserify clientside JS

    npm run build

Watchify clientside JS

    npm run watch

Clean clientside build.js file

    npm run clean

### To Do
You can view the To Do's in [todo.md](todo.md).

### Wishlist
* Implement dashboard for queue system.
* Implement Distance sensors to check if the senior is at his/her desk
* Implement haptic feedback alongside the lights
* Implement Do Not Disturb mode

Possible Example
![Example Dashboard](https://raw.githubusercontent.com/DaveBitter/minor-webdev_web-of-things/master/readme-img/queue_dashboard.jpg)

### License
[MIT](LICENSE.md)
