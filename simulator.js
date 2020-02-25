/**
 * a simulator script generates messages with random data
 * based on an in memory message queue within a time interval
 * to the app server host at localhost:3000
 */
const data = require('./data/data.json');
const axios = require("axios");
const INTERVAL = 30000;
const MAX_LATENCY = 10000;
const SEND_HTTP_HEARTBEAT = true;

/**
 * site message queue
 * where 1:ONLINE, 0:OFFLINE, -1:FAULT
 */
const sites = [
    { id: 'site-10', q: [1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1], i: 0 },
	{ id: 'site-11', q: [1, 1, 0, 0, 0, 1, 1, -1, -1, 0, 1, 1, 1], i: 0 },
    { id: 'site-12', q: [0, 0, 1, 1, 1, 1, -1, -1, 1, 1, 0, 0, -1, 0], i: 0 }
];

/**
 * simulates a health check message within a 
 * random time interval between INTERVAL to (INTERVAL + MAX_LATENCY) seconds
 */
function simulate() {
    console.log('Initializing Health Simulator timer ...');
    console.table(sites);
    console.log('Press ctrl + c to terminate ...');

    // setup an interval per site
    sites.forEach(site => {
        console.log('setting up timer for site with ID ', site.id);
        // start the timer
        setInterval(() => {
            if (site.i >= site.q.length) site.i = 0;
            // unit state from queue
            const state = site.q[site.i];
            // create a new message
            const m = {};

            if (state !== 0) {
                m.timestamp = Date.now();
                m.site_id = site.id;
                m.sensors = data.sites.find(s => s.id === site.id).sensors;
                m.temperature = Number((Math.random() * 100 + 24).toFixed(2));
                m.humidity = Number((Math.random() * 180 + 64).toFixed(2));

                // create a fault
                if (state === -1) {
                    m.sensors[0].fault = true;
                } else {
                    m.sensors[0].fault = false;
                }

                console.log('setting message for site', m.site_id, ' index ', site.i);

                if (SEND_HTTP_HEARTBEAT) {
                    axios.post('http://localhost:3000/api/heartbeat', m).then(res => {
                        console.log('heartbeat sent with status ', state);
                        console.log(res.status);
                    }).catch(err => console.error(err));
                } else {
                    console.warn('SEND_HTTTP_HEARTBEAT is set to false ... Http heartbeat is suspended, current message is ', m);
                }

            } else {
                console.log(`${site.id} missed message index ${site.i} - status: ${state}`);
            }

            site.i++;
        }, MAX_LATENCY + Math.random() * INTERVAL);
        
    });
}

/** starts the simulator */
simulate();