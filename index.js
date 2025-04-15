const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTSmd_nPTnDX6aaa1kT8i3BeJQ4FJ2716RSNBXsa95hNS8gzy6cu7htBLLw6diezg/pub?output=csv";

fetch(SHEET_URL)
  .then(response => response.text())
  .then(csvText => {
    const rows = csvText.trim().split("\n").map(row => row.split(","));
    const headers = rows[0];
    const data = rows.slice(1).map(row =>
      Object.fromEntries(row.map((value, index) => [headers[index].trim(), value.trim()]))
    );
    displayPokemon(data);
  });

 