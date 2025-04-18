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

            name = name.replaceAll('"', '');
            type1 = type1.replaceAll('"', '');
            type2 = type2.replaceAll('"', '');  
            

            // Create a new Bootstrap card for each Pokémon
            const card = document.createElement('div');
            card.className = 'card m-2 p-2'; // Add margin and padding using Bootstrap classes
            card.style.width = '18rem'; // Set card width

            // Fill the card's HTML content with Pokémon data
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">#${id} ${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                        ${type1}${type2.trim() !== '' ? ' / ' + type2 : ''} <!-- Show type2 if it exists -->
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
