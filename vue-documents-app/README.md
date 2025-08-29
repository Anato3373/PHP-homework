# Vue Documents Dashboard

Приложение для поиска и предпросмотра документов, построенное на Vue 3 с использованием Composition API.

## Технологии

- Vue 3 (Composition API)
- TypeScript
- Pinia (менеджер состояний)
- Vite (сборщик)
- SCSS (стили)
- Axios (HTTP клиент)

## Функциональность

- Поиск документов с debounce
- Предпросмотр документов
- Скачивание документов в формате .txt
- Удаление документов (только с изображениями)
- Адаптивный дизайн
- Обработка ошибок
- Индикаторы загрузки

## Установка и запуск

### Разработка

```bash
npm install
npm run dev
```

### Сборка

```bash
npm run build
npm run preview
```

### Docker

```bash
docker-compose up --build
```

## Структура проекта

```
src/
├── components/          # Vue компоненты
├── stores/             # Pinia stores
├── types/              # TypeScript типы
├── utils/              # Утилиты
├── views/              # Страницы
└── assets/             # Статические ресурсы
```

## Переменные окружения

Создайте файл `.env`:

```
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_TITLE=Vue Documents Dashboard
```

## API Endpoints

- `GET /documents/search` - поиск документов
- `GET /documents/:id` - получение документа по ID
- `DELETE /documents/:id` - удаление документа
