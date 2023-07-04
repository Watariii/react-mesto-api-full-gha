
function ImagePopup({isOpen, card, onClose}) {
  return (
    <section className={`pop-up pop-up_type_extend-cap ${isOpen ? "pop-up_opened" : ""}`}>
    <div className="pop-up__container pop-up__container_type_extend-cap">
      <button
        onClick = {onClose}
        className="pop-up__close-icon"
        type="button"
        aria-label="закрыть"
      ></button>
      <img className="pop-up__capture" src={card.link} alt={card.name} />
      <h3 className="pop-up__title pop-up__title_type_extend-cap">{card.name}</h3>
    </div>
  </section>
  );
}

export default ImagePopup;
