# [лукойлнамарсе.рф](https://xn--80aapnefcjhh2amq.xn--p1ai/)

Сервис оптимизации работы персонала, расходов топлива и посторойки АЗС — финальное задание [BEST Hack'21](https://vk.com/besthack2021).

## Технологии

- [React](https://reactjs.org/) &mdash; современная JS-библиотека для разработки пользовательских интерфейсов.
- [Material-UI](https://material-ui.com/) &mdash; React UI фреймворк для воплощения [Material Design](https://material.io/).
- [Django](https://www.djangoproject.com/) &mdash; фреймворк для веб-приложений на Python, предалагющий хорошую админку из коробки, ORM и реализующий MVC.

## Запуск локальной версии проекта

#### 1. Склонировать репозиторий

```bash
$ git clone https://github.com/solid-happiness/lukoil-mars.git
```

#### 2. Создать и запустить виртуальное окружение

```bash
$ python -m venv server/venv
$ source server/venv/bin/activate
```

#### 3. Установить зависимости

```bash
$ pip install -r requirements.txt
$ npm run bootstrap
```

#### 4. Выполнить миграции

```bash
$ python server/manage.py migrate
```

#### 5. Запустить проект

В первой консоли запустить сборку клиентской части:

```bash
$ npm run dev
```

Во второй консоли запустить django-сервер:

```bash
$ python server/manage.py runserver
```

В браузере перейти на `localhost:3000`.

## Авторы

Название команды: **solid-happiness**

Состав команды:

- **Алесин Александр** &mdash; капитан
- **Малеев Алексей**
- **Туманов Иван**
- **Чебаков Дмитрий**
