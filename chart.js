import { get_data, get_column, get_keys } from './data.js';

const call_charts = async () => {
  const dataset = await get_data('./dataset_ventas.csv');
  console.log(dataset)
  render_main_chart(dataset);
}

const group_by_time = (data, times) => {
  const grouped = times.reduce((acc, time) => {
    acc[time] = [];
    return acc;
  }, {});

  data.forEach(item => {
    const sale_time = item.time.split(':')[0] + ':00:00';
    if (grouped[sale_time]) {
      grouped[sale_time].push(item);
    }
  });

  return grouped;
};

const colors = [
  'rgb(128, 222, 234)',
  'rgb(179, 229, 252)',
  'rgb(129, 212, 250)',
  'rgb(121, 134, 203)',
  'rgb(149, 117, 205)',
  'rgb(240, 98, 146)',
]

const bg_colors = [
  'rgba(128, 222, 234, .2)',
  'rgba(179, 229, 252, .2)',
  'rgba(129, 212, 250, .2)',
  'rgba(121, 134, 203, .2)',
  'rgba(149, 117, 205, .2)',
  'rgba(240, 98, 146, .2)',
]

const render_main_chart = (dataset) => {
  const times = [
    '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00',
    '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00',
    '20:00:00', '21:00:00', '22:00:00',
  ];
  
  const groupedSales = group_by_time(dataset, times);

  const get_totals = (data, arg) => {
    const array = [];
    times.forEach(time => {
      let temp = 0;
      data[time].forEach(element => {
        if (arg == 0) temp += parseFloat(element.amount);
        if (arg == 1) temp += parseFloat(element.price);
      });
      array.push(parseInt(temp));
    })

    return array;
  }

  const prods = get_totals(groupedSales, 0);
  const prices = get_totals(groupedSales, 1);

  const data = {
    labels: times,
    datasets: [
      {
        label: 'Ventas',
        data: prices,
        backgroundColor: bg_colors[4],
        borderColor: colors[4],
        tension: .4,
        yAxisID: 'y',
      },
      {
        label: 'Productos',
        data: prods,
        backgroundColor: bg_colors[0],
        borderColor: colors[0],
        tension: .4,
        yAxisID: 'y1',
      },
    ]
  }

  const options = {
    responsive: true,
    scales: {
      y: {
        
        display: true,
        position: 'left',
      },
      y1: {
        display: true,
        position: 'right',
        ticks: {
          beginAtZero: true,
        },
      },
    }
  };

  new Chart('main_chart', { type: 'line', data, options }, )
}

call_charts();