export const get_data = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const data_txt = await response.text();
    
    const rows = data_txt.split('\n').map(row => row.trim());
    const headers = rows[0].split(',');
    const data = rows.slice(1).map(row => {
      const values = row.split(',');
      return headers.reduce((acc, header, index) => {
        acc[header] = values[index];
        return acc;
      }, {});
    });

    return data; // Devuelve el array de objetos
  } catch (error) {
    console.error('Error al leer el archivo CSV:', error);
    return [];
  }
};

export const get_column = (data, columnName) => {
  return data.map(row => row[columnName]);
};

export const get_keys = (data) => {
  if (data.length > 0) {
    return Object.keys(data[0]); // Devuelve las claves del primer objeto
  }
  return [];
};