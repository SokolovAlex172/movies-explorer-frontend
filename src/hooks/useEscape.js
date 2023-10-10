import {useEffect} from "react";

export default function useEscape(popupIsOpen, onClosePopup) {
  useEffect(() => {
    const handleEscapeKey = (evt) => {
      if (evt.key === "Escape") {
        onClosePopup();
      }
    };

    if (popupIsOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [popupIsOpen, onClosePopup]);
}