// 📁 src/components/AddPetForm/AddPetForm.jsx
// 🎯 ПОЛНАЯ ФОРМА ДОБАВЛЕНИЯ ПИТОМЦА С ИСПОЛЬЗОВАНИЕМ resetForm
// ВАРИАНТ Б: resetForm используется для очистки формы после успешной отправки

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import api from '../../services/api';
import sprite from '../../assets/icon/icon-sprite.svg';
import { uploadPhotoToCloudinary } from '../../utils/cloudinary';
import styles from './AddPetForm.module.css';

// 🎯 ТИПЫ ЖИВОТНЫХ ИЗ FIGMA
const PET_TYPES = ['Dog', 'Cat', 'Monkey', 'Bird'];

// 🎯 СХЕМА ВАЛИДАЦИИ YUP
const AddPetSchema = Yup.object().shape({
  // Фото - обязательный URL картинки
  imgURL: Yup.string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      'Must be a valid image URL (png, jpg, jpeg, gif, bmp, webp)'
    )
    .required('Photo is required'),
  
  // Заголовок - от 3 до 50 символов
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be less than 50 characters')
    .required('Title is required'),
  
  // Кличка - от 2 до 30 символов
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name must be less than 30 characters')
    .required('Pet name is required'),
  
  // Дата рождения - строгий формат
  birthday: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in format YYYY-MM-DD')
    .required('Birthday is required'),
  
  // Вид животного - только из списка
  species: Yup.string()
    .oneOf(PET_TYPES, 'Please select a valid pet type')
    .required('Pet type is required'),
  
  // Пол - только три варианта
  sex: Yup.string()
    .oneOf(['female', 'male', 'multiple'], 'Please select gender')
    .required('Gender is required'),
});

const AddPetForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  // 🎯 НАЧАЛЬНЫЕ ЗНАЧЕНИЯ ФОРМЫ (ВСЕ ПУСТЫЕ)
  const initialValues = {
    imgURL: '',
    title: '',
    name: '',
    birthday: '',
    species: '',
    sex: '',
  };

  // 🎯 ОБРАБОТЧИК ОТПРАВКИ ФОРМЫ - ВАРИАНТ Б С resetForm
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setIsSubmitting(true);
      setError('');

      console.log('📤 Отправляем данные питомца:', values);

      // 🎯 ОТПРАВКА НА СЕРВЕР
      const response = await api.post('/users/current/pets', values);

      console.log('✅ Питомец добавлен:', response.data);
      
      // 🎯 ПОКАЗЫВАЕМ СООБЩЕНИЕ ОБ УСПЕХЕ
      alert('🎉 Pet added successfully!');
      
      // 🎯 ВАЖНО! ОЧИЩАЕМ ФОРМУ С ПОМОЩЬЮ resetForm
      resetForm();
      
      // 🎯 ПЕРЕХОДИМ НА СТРАНИЦУ ПРОФИЛЯ
      navigate('/profile');
      
    } catch (error) {
      console.error('❌ Ошибка при добавлении питомца:', error);
      
      // 🎯 ОБРАБОТКА РАЗНЫХ ТИПОВ ОШИБОК
      if (error.response) {
        // Сервер вернул ошибку
        if (error.response.status === 401) {
          setError('Please log in to add a pet');
          navigate('/login');
        } else if (error.response.status === 400) {
          setError(error.response.data?.message || 'Invalid data');
        } else {
          setError(error.response.data?.message || 'Failed to add pet');
        }
      } else if (error.request) {
        // Нет ответа от сервера
        setError('No response from server. Check your internet connection.');
      } else {
        // Другая ошибка
        setError('Error: ' + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 🎯 ЗАГОЛОВОК СТРАНИЦЫ */}
      <h1 className={styles.title}>
        Add my pet /<span className={styles.spanTitle}> Personal details</span>
      </h1>

      {/* 🎯 FORMik - БИБЛИОТЕКА ДЛЯ ФОРМ */}
      <Formik
        initialValues={initialValues}
        validationSchema={AddPetSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.form}>
            
            {/* 🎯 ОБЩАЯ ОШИБКА (НЕ СВЯЗАННАЯ С КОНКРЕТНЫМ ПОЛЕМ) */}
            {error && (
              <div className={styles.errorMessage} role="alert">
                {error}
              </div>
            )}

            {/* 🎯 ГЛАВНЫЙ СПИСОК ВСЕХ ПОЛЕЙ - ИСПОЛЬЗУЕМ ul ДЛЯ СЕМАНТИКИ */}
            <ul className={styles.fieldsList}>
              
              {/* 🎯 ЭЛЕМЕНТ 1: ВЫБОР ПОЛА (РАДИО-КНОПКИ) */}
              <li className={styles.fieldItem}>
                <h3 className={styles.genderTitle}>Gender</h3>
                
                {/* ВЛОЖЕННЫЙ СПИСОК ДЛЯ РАДИО-КНОПОК */}
                <ul className={styles.genderList}>
                  
                  {/* FEMALE - ЖЕНСКИЙ ПОЛ */}
                  <li className={styles.genderItem}>
                    <label className={styles.genderLabel}>
                      <Field 
                        type="radio" 
                        name="sex" 
                        value="female" 
                        className={styles.hiddenRadio}
                      />
                      <div className={clsx(
                        styles.genderButton,
                        values.sex === 'female' && styles.activeFemale
                      )}>
                        <svg className={styles.genderIcon}>
                          
                          <use href={`${sprite}#icon-femali-white`} />
                        </svg>
                        {values.sex === 'female' && (
                          <svg className={styles.checkIcon}>
                            <use href={`${sprite}#icon-check-mark-green`} />
                          </svg>
                        )}
                      </div>
                    </label>
                  </li>

                  {/* MALE - МУЖСКОЙ ПОЛ */}
                  <li className={styles.genderItem}>
                    <label className={styles.genderLabel}>
                      <Field 
                        type="radio" 
                        name="sex" 
                        value="male" 
                        className={styles.hiddenRadio}
                      />
                      <div className={clsx(
                        styles.genderButton,
                        values.sex === 'male' && styles.activeMale
                      )}>
                        <svg className={styles.genderIcon}>
                          
                          <use href={`${sprite}#icon-male-blue`} />
                        </svg>
                        {values.sex === 'male' && (
                          <svg className={styles.checkIcon}>
                            <use href={`${sprite}#icon-check-mark-green`} />
                          </svg>
                        )}
                      </div>
                    </label>
                  </li>

                  {/* MULTIPLE - НЕСКОЛЬКО ЖИВОТНЫХ */}
                  <li className={styles.genderItem}>
                    <label className={styles.genderLabel}>
                      <Field 
                        type="radio" 
                        name="sex" 
                        value="multiple" 
                        className={styles.hiddenRadio}
                      />
                      <div className={clsx(
                        styles.genderButton,
                        values.sex === 'multiple' && styles.activeMultiple
                      )}>
                        <svg className={styles.genderIcon}>
                          
                          <use href={`${sprite}#icon-femali-male-yellow`} />
                        </svg>
                        {values.sex === 'multiple' && (
                          <svg className={styles.checkIcon}>
                            <use href={`${sprite}#icon-check-mark-green`} />
                          </svg>
                        )}
                      </div>
                    </label>
                  </li>
                </ul>
                
                {/* ОШИБКА ДЛЯ ПОЛЯ sex */}
                <ErrorMessage name="sex" component="div" className={styles.error} />
              </li>

              {/* 🎯 ЭЛЕМЕНТ 2: ФОТО ПИТОМЦА */}
              <li className={styles.fieldItem}>
                <div className={styles.photoSection}>
                  
                  {/* ПРЕВЬЮ ФОТО */}
                  <div className={styles.photoPreview}>
                    {values.imgURL ? (
                      <img 
                        src={values.imgURL} 
                        alt="Pet preview" 
                        className={styles.previewImage}
                        onError={(e) => {
                          // Если фото не загрузилось - показываем иконку
                          e.target.style.display = 'none';
                          e.target.parentNode.querySelector(`.${styles.placeholderIcon}`).style.display = 'block';
                        }}
                      />
                    ) : (
                      <svg className={styles.placeholderIcon}>
                        <use href={`${sprite}#icon-paw`} />
                      </svg>
                    )}
                  </div>

                  {/* ПОЛЕ ДЛЯ URL И КНОПКА ЗАГРУЗКИ */}
                  <div className={styles.urlInputWrapper}>
                    <Field
                      name="imgURL"
                      type="text"
                      placeholder="Enter URL"
                      className={clsx(
                        styles.urlInput,
                        values.imgURL && styles.filled
                      )}
                    />
                    
                    {/* СКРЫТЫЙ INPUT ДЛЯ ЗАГРУЗКИ ФАЙЛА */}
                    <input
                      type="file"
                      id="photoUpload"
                      accept="image/*"
                      className={styles.hiddenFileInput}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          try {
                            setIsUploading(true);
                            // ЗАГРУЗКА НА CLOUDINARY
                            const imageUrl = await uploadPhotoToCloudinary(file);
                            // УСТАНАВЛИВАЕМ URL В ПОЛЕ ФОРМЫ
                            setFieldValue('imgURL', imageUrl);
                          } catch (error) {
                            console.error('Ошибка загрузки:', error);
                            setError('Failed to upload photo');
                          } finally {
                            setIsUploading(false);
                          }
                        }
                      }}
                    />
                    
                    {/* КНОПКА ЗАГРУЗКИ (ПРИВЯЗАНА К СКРЫТОМУ INPUT) */}
                    <label htmlFor="photoUpload" className={styles.uploadButton}>
                      <svg className={styles.uploadIcon}>
                        <use href={`${sprite}#icon-upload-cloud`} />
                      </svg>
                      {isUploading ? 'Uploading...' : 'Upload photo'}
                    </label>
                  </div>
                </div>
                
                {/* ОШИБКА ДЛЯ ПОЛЯ imgURL */}
                <ErrorMessage name="imgURL" component="div" className={styles.error} />
              </li>

              {/* 🎯 ЭЛЕМЕНТ 3: TITLE (ЗАГОЛОВОК) */}
              <li className={styles.fieldItem}>
                <Field
                  name="title"
                  type="text"
                  placeholder="Title"
                  className={clsx(
                    styles.input,
                    values.title && styles.filled
                  )}
                />
                <ErrorMessage name="title" component="div" className={styles.error} />
              </li>

              {/* 🎯 ЭЛЕМЕНТ 4: NAME (КЛИЧКА) */}
              <li className={styles.fieldItem}>
                <Field
                  name="name"
                  type="text"
                  placeholder="Pet's Name"
                  className={clsx(
                    styles.input,
                    values.name && styles.filled
                  )}
                />
                <ErrorMessage name="name" component="div" className={styles.error} />
              </li>

              {/* 🎯 ЭЛЕМЕНТ 5: ДАТА РОЖДЕНИЯ И ТИП ЖИВОТНОГО (В ОДНОЙ СТРОКЕ) */}
              <li className={styles.fieldItem}>
                <div className={styles.rowInputs}>
                  
                  {/* ДАТА РОЖДЕНИЯ */}
                  <div className={styles.inputWrapper}>
                    <Field
                      name="birthday"
                      type="date"
                      className={clsx(
                        styles.input,
                        styles.dateInput,
                        values.birthday && styles.filled
                      )}
                    />
                    <ErrorMessage name="birthday" component="div" className={styles.error} />
                  </div>

                  {/* ТИП ЖИВОТНОГО (ВЫПАДАЮЩИЙ СПИСОК) */}
                  <div className={styles.inputWrapper}>
                    <Field
                      as="select"
                      name="species"
                      className={clsx(
                        styles.input,
                        styles.selectInput,
                        values.species && styles.filled
                      )}
                    >
                      <option value="">Type of pet</option>
                      {PET_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Field>
                    {/* СТРЕЛКА ДЛЯ SELECT */}
                    <svg className={styles.selectArrow}>
                      <use href={`${sprite}#icon-arrow-down`} />
                    </svg>
                    <ErrorMessage name="species" component="div" className={styles.error} />
                  </div>
                </div>
              </li>
            </ul>

            {/* 🎯 КНОПКИ - НЕ В СПИСКЕ, ЭТО ОТДЕЛЬНЫЙ БЛОК */}
            <div className={styles.buttonRow}>
              <button
                type="button"
                className={styles.backButton}
                onClick={() => navigate('/profile')}
              >
                Back
              </button>
              
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting || isUploading}
              >
                {isSubmitting ? 'Adding...' : 'Submit'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddPetForm;