import Header from "../Header/Header.js";

function Login({ onLogin, handleFormValueSign, formValue}) {

  function handleChangeForm(evt) {
    const { name, value } = evt.target;
    handleFormValueSign({ ...formValue, [name]: value });
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(formValue)
  }
  return (
    <>
      <Header navText="Регистрация" adress="sign-up" onMobile={"header__nav_mobile_sign"} />
      <section className="sign">
        <div className="sign__container">
          <h1 className="sign__title">Вход</h1>
          <form
            onSubmit={handleSubmit}
            className="sign__form"
          >
            <input
              className="sign__input"
              name="email"
              type="email"
              placeholder="Email"
              required
              value={formValue.email}
              onChange={handleChangeForm}
            ></input>
            <input
              className="sign__input"
              name="password"
              type="password"
              minLength="2"
              maxLength="30"
              placeholder="Пароль"
              required
              value={formValue.password}
              onChange={handleChangeForm}
            ></input>
            <button className="sign__button">Войти</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
