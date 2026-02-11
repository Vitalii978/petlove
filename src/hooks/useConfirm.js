// 🎯 ПРОСТОЙ ХУК ДЛЯ ПОДТВЕРЖДЕНИЯ ДЕЙСТВИЙ
// Хук - это функция с состоянием

import { useState } from 'react';

const useConfirm = () => {
  // Состояние: открыта модалка или нет?
  const [isOpen, setIsOpen] = useState(false);
  
  // Состояние: текст и кнопки модалки
  const [config, setConfig] = useState({
    title: 'Подтверждение',
    message: 'Вы уверены?',
    confirmText: 'Да',
    cancelText: 'Нет',
    onConfirm: () => {}, // функция "Да"
    onCancel: () => {}   // функция "Нет"
  });

  // 🎯 Функция "спросить пользователя"
  // Возвращает Promise - обещание ответа
  const confirm = (options = {}) => {
    return new Promise((resolve) => {
      // Настраиваем модалку под задачу
      setConfig({
        title: options.title || 'Подтверждение',
        message: options.message || 'Вы уверены?',
        confirmText: options.confirmText || 'Да',
        cancelText: options.cancelText || 'Нет',
        
        // Когда нажали ДА
        onConfirm: () => {
          resolve(true);  // Обещание выполняется = true
          setIsOpen(false);
          if (options.onConfirm) options.onConfirm();
        },
        
        // Когда нажали НЕТ или закрыли
        onCancel: () => {
          resolve(false); // Обещание выполняется = false
          setIsOpen(false);
          if (options.onCancel) options.onCancel();
        }
      });
      
      // Открываем модалку
      setIsOpen(true);
    });
  };

  // Функция принудительно закрыть
  const closeConfirm = () => {
    setIsOpen(false);
  };

  // Возвращаем наружу то, что нужно компонентам
  return {
    isOpen,        // true/false - открыта?
    config,        // настройки (текст, кнопки)
    confirm,       // функция "спросить"
    closeConfirm   // функция "закрыть"
  };
};

export default useConfirm;