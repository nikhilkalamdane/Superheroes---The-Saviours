import { useState, useEffect } from "react";
import "./App.css";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [superheros, setSupereros] = useState([]);
  const [filteredSuperheros, setFilteredSuperheros] = useState(superheros);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json")
      .then((response) => response.json())
      .then((superhero) => setSupereros(superhero));
  }, []);

  useEffect(() => {
    const newFilteredSuperheros = superheros.filter((superhero) => {
      return superhero.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredSuperheros(newFilteredSuperheros);
  }, [superheros, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="app">
      <h1 className="app-title">Superheroes - The Saviours</h1>
      <div>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder="Search Your Heros"
        />
      </div>

      <CardList superheros={filteredSuperheros} />
    </div>
  );
};

export default App;
