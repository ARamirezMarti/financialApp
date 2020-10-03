/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const signupBtn = document.getElementById('signup');
const signupSubmit = document.getElementById('signupSubmit');
const logBtn = document.getElementById('logBtn');
const logSubmit = document.getElementById('logSubmit');

const naviDiv = document.getElementById('navi');
const signDiv = document.getElementById('sign');

const emailLogin = document.getElementById('email');
const passLogin = document.getElementById('pass');

const accSign = document.getElementById('accSign');
const passSign = document.getElementById('passSign');
const emailSign = document.getElementById('emailSign');

signupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  naviDiv.style.display = 'none';
  signDiv.style.display = 'block';
});

logBtn.addEventListener('click', () => {
  location.reload();
});

logSubmit.addEventListener('click', (e) => {
  e.preventDefault();

  const data = {
    ACCOUNT_EMAIL: emailLogin.value,
    ACCOUNT_PASS: passLogin.value,

  };

  loginService(data);
});

signupSubmit.addEventListener('click', (e) => {
  e.preventDefault();

  const data = {
    ACCOUNT_NAME: accSign.value,
    ACCOUNT_EMAIL: emailSign.value,
    ACCOUNT_PASS: passSign.value,

  };

  signService(data);
});
