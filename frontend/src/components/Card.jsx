import Button from "./ui/Button/Button";
import "./Card.css";

function Card({
  title,
  description,
  price,
  buttonText,
  imageSrc,
  imageAlt = "image",
  onButtonClick,
}) {
  return (
    <section className="card">
      <div className="description">
        <h1>{title}</h1>
        <p>{description}</p>
        <p className="price">
          Sessões a partir de <strong>{price}</strong>
        </p>
        <Button onClick={onButtonClick}>{buttonText}</Button>
      </div>

      <div className="image-wrapper">
        <img className="card-image" src={imageSrc} alt={imageAlt} />
      </div>
    </section>
  );
}

export default Card;
