const form = document.querySelector('.form');
const preview = document.querySelector('.preview');
const image = document.querySelector('#image');
const select = document.querySelector('#category');
const selectInput = document.querySelector('#categoryOther');
const numberOfTicketsInput = document.querySelector('#ticketsTotal');

select.addEventListener('change', (event) => {
  const target = event.target;

  if (target.value === 'Другое') {
    selectInput.classList.remove('hidden');
    selectInput.required = true;
  } else {
    selectInput.classList.add('hidden');
    selectInput.required = false;
    selectInput.value = '';
  }
});

numberOfTicketsInput.addEventListener('input', () => {
  numberOfTicketsInput.value = numberOfTicketsInput.value.replace(/\D/, '');
});

const previewImage = document.createElement('img');
previewImage.classList.add('img');

image.addEventListener('change', () => {
  const [file] = image.files;

  if (file) {
    previewImage.src = URL.createObjectURL(file);
    if (preview.children[0] !== previewImage) {
      preview.removeChild(preview.children[0]);
      preview.appendChild(previewImage);
    }
  }
});

const sendEventRequest = (onSuccess) => {
  const method = window.location.pathname.match(/^\/new/) ? 'POST' : 'PUT';
  const requestURL = window.location.pathname.match(/^\/new/)
    ? `${window.location.origin}/events/create`
    : `${window.location.origin}/events${window.location.pathname}/update`;

  const formData = new FormData(form);

  const xhr = new XMLHttpRequest();
  xhr.open(method, requestURL);

  xhr.send(formData);

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

const processEventResponse = (responseText) => {
  const data = JSON.parse(responseText);

  if (data.status === 'ok') {
    console.log(data);
    window.location.href = `${window.location.origin}/home`;
  } else {
    console.log(data);
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  sendEventRequest(processEventResponse);
});
