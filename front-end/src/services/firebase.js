import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: 'AIzaSyA9lgQAqYXCStlO6sU0r5gmr153VkBnpwg',
  authDomain: 'savevale-5f3e2.firebaseapp.com',
  projectId: 'savevale-5f3e2',
  storageBucket: 'savevale-5f3e2.appspot.com',
  messagingSenderId: '187419354086',
  appId: '1:187419354086:web:69376f77e243f88930ec27',
  measurementId: 'G-Z0CHM8VYS5',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
