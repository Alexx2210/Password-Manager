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

document.addEventListener('DOMContentLoaded', function () {
    // ЗамОк
    const lock = document.querySelector('.lock'),
        headLock = document.querySelector('.lock-head');

    const shake = () => {
        lock.classList.add('shake');
        setTimeout(() => {
            lock.classList.remove('shake');
        }, 1000);
    };

    const success = () => {
        headLock.classList.add('up');
        setTimeout(() => {
            lock.classList.remove('up');
        }, 1000);
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Аутентификация пользователей

    // Получаем поля ввода данных для входа в аккаунт
    const mailLogin = document.querySelector('#signInEmail'),
        passwordLogin = document.querySelector('#signInpass'),
        login = document.querySelector('#login'),
        checkBox = document.querySelector('#rememberMe'),
        spinnerLogin = document.querySelector('.spinner__login');

    function redirect() {
        success();
        setTimeout(() => {
            window.location.href = 'main_menu/index.html';
        }, 600);
    }

    async function loginUser() {
        try {
            spinnerLogin.style.display = 'block';
            const credentials = await signInWithEmailAndPassword(
                auth,
                mailLogin.value,
                passwordLogin.value
            );
            const ref = doc(db, 'users', credentials.user.uid);
            const docSnapshot = await getDoc(ref);
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                const userName = userData.name;
                if (checkBox.checked) {
                    setPersistence(auth, browserLocalPersistence);
                    localStorage.setItem('user_name', userName);

                    redirect();
                } else {
                    setPersistence(auth, browserSessionPersistence);
                    sessionStorage.setItem('user_name', userName);

                    redirect();
                }
            }
        } catch (error) {
            // console.log(error.message);
            show(confirm[0]);
            shake();
        } finally {
            spinnerLogin.style.display = 'none';
        }
    }

    login.addEventListener('click', (e) => {
        e.preventDefault();
        if (validation(true, mailLogin, passwordLogin, true)) {
            loginUser();
        } else {
            show(confirm[0]);
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Регистрация новых пользователей

    // Получаем поля ввода данных и кнопку регистрации
    const name = document.querySelector('#signUpName'),
        mail = document.querySelector('#signUpEmail'),
        password = document.querySelector('#signUpPassword'),
        confirmPassword = document.querySelector('#signUpPasswordCorrect'),
        register = document.querySelector('#register'),
        confirm = document.querySelectorAll('.confirm p'),
        spinner = document.querySelector('.spinner');

    const info = (input) => {
        input.classList.add('not_valid');
        setTimeout(() => {
            input.classList.remove('not_valid');
        }, 1000);
    };

    function show(element) {
        element.classList.add('show');
        setTimeout(() => {
            element.classList.remove('show');
        }, 2000);
    }

    function validation(name, mail, password, confirmPassword) {
        let isValid = true;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (name === true) {
        } else if (name.value === '') {
            isValid = false;
            info(name);
            shake();
        }
        if (mail.value === '' || !emailRegex.test(mail.value)) {
            isValid = false;
            info(mail);
            shake();
        }
        if (password.value === '' || password.value.length < 8) {
            isValid = false;
            info(password);
            shake();
        }
        if (confirmPassword === true) {
        } else if (confirmPassword.value === '') {
            isValid = false;
            info(confirmPassword);
            shake();
        }

        if (confirmPassword === true) {
        } else if (password.value != confirmPassword.value) {
            isValid = false;
            show(confirm[1]);
            shake();
        }

        if (isValid == true) {
            return true;
        }

        return isValid;
    }

    async function createUser() {
        try {
            spinner.style.display = 'block';
            const credentials = await createUserWithEmailAndPassword(
                auth,
                mail.value,
                password.value
            );
            const ref = doc(db, 'users', credentials.user.uid);
            await setDoc(ref, {
                name: name.value,
                email: mail.value,
            });
            sessionStorage.setItem('user_name', name.value);
            await setPersistence(auth, browserSessionPersistence);
            success();
            setTimeout(() => {
                window.location.href = 'main_menu/index.html';
            }, 600);
        } catch (error) {
            console.log(error.message);
        } finally {
            spinner.style.display = 'none';
        }
    }

    register.addEventListener('click', (e) => {
        e.preventDefault();
        if (validation(name, mail, password, confirmPassword)) {
            createUser();
        } else {
            console.log('Something went wrong');
        }
    });
});
