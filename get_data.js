fetch('ruta/del/archivo.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').map(row => row.split(','));
    console.log(rows); // Aquí tendrás el contenido del CSV en un array de arrays
  })
  .catch(error => console.error('Error leyendo el archivo:', error));
