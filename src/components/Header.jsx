import Button from "./ui/Button/Button";
import { Menu } from "lucide-react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div>
        <Button className="button" asLink href="/">
          Voltar
        </Button>
      </div>
      <div className="image">
        <img src="/logo.svg" alt="Logo" className="logo" />
      </div>
      <div className="menu">
        <Menu size={40} />
      </div>
    </header>
  );
};

export default Header;
