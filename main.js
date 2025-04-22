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
    "Wormadam-Sandy": "10004",
    "Wormadam-Trash": "10005",
    "Rotom-Heat": "10008",
    "Rotom-Wash": "10009",
    "Rotom-Frost": "10010",
    "Rotom-Fan": "10011",
    "Rotom-Mow": "10012",
    "Shaymin-Sky": "10006",
    "Giratina-Origin": "10007",
    "Tornadus-Therian": "10019",
    "Thundurus-Therian": "10020",
    "Landorus-Therian": "10021",
    "Kyurem-White": "10023",
    "Kyurem-Black": "10022",
    "Keldeo-Resolute": "10024",
    "Aegislash-Blade": "10026",
    "Meloetta-Pirouette": "10018",
    "Darmanitan-Zen": "10017",
    "Zygarde-10%": "10181",
    "Zygarde-Complete": "10120",
    "Meowstic-Female": "10025",
    "Diancie-Mega": "10075",
    "Hoopa-Unbound": "10086",
    "Venusaur-Mega": "10033",
    "Charizard-Mega-X": "10034",
    "Charizard-Mega-Y": "10035",
    "Blastoise-Mega": "10036",
    "Beedrill-Mega": "10090",
    "Pidgeot-Mega": "10073",
    "Alakazam-Mega": "10037",
    "Slowbro-Mega": "10071",
    "Gengar-Mega": "10038",
    "Kangaskhan-Mega": "10039",
    "Pinsir-Mega": "10040",
    "Gyarados-Mega": "10041",
    "Aerodactyl-Mega": "10042",
    "Mewtwo-Mega-X": "10043",
    "Mewtwo-Mega-Y": "10044",
    "Ampharos-Mega": "10045",
    "Steelix-Mega": "10072",
    "Scizor-Mega": "10046",
    "Heracross-Mega": "10047",
    "Houndoom-Mega": "10048",
    "Tyranitar-Mega": "10049",
    "Sceptile-Mega": "10065",
    "Blaziken-Mega": "10050",
    "Swampert-Mega": "10064",
    "Gardevoir-Mega": "10051",
    "Sableye-Mega": "10066",
    "Mawile-Mega": "10052",
    "Aggron-Mega": "10053",
    "Medicham-Mega": "10054",
    "Manectric-Mega": "10055",
    "Sharpedo-Mega": "10070",
    "Camerupt-Mega": "10087",
    "Altaria-Mega": "10067",
    "Banette-Mega": "10056",
    "Absol-Mega": "10057",
    "Glalie-Mega": "10074",
    "Salamence-Mega": "10089",
    "Metagross-Mega": "10076",
    "Latias-Mega": "10062",
    "Latios-Mega": "10063",
    "Rayquaza-Mega": "10079",
    "Lopunny-Mega": "10088",
    "Garchomp-Mega": "10058",
    "Lucario-Mega": "10059",
    "Abomasnow-Mega": "10060",
    "Gallade-Mega": "10068",
    "Audino-Mega": "10069",
    "Oricorio-Pom-Pom": "10123",
    "Oricorio-Pa'u": "10124",
    "Oricorio-Sensu": "10125",
    "Lycanroc-Midnight": "10126",
    "Lycanroc-Dusk": "10152",
    "Wishiwashi-School": "10127",
    "Minior-Core": "10136",
    "Necrozma-Ultra": "10157",
    "Necrozma-Dusk-Mane": "10155",
    "Necrozma-Dawn-Wings": "10156",
    "Rattata-Alolan": "10091",
    "Raticate-Alolan": "10092",
    "Raichu-Alolan": "10100",
    "Sandshrew-Alolan": "10101",
    "Sandslash-Alolan": "10102",
    "Vulpix-Alolan": "10103",
    "Ninetales-Alolan": "10104",
    "Diglett-Alolan": "10105",
    "Dugtrio-Alolan": "10106",
    "Meowth-Alolan": "10107",
    "Persian-Alolan": "10108",
    "Geodude-Alolan": "10109",
    "Graveler-Alolan": "10110",
    "Golem-Alolan": "10111",
    "Grimer-Alolan": "10112",
    "Muk-Alolan": "10113",
    "Exeggutor-Alolan": "10114",
    "Marowak-Alolan": "10115",
    "Toxtricity-Low-Key": "10184",
    "Eiscue-Noice": "10185",
    "Indeedee-Female": "10186",
    "Morpeko-Hangry": "10187",
    "Zacian-Crowned": "10188",
    "Zamazenta-Crowned": "10189",
    "Eternatus-Eternamax": "10190",
    "Urshifu-Rapid-Strike": "10191",
    "Calyrex-Ice-Rider": "10193",
    "Calyrex-Shadow-Rider": "10194",
    "Meowth-Galarian": "10161",
    "Growlithe-Hisuian": "10229",
    "Arcanine-Hisuian": "10230",
    "Ponyta-Galarian": "10162",
    "Rapidash-Galarian": "10163",
    "Slowpoke-Galarian": "10164",
    "Slowbro-Galarian": "10165",
    "Farfetch'd-Galarian": "10166",
    "Weezing-Galarian": "10167",
    "Mr. Mime-Galarian": "10168",
    "Articuno-Galarian": "10169",
    "Zapdos-Galarian": "10170",
    "Moltres-Galarian": "10171",
    "Slowking-Galarian": "10172",
    "Corsola-Galarian": "10173",
    "Zigzagoon-Galarian": "10174",
    "Linoone-Galarian": "10175",
    "Darumaka-Galarian": "10176",
    "Darmanitan-Galarian": "10177",
    "Darmanitan-Galarian-Zen": "10178",
    "Yamask-Galarian": "10179",
    "Stunfisk-Galarian": "10180",
    "Voltorb-Hisuian": "10231",
    "Electrode-Hisuian": "10232",
    "Typhlosion-Hisuian": "10233",
    "Qwilfish-Hisuian": "10234",
    "Sneasel-Hisuian": "10235",
    "Zorua-Hisuian": "10238",
    "Zoroark-Hisuian": "10239",
    "Braviary-Hisuian": "10240",
    "Sliggoo-Hisuian": "10241",
    "Goodra-Hisuian": "10242",
    "Avalugg-Hisuian": "10243",
    "Samurott-Hisuian": "10236",
    "Lilligant-Hisuian": "10237",
    "Basculin-White-Striped": "",
    "Decidueye-Hisuian": "10244",
    "Enamorus-Therian": "10249",
    "Dialga-Origin": "10245",
    "Palkia-Origin": "10246",
    "Basculegion-Female": "10248",
    "Basculin-White-Stripe": "10247",
    "Basculin-Blue-Stripe": "10016",

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
