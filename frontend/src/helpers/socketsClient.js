import openSocket from 'socket.io-client';

const  socket = openSocket(process.env.VUE_APP_API_URL);

// Generic subscription to custom socket events

export const subscribeToSocket = (event, callback) => {
  socket.on(event, (payload) => callback(payload));
}