import {useEffect} from 'react'

const useClose = (isOpen, handleClose) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleESC = (evt) => {
      if (evt.key === "Escape") {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleESC);

    return () => document.removeEventListener('keydown', handleESC);
  }, [isOpen]);
}

export default useClose;
