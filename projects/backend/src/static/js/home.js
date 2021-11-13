const cardsContainer = document.querySelector('.cardsContainer');

const deleteEvent = (id, element) => {
  const requestURL = `${window.location.origin}/events/${id}/delete`;

  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', requestURL);

  xhr.send();

  xhr.addEventListener('readystatechange', (event) => {
    const target = event.target;

    if (target.readyState !== 4) {
      return;
    }

    if (target.status == 200) {
      element.remove();
    } else {
      console.log(target.status, target.statusText);
    }
  });
};

const renderCard = (eventData, container) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const titleBlock = document.createElement('h2');
  titleBlock.classList.add('card__item');
  titleBlock.classList.add('card__title');
  titleBlock.textContent = eventData.title;
  card.appendChild(titleBlock);

  const cityBlock = document.createElement('p');
  cityBlock.classList.add('card__item');
  cityBlock.textContent = eventData.city;
  card.appendChild(cityBlock);

  const categoryBlock = document.createElement('p');
  categoryBlock.classList.add('card__item');
  categoryBlock.textContent = `Тип: ${eventData.category}`;
  card.appendChild(categoryBlock);

  const cardButtons = document.createElement('div');
  cardButtons.classList.add('card__buttons');
  card.appendChild(cardButtons);

  const changeButton = document.createElement('button');
  changeButton.classList.add('button');
  changeButton.textContent = 'Изменить';
  cardButtons.appendChild(changeButton);

  changeButton.addEventListener('click', () => {
    window.location.href = `${window.location.origin}/${eventData._id}`;
  });

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('button');
  deleteButton.textContent = 'Удалить';
  cardButtons.appendChild(deleteButton);

  deleteButton.addEventListener('click', (event) => {
    const target = event.target.closest('.card');

    deleteEvent(eventData._id, target);
  });

  container.appendChild(card);
};

const renderEventCards = (responseText) => {
  const data = JSON.parse(responseText);

  if (data.status !== 'ok') {
    console.log(data);
    return;
  }

  data.events.forEach((el) => {
    renderCard(el, cardsContainer);
  });
};

const sendGetEventsRequest = () => {
  const requestURL = `${window.location.origin}/events`;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', requestURL);

  xhr.send();

  xhr.addEventListener('readystatechange', (event) => {
    const target = event.target;

    if (target.readyState !== 4) {
      return;
    }

    if (target.status == 200) {
      renderEventCards(target.responseText);
    } else {
      console.log(target.status, target.statusText);
    }
  });
};

sendGetEventsRequest();
