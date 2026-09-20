import { useRef, useState } from "react";

export default function NewCardForm(propiedades) {
  const { handlePostCard } = propiedades;
  // inputs
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  //errors
  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");
  //invalidar boton
  const invalidate = Boolean(
    nameError != "" ||
    (linkError != "") | (name.trim() == "") ||
    link.trim() == "",
  );

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
    setLinkError(e.target.validationMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (invalidate) return;
    handlePostCard({
      name: name,
      link: link,
    });
  };

  return (
    <form className="popup__form" id="new-card-form" onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_card-name"
        name="cardName"
        id="cardName"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        type="text"
        value={name}
        onChange={handleNameChange}
        required
      />
      <span className="popup__input-error_active popup__input-error">
        {nameError}
      </span>

      <input
        className="popup__input popup__input_type_url"
        name="cardLink"
        id="cardLink"
        placeholder="Enlace de la imagen"
        type="url"
        value={link}
        onChange={handleLinkChange}
        required
      />
      <span className="popup__input-error_active popup__input-error">
        {linkError}
      </span>

      <button
        className={`button popup__button ${invalidate ? "popup__button_disabled" : ""}`}
        type="submit"
        disabled={invalidate}
      >
        Crear
      </button>
    </form>
  );
}
