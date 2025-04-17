fetch('dexdata.csv')
    .then(response => response.text())
    .then(data => {
        console.log(data);
    });