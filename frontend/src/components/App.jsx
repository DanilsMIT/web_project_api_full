//react
import { useEffect, useState } from "react";
//Layout
import AuthLayout from "./Layout/AuthLayout.jsx";
import MainLayout from "./Layout/MainLayout.jsx";
//components
import ScreenLoader from "./ScreenLoader/ScreenLoader.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import API from "../utils/api.js";
import Popup from "./pop/Popup.jsx";
import Main from "./Main/Main.jsx";
import Register from "./Auth/Register/Register.jsx";
import Login from "./Auth/Login/Login.jsx";

//contexto
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
//Ruta Protegida
import ProtectedRoute from "./Auth/ProtectedRoute/ProtectedRoute.jsx";
//Auth
import * as auth from "../utils/auth.js";
import InfoTooltip from "./pop/InfoTooltip/InfoTooltip.js";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  //Login
  const [isLogged, setIsLogged] = useState(false);

  //funciones
  //Popup
  const handleOpenPopUp = (popup) => {
    setPopup(popup);
  };

  const handleClosePopUp = () => {
    setPopup(null);
  };
  //Hooks
  //Navegacion programatica
  const navigate = useNavigate();

  //GET UserInfo & Cards
  useEffect(() => {
    if (isLogged) {
      setIsLoading(true);
      Promise.all([API.getUserInfo(), API.getCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, [isLogged]);
  //Get Token
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .getToken(jwt)
        .then((data) => {
          if (data) {
            setIsLogged(true);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log("Token invalido", err);
          localStorage.removeItem("jwt");
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  //Funciones API
  const handleUpdateUser = async (data) => {
    try {
      const newData = await API.updateUserInfo(data);
      setCurrentUser(newData);
      handleClosePopUp();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      const newData = await API.updateUserAvatar(data);
      setCurrentUser(newData);
      handleClosePopUp();
    } catch (error) {
      console.error("Error al actualizar avatar:", error);
    }
  };

  const handlePostCard = async (card) => {
    try {
      const newCard = await API.postCard(card);
      setCards([newCard, ...cards]);
      handleClosePopUp();
    } catch (error) {
      console.error("Fallo al agregar carta:", error);
    }
  };

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    try {
      const updatedCard = await API.cardToggleLike(card._id, !isLiked);
      setCards((cards) =>
        cards.map((currentCard) =>
          currentCard._id === updatedCard._id ? updatedCard : currentCard,
        ),
      );
    } catch (error) {
      console.error("Error al cambiar el like:", error);
    }
  };

  const handleCardDelete = async (card) => {
    try {
      await API.cardDelete(card._id);
      setCards((cards) => cards.filter((c) => c._id !== card._id));
      handleClosePopUp();
    } catch (error) {
      console.error("Error al eliminar carta:", error);
      if (String(error).includes("403")) {
        showWrong("Este Post no es tuyo, imposible eliminar");
      } else {
        showWrong();
      }
    }
  };
  //Funciones Auth
  const showSucess = () => {
    handleOpenPopUp({
      title: "Aviso",
      children: (
        <InfoTooltip
          isSuccess={true}
          message="¡Correcto!, ya estas registrado"
        />
      ),
    });
  };

  const showWrong = (
    message = "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
  ) => {
    handleOpenPopUp({
      title: "Aviso",
      children: <InfoTooltip isSuccess={false} message={message} />,
    });
  };

  const handleRegister = async (email, password) => {
    try {
      await auth.register(email, password);
      showSucess();
    } catch (err) {
      console.error("Error en registro:", err);

      if (String(err).includes("400") || String(err).includes("409")) {
        showWrong("Correo ya registrado");
      } else {
        showWrong();
      }
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const data = await auth.login(email, password);
      localStorage.setItem("jwt", data.token);
      setIsLogged(true);
      navigate("/");
    } catch (err) {
      console.error("Error en login:", err);

      if (String(err).includes("401")) {
        showWrong();
      }
    }
  };
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLogged(false);
    setCurrentUser({});
    navigate("/signin", { replace: true });
  };

  //renderizado
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleLogOut,
      }}
    >
      {isLoading && <ScreenLoader />}

      <Routes>
        <Route element={<MainLayout handleLogOut={handleLogOut} />}>
          <Route
            path="/"
            element={
              <ProtectedRoute isLogged={isLogged}>
                <Main
                  handleOpenPopUp={handleOpenPopUp}
                  handleClosePopUp={handleClosePopUp}
                  popup={popup}
                  cards={cards}
                  handleCardLike={handleCardLike}
                  handleCardDelete={handleCardDelete}
                  //dado que este solo tiene un nivel para pasar la funcion
                  handlePostCard={handlePostCard}
                />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register handleRegister={handleRegister} />}
          />
        </Route>
      </Routes>
      {popup && (
        <Popup title={popup.title} onClose={() => handleClosePopUp()}>
          {popup.children}
        </Popup>
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
