import axios from "axios";

export const api = axios.create({
  // baseURL: 'http://192.168.43.219:3000/api/mobile_api/', //my phone ip address 
  baseURL: 'http://192.168.0.127:3000/api/mobile_api/', //office ip address
    timeout: 5000, // Set a timeout for requests (in milliseconds)
    headers: {
      'Content-Type': 'application/json',
    //   'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    },
  });