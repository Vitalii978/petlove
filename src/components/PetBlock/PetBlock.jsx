// 📁 src/components/PetBlock/PetBlock.jsx
// 🎯 КОМПОНЕНТ С КАРТИНКОЙ
// ✅ ИСПРАВЛЕНО: стили как в примере

import clsx from 'clsx';
import styles from './PetBlock.module.css';

export default function PetBlock({ children, style, addPet }) {
  return (
    <div
      className={clsx(styles.petBlock, addPet === 'addPet' && styles.addPet)}
    >
      <picture
        className={clsx(
          styles.imgPetBlock,
          style === 'cat' && styles.cat,
          addPet === 'addPet' && styles.addPets
        )}
      >
        {children}
      </picture>
    </div>
  );
}
