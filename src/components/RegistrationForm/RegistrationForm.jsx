import { ErrorMessage, Field, Formik, Form } from 'formik';
import s from './RegistrationForm.module.css';
import * as Yup from 'yup';
import { useId, useState } from 'react';
import DisplayPassword from '../DisplayPassword/DisplayPassword.jsx';
import clsx from 'clsx';
import sprite from '../../assets/icon/icon-sprite.svg';
import DisplayPasswordSecond from '../DisplayPasswordSecond/DisplayPasswordSecond.jsx';

export default function RegistrationForm({ setUserData }) {
  const [errorsEmailRed, setErrorsEmailRed] = useState(false);
  const [errorsEmailGreen, setErrorsEmailGreen] = useState(false);

  const [errPasswordRed, setErrPasswordRed] = useState(false);
  const [errPasswordGreen, setErrPasswordGreen] = useState(false);

  const [errPasswordRedSecond, setErrPasswordRedSecond] = useState(false);
  const [errPasswordGreenSecond, setErrPasswordGreenSecond] = useState(false);

  const [displayPasswordFirst, setDisplayPasswordFirst] = useState(false);
  const [displayPasswordSecond, setDisplayPasswordSecond] = useState(false);

  const passwordId = useId();
  const passwordIdSecond = useId();

  const format = {
    email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    password: /^.{7,}$/,
  };

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

  const handleSubmit = (values, actions) => {
    if (values.password !== values.passwordSecond) {
      alert('❌ Passwords do not match!');
      return;
    }

    setUserData({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    setErrorsEmailRed(false);
    setErrorsEmailGreen(false);
    setErrPasswordGreen(false);
    setErrPasswordRed(false);
    setErrPasswordRedSecond(false);
    setErrPasswordGreenSecond(false);

    actions.resetForm();
  };

  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordSecond: '',
  };

  const handleErro = (name, value) => {
    if (name === 'email') {
      if (format.email.test(value) && value.length > 0) {
        setErrorsEmailRed(false);
        setErrorsEmailGreen(true);
      }
      if (!format.email.test(value) && value.length > 0) {
        setErrorsEmailGreen(false);
        setErrorsEmailRed(true);
      }
      if (value.length === 0) {
        setErrorsEmailGreen(false);
        setErrorsEmailRed(false);
      }
    }

    if (name === 'password') {
      if (value.length >= 7) {
        setErrPasswordRed(false);
        setErrPasswordGreen(true);
      }
      if (value.length < 7 && value.length > 0) {
        setErrPasswordGreen(false);
        setErrPasswordRed(true);
      }
      if (value.length === 0) {
        setErrPasswordGreen(false);
        setErrPasswordRed(false);
      }
    }

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

  return (
    <ul className={s.boxRegistration}>
      <li>
        <p className={s.paragraphGreeting}>
          Thank you for your interest in our platform.
        </p>
      </li>
      <li className={s.formikBox}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className={s.form}>
            <div className={s.boxInput}>
              <Field
                name="name"
                type="text"
                placeholder="Name"
                autoComplete="name"
                required
                className={clsx(s.input)}
              />
              <ErrorMessage
                name="name"
                component="span"
                className={s.errorName}
              />
            </div>

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

            <button type="submit" className={s.buttonSubmit}>
              Registration
            </button>
          </Form>
        </Formik>
      </li>
    </ul>
  );
}
