import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../utils/auth';
import Title from '../../components/Title/Title';
import PetBlock from '../../components/PetBlock/PetBlock';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm.jsx';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userData.name || !userData.email || !userData.password) return;

    const handleRegister = async () => {
      setError('');

      try {
        const result = await register({
          name: userData.name.trim(),
          email: userData.email.trim(),
          password: userData.password,
        });

        if (result.success) {
          navigate('/profile/favorites');
        } else {
          setError(result.error || 'Registration failed');
        }
      } catch {
        setError('Something went wrong. Please try again.');
      }
    };

    handleRegister();
  }, [userData, navigate]);

  return (
    <section className={styles.registrationSection}>
      <ul className={styles.registration}>
        <li className={styles.petBlock}>
          <PetBlock style={'cat'}>
            <source
              srcSet="/catRegisterMob_1x.png 1x, /catRegisterMob_2x.png 2x"
              media="(max-width: 767px)"
            />
            <source
              srcSet="/catRegisterTab_1x.png 1x, /catRegisterTab_2x.png 2x"
              media="(min-width: 768px) and (max-width: 1279.5px)"
            />
            <source
              srcSet="/catRegisterPC_1x.png 1x, /catRegisterPC_2x.png 2x"
              media="(min-width: 1280px)"
            />
            <img src="/catRegisterMob_1x.png" alt="cat" />
          </PetBlock>
        </li>

        <li className={styles.boxRegistration}>
          <Title>Registration</Title>

          {error && (
            <div className={styles.error} role="alert">
              <p>{error}</p>
            </div>
          )}

          <RegistrationForm setUserData={setUserData} />

          <div className={styles.loginLink}>
            <p className={styles.loginText}>
              Already have an account?{' '}
              <Link to="/login" className={styles.link}>
                Log In
              </Link>
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default RegisterPage;
