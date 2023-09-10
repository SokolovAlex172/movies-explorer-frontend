import useClose from '../../hooks/useClose';
import './InfoTooltip.css';
import iconSuccess from '../../images/icon-success.svg';
import iconError from '../../images/icon-error.svg';


const InfoTooltip = ({onClose, isOpen, tooltipSettings, onOverlayClick}) => {
  useClose(isOpen, onClose);

  const image = `${tooltipSettings.isSuccess ? iconSuccess : iconError}`;
  const caption = `${tooltipSettings.message}`

  return (
    <section
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      id='popup-info-tooltip'
      onClick={onOverlayClick}
    >
      <div className='popup__wrapper'>
        <button
          type='button'
          className='popup__button-close'
          onClick={onClose}
        />
        <img className='popup__image popup__image_place_info-tooltip' src={image} alt={caption} />
        <p className='popup__caption popup__caption_place_info-tooltip'>{caption}</p>
      </div>
    </section>
  )
}

export default  InfoTooltip;
