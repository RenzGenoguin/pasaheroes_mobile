import axios from "axios";

export const api = axios.create({
    baseURL: 'http://192.168.43.219:3000/api/mobile_api/',
    timeout: 5000, // Set a timeout for requests (in milliseconds)
    headers: {
      'Content-Type': 'application/json',
    //   'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    },
  });