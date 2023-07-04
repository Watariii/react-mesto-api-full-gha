import { Link } from "react-router-dom";
function Header({
  navText,
  email,
  adress,
  handleLogout,
  children,
  onMobile,
  isNavBarOpen,
}) {
  return (
    <header className={`header ${isNavBarOpen? "header_nav-opened": ""}`}>
      <div className="header__logo"></div>
      <nav className={`header__nav ${onMobile} ${isNavBarOpen? "header__nav_opened": ""}`}>
        {email}
        <Link onClick={handleLogout} className={`header__link ${isNavBarOpen? "header__link_nav-opened": ""}`} to={`/${adress}`}>
          {navText}
        </Link>
      </nav>
      {children}
    </header>
  );
}

export default Header;
