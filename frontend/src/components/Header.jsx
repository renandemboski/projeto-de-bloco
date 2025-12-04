import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const styles = {
    header: {
      width: "100%",
      height: "60px",
      backgroundColor: "var(--card-background)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 16px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      position: "relative",
    },
    content: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      maxWidth: "1280px",
    },
    leftSection: {
      display: "flex",
      alignItems: "center",
    },
    logo: {
      height: "40px",
      width: "auto",
      marginRight: "12px",
      cursor: "pointer",
    },
    title: {
      color: "#fff",
      fontSize: "20px",
      fontWeight: "bold",
      margin: "0",
      cursor: "pointer",
    },
    burgerButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      padding: "8px",
      zIndex: 1001,
    },
    burgerLine: {
      width: "25px",
      height: "3px",
      backgroundColor: "#fff",
      borderRadius: "2px",
      transition: "all 0.3s ease",
    },
    menu: {
      position: "fixed",
      top: "60px",
      right: menuOpen ? "0" : "-300px",
      width: "250px",
      height: "calc(100vh - 60px)",
      backgroundColor: "var(--card-background)",
      boxShadow: "-2px 0 8px rgba(0, 0, 0, 0.1)",
      transition: "right 0.3s ease",
      zIndex: 1000,
      padding: "20px 0",
    },
    menuItem: {
      padding: "15px 20px",
      cursor: "pointer",
      borderBottom: "1px solid var(--border-color)",
      color: "var(--text-color)",
      fontSize: "16px",
      transition: "background-color 0.2s",
    },
    overlay: {
      position: "fixed",
      top: "60px",
      left: 0,
      width: "100%",
      height: "calc(100vh - 60px)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: menuOpen ? "block" : "none",
      zIndex: 999,
    },
  };

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const menuItems = isLoggedIn
    ? [
        { label: "Início", path: "/" },
        { label: "Agendamentos", path: "/appointments" },
        { label: "Perfil", path: "/profile" },
        { label: "Sair", action: handleLogout },
      ]
    : [
        { label: "Início", path: "/" },
        { label: "Login", path: "/login" },
        { label: "Cadastrar", path: "/register" },
      ];

  return (
    <>
      <header style={styles.header}>
        <div style={styles.content}>
          <div style={styles.leftSection}>
            <img
              src="/logo.svg"
              alt="MindCare Logo"
              style={styles.logo}
              onClick={() => handleNavigation("/")}
            />
            <h1 style={styles.title} onClick={() => handleNavigation("/")}>
              MindCare
            </h1>
          </div>

          <button
            style={styles.burgerButton}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span style={styles.burgerLine}></span>
            <span style={styles.burgerLine}></span>
            <span style={styles.burgerLine}></span>
          </button>
        </div>
      </header>

      <div style={styles.overlay} onClick={() => setMenuOpen(false)}></div>

      <nav style={styles.menu}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            style={styles.menuItem}
            onClick={() => {
              if (item.action) {
                item.action();
                setMenuOpen(false);
              } else {
                handleNavigation(item.path);
              }
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "var(--background-color)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            {item.label}
          </div>
        ))}
      </nav>
    </>
  );
};

export default Header;
