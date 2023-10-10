import './Popup.css';
import useEscape from '../../hooks/useEscape';

export default function Popup({
  onClosePopup,
  isPopup: { popupIsOpen, infoStatus, messageText },
}) {
  useEscape(popupIsOpen, onClosePopup);

  return (
    <section
      className={`popup ${popupIsOpen ? 'popup_opened' : ''}`}
      id='popup-info-tooltip'
    >
      <div className='popup__wrapper'>
        <button
          type='button'
          className='popup__button-close'
          onClick={onClosePopup}
        />
        <div
          className={`popup__status ${
            infoStatus ? 'popup__status-success' : 'popup__status-fail'
          }`}
        ></div>
        <p className='popup__caption'>{messageText}</p>
      </div>
    </section>
  );
}