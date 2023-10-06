import {useEffect} from "react";

export default function useEscape(isOpen, onClose) {
  useEffect(() => {
    const handleEscapeKey = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);
}