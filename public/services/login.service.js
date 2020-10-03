/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
function loginService(data) {
  const http = new XMLHttpRequest();
  http.open('POST', '/login');
  http.setRequestHeader('Content-type', 'application/json');
  http.send(JSON.stringify(data)); // Make sure to stringify
  http.onloadend = function () {
    const resp = JSON.parse(http.response);
    if (resp.ok === true) {
      location.href = resp.redirect;
    } else {
      document.getElementById('alert').innerHTML = resp.tag;
    }
  };
}
// TODO: finish
function signService(data) {
  const http = new XMLHttpRequest();
  http.open('POST', '/signup');
  http.setRequestHeader('Content-type', 'application/json');
  http.send(JSON.stringify(data)); // Make sure to stringify
  http.onloadend = function () {
    const resp = JSON.parse(http.response);
    if (resp.ok === true) {
      location.href = resp.redirect;
    } else {
      document.getElementById('alertSign').innerHTML = resp.tag;
    }
  };
}
