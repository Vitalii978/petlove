// 📁 src/pages/AddPetPage/AddPetPage.jsx
// 🎯 ЭТО "КОРОБКА", В КОТОРОЙ ЛЕЖИТ НАША ФОРМА

import { useEffect } from 'react'; // Хук для побочных эффектов
import { useNavigate } from 'react-router-dom'; // Для перемещения между страницами
import { isAuthenticated } from '../../utils/auth'; // Проверка: залогинен ли пользователь
import PetBlock from '../../components/PetBlock/PetBlock'; // Картинка слева
import AddPetForm from '../../components/AddPetForm/AddPetForm'; // Форма справа
import styles from './AddPetPage.module.css'; // Стили для этой страницы

const AddPetPage = () => {
  // 🎯 navigate - это как "пульт управления" для перехода на другие страницы
  const navigate = useNavigate();

  // 🎯 useEffect - срабатывает сразу при загрузке страницы
  useEffect(() => {
    // Проверяем: есть ли токен? Залогинен ли пользователь?
    if (!isAuthenticated()) {
      // Если НЕ залогинен - выкидываем на главную!
      navigate('/');
    }
  }, [navigate]); // Зависимость: если navigate изменится - проверим снова

  // 🎯 ЧТО ВИДИТ ПОЛЬЗОВАТЕЛЬ
  return (
    // <section> - смысловой тег для раздела страницы
    <section className={styles.page}>
      {/* Контейнер для двух колонок */}
      <div className={styles.container}>
        {/* 🎯 ЛЕВАЯ КОЛОНКА - КАРТИНКА */}
        <div className={styles.petBlockWrapper}>
          {/* PetBlock - это готовый компонент с картинкой */}
          <PetBlock>
            {/* 🎯 РАЗНЫЕ КАРТИНКИ ДЛЯ РАЗНЫХ ЭКРАНОВ */}
            {/* Для телефонов (до 767px) */}
            <source
              srcSet="/addPets_mob_1x.png 1x, /addPets_mob_2x.png 2x"
              media="(max-width: 767px)"
            />
            {/* Для планшетов (768px - 1279px) */}
            <source
              srcSet="/addPets_tab_1x.png 1x, /addPets_tab_2x.png 2x"
              media="(min-width: 768px) and (max-width: 1279.5px)"
            />
            {/* Для компьютеров (от 1280px) */}
            <source
              srcSet="/addPets_desk_1x.png 1x, /addPets_desk_2x.png 2x"
              media="(min-width: 1280px)"
            />
            {/* Запасной вариант, если ничего не подошло */}
            <img src="/addPets_mob_1x.png" alt="dog" />
          </PetBlock>
        </div>

        {/* 🎯 ПРАВАЯ КОЛОНКА - ФОРМА */}
        <div className={styles.formWrapper}>
          {/* Вот она - наша главная форма! */}
          <AddPetForm />
        </div>
      </div>
    </section>
  );
};

export default AddPetPage;
