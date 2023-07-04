import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Main from "./Main/Main.js";
import PopupWithForm from "./PopUpWithForm/PopUpWithForm.js";
import ImagePopup from "./ImagePopup/ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.js";
import Login from "./Login/Login.js";
import Register from "./Register/Register.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.js";
import { register, authorize, getUsersMe } from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip/InfoTooltip.js";

function App() {
  const [isEditProfilePopUpOpen, setIsEditProfilePopUpOpen] = useState(false);
  const [isAddCardPopUpOpen, setIsAddCardPopUpOpen] = useState(false);
  const [isEditAvatarPopUpOpen, setIsEditAvatarPopUpOpen] = useState(false);
  const [isImagePopUpOpen, setIsImagePopUpOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "#",
  });
  const [isPopupWithFormOpen, setIsPopupWithFormOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [regStatus, setRegStatus] = useState(true);

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  // для открытия navBar в main в мобильном разрешении
  const [navButton, setNavButton] = useState(true);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  function handleOpenNavBar() {
    setIsNavBarOpen(!isNavBarOpen);
    setNavButton(!navButton);
  }

  function handleCloseNavBar() {
    setIsNavBarOpen(false);
    setNavButton(true);
  }
  //
  useEffect(() => {
    if (loggedIn)
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([cards, userData]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          alert(err);
        });
  }, [loggedIn]);

  const [infoTooltipMessage, setInfoTooltipMessage] = useState("");

  function handleEditProfileClick() {
    setIsEditProfilePopUpOpen(!isEditProfilePopUpOpen);
  }
  function handleAddCardClick() {
    setIsAddCardPopUpOpen(!isAddCardPopUpOpen);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopUpOpen(!isEditAvatarPopUpOpen);
  }

  function handleCardClick(card) {
    setIsImagePopUpOpen(!isImagePopUpOpen);
    setSelectedCard(card);
  }

  function handleSubmitPopupClick(card) {
    setIsPopupWithFormOpen(!isPopupWithFormOpen);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopUpOpen(false);
    setIsAddCardPopUpOpen(false);
    setIsEditAvatarPopUpOpen(false);
    setIsImagePopUpOpen(false);
    setIsInfoTooltipOpen(false);
    setIsPopupWithFormOpen(false);
    setTimeout(() => setSelectedCard({ name: "", link: "#" }), 400);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((stateCard) =>
          stateCard.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((stateCard) =>
          stateCard.filter((item) => item._id !== card._id)
        );
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleUpdateUser(inputValues) {
    api
      .editUserInfo(inputValues)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleUpdateAvatar(inputValue) {
    api
      .updateAvatar(inputValue)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleLogin({ email, password }) {
    authorize({ email, password })
      .then((data) => {
        handleCloseNavBar();
        setLoggedIn(true);
        setUserEmail(email);
        localStorage.setItem("token", data.token);
        navigate("/");
        setFormValue({
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        handleRegStatus(false);
        setInfoTooltipMessage("Что то пошло не так! Попробуйте ещё раз.");
        handleShowInfoTooltip();
        setFormValue({
          email: "",
          password: "",
        });
        console.log(err);
      });
  }
  function handleLogout() {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      handleOpenNavBar();
    }
  }

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      getUsersMe(token)
        .then(({ data }) => {
          setLoggedIn(true);
          navigate("/");
          setUserEmail(data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleShowInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  function handleRegStatus(status) {
    setRegStatus(status);
  }

  useEffect(() => {
    checkToken();
  }, []);

  function handleRegister({ email, password }) {
    register({ email, password })
      .then(() => {
        handleRegStatus(true);
        setInfoTooltipMessage("Вы успешно зарегистрировались!");
        handleShowInfoTooltip();
        setFormValue({
          email: "",
          password: "",
        });
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        handleRegStatus(false);
        setInfoTooltipMessage("Что то пошло не так! Попробуйте ещё раз.");
        handleShowInfoTooltip();
        console.error(err);
      });
  }
  function handleFormValueSign(dataValue) {
    setFormValue(dataValue);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        {/* защищает компонент main от ввода url вручную */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              Component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddCardClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              handleSubmitPopupClick={handleSubmitPopupClick}
              cards={cards}
              loggedIn={loggedIn}
              userEmail={userEmail}
              handleLogout={handleLogout}
              handleOpenNavBar={handleOpenNavBar}
              navButton={navButton}
              isNavBarOpen={isNavBarOpen}
            />
          }
        />
        {/*направляет пользователя на '/' или '/sign-in' в зависимости от
        авторизации , если тот введёт несуществующую ссылку типа
        '/fdgfdgd' */}
        <Route
          path="*"
          element={
            loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" replace />
          }
        />
        {/* авторизация */}
        <Route
          path="/sign-in"
          element={
            <Login
              onLogin={handleLogin}
              handleFormValueSign={handleFormValueSign}
              formValue={formValue}
            />
          }
        />
        <Route
          //регистрация
          path="/sign-up"
          element={
            <Register
              onRegister={handleRegister}
              handleFormValueSign={handleFormValueSign}
              formValue={formValue}
            />
          }
        />
      </Routes>
      <EditProfilePopup
        isOpen={isEditProfilePopUpOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddCardPopUpOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        buttonText="Да"
        isOpen={isPopupWithFormOpen}
        onClose={closeAllPopups}
        card={selectedCard}
        onCardDelete={handleCardDelete}
        //без пропса onSubmit и обнуления поведения submit выполняется 
        //перезапуск страницы при нажатии на button Submit, убрали это поведение
        onSubmit={(evt) => {
          evt.preventDefault();
        }}
      ></PopupWithForm>

      <EditAvatarPopup
        isOpen={isEditAvatarPopUpOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup
        isOpen={isImagePopUpOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        regStatus={regStatus}
        message={infoTooltipMessage}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
