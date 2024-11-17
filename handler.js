export const enable_event_handler = () => {
  selector_x.onchange = e => {
    const { value, text } = e.target.selectedOptions[0];
    
    if (value == 'sj')
    {
      const grouped_data = group_by_time(links.datasets.san_juan, links.times);
      const prices_data = [];
      const quantify_data = [];

      Object.values(grouped_data).forEach((array) => {
        const [p, q] = calculator(array);
        prices_data.push(p);
        quantify_data.push(q);
      });

      update_chart_data(main_chart, [prices_data, quantify_data]);
    }
    else
    {
      console.log(value);
    }
  };
};
