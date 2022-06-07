 
import {Link} from "react-router-dom"
function NavBar() {
  return (
    <nav class="nav-bar">
        <h1>blog</h1>
        <div className="links">
            <Link to="/agregar">Agregar</Link>
            <Link to="/">Home</Link>
        </div>
    </nav>
  );
}

export default NavBar;
