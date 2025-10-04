import React from "react";
import Button from "./ui/Button/Button";
import "./Card.css";

function Card() {
  return (
    <section className="card">
      <div>
        <h1>Terapeutas profissionais e qualificados em quem pode confiar</h1>
        <p>
          Com os nossos terapeutas, você obtém o mesmo profissionalismo e qualidade 
          que esperaria de um terapeuta no consultório, mas com a capacidade de se 
          encontrar quando e como quiser.
        </p>
        <p className="price">
        Sessões a partir de <strong>R$ 79,90</strong>
      </p>
        <Button>Encontre um terapeuta</Button>
      </div>

      <img src="/terapeuta.png" alt="Terapeuta" />
    </section>
  );
}

export default Card;
