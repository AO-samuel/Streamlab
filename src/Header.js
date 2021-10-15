import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header id="gen-header" className="gen-header-style-1 gen-has-sticky">
      <div className="gen-bottom-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to="/">
                  <img
                    className="img-fluid logo"
                    src="images/logo-1.png"
                    alt="streamlab-image"
                  />
                </Link>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <div id="gen-menu-contain" className="gen-menu-contain">
                    <ul id="gen-main-menu" className="navbar-nav ml-auto">
                      <li className="menu-item active">
                        <Link to="/upload" aria-current="page">
                          Upload Video
                        </Link>
                      </li>

                    </ul>
                  </div>
                </div>
                <div className="gen-header-info-box">                 
                  <div className="gen-btn-container">
                    <a href="#" className="gen-button">
                      <div className="gen-button-block">
                        <span className="gen-button-line-left" />
                        <span className="gen-button-text">Balance: {props.cUSDBalance}cUSD</span>
                      </div>
                    </a>
                  </div>
                </div>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i className="fas fa-bars" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
