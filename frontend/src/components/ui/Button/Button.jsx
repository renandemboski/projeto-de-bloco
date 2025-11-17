import { forwardRef } from "react";
import "./Button.css";

function clsx(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

const Button = forwardRef(({ className, asLink = false, ...props }, ref) => {
  const Component = asLink ? "a" : "button";
  const defaultClasses = "button-base button-default";
  return (
    <Component
      className={clsx(defaultClasses, className)}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export default Button;
