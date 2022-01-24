const card = document.querySelector('.card');
const btcDisplay = document.querySelector('.btc');

console.log(btcDisplay);

function teslaApi() {
  fetch('http://localhost:8080/').then((response) =>
    response.json().then((carrosJson) => {
      console.log(carrosJson);
    }),
  );
}

teslaApi();
