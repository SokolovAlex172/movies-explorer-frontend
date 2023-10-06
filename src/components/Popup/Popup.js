import './Popup.css';
import useEscape from '../../hooks/useEscape';

export default function Popup({
  onClosePopup,
  isPopup: { isOpen, status, messageText },
}) {
  useEscape(isOpen, onClosePopup);

  return (
    <section
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
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
            status ? 'popup__status-success' : 'popup__status-fail'
          }`}
        ></div>
        <p className='popup__caption'>{messageText}</p>
      </div>
    </section>
  );
}