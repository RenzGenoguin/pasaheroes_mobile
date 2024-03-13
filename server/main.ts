import axios from "axios";
//https://pasaheroes-web-liard.vercel.app/
export const api = axios.create({ 
  // baseURL: 'http://192.168.0.121:3000/api/mobile_api/', //office ip address
  baseURL: 'https://pasaheroes-web-liard.vercel.app/api/mobile_api/', //vercel
    timeout: 5000, // Set a timeout for requests (in milliseconds)
    headers: {
      'Content-Type': 'application/json',
    //   'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    },
  });