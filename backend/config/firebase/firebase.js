import { initializeApp } from 'firebase/app';

// Configuracion SDK FIREBASE
const firebaseConfig = {

    apiKey: "AIzaSyAGmEaFDlRSzpKdAcESY4LoqkS0zGR2Ilk",

    authDomain: "quienpaleer-c0891.firebaseapp.com",

    projectId: "quienpaleer-c0891",

    storageBucket: "quienpaleer-c0891.appspot.com",

    messagingSenderId: "728372335311",

    appId: "1:728372335311:web:307f7283e30fe162a79dba"

};

// Inicializar Firebase
const firebaseApp = initializeApp( firebaseConfig );

export default firebaseApp;
