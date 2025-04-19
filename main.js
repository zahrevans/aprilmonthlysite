function getPokemonImage(name) {
    if (!name) {
        return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
    }

    const formattedName = name
        .toLowerCase()
        .replace(/♀/g, "f")
        .replace(/♂/g, "m")
        .replace(/\./g, "")
        .replace(/[':]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    return `https://img.pokemondb.net/artwork/large/${formattedName}.jpg`;
}

// Fetch the CSV file named 'Pokemon.csv'
fetch('Pokemon.csv')
    .then(response => response.text()) // Convert the response to text
    .then(data => {
        // Split the CSV data into rows and skip the header row
        const rows = data.split('\n').slice(1);
        const pokedex = document.getElementById('pokedex'); // Get the container div for Pokémon cards

        // Loop through each row in the CSV
        rows.forEach(row => {
            if (!row.trim()) return; // Skip any empty lines

            // Destructure the CSV values into variables
            let [id, name, form, type1, type2, total, hp, atk, def, spatk, spdef, speed, gen] = row.split(',');

            // Remove quotation marks
            name = name.replaceAll('"', '');
            type1 = type1.replaceAll('"', '');
            type2 = type2.replaceAll('"', '');

            const imageUrl = getPokemonImage(name); // Define imageUrl using cleaned-up name

            //colors  for cards by type
            const typeColors = {
                Normal: "#A8A77A",
                Fire: "#EE8130",
                Water: "#6390F0",
                Electric: "#F7D02C",
                Grass: "#7AC74C",
                Ice: "#96D9D6",
                Fighting: "#C22E28",
                Poison: "#A33EA1",
                Ground: "#E2BF65",
                Flying: "#A98FF3",
                Psychic: "#F95587",
                Bug: "#A6B91A",
                Rock: "#B6A136",
                Ghost: "#735797",
                Dragon: "#6F35FC",
                Dark: "#705746",
                Steel: "#B7B7CE",
                Fairy: "#D685AD"
            };



            // Create a new Bootstrap card for each Pokémon
            const card = document.createElement('div');
            card.className = 'card m-2 p-2';
            card.style.width = '18rem';
            card.style.border = 'none';

            // Fill the card's HTML content with Pokémon data
            card.innerHTML = `
                <img src="${imageUrl}" class="card-img-top" alt="${name}">
                <div class="card-body">
                    <h5 class="card-title">#${id} ${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                        ${type1}${type2.trim() !== '' ? ' / ' + type2 : ''}
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

            // Add the card to the Pokedex container on the page
            pokedex.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading the CSV:', error));