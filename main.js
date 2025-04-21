// Mapping for only the missing images (Pokémon DB doesn't have them)
const nameToIdMap = {
    "Sinistcha": "1013",
    "Iron Boulder": "1022",
    "Ogerpon-Wellspring": "10273",
    "Ogerpon-Hearthflame": "10274",
    "Ogerpon-Cornerstone": "10275",
    "Hydrapple": "1019",
    "Gouging Fire": "1020",
    "Terapagos-Stellar": "1025",
    "Castform-Snowy": "10015",
    "Castform-Rainy": "10014",
    "Castform-Sunny": "10013",
    "Deoxys-Attack": "10001",
    "Deoxys-Defense": "10002",
    "Deoxys-Speed": "10003",
    "Burmy-Sandy": "10004",
    "Burmy-Trash": "10005",
    "Wormadam-Sandy": "10036",
    "Wormadam-Trash": "10037"
};

function getPokemonImage(name, id) {
    const cleanName = name.trim().replace(/é/g, 'e');
    const overrideId = nameToIdMap[cleanName];

    const finalId = overrideId || id;

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${finalId}.png`;
}



const typeColors = {
    Normal: "#A8A77A", Fire: "#EE8130", Water: "#6390F0", Electric: "#F7D02C",
    Grass: "#7AC74C", Ice: "#96D9D6", Fighting: "#C22E28", Poison: "#A33EA1",
    Ground: "#E2BF65", Flying: "#A98FF3", Psychic: "#F95587", Bug: "#A6B91A",
    Rock: "#B6A136", Ghost: "#735797", Dragon: "#6F35FC", Dark: "#705746",
    Steel: "#B7B7CE", Fairy: "#D685AD"
};

let allPokemon = [];

function renderCards(data) {
    const pokedex = document.getElementById('pokedex');
    pokedex.innerHTML = '';

    data.forEach(pokemon => {
        const {
            id, name, type1, type2, total, hp, atk, def, spatk, spdef, speed
        } = pokemon;

        const imageUrl = getPokemonImage(name, id);
        const color1 = typeColors[type1] || "#777";
        const color2 = type2 ? (typeColors[type2] || "#777") : color1;

        const card = document.createElement('div');
        card.className = 'card m-2 p-2 col-lg-3 col-md-6 col-sm-6';
        card.style.width = '16rem';
        card.style.border = 'none';
        card.style.background = `linear-gradient(to right, ${color1} 50%, ${color2} 50%)`;

        card.innerHTML = `
           <div class="pokemon-image-container">
    <img src="${imageUrl}" alt="${name}">
            </div>
            <div class="card-body">
                <h5 class="card-title">#${id} ${name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                    ${type1}${type2 ? ' / ' + type2 : ''}
                </h6>
                <p class="card-text">
                    <strong>Total:</strong> ${total}<br>
                    <strong>HP:</strong> ${hp} |
                    <strong>Attack:</strong> ${atk} |
                    <strong>Defense:</strong> ${def}<br>
                    <strong>Special Attack:</strong> ${spatk} |
                    <strong>Special Defense:</strong> ${spdef} |
                    <strong>Speed:</strong> ${speed}
                </p>
            </div>
        `;

        pokedex.appendChild(card);
    });
}

function applyFilters() {
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const gen = document.getElementById('generationSelect')?.value || '';
    const toggle = document.getElementById('typeToggle')?.value || '';
    const typeFilter = document.getElementById('typeFilter')?.value || '';

    const filtered = allPokemon.filter(pokemon => {
        const nameMatch = pokemon.name.toLowerCase().includes(search) || pokemon.id === search;
        const genMatch = !gen || pokemon.gen === gen;
        const toggleMatch = toggle === 'single' ? !pokemon.type2 : toggle === 'dual' ? !!pokemon.type2 : true;
        const typeMatch = !typeFilter || pokemon.type1 === typeFilter || pokemon.type2 === typeFilter;

        return nameMatch && genMatch && toggleMatch && typeMatch;
    });

    renderCards(filtered);
}

// Load CSV
fetch('Pokemon.csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').slice(1);

        rows.forEach(row => {
            if (!row.trim()) return;

            let [id, name, form, type1, type2, total, hp, atk, def, spatk, spdef, speed, gen] = row.split(',');

            name = name.replaceAll('"', '').trim();
            type1 = type1.replaceAll('"', '').trim();
            type2 = type2.replaceAll('"', '').trim();

            allPokemon.push({
                id, name, form, type1, type2: type2 || null, total, hp, atk, def, spatk, spdef, speed, gen
            });
        });

        renderCards(allPokemon);
    })
    .catch(error => console.error('Error loading the CSV:', error));

// Filter inputs
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput')?.addEventListener('input', applyFilters);
    document.getElementById('generationSelect')?.addEventListener('change', applyFilters);
    document.getElementById('typeToggle')?.addEventListener('change', applyFilters);
    document.getElementById('typeFilter')?.addEventListener('change', applyFilters);
});
