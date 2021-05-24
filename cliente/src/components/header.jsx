import React from "react";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => (
  <nav className="navbar navbar-dark bg-primary">
    <LinkContainer to="/" exact>
      <button className="btn btn-primary">Home</button>
    </LinkContainer>
    <LinkContainer to="/formulario/0">
    <button className="btn btn-primary">Nuevo</button>
    </LinkContainer>
  </nav>
);

export default Header;
