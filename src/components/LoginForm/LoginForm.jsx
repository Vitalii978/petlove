import { ErrorMessage, Field, Formik, Form } from 'formik';
import s from './LoginForm.module.css';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useId, useState } from 'react';
import DisplayPassword from '../DisplayPassword/DisplayPassword.jsx';
import clsx from 'clsx';
import sprite from '../../assets/icon/icon-sprite.svg';

export default function LoginForm({ setUserDataLogin }) {
  const [errorsEmailRed, setErrorsEmailRed] = useState(false);
  const [errorsEmailGreen, setErrorsEmailGreen] = useState(false);

  const [errPasswordRed, setErrPasswordRed] = useState(false);
  const [errPasswordGreen, setErrPasswordGreen] = useState(false);

  const passwordId = useId();

  const [displayPassword, setDisplayPassword] = useState(false);

  const format = {
    email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    password: /^.{7,}$/,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(format.email, 'Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(7, 'Password must be at least 7 characters')
      .required('Password is required'),
  });

  const handleSubmit = (values, actions) => {
    setUserDataLogin(values);

    setErrorsEmailRed(false);
    setErrorsEmailGreen(false);
    setErrPasswordGreen(false);
    setErrPasswordRed(false);

    actions.resetForm();
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const handleErro = (type, value) => {
    if (type === 'email') {
      if (format.email.test(value)) {
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

    if (type === 'password') {
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
            <div className={s.boxInput}>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                required
                autoComplete="email"
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
                autoComplete="current-password"
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

            <button type="submit" className={s.buttonSubmit}>
              Log In
            </button>
          </Form>
        </Formik>
      </li>
    </ul>
  );
}