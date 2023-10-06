
const FormButton = ({ 
  isValid, 
  buttonText }) => {
  return (
    <button
      className={`submit-btn login__btn ${!isValid && 'submit-btn_disabled'}`}
      disabled={!isValid}
      type="submit"
    >
      {buttonText}
    </button>
  );
};

export default FormButton