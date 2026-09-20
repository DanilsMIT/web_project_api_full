import PopUpImage from "../popup/ImagePopup/ImagePopup.jsx";
import RemoveCard from "../popup/RemoveCard/RemoveCard.jsx";
import placeholder from "../../images/placeholder.jpg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function Card({
  CardData,
  handleOpenPopUp,
  onCardLike,
  onCardDelete,
}) {
  //Contexto
  const { currentUser } = useContext(CurrentUserContext);
  //Atributos
  const { name, link, likes = [] } = CardData;
  //like
  const isLiked = likes.some((id) => id === currentUser._id);
  //editor de className
  const isLikedClass = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  //funciones por el bot
  const handleLikeClick = () => {
    onCardLike(CardData);
  };

  const handleDeleteClick = () => {
    onCardDelete(CardData);
  };
  //componente
  const ImagePopUp = {
    title: "",
    children: <PopUpImage CardData={CardData} />,
  };
  const RemoveCardPopup = {
    title: "¿Borrar elemento?",
    children: (
      <RemoveCard CardData={CardData} handleDeleteClick={handleDeleteClick} />
    ),
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={link || placeholder}
        alt={name}
        onClick={() => handleOpenPopUp(ImagePopUp)}
      />
      <button
        aria-label="Eliminar tarjeta"
        className="card__delete-button"
        type="button"
        onClick={() => handleOpenPopUp(RemoveCardPopup)}
      ></button>
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Botón Me gusta"
          className={isLikedClass}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
