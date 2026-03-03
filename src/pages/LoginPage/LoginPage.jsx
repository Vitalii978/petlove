import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../utils/auth';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import PetBlock from '../../components/PetBlock/PetBlock';
import Title from '../../components/Title/Title';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [userDataLogin, setUserDataLogin] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userDataLogin.email || !userDataLogin.password) return;

    const handleLogin = async () => {
      setError('');

      try {
        const result = await login({
          email: userDataLogin.email.trim(),
          password: userDataLogin.password,
        });

        if (result.success) {
          navigate('/profile/favorites');
        } else {
          setError(result.error || 'Login failed');
        }
      } catch {
        setError('Something went wrong. Please try again.');
      }
    };

    handleLogin();
  }, [userDataLogin, navigate]);

  return (
    <section className={styles.loginSection}>
      <ul className={styles.login}>
        <li className={styles.petBlock}>
          <PetBlock>
            <source
              srcSet="/dogLoginMob_1x.png 1x, /dogLoginMob_2x.png 2x"
              media="(max-width: 767px)"
            />
            <source
              srcSet="/dogLoginTab_1x.png 1x, /dogLoginTab_2x.png 2x"
              media="(min-width: 768px) and (max-width: 1279.5px)"
            />
            <source
              srcSet="/dogLoginPc_1x.png 1x, /dogLoginPc_2x.png 2x"
              media="(min-width: 1280px)"
            />
            <img src="/dogLoginMob_1x.png" alt="dog" />
          </PetBlock>
        </li>

        <li className={styles.boxLogin}>
          <Title>Log in</Title>

          {error && (
            <div className={styles.error} role="alert">
              <p>{error}</p>
            </div>
          )}

          <LoginForm setUserDataLogin={setUserDataLogin} />

          <div className={styles.registerLink}>
            <p className={styles.registerText}>
              Don't have an account?{' '}
              <Link to="/register" className={styles.link}>
                Register
              </Link>
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default LoginPage;
