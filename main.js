fetch('dexdata.csv')
    .then(response => response.text())
    .then(data => {


        // 1. Split CSV into lines
        const lines = data.trim().split('\n');

        // 2. Get headers (and clean up weird ones like "Special\nAttack")
        let headers = lines[0].split(',').map(h =>
            h.replace(/[\r\n"]+/g, ' ').trim() // replaces line breaks and quotes with space
        );

        // 3. Process each row into an object
        const pokedex = lines.slice(1).map(line => {
            const values = line.split(',');
            let entry = {};
            headers.forEach((key, i) => {
                entry[key] = values[i] ? values[i].trim() : '';
            });
            return entry;
        });

        console.log(data);
    });

// 2. Get headers (and clean up weird ones)
let rawHeaders = lines[0].split(',');

// 3. Clean and normalize headers
let headers = rawHeaders.map(h => {
    return h
        .replace(/[\r\n]+/g, ' ')        // replace newlines with space
        .replace(/"/g, '')               // remove quotes
        .trim()                          // remove extra whitespace
        .replace('Special Attack', 'Special Attack')   // normalize manually
        .replace('Special Defense', 'Special Defense') // normalize manually
        .replace('Type I', 'Type 1')
        .replace('Type II', 'Type 2')
        .replace('Ability I', 'Ability 1')
        .replace('Ability II', 'Ability 2')
        .replace('BST', 'Total');        // if you use BST in your original header
});