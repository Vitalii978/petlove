import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../utils/auth';
import Title from '../../components/Title/Title';
import PetBlock from '../../components/PetBlock/PetBlock';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (formData.password.length < 7) {
      setError('Password must be at least 7 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      if (result.success) {
        navigate('/profile');
      } else {
        setError(result.error);
      }
    } catch {
      // 🎯 ИСПРАВЛЕНО: убрал параметр err, так как он не используется
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        {/* 🎯 PetBlock - один компонент, позиционируется стилями */}
        <div className={styles.petBlockWrapper}>
          <PetBlock>
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
        </div>

        {/* 🎯 Форма регистрации */}
        <div className={styles.formSection}>
          <Title text="Registration" />

          {error && (
            <div className={styles.error}>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter your name"
                disabled={loading}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter your email"
                disabled={loading}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="Min 7 characters"
                disabled={loading}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={styles.input}
                placeholder="Confirm password"
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className={styles.loginLink}>
            <p className={styles.loginText}>
              Already have an account?{' '}
              <Link to="/login" className={styles.link}>
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
