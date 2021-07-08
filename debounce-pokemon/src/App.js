import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './components/PokemonList';
import useDebounce from './Hooks/useDebounce';
import './App.css';

const App = () => {

  const [input, setInput] = useState('');
  const [pokemon, setPokemon] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const existPokemon = (nombrePokemon) => { 
    return pokemon.findIndex(item => item.name === nombrePokemon);
  };

  const searchPokemons = async () => {
    if (pokemon !== [...pokemon]) {
      if(existPokemon(input) === -1 ) {
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${input}`);
        setPokemon([res.data,...pokemon]);
        console.log(res.data);
      }
    }
  };

  const debouncedSearchPokemon = useDebounce(input, 2000)

  useEffect(() => {
    if (debouncedSearchPokemon) {
      setIsSearching(true);
      searchPokemons(debouncedSearchPokemon).then(results => {
        setIsSearching(false);
      });
    } else {
      setPokemon([...pokemon]);
    }
  }, [debouncedSearchPokemon]);

  useEffect(() => {
    setInput('')
  }, [pokemon]);
  
  return (
    <section>
      <form>
        <label>Busca Pokemon: </label>
        <input type="text" name="name" data-testid="App__inputText" placeholder="Introduce Pokemon" onChange={handleChange} value={input} />
      </form>

      {isSearching && <div>Buscando...</div>}
  
      <div>
        <PokemonList pokemon={pokemon}/>
      </div>

    </section>
  );
}

export default App;
