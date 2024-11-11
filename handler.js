const enable_event_handler = (dataset) => {
  selector_chart.onchange = e => {
    const { value, text } = e.target.selectedOptions[0];
    
    const prices = get_totals(dataset[value].data, 1);
    const prods = get_totals(dataset[value].data, 0);

    update_chart_data(prices, prods);
  }
}

const times = [
  '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00',
  '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00',
  '20:00:00', '21:00:00', '22:00:00',
];

const get_totals = (data, arg) => {
  const array = [];
  times.forEach(time => {
    let temp = 0;
    data[time].forEach(element => {
      if (arg == 0) temp += parseFloat(element.amount);
      if (arg == 1) temp += parseFloat(element.total);
    });
    array.push(parseInt(temp));
  })

  return array;
};

const update_chart_data = (prices, prods) => {
  const chart = Chart.getChart(select_chart);

  chart.data.datasets[0].data = prices;
  chart.data.datasets[1].data = prods;
  chart.update();
}
