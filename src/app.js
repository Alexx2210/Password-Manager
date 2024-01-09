'use strict';

const signUp = document.querySelector('#signUp'),
    signIn = document.querySelector('#signIn'),
    body = document.querySelector('body');

signUp.addEventListener('click', (event) => {
    event.preventDefault();
    body.classList.add('signup');
});

signIn.addEventListener('click', (event) => {
    event.preventDefault();
    body.classList.remove('signup');
});
