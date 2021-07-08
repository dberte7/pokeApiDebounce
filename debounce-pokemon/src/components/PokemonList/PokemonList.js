import React from 'react';
import Card from '../Card'
import './PokemonList.css';

const PokemonList = (props) => {

  const renderPokemon = () => props.pokemon.map((pokemon, key) => <Card pokemon={pokemon} key={key}/>)
  
  return (
    <div className="Card">
      {renderPokemon()}
    </div>
  );
}

export default PokemonList;
