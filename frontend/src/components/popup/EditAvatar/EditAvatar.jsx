import { useContext, useRef, useState } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const [inputError, setInputError] = useState("");
  const [emptyInput, setEmptyInput] = useState(true);
  //Contexto
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  //Vigilancia a cambios
  const avatarInput = useRef();
  const invalidate = Boolean(inputError !== "" || emptyInput);

  //funciones
  const handleInputChange = (e) => {
    setInputError(e.target.validationMessage);
    setEmptyInput(e.target.value.trim() == "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputError) return;
    handleUpdateAvatar({ avatar: avatarInput.current.value });
  };

  return (
    <form
      className="popup__form"
      id="change-avatar-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        className="popup__input popup__input_type_url"
        name="avatarLink"
        id="avatarLink"
        placeholder="Enlace de la imagen"
        ref={avatarInput}
        onChange={handleInputChange}
        type="url"
        required
      />
      <span className="popup__input-error_active popup__input-error">
        {inputError}
      </span>

      <button
        className={`button popup__button ${invalidate ? "popup__button_disabled" : ""}`}
        type="submit"
        disabled={invalidate}
      >
        Cambiar Imagen
      </button>
    </form>
  );
}
