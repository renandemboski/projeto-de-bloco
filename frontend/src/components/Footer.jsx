function Footer() {
  const styles = {
    footer: {
      width: "100%",
      padding: "1.5rem 1rem",
      borderTop: "1px solid #222",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      width: "100%",
      maxWidth: "1280px",
      textAlign: "center",
    },
    copy: {
      fontSize: "0.9rem",
      color: "#ccc",
      margin: 0,
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <p style={styles.copy}>
          © {new Date().getFullYear()} - Mind Care. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
