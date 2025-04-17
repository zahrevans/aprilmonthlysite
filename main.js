fetch('dexdata.csv')
    .then(response => response.text())
    .then(data => {
        // 1. Split CSV into lines
        const lines = data.trim().split('\n');

        // 2. Extract raw headers
        const rawHeaders = lines[0].split(',');

        // 3. Clean and normalize headers
        const headers = rawHeaders.map(h =>
            h.replace(/[\r\n]+/g, ' ')       // replace line breaks with space
                .replace(/"/g, '')             // remove quotes
                .trim()
                .replace('Type I', 'Type 1')
                .replace('Type II', 'Type 2')
                .replace('Ability I', 'Ability 1')
                .replace('Ability II', 'Ability 2')
                .replace('Special Attack', 'Special Attack')
                .replace('Special Defense', 'Special Defense')
                .replace('BST', 'Total')
        );

        // 4. Convert rows into Pokémon objects
        const pokedex = lines.slice(1).map(line => {
            const values = line.split(',');
            let entry = {};
            headers.forEach((key, i) => {
                entry[key] = values[i] ? values[i].trim() : '';
            });
            return entry;
        });

        // 5. Create and display Bootstrap cards
        const container = document.getElementById('pokedex');

        pokedex.forEach(pokemon => {
            const card = document.createElement('div');
            card.className = 'card m-2';
            card.style.width = '18rem';

            card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${pokemon["Pokemon Name"]}</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            ${pokemon["Type 1"]}${pokemon["Type 2"] ? ' / ' + pokemon["Type 2"] : ''}
          </h6>
          <p class="card-text">
            <strong>Classification:</strong> ${pokemon.Classification}<br>
            <strong>HP:</strong> ${pokemon.HP} |
            <strong>Attack:</strong> ${pokemon.Attack} |
            <strong>Sp. Atk:</strong> ${pokemon["Special Attack"]}<br>
            <strong>Sp. Def:</strong> ${pokemon["Special Defense"]} |
            <strong>Speed:</strong> ${pokemon.Speed}<br>
            <strong>Total:</strong> ${pokemon.Total}<br>
            <strong>Abilities:</strong> 
            ${pokemon["Ability 1"]}${pokemon["Ability 2"] ? ', ' + pokemon["Ability 2"] : ''}
            ${pokemon["Hidden Ability"] ? ' (Hidden: ' + pokemon["Hidden Ability"] + ')' : ''}
          </p>
        </div>
      `;

            container.appendChild(card);
        });
    });
