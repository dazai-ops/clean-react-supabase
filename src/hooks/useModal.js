// hooks/useModal.js
import { useEffect, useRef } from 'react';

export const useModal = (isOpen, onClose) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const focusable = dialogRef.current.querySelector(
        '[data-autofocus], input, button, select, textarea, a[href]'
      );
      focusable?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return { dialogRef, handleOverlayClick };
};