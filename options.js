function calculate() {
    const stockPrice = parseFloat(document.getElementById('stockPrice').value);
    const strikePrice = parseFloat(document.getElementById('strikePrice').value);
    const timeToExpiration = parseFloat(document.getElementById('timeToExpiration').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const volatility = parseFloat(document.getElementById('volatility').value);

    const d1 = (Math.log(stockPrice / strikePrice) + (interestRate/100 + (Math.pow(volatility/100, 2) / 2)) * (timeToExpiration / 365)) / (volatility/100 * Math.sqrt(timeToExpiration / 365));
    const d2 = d1 - (volatility/100 * Math.sqrt(timeToExpiration / 365));

    const callPrice = (stockPrice * normalDistribution(d1)) - (strikePrice * Math.exp(-interestRate/100 * (timeToExpiration / 365)) * normalDistribution(d2));
    const putPrice = (strikePrice * Math.exp(-interestRate/100 * (timeToExpiration / 365)) * normalDistribution(-d2)) - (stockPrice * normalDistribution(-d1));

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ("Call Option Price: " + callPrice.toFixed(2) +   " Put Option Price: " + putPrice.toFixed(2));
}

function normalDistribution(x) {
    var t = 1 / (1 + 0.2316419 * Math.abs(x));
    var d = 0.3989423 * Math.exp(-x * x / 2);
    var p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (x > 0) {
      return 1 - p;
    } else {
      return p;
    }
  }