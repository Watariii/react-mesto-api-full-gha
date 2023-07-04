import { useRef,useEffect } from "react";
import PopupWithForm from "../PopUpWithForm/PopUpWithForm.js";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = useRef('');

    function handleSubmit(evt) {
        evt.preventDefault();     
        onUpdateAvatar({avatar: avatarRef.current.value});
      }

      useEffect(() => {
        avatarRef.current.value = ''
      }, [isOpen]);
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-avatar-link"
        className="pop-up__input pop-up__input_type_avatar-link"
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        ref={avatarRef}
      />
      <span id="input-avatar-link-error" className="error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
