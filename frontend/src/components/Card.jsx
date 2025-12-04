import { useState } from "react";

const Card = ({
  title,
  description,
  price,
  imageSrc,
  buttonText,
  onButtonClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    card: {
      backgroundColor: "var(--card-background)",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      marginBottom: "16px",
      display: "flex",
      flexDirection: "column",
      padding: "4px",
      height: "100%",
    },
    image: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    content: {
      padding: "16px",
      height: "100%",
    },
    title: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "8px",
      marginTop: "0",
      color: "var(--text-color)",
    },
    description: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "8px",
      whiteSpace: "pre-line",
      minHeight: "50px",
    },
    price: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "var(--primary-color)",
      marginBottom: "12px",
    },
    button: {
      backgroundColor: isHovered
        ? "var(--primary-hover)"
        : "var(--primary-color)",
      color: "#fff",
      border: "none",
      padding: "10px 0",
      borderRadius: "4px",
      fontWeight: "bold",
      cursor: "pointer",
      width: "100%",
      fontSize: "16px",
      transition: "background-color 0.3s",
    },
  };

  return (
    <div style={styles.card}>
      <img src={imageSrc} alt={title} style={styles.image} />
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
        <p style={styles.price}>{price}</p>
        <button
          style={styles.button}
          onClick={onButtonClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
