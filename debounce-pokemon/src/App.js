import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './components/PokemonList';
import useDebounce from './Hooks/useDebounce'
import './App.css';

const App = () => {

  const [input, setInput] = useState('');
  const [pokemon, setPokemon] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const searchPokemons = async () => {
    let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${input}`);
    setPokemon([res.data,...pokemon]);
    console.log(res.data);
    console.log(pokemon);
  };

  const debouncedSearchPokemon = useDebounce(input, 1000)

  useEffect(() => {
    if (debouncedSearchPokemon) {
      setIsSearching(true);
      searchPokemons(debouncedSearchPokemon).then(results => {
        setIsSearching(false);
        //setPokemon(pokemon);
      });
    } else {
      setPokemon([]);
    }
  }, [debouncedSearchPokemon])
  
  return (
    <section className="Card">
      <form>
        <label>Busca Pokemon: </label>
        <input type="text" name="name" placeholder="Introduce Pokemon" onChange={handleChange} value={input} />
      </form>

      {isSearching && <div>Buscando...</div>}
  
      <div>
        <PokemonList pokemon={pokemon}/>
      </div>

    </section>
  );
}

export default App;
