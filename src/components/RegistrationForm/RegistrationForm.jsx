// src/components/RegistrationForm/RegistrationForm.jsx
// 🎯 ФОРМА РЕГИСТРАЦИИ - ИЗ ПРИМЕРА С НАШЕЙ ВАЛИДАЦИЕЙ
// ====================================================
// Что делает этот компонент:
// 1. Поля: name, email, password, confirmPassword
// 2. Валидация: email - формат, password - минимум 7 символов (любые)
// 3. Проверка совпадения паролей через alert
// 4. Иконки валидации (зеленый/красный) для email и password
// 5. Отправка данных в родительский компонент через setUserData
// ====================================================

import { ErrorMessage, Field, Formik, Form } from 'formik';
// Formik - библиотека для управления формами
// Field - компонент для полей ввода
// ErrorMessage - компонент для отображения ошибок валидации
import s from './RegistrationForm.module.css';
import * as Yup from 'yup';
// Yup - библиотека для валидации схем
import { useId, useState } from 'react';
// useId - для генерации уникальных ID (связь label с input)
// useState - для хранения состояний подсветки полей
import DisplayPassword from '../DisplayPassword/DisplayPassword.jsx';
// Компонент для показа/скрытия первого пароля
import clsx from 'clsx';
// clsx - для условного объединения классов
import sprite from '../../assets/icon/icon-sprite.svg';
// sprite - файл со всеми иконками
import DisplayPasswordSecond from '../DisplayPasswordSecond/DisplayPasswordSecond.jsx';
// Компонент для показа/скрытия второго пароля

export default function RegistrationForm({ setUserData }) {
  // =============== 🟢 СОСТОЯНИЯ ДЛЯ ПОДСВЕТКИ ПОЛЕЙ ===============

  // 🟢 Для email
  const [errorsEmailRed, setErrorsEmailRed] = useState(false);
  const [errorsEmailGreen, setErrorsEmailGreen] = useState(false);

  // 🟢 Для первого пароля
  const [errPasswordRed, setErrPasswordRed] = useState(false);
  const [errPasswordGreen, setErrPasswordGreen] = useState(false);

  // 🟢 Для второго пароля
  const [errPasswordRedSecond, setErrPasswordRedSecond] = useState(false);
  const [errPasswordGreenSecond, setErrPasswordGreenSecond] = useState(false);

  // =============== 🟢 СОСТОЯНИЯ ДЛЯ ПОКАЗА/СКРЫТИЯ ПАРОЛЕЙ ===============
  const [displayPasswordFirst, setDisplayPasswordFirst] = useState(false);
  const [displayPasswordSecond, setDisplayPasswordSecond] = useState(false);

  // =============== 🟢 УНИКАЛЬНЫЕ ID ДЛЯ ПОЛЕЙ ===============
  const passwordId = useId(); // Для первого пароля
  const passwordIdSecond = useId(); // Для второго пароля

  // =============== 🟢 РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ ДЛЯ ВАЛИДАЦИИ ===============
  const format = {
    // Email: стандартный формат email@domain.com
    email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    // Пароль: любые символы, минимум 7 (упрощено из примера)
    password: /^.{7,}$/,
  };

  // =============== 🟢 СХЕМА ВАЛИДАЦИИ YUP ===============
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name is too long')
      .required('Name is required'),
    email: Yup.string()
      .matches(format.email, 'Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(7, 'Password must be at least 7 characters')
      .required('Password is required'),
    passwordSecond: Yup.string()
      .min(7, 'Password must be at least 7 characters')
      .required('Please confirm your password'),
  });

  // =============== 🟢 ОБРАБОТЧИК ОТПРАВКИ ФОРМЫ ===============
  const handleSubmit = (values, actions) => {
    // 🔥 ПРОВЕРКА СОВПАДЕНИЯ ПАРОЛЕЙ
    // Используем alert как в примере (без toast)
    if (values.password !== values.passwordSecond) {
      alert('❌ Passwords do not match!');
      return;
    }

    console.log('📤 Отправляем данные формы:', values);

    // 🟢 Передаем данные в родительский компонент (RegisterPage)
    setUserData({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    // 🟢 Сбрасываем состояния подсветки
    setErrorsEmailRed(false);
    setErrorsEmailGreen(false);
    setErrPasswordGreen(false);
    setErrPasswordRed(false);
    setErrPasswordRedSecond(false);
    setErrPasswordGreenSecond(false);

    // 🟢 Сбрасываем форму
    actions.resetForm();
  };

  // =============== 🟢 НАЧАЛЬНЫЕ ЗНАЧЕНИЯ ФОРМЫ ===============
  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordSecond: '',
  };

  // =============== 🟢 ФУНКЦИЯ ДЛЯ ПОДСВЕТКИ ПОЛЕЙ ===============
  // Вызывается при потере фокуса (onBlur)
  const handleErro = (name, value) => {
    // 🟢 Для email
    if (name === 'email') {
      if (format.email.test(value) && value.length > 0) {
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

    // 🟢 Для первого пароля
    if (name === 'password') {
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

    // 🟢 Для второго пароля
    if (name === 'passwordSecond') {
      if (value.length >= 7) {
        setErrPasswordRedSecond(false);
        setErrPasswordGreenSecond(true);
      }
      if (value.length < 7 && value.length > 0) {
        setErrPasswordGreenSecond(false);
        setErrPasswordRedSecond(true);
      }
      if (value.length === 0) {
        setErrPasswordGreenSecond(false);
        setErrPasswordRedSecond(false);
      }
    }
  };

  // =============== 🟢 РЕНДЕР ФОРМЫ ===============
  return (
    <ul className={s.boxRegistration}>
      <li>
        <p className={s.paragraphGreeting}>
          Thank you for your interest in our platform.
        </p>
      </li>
      <li className={s.formikBox}>
        {/* 🟢 Formik - обертка для формы */}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className={s.form}>
            {/* 🟢 ПОЛЕ NAME */}
            <div className={s.boxInput}>
              <Field
                name="name"
                type="text"
                placeholder="Name"
                autoComplete="name" // Автозаполнение браузера
                required
                className={clsx(s.input)}
              />
              <ErrorMessage
                name="name"
                component="span"
                className={s.errorName}
              />
            </div>

            {/* 🟢 ПОЛЕ EMAIL */}
            <div className={s.boxInput}>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                required
                className={clsx(
                  s.input,
                  errorsEmailRed && s.errBorderRed,
                  errorsEmailGreen && s.errBorderGreen
                )}
                onBlur={e => {
                  handleErro('email', e.target.value);
                }}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={s.errorEmail}
              />
              {/* Иконка крестика (красная) если ошибка */}
              {errorsEmailRed && (
                <svg className={s.iconEmail}>
                  <use href={`${sprite}#icon-cross-red`} />
                </svg>
              )}
              {/* Иконка галочки (зеленая) если успех */}
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
                  displayPassword={displayPasswordFirst}
                  setDisplayPassword={setDisplayPasswordFirst}
                />
              </label>
              <Field
                id={passwordId}
                name="password"
                type={displayPasswordFirst ? 'text' : 'password'}
                placeholder="Password"
                autoComplete="new-password"
                required
                className={clsx(
                  s.input,
                  errPasswordRed && s.errBorderRed,
                  errPasswordGreen && s.errBorderGreen
                )}
                onBlur={e => {
                  handleErro('password', e.target.value);
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

            {/* 🟢 ПОЛЕ ПОДТВЕРЖДЕНИЯ ПАРОЛЯ */}
            <div className={s.boxInput}>
              <label htmlFor={passwordIdSecond} className={s.labelPassword}>
                <DisplayPasswordSecond
                  displayPassword={displayPasswordSecond}
                  setDisplayPassword={setDisplayPasswordSecond}
                />
              </label>
              <Field
                id={passwordIdSecond}
                name="passwordSecond"
                type={displayPasswordSecond ? 'text' : 'password'}
                placeholder="Confirm password"
                autoComplete="new-password"
                required
                className={clsx(
                  s.input,
                  errPasswordRedSecond && s.errBorderRed,
                  errPasswordGreenSecond && s.errBorderGreen
                )}
                onBlur={e => {
                  handleErro('passwordSecond', e.target.value);
                }}
              />
              <ErrorMessage
                name="passwordSecond"
                component="span"
                className={s.errorPasswordSecond}
              />
              {errPasswordRedSecond && (
                <svg className={s.iconPassword}>
                  <use href={`${sprite}#icon-cross-red`} />
                </svg>
              )}
              {errPasswordGreenSecond && (
                <svg className={s.iconPassword}>
                  <use href={`${sprite}#icon-check-mark-green`} />
                </svg>
              )}
            </div>

            {/* 🟢 КНОПКА ОТПРАВКИ */}
            <button type="submit" className={s.buttonSubmit}>
              Registration
            </button>
          </Form>
        </Formik>
      </li>
    </ul>
  );
}
