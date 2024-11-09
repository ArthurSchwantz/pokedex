const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");

const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  try {
    const APIResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
  } catch (error) {
    console.error("Error fetching Pokémon", error);
  }
};

const renderPokemon = async (pokemon) => {
  try {
    pokemonName.innerHTML = "Loading ...";
    pokemonNumber.innerHTML = "";
    const data = await fetchPokemon(pokemon);

    if (data) {
      pokemonImage.style.display = "block";
      pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id;
      pokemonImage.src =
        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
          "front_default"
        ];
      input.value = "";
      searchPokemon = data.id;

      const audio = new Audio(
        "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${data.id}.ogg"
      );
      audio.play();
    } else {
      pokemonImage.style.display = "none";
      pokemonName.innerHTML = "Not found :c";
      pokemonNumber.innerHTML = "";
      pokemonImage;
    }
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    pokemonName.innerHTML = "Error :c";
    pokemonNumber.innerHTML = "";
    pokemonImage.style.display = "none";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase()); /*vai até 649*/
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});
renderPokemon(searchPokemon);
