const searchInput = document.querySelector("#user-input");
const previousTickers = document.querySelector("#previous-searches")

let tickerList = [];

const newSearch = async (event) => {
    event.preventDefault();

    const searchTicker = toUpperCase(seaarchInput.value.trim());

    const response = await fetch (`/api/portfolios`, {
        method: 'POST',
        body: JSON.stringify({searchTicker})
    });

    if (response.ok) {
        document.location.replace('/ratio');
      } else {
        alert('Failed to find company');
      }
    }


// const deleteSearch = async (event) => {

//     const response = await fetch (`/api/portfolios/${id}`);
//     method: 'DELETE',


// }



document
.querySelector('#search-button')
addEventListener('click', newSearch);

document
.querySelector('')
addEventListener('click', previousSearch);


document
.querySelector('')
addEventListener('click', deleteSearch);