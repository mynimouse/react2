import { Link } from "react-router-dom";

export default function Navbar({active, isAuth}) {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          Rent<span className="text-warning">Cars</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {(isAuth === true) ? (<></>) : (
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto gap-md-4">
              <li className="nav-item">
                <Link to={'/cars'} className={`nav-link ${(active === "home") ? "active" : ""}`} aria-current="page" href="#">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/products'} className={`nav-link ${(active === "products") ? "active" : ""}`} href="#">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/category'} className={`nav-link ${(active === "category") ? "active" : ""}`} href="#">
                  Category
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/cars'} className={`nav-link ${(active === "cars") ? "active" : ""}`} href="#">
                  Cars
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/rental'} className={`nav-link ${(active === "rental") ? "active" : ""}`} href="#">
                  Rental
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/pages'} className={`nav-link ${(active === "pages") ? "active" : ""}`} href="#">
                  Pages
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/news'} className={`nav-link ${(active === "news") ? "active" : ""}`} href="#">
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/profile'} className={`nav-link ${(active === "profile") ? "active" : ""}`}>
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/logout'} className={`nav-link ${(active === "profile") ? "active" : ""} d-flex flex-row align-items-center gap-2`}>
                  <i className="bi bi-box-arrow-left"></i>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
