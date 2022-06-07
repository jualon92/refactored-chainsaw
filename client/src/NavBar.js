import { Link, NavLink } from "react-router-dom";


function NavBar() {
   

    return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Operaciones
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor02">
          <ul class="navbar-nav me-auto gap-3">
            <li class="nav-item">
              <NavLink to="/"  className="nav-link" activeClassName="active"  >
                Home
              
              </NavLink>
            </li>
            <li class="nav-item" >
              <NavLink to="/alta" className="nav-link" activeClassName="active" >
                Alta
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink to="/listado" className="nav-link" activeClassName="active" >
                Listado
              </NavLink>
            </li>
             
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
