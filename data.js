export const get_data = async (url) => {
  try {
    const response = await fetch(url);
    const data_txt = await response.text();
    const lines = data_txt.split('\n');
    const headers = lines[0].replace(/\r/g, '').split(',');
    headers.push('date');
    headers.push('time');

    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      const [date, time] = values[0].split(' ');
      values.push(date, time);
      
      const obj = headers.reduce((acc, header, index) => {
        acc[header] = values[index];
        return acc;
      }, {});

      delete obj.datetime;
      delete obj.op1;
      delete obj.op2;
      delete obj.category;

      return obj;
    })

    return data;
  } catch (error) {
    console.error('Error al leer el archivo CSV:', error);
    return [];
  }
};

export const get_column = (data, col) => {
  return data.map(row => row[col]);
};

export const get_keys = (data) => {
  if (data.length > 0) {
    return Object.keys(data[0]); // Devuelve las claves del primer objeto
  }
  return [];
};