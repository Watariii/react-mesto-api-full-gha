import { Link } from "react-router-dom";
import Header from "../Header/Header.js";

function Register({ onRegister, handleFormValueSign, formValue}) {
  
  function handleChangeForm(evt) {
    const { name, value } = evt.target;
    handleFormValueSign({ ...formValue, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(formValue);
  }

  return (
    <>
      <Header navText="Войти" adress="sign-in" onMobile={"header__nav_mobile_sign"}/>
      <section className="sign">
        <div className="sign__container">
          <h1 className="sign__title">Регистрация</h1>
          <form onSubmit={handleSubmit} className="sign__form">
            <input
              className="sign__input"
              name="email"
              type="'email"
              placeholder="Email"
              required
              onChange={handleChangeForm}
              value={formValue.email}
            ></input>
            <input
              className="sign__input"
              name="password"
              type="password"
              minLength="2"
              maxLength="30"
              placeholder="Пароль"
              required
              onChange={handleChangeForm}
              value={formValue.password}
            ></input>
            <button className="sign__button">Зарегистрироваться</button>
          </form>
          <p className="sign__text">
            Уже зарегистрированы?{" "}
            <Link to="/sign-in" className="sign__link">
              Войти
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
export default Register;
