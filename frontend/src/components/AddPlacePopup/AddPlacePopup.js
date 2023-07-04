import PopupWithForm from "../PopUpWithForm/PopUpWithForm.js";
import { useState,useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace}) {

    const [name, setName] = useState("");
    const [link, setLink] = useState("");
  
    function handleChangeName(evt) {
      setName(evt.target.value);
    }
  
    function handleChangeLink(evt) {
      setLink(evt.target.value);
    }
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({name, link});
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-name"
        className="pop-up__input pop-up__input_type_name"
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleChangeName}
        value={name}
      />
      <span id="input-name-error" className="error"></span>
      <input
        id="input-link"
        className="pop-up__input pop-up__input_type_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeLink}
        value={link}
      />
      <span id="input-link-error" className="error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
