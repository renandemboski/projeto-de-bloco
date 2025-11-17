import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-links">
        <a href="#sobre">Sobre</a>
        <a href="#termos">Termos</a>
        <a href="#contato">Contato</a>
      </nav>
      <p className="footer-copy">
        © {new Date().getFullYear()} - Mind Care. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;
