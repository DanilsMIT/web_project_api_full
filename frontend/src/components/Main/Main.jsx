import { useContext } from "react";
///Componentes
import Popup from "../Popup/Popup";
import ScreenLoader from "../ScreenLoader/ScreenLoader.jsx";
import API from "../../utils/api.js";
//Forms
import NewCardForm from "../Popup/NewCard/NewCard.jsx";
import EditProfileForm from "../Popup/EditProfile/EditProfile.jsx";
import EditAvatar from "../Popup/EditAvatar/EditAvatar.jsx";
//Objetos
import Card from "../Card/Card.jsx";
//Contexto
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function Main(propiedades) {
  //Atributos
  const {
    handleOpenPopUp,
    handleClosePopUp,
    popup,
    cards,
    handlePostCard,
    handleCardLike,
    handleCardDelete,
  } = propiedades;

  ///componentes
  //botones a los forms
  const FormPopup = {
    EditProfile: { title: "Editar Perfil", children: <EditProfileForm /> },
    EditAvatar: { title: "Cambiar Avatar", children: <EditAvatar /> },
    NewCard: {
      title: "Nuevo Lugar",
      children: <NewCardForm handlePostCard={handlePostCard} />,
    },
  };

  //Usando Contexto
  const { currentUser: User } = useContext(CurrentUserContext);
  //retorna
  return (
    <main className="content">
      <section className="profile page__section">
        <div
          className="profile__image-container"
          id="editprofileAvatar"
          onClick={() => handleOpenPopUp(FormPopup.EditAvatar)}
        >
          <img className="profile__image" src={User.avatar} alt="Avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{User.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopUp(FormPopup.EditProfile)}
          ></button>
          <p className="profile__description">{User.about}</p>
        </div>
        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopUp(FormPopup.NewCard)}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              CardData={card}
              handleOpenPopUp={handleOpenPopUp}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
