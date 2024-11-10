import { get_data, get_column, get_keys } from './data.js';

const call_charts = async () => {
  const dataset = await get_data('./dataset_ventas.csv');

  render_main_chart(dataset);
}

const groupByTime = (data, times) => {
  const groupedData = times.reduce((acc, time) => {
    acc[time] = [];
    return acc;
  }, {});

  data.forEach(item => {
    const saleTime = item.time.split(':')[0] + ':00:00';
    if (groupedData[saleTime]) {
      groupedData[saleTime].push(item);
    }
  });

  return groupedData;
};

const colors = [
  "rgb(52, 73, 94)",
  "rgb(218, 247, 166)",
  "rgb(255, 195, 0)",
  "rgb(255, 87, 51)",
  "rgb(199, 0, 57)",
  "rgb(144, 12, 63)",
  "rgb(52, 73, 94)",
  "rgb(218, 247, 166)",
  "rgb(255, 195, 0)",
  "rgb(255, 87, 51)",
  "rgb(199, 0, 57)",
  "rgb(144, 12, 63)",
  "rgb(52, 73, 94)",
  "rgb(218, 247, 166)",
  "rgb(255, 195, 0)",
]

const render_main_chart = (dataset) => {
  const times = [
    '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00',
    '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00',
    '20:00:00', '21:00:00', '22:00:00',
  ];
  
  const groupedSales = groupByTime(dataset, times);

  const total = () => {
    const array = [];
    times.forEach(time => {
      let temp = 0;
      groupedSales[time].forEach(element => {
        temp += parseFloat(element.price);
      });
      array.push(temp);
    })

    return array;
  }

  const data = {
    labels: times,
    datasets: [
      {
        data: total(),
        backgroundColor: colors,
        borderColor: "rgba(0,0,255,0.1)",
      },
    ]
  }

  const options = {
    responsive: true,
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Ventas x Hora'
    }
  }

  new Chart('main_chart', { type: 'line', data, options }, )
}

call_charts();