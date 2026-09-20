import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

export default function EditProfileForm() {
  // Usando contexto
  const { currentUser: User, handleUpdateUser } =
    useContext(CurrentUserContext);

  // inputs
  const [name, setName] = useState(User.name);
  const [about, setAbout] = useState(User.about);

  // span errors inicializados como strings vacíos
  const [nameError, setNameError] = useState("");
  const [aboutError, setAboutError] = useState("");

  //validador de boton
  const invalidate =
    nameError !== "" ||
    aboutError !== "" ||
    name.trim() == "" ||
    about.trim() == "";

  // funciones
  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
  };

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
    setAboutError(e.target.validationMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (invalidate) return;
    handleUpdateUser({ name, about });
  };

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        className="popup__input popup__input_type_name"
        id="profileName"
        name="profileName"
        placeholder="Nombre"
        type="text"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
        required
      />
      <span className="popup__input-error_active popup__input-error">
        {nameError}
      </span>

      <input
        className="popup__input popup__input_type_description"
        id="profileAbout"
        name="profileAbout"
        placeholder="Acerca de mí"
        type="text"
        minLength="2"
        maxLength="200"
        value={about}
        onChange={handleAboutChange}
        required
      />
      <span className="popup__input-error_active popup__input-error">
        {aboutError}
      </span>

      <button
        className={`button popup__button ${invalidate ? "popup__button_disabled" : ""}`}
        type="submit"
        disabled={invalidate}
      >
        Guardar
      </button>
    </form>
  );
}
