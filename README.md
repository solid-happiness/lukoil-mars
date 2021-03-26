# [project name](project url)

Описание проекта

## Использование

Описание использования

## Технологии

- [React](https://reactjs.org/) &mdash; современная JS-библиотека для разработки пользовательских интерфейсов.
- [Material-UI](https://material-ui.com/) &mdash; React UI фреймворк для воплощения [Material Design](https://material.io/).
- [Flask](https://flask.palletsprojects.com/en/1.1.x/) &mdash; фреймворк для создания веб-приложений на языке программирования Python.

## Запуск локальной версии проекта

#### 1. Склонировать репозиторий

```bash
$ git clone https://github.com/solid-happiness/stylish-cow.git
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

#### 4. Запустить проект

В первой консоли запустить сборку клиентской части:

```bash
$ npm run dev
```

Во второй консоли запустить flask-сервер:

```bash
$ cd server/
$ flask run
```

В браузере перейти на `localhost:3000`.

## Авторы

Название команды: **solid-happiness**

Состав команды:

- **Алесин Александр** &mdash; капитан
- **Малеев Алексей**
- **Туманов Иван**
- **Чебаков Дмитрий**
