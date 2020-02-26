# Health Monitor App

A Full Stack application to monitor health status of IoT devices in real time.

In a network of IoT devices/sites, Health Checks are of integral importance and a complete Dashboard, providing a heuristic view of health statuses of all the devices, spread in a geographical region, ease up the tasks a lot.

## Objective / Motivation

The main aim of this application is to learn and enhance my knowledge of different technologies and their integrations with each other. Simulating a Health Monitoring App for IoT Devices provides the ideal opportunities for:

* Writing a Full fledge end-to-end application, from Database to the REST API to the Frontend.
* Organizing Code Structure in a better and more of a modular way
* Integrations with different in-demand libraries (Sockets, Google Maps)

## Description

A full stack application that exposes a RESTful web service API and websockets with a reactive client to monitor Health status for different IoT installed at different geographical sites. 
Mocked Sites data is listed in the `data.json` file included in the data directory, a simulator script (`simulator.js`) is randomly generating data for the listed sites. 

An IoT device is a device with sensors installed, every unit sends a health heartbeat message within a time interval of 30 - 40 seconds by default to the application server on a POST endpoint to `http://localhost:3000/heartbeat`. Ususally, each device has one of the following 3 states:
1. Online
2. Offline
3. Faulty

In case, no heartbeat (message) is received from a device for a particular time (1 minute in this app), that device is considered to be Offline. Similarly, A device's sensors are programmed to inform about any fault occurred through particular messages, through which it is interpreted that that particular device is faulty. Apart from both these cases, Device is considered to be Online and working properly.

### Application Features

1. The client (Frontend) displays all IoT Devices on a Google Map with color coded pins (markers) reprsenting the current IoT Device status, where:
* code *Red* is **Offline**
* code *Green* is **Online**
* code *Amber* is **Fault**

2. IoT device's status is updated in real time on the Map

3. Selecting a Pin (clicking) switches to a table view of all health messages received sorted by timestamp field in descending order for the selected site

4. Tabular View has the following characteristics:
  - Latest Record (whenever received) is added to the table reactively, and displayed on the top
  - If the temperature reading exceeds 70, values are displayed in Red  
  - If the temprature value falls between 65 - 70, the value is displayed in Amber
  - Pagination Options are provided

5. Min and Max Humidity values are computed for each site and displayed on its Page.

6. Daily Average of Temperature values of each site is computed and displayed on its Page.

7. A Chart/Graph displays Temperature Readings of a Site (past 24 hours)

8. Client side routing among different view/pages

### Tech Stack

Following Technologies/Libraries stack up to build this application

* SQLite Database
* NestJS REST API (with TypeScript)
* TypeORM
* Sockets (Server + Client)
* VueJS
* Vuetify
* Google Maps
* Apex Charts

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# run the simulator
$ node simulator
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
