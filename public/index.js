async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // const symbols = ['GME', 'DIS', 'MSFT', 'BNTX'];

    // const response = await fetch(`https://api.twelvedata.com/symbol_search?symbol=${symbols}`);
    // const responseObject = await response.json();
    // console.log(responseObject);


    // const apiKey = '08409817f62d403fbb7f98e4b87cd86e';
    const symbols = ['GME', 'MSFT', 'DIS', 'BNTX'];
    const symbolsQueryString = symbols.join(',');

    const url = `https://api.twelvedata.com/time_series?symbol=${symbolsQueryString}&interval=1day&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

   
}

main()