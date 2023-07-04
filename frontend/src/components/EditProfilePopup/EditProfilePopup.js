import { useState, useEffect, useContext } from "react";
import PopupWithForm from "../PopUpWithForm/PopUpWithForm.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setAbout(evt.target.value);
  }

  function handleSubmit(evt) {

    evt.preventDefault();
    // Передаём значения (формы) управляемых компонентов (инпутов) во внешний обработчик
    onUpdateUser(
      {name, about}
    );
  };

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser,isOpen]);

  return (
    <PopupWithForm
      name="info"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-firstname"
        className="pop-up__input pop-up__input_type_firstname"
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleChangeName}
      />
      <span id="input-firstname-error" className="error"></span>
      <input
        id="input-job"
        className="pop-up__input pop-up__input_type_job"
        type="text"
        name="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={about}
        onChange={handleChangeDescription}
      />
      <span id="input-job-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
