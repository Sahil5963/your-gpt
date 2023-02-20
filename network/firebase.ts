// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCq1R35Vz7agXSPS5PecLlh_Aazwqwf4mk',
  authDomain: 'yourgpt-a9f11.firebaseapp.com',
  databaseURL: 'https://yourgpt-a9f11-default-rtdb.firebaseio.com',
  projectId: 'yourgpt-a9f11',
  storageBucket: 'yourgpt-a9f11.appspot.com',
  messagingSenderId: '236333255089',
  appId: '1:236333255089:web:ca3c0fe4d3929d32ee9590',
  measurementId: 'G-B0L4VRY6P1',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// export const firbaseAnalytics =
//   typeof window !== 'undefined' ? null : getAnalytics(firebaseApp);
