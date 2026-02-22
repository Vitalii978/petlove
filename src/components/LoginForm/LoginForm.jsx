// src/components/LoginForm/LoginForm.jsx
// 🎯 ФОРМА ВХОДА - ИСПРАВЛЕНО: пароль только 7+ символов, английские сообщения, автозаполнение
// ====================================================
// Что делает этот компонент:
// 1. Отображает поля email и password
// 2. Валидирует ввод: email - формат, password - минимум 7 символов
// 3. Показывает иконки валидации (зеленый/красный)
// 4. Отправляет данные в родительский компонент через setUserDataLogin
// 5. Поддерживает автозаполнение браузера
// ====================================================

import { ErrorMessage, Field, Formik, Form } from 'formik';
import s from './LoginForm.module.css';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useId, useState } from 'react';
import DisplayPassword from '../DisplayPassword/DisplayPassword.jsx';
import clsx from 'clsx';
import sprite from '../../assets/icon/icon-sprite.svg';

export default function LoginForm({ setUserDataLogin }) {
  // 🟢 Состояния для подсветки полей (красный/зеленый бордер)
  const [errorsEmailRed, setErrorsEmailRed] = useState(false);
  const [errorsEmailGreen, setErrorsEmailGreen] = useState(false);

  const [errPasswordRed, setErrPasswordRed] = useState(false);
  const [errPasswordGreen, setErrPasswordGreen] = useState(false);

  // 🟢 Уникальный ID для поля пароля (нужен для связи с label)
  const passwordId = useId();

  // 🟢 Состояние для показа/скрытия пароля
  const [displayPassword, setDisplayPassword] = useState(false);

  // 🟢 Регулярное выражение для email (как в примере)
  const format = {
    email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    // 🔥 ИЗМЕНЕНО: пароль - ЛЮБЫЕ символы, минимум 7
    // Раньше было: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{7,}/
    // Теперь: просто длина от 7 символов, любые символы
    password: /^.{7,}$/, // ✅ Любые символы, минимум 7
  };

  // 🎯 СХЕМА ВАЛИДАЦИИ YUP
  // 🔥 ИСПРАВЛЕНО: сообщения на английском
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(format.email, 'Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(7, 'Password must be at least 7 characters') // ✅ Сообщение на английском
      .required('Password is required'),
  });

  // 🎯 ОБРАБОТЧИК ОТПРАВКИ ФОРМЫ
  const handleSubmit = (values, actions) => {
    console.log('📤 Отправляем данные формы:', values);

    // Передаем данные в родительский компонент (LoginPage)
    setUserDataLogin(values);

    // Сбрасываем состояния подсветки
    setErrorsEmailRed(false);
    setErrorsEmailGreen(false);
    setErrPasswordGreen(false);
    setErrPasswordRed(false);

    // Сбрасываем форму
    actions.resetForm();
  };

  // 🎯 НАЧАЛЬНЫЕ ЗНАЧЕНИЯ ФОРМЫ (пустые)
  const initialValues = {
    email: '',
    password: '',
  };

  // 🎯 ФУНКЦИЯ ДЛЯ ПОДСВЕТКИ ПОЛЕЙ (красный/зеленый)
  // Вызывается при потере фокуса (onBlur)
  const handleErro = (type, value) => {
    if (type === 'email') {
      if (format.email.test(value)) {
        // ✅ Email правильный - зеленая подсветка
        setErrorsEmailRed(false);
        setErrorsEmailGreen(true);
      }
      if (!format.email.test(value) && value.length > 0) {
        // ❌ Email неправильный - красная подсветка
        setErrorsEmailGreen(false);
        setErrorsEmailRed(true);
      }
      if (value.length === 0) {
        // Пустое поле - убираем подсветку
        setErrorsEmailGreen(false);
        setErrorsEmailRed(false);
      }
    }

    if (type === 'password') {
      // 🔥 ИЗМЕНЕНО: проверяем только длину
      if (value.length >= 7) {
        // ✅ Длина достаточная - зеленая подсветка
        setErrPasswordRed(false);
        setErrPasswordGreen(true);
      }
      if (value.length < 7 && value.length > 0) {
        // ❌ Длина недостаточная - красная подсветка
        setErrPasswordGreen(false);
        setErrPasswordRed(true);
      }
      if (value.length === 0) {
        // Пустое поле - убираем подсветку
        setErrPasswordGreen(false);
        setErrPasswordRed(false);
      }
    }
  };

  return (
    <ul className={s.boxLogin}>
      <li>
        <p className={s.paragraphGreeting}>
          Welcome! Please enter your credentials to login to the platform:
        </p>
      </li>
      <li className={s.formikBox}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className={s.form}>
            {/* 🟢 ПОЛЕ EMAIL */}
            <div className={s.boxInput}>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                required
                autoComplete="email" // ✅ Включаем автозаполнение для email
                className={clsx(
                  s.input,
                  errorsEmailRed && s.errBorderRed,
                  errorsEmailGreen && s.errBorderGreen
                )}
                onBlur={e => {
                  handleErro(e.target.type, e.target.value);
                }}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={s.errorEmail}
              />
              {errorsEmailRed && (
                <svg className={s.iconEmail}>
                  <use href={`${sprite}#icon-cross-red`} />
                </svg>
              )}
              {errorsEmailGreen && (
                <svg className={s.iconEmail}>
                  <use href={`${sprite}#icon-check-mark-green`} />
                </svg>
              )}
            </div>

            {/* 🟢 ПОЛЕ ПАРОЛЯ */}
            <div className={s.boxInput}>
              <label htmlFor={passwordId} className={s.labelPassword}>
                <DisplayPassword
                  displayPassword={displayPassword}
                  setDisplayPassword={setDisplayPassword}
                />
              </label>
              <Field
                id={passwordId}
                name="password"
                type={displayPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                autoComplete="current-password" // ✅ Включаем автозаполнение для пароля
                className={clsx(
                  s.input,
                  errPasswordRed && s.errBorderRed,
                  errPasswordGreen && s.errBorderGreen
                )}
                onBlur={e => {
                  handleErro(e.target.type, e.target.value);
                }}
              />
              <ErrorMessage
                name="password"
                component="span"
                className={s.errorPassword}
              />
              {errPasswordRed && (
                <svg className={s.iconPassword}>
                  <use href={`${sprite}#icon-cross-red`} />
                </svg>
              )}
              {errPasswordGreen && (
                <svg className={s.iconPassword}>
                  <use href={`${sprite}#icon-check-mark-green`} />
                </svg>
              )}
            </div>

            {/* 🟢 КНОПКА ОТПРАВКИ */}
            <button type="submit" className={s.buttonSubmit}>
              Log In
            </button>
          </Form>
        </Formik>
      </li>
    </ul>
  );
}
