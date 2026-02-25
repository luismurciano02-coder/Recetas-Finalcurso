import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">🍳 Recetas React</Link>
        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">Listado</Link>
          <Link className="nav-link" to="/nueva">Nueva receta</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
