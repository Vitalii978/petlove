---

# 📄 **ENGLISH VERSION (add this after the Russian version)**


# PetLove 🐾 (English)

👉 **[View Live Site](https://tailfriend.vercel.app)*

A platform for finding pets. Find your friend among thousands of listings for sale, free adoption, lost and found animals.

---

## 📋 Project Description

**PetLove** is a web application that helps people find pets or help animals find a new home. Users can browse listings, filter them by various criteria, add to favorites, and view history.

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- Secure token-based authentication
- Protected routes (profile page only for authorized users)

### 🔍 Pet Search
- Browse all available listings
- Filter by: category (sell, free, lost, found), gender, pet type, location
- Keyword search
- Pagination with page numbers

### ❤️ Favorites System
- Add/remove listings to favorites
- Favorites stored on the server for each user
- Separate favorites page with delete option

### 👁️ View History
- Automatic saving of viewed listings
- Viewed listings stored in localStorage
- Separate page with view history

### 📝 Adding Pets
- Add your own pets to your profile
- Photo upload via Cloudinary
- Form validation for all fields

### 🎨 User Interface
- Responsive design (from 320px to 1280px)
- Modern and clean interface
- Burger menu for mobile devices
- Modal windows with detailed information

---

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **React Router 6** - navigation and routing
- **React Hook Form** - form handling
- **Yup** - form validation
- **Axios** - HTTP requests to API
- **CSS Modules** - component styling
- **clsx** - conditional class joining

### Backend & API
- [**PetLove API**](https://petlove.b.goit.study/api-docs) - API documentation
- **Cloudinary** - image upload and storage

### Development Tools
- **Vite** - build tool and development server
- **ESLint** - code quality checking
- **Git** - version control

---

## 📱 Responsive Design

The application is fully responsive and optimized for:

| Device       | Screen Width   |
| ------------ | -------------- |
| **Mobile**   | 320px - 767px  |
| **Tablet**   | 768px - 1279px |
| **Desktop**  | 1280px+        |

---

## 🔐 Authentication Process

- **Registration**: Users can register with name, email, and password
- **Login**: Registered users can log in with email and password
- **Session Persistence**: Token is stored in localStorage
- **Protected Routes**: Profile page is only accessible to authorized users
- **Authorization**: Adding to favorites requires authorization (otherwise a modal is shown)

---

## 🎯 Key Implemented Features

### Filtering and Sorting
- ✅ Filter by category (sell, free, lost, found)
- ✅ Filter by gender (male, female, multiple, unknown)
- ✅ Filter by pet type (dog, cat, bird, etc.)
- ✅ Filter by location (cities of Ukraine)
- ✅ Keyword search
- ✅ Sort by popularity (Popular/Unpopular)
- ✅ Sort by price (Cheap/Expensive)
- ✅ Sort by date

### Favorites System
- ✅ Add/remove to favorites from card
- ✅ Add/remove from modal window
- ✅ Instant UI update
- ✅ Server synchronization

### View History
- ✅ Automatic saving of viewed listings
- ✅ Stored in localStorage
- ✅ Displayed on a separate page

### User Profile
- ✅ Edit personal data
- ✅ Add pets
- ✅ Delete pets
- ✅ Logout with confirmation

### Pagination
- ✅ 6 cards per page
- ✅ Page numbers with navigation
- ✅ "<<" and ">>" buttons for first/last page

---

## 📄 Completed Technical Requirements

✅ User authentication
✅ Form validation with react-hook-form & yup
✅ Filtering and sorting of listings
✅ Favorites functionality
✅ View history
✅ Adding pets
✅ Responsive design (from 320px to 1280px)
✅ Pagination with page numbers
✅ Modal windows with proper close handlers
✅ Error handling and user feedback
✅ Code quality and formatting
✅ Semantic HTML (ul/li where needed)
✅ Image optimization
✅ Retina display support

---

## 🚀 Application Routes

### Public Routes (accessible to all)
| Route        | Page             | Description                    |
| ------------ | ---------------- | ------------------------------ |
| `/`          | **HomePage**     | Home page with welcome message |
| `/news`      | **NewsPage**     | Pet news                       |
| `/notices`   | **NoticesPage**  | All listings with filtering    |
| `/friends`   | **FriendsPage**  | Our partners and shelters      |
| `/login`     | **LoginPage**    | Login to account               |
| `/register`  | **RegisterPage** | Registration                   |

### Private Routes (authorized users only)
| Route                 | Page             | Description             |
| --------------------- | ---------------- | ----------------------- |
| `/profile`            | **ProfilePage**  | User profile            |
| `/profile/favorites`  | **FavoritesList**| Favorite listings       |
| `/profile/viewed`     | **ViewedList**   | Viewed listings         |
| `/add-pet`            | **AddPetPage**   | Add a pet               |

---

## ⚙️ Installation and Setup

### 1. Clone Repository

git clone https://github.com/Vitalii978/petlove.git
2. Go to Project Directory
bash
cd petlove
3. Install Dependencies
bash
npm install
4. Create .env file
env
VITE_API_BASE_URL=https://petlove.b.goit.study/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
5. Start Development Server
bash
npm run dev
6. Build for Production
bash
npm run build
7. Preview Production Build
bash
npm run preview
🔗 Useful Links
Live Site - deployed on Vercel

Figma Design - design mockups

Technical Requirements - project requirements

API Documentation - backend API

👤 Author
Vitalii Klymenko

[GitHub: Vitalii978](https://github.com/Vitalii978)

Email: Vitalii.Klymenko78@gmail.com

📄 License
This project was created for educational purposes as part of a technical assignment for the Full Stack Developer course.







# PetLove 🐾

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://petlove.vercel.app)
👉 **[Посмотреть сайт](https://tailfriend.vercel.app)**

Платформа для поиска домашних животных. Найди себе друга среди тысяч объявлений о продаже, дарении, потерянных и найденных животных.

---

## 📋 Описание проекта

**PetLove** — это веб-приложение, которое помогает людям найти домашних животных или помочь животным найти новый дом. Пользователи могут просматривать объявления, фильтровать их по различным критериям, добавлять в избранное и просматривать историю.

---

## ✨ Возможности

### 🔐 Аутентификация
- Регистрация и вход пользователей
- Безопасная аутентификация с токенами
- Защищенные маршруты (страница профиля только для авторизованных)

### 🔍 Поиск животных
- Просмотр всех доступных объявлений
- Фильтрация по: категории (продажа, даром, потерян, найден), полу, типу животного, локации
- Поиск по ключевым словам
- Пагинация с номерами страниц

### ❤️ Система избранного
- Добавление/удаление объявлений в избранное
- Избранное сохраняется на сервере для каждого пользователя
- Отдельная страница избранного с возможностью удаления

### 👁️ История просмотров
- Автоматическое сохранение просмотренных объявлений
- Просмотренные хранятся в localStorage
- Отдельная страница с историей просмотров

### 📝 Добавление питомцев
- Добавление собственных питомцев в профиль
- Загрузка фото через Cloudinary
- Валидация всех полей формы

### 🎨 Пользовательский интерфейс
- Адаптивный дизайн (от 320px до 1280px)
- Современный и чистый интерфейс
- Бургер-меню для мобильных устройств
- Модальные окна с детальной информацией

---

## 🛠️ Используемые технологии

### Frontend
- **React 18** - библиотека для пользовательского интерфейса
- **React Router 6** - навигация и маршрутизация
- **React Hook Form** - работа с формами
- **Yup** - валидация форм
- **Axios** - HTTP-запросы к API
- **CSS Modules** - стилизация компонентов
- **clsx** - условное объединение классов

### Backend & API
- [**PetLove API**](https://petlove.b.goit.study/api-docs) - документация API
- **Cloudinary** - загрузка и хранение изображений

### Инструменты разработки
- **Vite** - сборка и сервер разработки
- **ESLint** - проверка качества кода
- **Git** - контроль версий

---

## 📱 Адаптивный дизайн

Приложение полностью адаптивно и оптимизировано для:

| Устройство    | Ширина экрана  |
| ------------- | -------------- |
| **Мобильные** | 320px - 767px  |
| **Планшеты**  | 768px - 1279px |
| **Десктоп**   | 1280px+        |

---

## 🔐 Процесс аутентификации

- **Регистрация**: Пользователи могут зарегистрироваться с именем, email и паролем
- **Вход**: Зарегистрированные пользователи могут войти с email и паролем
- **Сохранение сессии**: Токен сохраняется в localStorage
- **Защищенные маршруты**: Страница профиля доступна только авторизованным пользователям
- **Авторизация**: Добавление в избранное требует авторизации (иначе показывается модальное окно)

---

## 🎯 Ключевые реализованные функции

### Фильтрация и сортировка
- ✅ Фильтр по категории (sell, free, lost, found)
- ✅ Фильтр по полу (male, female, multiple, unknown)
- ✅ Фильтр по типу животного (dog, cat, bird, etc.)
- ✅ Фильтр по локации (города Украины)
- ✅ Поиск по ключевым словам
- ✅ Сортировка по популярности (Popular/Unpopular)
- ✅ Сортировка по цене (Cheap/Expensive)
- ✅ Сортировка по дате

### Система избранного
- ✅ Добавление/удаление в избранное из карточки
- ✅ Добавление/удаление из модального окна
- ✅ Мгновенное обновление интерфейса
- ✅ Синхронизация с сервером

### История просмотров
- ✅ Автоматическое сохранение просмотренных объявлений
- ✅ Хранение в localStorage
- ✅ Отображение на отдельной странице

### Профиль пользователя
- ✅ Редактирование личных данных
- ✅ Добавление питомцев
- ✅ Удаление питомцев
- ✅ Выход из аккаунта с подтверждением

### Пагинация
- ✅ По 6 карточек на страницу
- ✅ Номера страниц с возможностью перехода
- ✅ Кнопки "<<" и ">>" для перехода в начало/конец

---

## 📄 Выполненные технические требования

✅ Аутентификация пользователей
✅ Валидация форм с react-hook-form & yup
✅ Фильтрация и сортировка объявлений
✅ Функциональность избранного
✅ История просмотров
✅ Добавление питомцев
✅ Адаптивный дизайн (от 320px до 1280px)
✅ Пагинация с номерами страниц
✅ Модальные окна с правильными обработчиками закрытия
✅ Обработка ошибок и обратная связь пользователю
✅ Качество кода и форматирование
✅ Семантическая верстка (ul/li где нужно)
✅ Оптимизация изображений
✅ Поддержка ретина-экранов

---

## 🚀 Маршруты приложения

### Публичные маршруты (доступны всем)
| Маршрут     | Страница         | Описание                        |
| ----------- | ---------------- | ------------------------------- |
| `/`         | **HomePage**     | Главная страница с приветствием |
| `/news`     | **NewsPage**     | Новости о животных              |
| `/notices`  | **NoticesPage**  | Все объявления с фильтрацией    |
| `/friends`  | **FriendsPage**  | Наши партнеры и приюты          |
| `/login`    | **LoginPage**    | Вход в аккаунт                  |
| `/register` | **RegisterPage** | Регистрация                     |

### Приватные маршруты (только для авторизованных)
| Маршрут              | Страница          | Описание                 |
| -------------------- | ----------------- | ------------------------ |
| `/profile`           | **ProfilePage**   | Профиль пользователя     |
| `/profile/favorites` | **FavoritesList** | Избранные объявления     |
| `/profile/viewed`    | **ViewedList**    | Просмотренные объявления |
| `/add-pet`           | **AddPetPage**    | Добавление питомца       |

---

## ⚙️ Установка и запуск

### 1. Клонирование репозитория

git clone https://github.com/Vitalii978/petlove.git
2. Переход в папку проекта
bash
cd petlove
3. Установка зависимостей
bash
npm install
4. Создание файла .env
env
VITE_API_BASE_URL=https://petlove.b.goit.study/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
5. Запуск в режиме разработки
bash
npm run dev
6. Сборка для продакшена
bash
npm run build
7. Предпросмотр собранного проекта
bash
npm run preview
🔗 Полезные ссылки
Живой сайт - деплой на Vercel

Макет в Figma - дизайн-проект

Техническое задание - требования к проекту

API документация - бэкенд API

👤 Автор
Vitalii Klymenko

[GitHub: Vitalii978](https://github.com/Vitalii978)

Email: Vitalii.Klymenko78@gmail.com

📄 Лицензия
Этот проект создан в образовательных целях как часть технического задания для курса Full Stack Developer.

