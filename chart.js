import { get_data, get_column, get_keys } from './data.js';

const call_charts = async () => {
  const dataset = await get_data('./dataset_ventas.csv');

  console.log(dataset);
}

call_charts()