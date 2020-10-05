window.onload = function () {
  const inc = document.getElementById('incBtn');
  const exp = document.getElementById('expBtn');

  inc.addEventListener('click', (e) => {
    e.preventDefault();
    const incDiv = document.getElementById('incDiv');
    if (incDiv.style.display == 'none') {
      incDiv.style.display = 'inline';
    } else {
      incDiv.style.display = 'none';
    }
  });
  exp.addEventListener('click', (e) => {
    e.preventDefault();
    const expDiv = document.getElementById('expDiv');
    if (expDiv.style.display === 'none') {
      expDiv.style.display = 'inline';
    } else {
      expDiv.style.display = 'none';
    }
  });
};
