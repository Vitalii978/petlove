import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import api from '../../services/api';
import sprite from '../../assets/icon/icon-sprite.svg';
import { uploadPhotoToCloudinary } from '../../utils/cloudinary';
import styles from './AddPetForm.module.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AddPetSchema = Yup.object().shape({
  imgURL: Yup.string()
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      'Must be a valid image URL (png, jpg, jpeg, gif, bmp, webp)'
    )
    .required('Photo is required'),
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be less than 50 characters')
    .required('Title is required'),
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name must be less than 30 characters')
    .required('Pet name is required'),
  birthday: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in format YYYY-MM-DD')
    .required('Birthday is required'),
  species: Yup.string().required('Pet type is required'),
  sex: Yup.string()
    .oneOf(['female', 'male', 'multiple'], 'Please select gender')
    .required('Gender is required'),
});

const AddPetForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    const loadSpecies = async () => {
      try {
        const response = await api.get('/notices/species');
        setSpecies(response.data);
      } catch {
        setSpecies(['Dog', 'Cat', 'Monkey', 'Bird']);
      }
    };
    loadSpecies();
  }, []);

  const initialValues = {
    imgURL: '',
    title: '',
    name: '',
    birthday: '',
    species: '',
    sex: '',
  };

  const handleFileUpload = async (file, setFieldValue) => {
    try {
      setIsUploading(true);
      setError('');
      const imageUrl = await uploadPhotoToCloudinary(file);
      setFieldValue('imgURL', imageUrl);
    } catch {
      setError('Failed to upload photo. Please try again or use URL.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setIsSubmitting(true);
      setError('');
      await api.post('/users/current/pets/add', values);
      toast.success(`✅ Pet added successfully`, { duration: 3000 });
      resetForm();
      navigate('/profile');
    } catch (submitError) {
      if (submitError.response) {
        if (submitError.response.status === 401) {
          setError('Please log in to add a pet');
          navigate('/login');
        } else if (submitError.response.status === 400) {
          setError(submitError.response.data?.message || 'Invalid data');
        } else {
          setError(submitError.response.data?.message || 'Failed to add pet');
        }
      } else if (submitError.request) {
        setError('No response from server. Check your internet connection.');
      } else {
        setError('Error: ' + submitError.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className={styles.title}>
        Add my pet /<span className={styles.spanTitle}> Personal details</span>
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={AddPetSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.form}>
            {error && (
              <div className={styles.errorMessage} role="alert">
                {error}
              </div>
            )}
            <ul>
              <li className={clsx(styles.boxRadio, styles.position)}>
                <Field
                  name="sex"
                  type="radio"
                  value="female"
                  id="female"
                  className={styles.inputRadioGender}
                />
                {values.sex === 'female' && (
                  <svg className={styles.iconGenderFemaleOk}>
                    <use href={`${sprite}#icon-check-mark-green`} />
                  </svg>
                )}
                <label
                  htmlFor="female"
                  className={clsx(styles.labelRadioGender, styles.fameli)}
                >
                  <svg className={styles.iconRadioGender}>
                    <use href={`${sprite}#icon-femali-white`} />
                  </svg>
                </label>

                <Field
                  name="sex"
                  type="radio"
                  value="male"
                  id="male"
                  className={styles.inputRadioGender}
                />
                {values.sex === 'male' && (
                  <svg className={styles.iconGenderMaleOk}>
                    <use href={`${sprite}#icon-check-mark-green`} />
                  </svg>
                )}
                <label
                  htmlFor="male"
                  className={clsx(styles.labelRadioGender, styles.male)}
                >
                  <svg className={styles.iconRadioGender}>
                    <use href={`${sprite}#icon-male-blue`} />
                  </svg>
                </label>

                <Field
                  name="sex"
                  type="radio"
                  value="multiple"
                  id="multiple"
                  className={styles.inputRadioGender}
                />
                {values.sex === 'multiple' && (
                  <svg className={styles.iconGenderMultipleOk}>
                    <use href={`${sprite}#icon-check-mark-green`} />
                  </svg>
                )}
                <label
                  htmlFor="multiple"
                  className={clsx(styles.labelRadioGender, styles.multiple)}
                >
                  <svg className={styles.iconRadioGender}>
                    <use href={`${sprite}#icon-femali-male-yellow`} />
                  </svg>
                </label>
                <ErrorMessage
                  name="sex"
                  component="span"
                  className={clsx(styles.errorMessage, styles.sexError)}
                />
              </li>

              <li className={styles.iconAndImg}>
                {values.imgURL ? (
                  <img
                    src={values.imgURL}
                    alt="foto"
                    className={styles.imgPet}
                  />
                ) : (
                  <svg className={styles.iconImg}>
                    <use href={`${sprite}#icon-icons8_cat-footprint`} />
                  </svg>
                )}
              </li>

              <li className={clsx(styles.boxImgUrl, styles.position)}>
                <Field
                  type="text"
                  name="imgURL"
                  value={values.imgURL}
                  className={clsx(
                    styles.inputValuesImgUrl,
                    values.imgURL.trim() !== '' && styles.inputGeneralBorder
                  )}
                  required
                  placeholder="Enter URL"
                />
                <input
                  className={styles.inputSavesImgNone}
                  id="imgURL"
                  type="file"
                  accept="image/*"
                  onChange={async e => {
                    const file = e.target.files[0];
                    if (file) handleFileUpload(file, setFieldValue);
                  }}
                />
                <label htmlFor="imgURL" className={styles.inputSavesImg}>
                  Upload photo
                  <svg className={styles.iconInputSavesImg}>
                    <use href={`${sprite}#icon-upload-cloud`} />
                  </svg>
                </label>
                <ErrorMessage
                  name="imgURL"
                  component="span"
                  className={clsx(styles.errorMessage, styles.imgError)}
                />
              </li>

              <li className={clsx(styles.boxGeneral, styles.position)}>
                <Field
                  name="title"
                  type="text"
                  required
                  placeholder="Title"
                  className={clsx(
                    styles.inputGeneral,
                    values.title.trim() !== '' && styles.inputGeneralBorder
                  )}
                />
                <ErrorMessage
                  name="title"
                  component="span"
                  className={clsx(styles.errorMessage, styles.titlError)}
                />

                <Field
                  name="name"
                  type="text"
                  required
                  placeholder="Pet’s Name"
                  className={clsx(
                    styles.inputGeneral,
                    values.name.trim() !== '' && styles.inputGeneralBorder
                  )}
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={clsx(styles.errorMessage, styles.name)}
                />

                <ul className={styles.boxDateGender}>
                  <li className={styles.position}>
                    <Field
                      name="birthday"
                      type="date"
                      required
                      className={clsx(
                        styles.dateGender,
                        values.birthday !== '' && styles.inputGeneralBorder
                      )}
                    />
                    <ErrorMessage
                      name="birthday"
                      component="span"
                      className={clsx(styles.errorMessage, styles.species)}
                    />
                  </li>
                  <li className={styles.position}>
                    <Field
                      name="species"
                      id="species"
                      as="select"
                      required
                      className={clsx(
                        styles.dateGender,
                        values.species !== '' && styles.inputGeneralBorder
                      )}
                    >
                      <option>Type of pet</option>
                      {species.map((specie, index) => (
                        <option value={specie} key={index}>
                          {specie}
                        </option>
                      ))}
                    </Field>
                    <label htmlFor="species">
                      <svg className={styles.iconInputSpecies}>
                        <use href={`${sprite}#icon-arrow-left`} />
                      </svg>
                    </label>
                    <ErrorMessage
                      name="species"
                      component="span"
                      className={clsx(styles.errorMessage, styles.species)}
                    />
                  </li>
                </ul>
              </li>
            </ul>

            <div className={styles.boxButton}>
              <NavLink to="/profile" className={styles.linkBack}>
                Back
              </NavLink>
              <button
                type="submit"
                className={styles.buttonSubmit}
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
