const exit = document.querySelector('.exit');

const sendExitRequest = () => {
  const location = window.location.origin;
  const requestURL = `${location}/exit`;

  const xhr = new XMLHttpRequest();
  xhr.open('POST', requestURL);

  xhr.send();

  xhr.addEventListener('readystatechange', (event) => {
    const target = event.target;

    if (target.readyState !== 4) {
      return;
    }

    if (target.status == 200) {
      window.location.href = location;
    } else {
      console.log(target.status, target.statusText);
    }
  });
};

exit.addEventListener('click', (event) => {
  event.preventDefault();

  sendExitRequest();
});
