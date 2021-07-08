import React from 'react';
import './Card.css';

const Card = (props) => {
  return (
    <div>
      <h1>{props.pokemon.name}</h1>
      <img src={props.pokemon.sprites?.other["official-artwork"].front_default} alt='pokemon' />
    </div>
  );
}

export default Card;