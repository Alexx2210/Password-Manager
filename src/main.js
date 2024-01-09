import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    setDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    getDoc,
    updateDoc,
    waitForPendingWrites,
} from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
    signOut,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDLRSHJkwJEBA6I-FTznuCSqlR135sM_iA',
    authDomain: 'password-manager-aacab.firebaseapp.com',
    databaseURL: 'https://password-manager-aacab-default-rtdb.firebaseio.com',
    projectId: 'password-manager-aacab',
    storageBucket: 'password-manager-aacab.appspot.com',
    messagingSenderId: '747559202597',
    appId: '1:747559202597:web:c388a734d69c3817b574cc',
};

// Инициализируем базу данных Firebase
const app = initializeApp(firebaseConfig);

// Инициализируем необходимые сервисы
const db = getFirestore();
const auth = getAuth(app);

const greetings = document.querySelector('.welcome');
const userNameLocal = localStorage.getItem('user_name');
const userNameSesion = sessionStorage.getItem('user_name');
const signOutButton = document.querySelector('#signoutlink');
const content = document.querySelector('.content');
const spinnerMain = document.querySelector('.spinner__main');

if (userNameLocal) {
    greetings.textContent = `Здравствуйте, ${userNameLocal}`;
} else {
    greetings.textContent = `Здравствуйте, ${userNameSesion}`;
}

let currentUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('Пользователь вошёл в систему');
        currentUser = user;
        console.log(currentUser);
        spinnerMain.classList.add('hide');
        content.classList.remove('hide');

        signOutButton.addEventListener('click', async () => {
            try {
                await signOut(auth);
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = '../index.html';
            } catch (error) {
                console.log(error.message);
            }
        });
    } else {
        console.log('Пользователь вышел из системы');
        currentUser = null;
        content.classList.add('hide');
        window.location.href = '../index.html';
    }
});
