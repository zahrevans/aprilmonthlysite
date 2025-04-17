const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTSmd_nPTnDX6aaa1kT8i3BeJQ4FJ2716RSNBXsa95hNS8gzy6cu7htBLLw6diezg/pub?output=csv";

window.addEventListener("DOMContentLoaded", () => {
  fetch(SHEET_URL)
    .then(response => response.text())
    .then(csvText => {
      const rows = csvText.trim().split("\n").map(row =>
        row.split(",").map(cell => cell.replace(/^"|"$/g, "").trim())
      );

      const headers = rows[0];
      const data = rows.slice(1).map(row =>
        Object.fromEntries(row.map((value, index) => [headers[index], value]))
      );

      console.log("Data Loaded:", data);
      displayPokemon(data);
    });
});

function displayPokemon(pokemonList) {
  const container = document.getElementById("pokedex");

  pokemonList.forEach(pokemon => {
    const name = pokemon["Pokemon Name"];
    const nationalDex = pokemon["National Dex"];
    const classification = pokemon["Classification"];
    const type1 = pokemon["Type 1"];
    const type2 = pokemon["Type 2"];
    const ability1 = pokemon["Ability 1"];
    const ability2 = pokemon["Ability 2"];
    const hiddenAbility = pokemon["Hidden Ability"];
    const evolution = pokemon["Evolution Method"];

    const hp = pokemon["HP"];
    const atk = pokemon["Attack"];
    const def = pokemon["Defense"];
    const spAtk = pokemon["Special Attack"];
    const spDef = pokemon["Special Defence"];
    const speed = pokemon["Speed"];
    const bst = pokemon["Total"];

    const imageUrl = getPokemonImage(name);

    const card = document.createElement("div");
    card.style.border = "1px solid #ccc";
    card.style.margin = "1rem";
    card.style.padding = "1rem";
    card.style.width = "260px";
    card.style.borderRadius = "10px";
    card.style.backgroundColor = "#f8f8f8";
    card.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
    card.style.fontFamily = "Arial, sans-serif";

    card.innerHTML = `
      <h2>#${nationalDex} - ${name}</h2>
      <img src="${imageUrl}" alt="${name}" width="100" />
      <p><strong>Classification:</strong> ${classification}</p>
      <p><strong>Type:</strong> ${type1}${type2 ? ` / ${type2}` : ""}</p>
      <p><strong>Abilities:</strong> ${ability1}${ability2 ? `, ${ability2}` : ""}${hiddenAbility ? ` (Hidden: ${hiddenAbility})` : ""}</p>
      ${evolution ? `<p><strong>Evolution:</strong> ${evolution}</p>` : ""}
      <hr>
      <ul style="list-style: none; padding-left: 0;">
        <li>HP: ${hp}</li>
        <li>Attack: ${atk}</li>
        <li>Defense: ${def}</li>
        <li>Sp. Atk: ${spAtk}</li>
        <li>Sp. Def: ${spDef}</li>
        <li>Speed: ${speed}</li>
        <li><strong>BST:</strong> ${bst}</li>
      </ul>
    `;

    container.appendChild(card);
  });
}

function getPokemonImage(name) {
  if (!name) return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
  const formattedName = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
  return `https://img.pokemondb.net/artwork/large/${formattedName}.jpg`;
}
