const form = document.querySelector('.form');
const error = document.querySelector('.error');
const exitButton = document.querySelector('.exit');

exitButton.classList.add('hidden');

const sendAuthRequest = (parameters, onSuccess) => {
  const requestURL = `${window.location.origin}/auth`;
  const body =
    'login=' +
    encodeURIComponent(parameters.login) +
    '&password=' +
    encodeURIComponent(parameters.password);

  window.user = { login: parameters.login };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', requestURL);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.send(body);

  xhr.addEventListener('readystatechange', (event) => {
    const target = event.target;

    if (target.readyState !== 4) {
      return;
    }

    if (target.status === 200) {
      onSuccess(target.responseText);
    } else {
      console.log(target.status, target.statusText);
      window.location.href = `${window.location.origin}/404`;
    }
  });
};

const processAuthResponse = (responseText) => {
  const data = JSON.parse(responseText);

  if (data.status === 'ok') {
    console.log('ok');
    window.location.href = `${window.location.origin}/home`;
  } else {
    if (data.message === 'authorization denied') {
      error.textContent = 'Неверные логин или пароль';
    } else {
      error.textContent = 'Ошибка соединения с БД';
    }
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const parameters = {
    login: form.elements.login.value,
    password: form.elements.password.value,
  };

  sendAuthRequest(parameters, processAuthResponse);
});

form.addEventListener('click', () => {
  error.textContent = '';
});
