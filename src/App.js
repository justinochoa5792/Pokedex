import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [pokedex, setPokedex] = useState([]);
  const [wildPokemon, setWildPokemon] = useState({});

  const encounterWildPokemon = async () => {
    const response = await Axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + pokeId()
    );
    console.log(response.data);
    setWildPokemon(response.data);
  };

  const pokeId = () => {
    const min = Math.ceil(1);
    const max = Math.floor(151);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const catchPokemon = (pokemon) => {
    setPokedex((state) => {
      const pokeExists = state.filter((p) => pokemon.id === p.id).length > 0;

      if (!pokeExists) {
        state = [...state, pokemon];
        state.sort(function (a, b) {
          return a.id - b.id;
        });
      }
      return state;
    });
    encounterWildPokemon();
  };

  const releasePokemon = (id) => {
    setPokedex((state) => state.filter((p) => p.id !== id));
  };

  useEffect(() => {
    encounterWildPokemon();
  }, []);

  return (
    <div className="app-wrapper">
      <header>
        <h1 className="title">Pokémon</h1>
        <h3 className="subtitle">Gotta Catch em All!</h3>
      </header>

      <section className="wild-pokemon">
        <h2>Wild Pokémon Encounter</h2>
        <img
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
            wildPokemon.id +
            ".png"
          }
          alt={wildPokemon.id}
          className="sprite"
        />
        <h3>{wildPokemon.name}</h3>
        <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>
          Catch
        </button>
      </section>

      <section className="pokedex">
        <h2>Pokédex</h2>
        <div className="pokedex-list">
          {pokedex.map((pokemon) => (
            <div className="pokemon" key={pokemon.id}>
              <img
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                  pokemon.id +
                  ".png"
                }
                className="sprite"
                alt={pokemon.id}
              />
              <h3 className="pokemon-name">{pokemon.name}</h3>
              <button
                className="remove"
                onClick={() => releasePokemon(pokemon.id)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
