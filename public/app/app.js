window.onload = function () {
  const socket = io();
  socket.on('connect', () => {
    console.log('Connected to server');
  });
  const sum = document.getElementById('sumDiv');
  const inc = document.getElementById('incBtn');
  const exp = document.getElementById('expBtn');

  inc.addEventListener('click', (e) => {
    e.preventDefault();
    const incDiv = document.getElementById('incDiv');
    if (incDiv.style.display === 'none') {
      sum.style.display = 'none';
      incDiv.style.display = 'inline';
    } else {
      incDiv.style.display = 'none';
    }
  });
  exp.addEventListener('click', (e) => {
    e.preventDefault();
    const expDiv = document.getElementById('expDiv');
    if (expDiv.style.display === 'none') {
      sum.style.display = 'none';
      expDiv.style.display = 'inline';
    } else {
      expDiv.style.display = 'none';
    }
  });

  document.getElementById('sumBtn').addEventListener('click', (e) => {
    sum.style.display = 'inline';
  });
};
