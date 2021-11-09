# Команда Донателло

Марьинских Артем

# skypro_skyticket

В корне репозитория лежат линтеры и модули, которые нужны для всех проектов.  
После клонирования проекта необходимо выполнить команду `npm i` для установки этих общих модулей.  
Все проекты лежат в папке projects.

## Система администрирования

Проект будет лежать в папке admin-panel

## Сайт продажи билетов

Заготовка проекта лежит в папке selling-tickets.  
Перед запуском проекта необходимо выполнить команду `npm i` для установки модулей реакта.  
Чтобы запустить проект в режиме разработки, надо выполнить команду `npm start`.  
Собрать код для production можно командой `npm run build`. Запуск в production режиме пока не предусмотрен.

В заготовке есть пример использования переменых и вложенных стилей.

## Интерфейс билетного контролера

Проект будет лежать в папке admin-panel

## Бекэнд

Проект лежит в папке backend.  
Перед запуском проекта необходимо выполнить команду `npm i` для установки модулей.  
Чтобы запустить проект в режиме разработки, надо выполнить команду `npm run dev` (или `npm start`).

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
date - дата получения билета
checked - true/false - чтобы нельзя было пройти по одному билету дважды (важно для приложения проверки билетов)
number - номер билета (ибо нельзя создавать совсем одинаковые записи)
```

Порядок записей может отличаться

### Ручки мероприятий:

POST `/events/create` - создать новое мероприятие.  
Если все хорошо, вернет `{ status: 'ok', event: полная информация о мероприятии }`

PUT `/events/:id/update` - изменить данные мероприятия по id.  
Если все хорошо, вернет `{ status: 'ok', modified: 1, event: полная информация о мероприятии }`

DELETE `/events/:id/delete` - удалить мероприятие по id.  
Если все хорошо, вернет `{ status: 'ok', eventId: id измененного мероприятия }`

GET `/events/:id` - достать мероприятие по id.  
Если все хорошо, вернет `{ status: 'ok', event: полная информация о мероприятии }`

GET `/events` - достать все мероприятия.  
Если все хорошо, вернет `{ status: 'ok', events: список мероприятий с **краткой** информацией }`

В этот запрос можно добавить следующие query-параметры:

- `type = actual/old/today/undefined` - вернуть новые меропрятия (которые еще не закончились), старые, сегодняшние или все
- `start = число/undefined` - если не задано, принимается равным 0
- `size = число/undefined` - если не задано, будут возвращены все подходящие карточки

Пример запроса: `/events?type=actual&start=50&size=10` - достать 10 актуальных мероприятий начиная после 50 (с 51)

### Ручки билетов:

POST `/tickets/create` - создать нужное число билетов на данное мероприятие (параметры запроса - в body)  
Если все хорошо, вернет `{ status: 'ok', tickets: список билетов с полной информацией, ticketsSold: число созданных билетов}`

PUT `/tickets/:id/check` - отметить билет с данным id как проверенный  
В теле запроса необходимо передать id мероприятия (если билет к другому мероприятию, вернется ошибка)  
Если все хорошо, вернет `{ status: 'ok', ticket: информация об отмеченном билете, ticketsChecked: 1}`

GET `/tickets/:id` - достать один билет по id  
Если все хорошо, вернет `{ status: 'ok', ticket: информация о билете}`

GET `/tickets` - достать все билеты
Если все хорошо, вернет `{ status: 'ok', tickets: список билетов мероприятия с полной информацией}`

В этот запрос можно добавить следующие query-параметры:

- `eventId` - вернуть билеты конкретного мероприятия
- `checked = true/false/undefined` - вернуть только отмеченные/неотмеченные билеты или все

Пример запроса: `/tickets?eventId=618673f5c894bc4c6caebc1d&checked=false` - достать неотмеченные билеты мероприятия с id=618673f5c894bc4c6caebc1d
