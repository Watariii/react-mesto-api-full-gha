import React from "react";

function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  children,
  onSubmit,
  onCardDelete,
  card,
}) {
  return (
    <section className={`pop-up ${isOpen ? "pop-up_opened" : ""}`}>
      <div className="pop-up__container">
        <button
          onClick={onClose}
          className="pop-up__close-icon"
          type="button"
          aria-label="закрыть"
        ></button>
        <h3 className={`pop-up__title pop-up__title_type_${name}`}>{title}</h3>
        <form
          className={`pop-up__form pop-up__form_type_${name}`}
          name={`form-${name}`}
          onSubmit={onSubmit}
        >
          {children}
          {/* проверка с if необходима для того, чтобы функция onCardDelete выполнялась только для попапа,
           в который передается card (popup подтверждения удаления карточки */}
          <button
            onClick={() => {
              if (card) {
                onCardDelete(card);
              }
            }}
            className="pop-up__button"
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
