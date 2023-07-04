import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike,handleSubmitPopupClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(item => item._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `photo-elements__like-button ${isLiked && 'photo-elements__like-button_active'}` 
  ); 
  

  return (
    <li key={card._id}>
      <article className="photo-elements__item">
        {isOwn && 
          <button onClick={()=>{handleSubmitPopupClick(card)}}
            className="photo-elements__delete"
            type="button"
          />
        }
        <img
          onClick={() => {
            onCardClick(card);
          }}
          src={card.link}
          alt={card.name}
          className="photo-elements__capture"
        />
        <p className="photo-elements__title">{card.name}</p>
        <div className="photo-elements__like">
          <button onClick={() => {
            onCardLike(card);
          }}
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <p className="photo-elements__like-counter">{card.likes.length}</p>
        </div>
      </article>
    </li>
  );
}

export default Card;
