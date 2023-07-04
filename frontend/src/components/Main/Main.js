import { useContext } from "react";
import Card from "../Card/Card.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  handleSubmitPopupClick,
  cards,
  userEmail,
  handleLogout,
  navButton,
  isNavBarOpen,
  handleOpenNavBar
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header
        navText="Выйти"
        email={userEmail}
        handleLogout={handleLogout}
        adress="sign-in"
        onMobile="header__nav_mobile_main"
        isNavBarOpen={isNavBarOpen}
      >
        <button onClick={handleOpenNavBar} className={`header__nav-button ${navButton?"header__nav-button_type_toolbar-icon":"header__nav-button_type_close-icon"} ${isNavBarOpen?"header__nav-button_nav-opened":""}`}></button>
      </Header>

      <main className="content">
        <section className="profile">
          <div className="profile__info">
            <div
              onClick={onEditAvatar}
              className="profile__avatar profile__avatar_type_hover"
            >
              <img
                src={currentUser.avatar}
                alt="Аватар"
                className="profile__avatar profile__avatar-selector"
              />
            </div>
            <div className="profile__list">
              <div className="profile__title">
                <h1 className="profile__firstname">{currentUser.name}</h1>
                <button
                  onClick={onEditProfile}
                  className="profile__button-info"
                  type="button"
                  aria-label="редактор профиля"
                ></button>
              </div>
              <h2 className="profile__job">{currentUser.about}</h2>
            </div>
          </div>
          <button
            onClick={onAddPlace}
            className="profile__button-cards"
            type="button"
            aria-label="Новая карточка"
          ></button>
        </section>
        <section className="photo-elements">
          <ul className="photo-elements__list">
            {cards.map((cardData) => (
              <Card
                key={cardData._id}
                card={cardData}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                handleSubmitPopupClick={handleSubmitPopupClick}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
