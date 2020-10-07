function getData() {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', '/app/getdata', true);
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) resolve(req.responseText);
        else reject(Error('data not found'));
      }
    };
    req.send(null);
  });
}
