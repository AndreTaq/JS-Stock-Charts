async function main() {
  const timeChartCanvas = document.querySelector("#time-chart");
  const highestPriceChartCanvas = document.querySelector(
    "#highest-price-chart"
  );
  const averagePriceChartCanvas = document.querySelector(
    "#average-price-chart"
  );

  // API KEY
  const apiKey = '08409817f62d403fbb7f98e4b87cd86e';
  const symbols = ["GME", "MSFT", "DIS", "BNTX"];
  const symbolsQueryString = symbols.join(",");

  const url = `https://api.twelvedata.com/time_series?symbol=${symbolsQueryString}&interval=1day&apikey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  const { GME, MSFT, DIS, BNTX } = mockData;
  const stocks = [GME, MSFT, DIS, BNTX];

  stocks.forEach((stock) => stock.values.reverse());

  // over time chart
  new Chart(timeChartCanvas.getContext("2d"), {
    type: "line",
    data: {
      labels: stocks[0].values.map((value) => value.datetime),
      datasets: stocks.map((stock) => ({
        label: stock.meta.symbol,
        data: stock.values.map((value) => parseFloat(value.high)),
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
      })),
    },
  });

  // highest stock chart
  new Chart(highestPriceChartCanvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: stocks.map((stock) => stock.meta.symbol),
      datasets: [
        {
          label: "Highest Price",
          data: stocks.map((stock) => calculateHighestPrice(stock.values)),
          backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
          borderColor: stocks.map((stock) => getColor(stock.meta.symbol)),
        },
      ],
    },
  });
  // helper function to calculate the highest stock price
  function calculateHighestPrice(values) {
    let highestPrice = 0;
    values.forEach((value) => {
      const price = parseFloat(value.high);
      if (price > highestPrice) {
        highestPrice = price;
      }
    });
    return highestPrice;
  }

  // color function
  function getColor(stock) {
    if (stock === "GME") {
      return "rgba(61, 161, 61, 0.7)";
    }
    if (stock === "MSFT") {
      return "rgba(209, 4, 25, 0.7)";
    }
    if (stock === "DIS") {
      return "rgba(18, 4, 209, 0.7)";
    }
    if (stock === "BNTX") {
      return "rgba(166, 43, 158, 0.7)";
    }
  }
}

main();
