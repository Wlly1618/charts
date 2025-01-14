import { get_data } from './data.js';
import { enable_event_handler } from './handler.js';

const links = {
  times: [
    "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", 
    "19:00", "20:00", "21:00", "22:00", "23:00", '24:00',
  ],
  datasets: [],
  quantify_data: new Map,
  cost_data: new Map,
  data_chart: [],
  showing: '',
}

const chart_colors = [
  'rgb(118, 215, 196)',
  'rgb(218, 247, 166)',
  'rgb(255, 195, 0)',
  'rgb(255, 87, 51)',
  'rgb(199, 0, 57)',
  'rgb(144, 12, 63)',
];

const chart_bg_colors = [
  'rgba(118, 215, 196, .2)',
  'rgba(218, 247, 166, .2)',
  'rgba(255, 195, 0, .2)',
  'rgba(255, 87, 51, .2)',
  'rgba(199, 0, 57, .2)',
  'rgba(144, 12, 63, .2)',
];

const group_by_time = (data, times) => {
  const group = times.reduce((acc, time, index) => {
    if (index + 1 < times.length) {
      const row = [];
      
      Object.values(data).forEach(obj => {
        if (obj.time > time && obj.time <= times[index + 1]) {
          row.push(obj);
        }
      });

      acc[time] = row;
    }

    return acc;
  }, {});

  return group;
};

const calculator = (array) => {
  return array.reduce(
      ([acc_p, acc_q], obj) => [
          acc_p + parseFloat(obj.quantify * obj.cost),
          acc_q + parseFloat(obj.quantify)
      ],
      [0, 0]
  );
};

const update_chart_data = (key, datasets) => {
  const chart = Chart.getChart(key);

  datasets.forEach((dataset, index) => { chart.data.datasets[index].data = dataset });

  chart.update();
}

const init_datasets = async () => {
  links.datasets.forEach((dataset, index) => {
    Object.entries(dataset).forEach(([key, data]) => {
      const grouped_data = group_by_time(data, links.times);
      const cost_data = [];
      const quantify_data = [];

      Object.values(grouped_data).forEach((array) => {
        const [p, q] = calculator(array);
        cost_data.push(p);
        quantify_data.push(q);
      });

      links.quantify_data[key] = quantify_data ;
      links.cost_data[key] = cost_data;
    });
  })
}

const load_chart = async (cost_data, quantify_data, times) => {
  const data = {
    labels: times,
    datasets: [
      {
        label: 'Subtotal',
        data: cost_data,
        backgroundColor: chart_bg_colors[4],
        borderColor: chart_colors[4],
        borderWidth: 1,
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Items',
        data: quantify_data,
        backgroundColor: chart_bg_colors[0],
        borderColor: chart_colors[0],
        borderWidth: 1,
        fill: true,
        tension: 0.3,
        yAxisID: 'y1',
      },
    ]
  };

  const options = {
    stacked: false,
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
      }
    }
  };

  new Chart('main_chart',  {
    type: 'line',
    data: data,
    options: options,
  });
}

const init_chart = async () => {
  links.datasets = [
    { san_juan: await get_data('./dataset_san_juan.csv') },
  ]

  await init_datasets();

  await load_chart(links.cost_data['san_juan'], links.quantify_data['san_juan'], links.times);
}

init_chart();