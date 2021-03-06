# Команда Донателло

Глазова Диана  
Карпов Виталий  
Марьинских Артем  
Светлов Федор  

# skypro_skyticket

В корне репозитория лежат линтеры и модули, которые нужны для всех проектов.  
После клонирования проекта необходимо выполнить команду `npm i` для установки этих общих модулей.  
Все проекты лежат в папке projects.

### Production версии:

- Система администрирования: not deployed yet
- [Сайт продажи билетов](https://selling-tickets.herokuapp.com/)
- [Интерфейс билетного контролера](https://donatello-skyticket-controller.herokuapp.com/)
- [Бекэнд](https://donatello-skyticket-backend.herokuapp.com/)

## Система администрирования

Проект лежит в папке admin-panel

## Сайт продажи билетов

Проект лежит в папке selling-tickets.  
  
Перед запуском проекта необходимо выполнить команду `npm i` для установки модулей реакта.  
Чтобы запустить проект в режиме разработки, надо выполнить команду `npm run dev`.  
Чтобы запустить проект в режиме production, надо выполнить команду `npm run build` и затем `npm start`.

На главной странице выводится чать мероприятий. По нажатию на стрелку выводятся следующие мероприятия.  
По клику на карточку мероприятия открывается страница с информацией о мероприятии.
В поле фильтации можно выбрать необходимые мероприятия.

## Интерфейс билетного контролера

Проект лежит в папке ticket-controller.

Перед запуском проекта необходимо выполнить команду `npm i` для установки модулей.  
Чтобы запустить проект в режиме разработки, надо выполнить команду `npm run dev`.  
Чтобы запустить проект в режиме production, надо выполнить команду `npm run build` и затем `npm start`.

На главной странице выводятся все ближайшие (сегодняшние) мероприятия.  
По клику на карточку мероприятия открывается страница проверки билетов.  
Билет можно проверить по QR коду, после проверки выведется статус: сообщение об успехе или ошибке.  
В оффлайне приложение работать не будет, выведет ошибку соединения с БД.

## Бекэнд

Проект лежит в папке backend.

Перед запуском проекта необходимо выполнить команду `npm i` для установки модулей.  
Чтобы запустить проект в режиме разработки, надо выполнить команду `npm run dev`. В этом режиме работа идет с локальной базой данных и загруженные файлы сохраняются на диск.  
Чтобы запустить проект в режиме production, надо выполнить команду `npm run prod`. В этом режиме работа идет с кластером и загруженные файлы сохраняются в облако (amazon s3).

### Формат хранения данных о мероприятии:

```
_id - id мероприятия
img: {
  name - имя картинки
  url - ссылка, по которой картинку можно достать
  originalName - исходное имя
  mimetype - тип
}
title - название мероприятия
city - город проведения мероприятия
address - адрес мероприятия
description - описание мероприятия
category - категория (концерт, кино и т.д.)
categoryOther - доп. поле для ввода, если выбрана категория "другое".
startTimestamp - начало мероприятия (день и время)
endTimestamp - конец мероприятия (день и время)
created - дата создания
updated - дата последнего обновления
tickets: {
  total - общее число билетов
  sold  - число оставшихся билетов
  checked - число проверенных билетов (кто посетил мероприятие)
}
```

Порядок записей может отличаться

### Формат хранения данных о билете:

```
_id - id билета
eventId - id мероприятия. на которое куплен билет
buyer - имя заказчика
buyDate - дата получения билета
checked - true/false - чтобы нельзя было пройти по одному билету дважды
number - номер билета (ибо нельзя создавать совсем одинаковые записи)
checkDate - дата проверки билета (появляется после проставления `checked=true`)
```

Порядок записей может отличаться

### Ручки мероприятий:

POST `/events/create` - создать новое мероприятие.

- В теории, можно создать мероприятие с пустым телом запроса, на практике стоит передать туда следующие параметры: картинку, `title`, `city`, `address`, `description`, `category` (и `categoryOther`, если `category='другое'`), `startTimestamp`, `endTimestamp`, `ticketsTotal`. Валидация параметров - на фронте. Единственное, если не передать количество билетов, число будет установлено в 0.
- Если все хорошо, вернет `{ status: 'ok', event: полная информация о мероприятии }`

PUT `/events/:id/update` - изменить данные мероприятия по id.

- Сюда в теле можно передать любые параметры из POST запроса (все передавать не обязательно). В идеале, лучше передавать только те, что изменились (например, чтобы картинка лишний раз не подгружалась).
- Если все хорошо, вернет `{ status: 'ok', modified: 1, event: полная информация о мероприятии }`

DELETE `/events/:id/delete` - удалить мероприятие по id.

- Если все хорошо, вернет `{ status: 'ok', eventId: id измененного мероприятия }`

GET `/events/:id` - достать мероприятие по id.

- Если все хорошо, вернет `{ status: 'ok', event: полная информация о мероприятии }`

GET `/events` - достать все мероприятия.

- Если все хорошо, вернет `{ status: 'ok', events: список мероприятий с **краткой** информацией }`
- В этот запрос можно добавить следующие query-параметры:
  - `type = actual/old/today/undefined` - вернуть новые меропрятия (которые еще не закончились), старые, сегодняшние или все
  - `start = число/undefined` - если не задано, принимается равным 0
  - `size = число/undefined` - если не задано, будут возвращены все подходящие карточки
- Пример запроса: `/events?type=actual&start=50&size=10` - достать 10 актуальных мероприятий начиная после 50 (с 51)

### Ручки билетов:

POST `/tickets/create` - создать нужное число билетов на данное мероприятие (параметры запроса - в body)

- В теле запроса необходимо передать `eventId` - id мероприятия, на которое приобретается билет. Если этот id не передать, вернется ошибка.
- Также в теле запроса можно передать `number` - число создаваемых билетов (по умолчанию равно 1) и `buyer` - имя заказчика билетов.
- Если все хорошо, вернет `{ status: 'ok', tickets: список билетов с полной информацией, ticketsSold: число созданных билетов}`
- Если покупатель пытается заказать больше билетов, чем осталось, вернется ошибка с информацией о том, сколько билетов можно проибрести в формате: `{ status: 'error', message: 'only ${ticketsLeft} ${phrase} left', ticketsLeft: ticketsLeft }`. Но желательно на фронте валидировать, что покупатель не пытается заказать больше билетов, чем доступно.

PUT `/tickets/:id/check` - отметить билет с данным id как проверенный

- В теле запроса необходимо передать id мероприятия (если билет к другому мероприятию, вернется ошибка)
- Если все хорошо, вернет `{ status: 'ok', ticket: информация об отмеченном билете, ticketsChecked: 1}`

GET `/tickets/:id` - достать один билет по id

- Если все хорошо, вернет `{ status: 'ok', ticket: информация о билете}`

GET `/tickets` - достать все билеты

- Если все хорошо, вернет `{ status: 'ok', tickets: список билетов мероприятия с полной информацией}`
- В этот запрос можно добавить следующие query-параметры:
  - `eventId` - вернуть билеты конкретного мероприятия
  - `checked = true/false/undefined` - вернуть только отмеченные/неотмеченные билеты или все
- Пример запроса: `/tickets?eventId=618673f5c894bc4c6caebc1d&checked=false` - достать неотмеченные билеты мероприятия с id=618673f5c894bc4c6caebc1d

### Авторизация:

POST `/auth` - авторизоваться в админской панели.

- Если все хорошо, вернет `{ status: 'ok'}`. Если нет, вернет `{ status: 'error', message: 'authorization denied' }`
