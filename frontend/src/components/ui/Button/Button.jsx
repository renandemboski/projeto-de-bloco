import { forwardRef, useState } from "react";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      fullWidth = false,
      style,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const variants = {
      primary: {
        backgroundColor:
          isHovered && !disabled
            ? "var(--primary-hover)"
            : "var(--primary-color)",
        color: "#fff",
      },
      secondary: {
        backgroundColor: isHovered && !disabled ? "#5a6268" : "#6c757d",
        color: "#fff",
      },
    };

    const baseStyle = {
      padding: "12px 24px",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.3s ease",
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? "100%" : "auto",
      ...variants[variant],
      ...style,
    };

    return (
      <button
        ref={ref}
        style={baseStyle}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
