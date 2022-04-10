const searchInput = document.querySelector('#user-input');
const addButton = document.querySelector('#add-button');
const deleteButton = document.querySelector('#delete-button');

let tickerList = [];

const newSearch = async (event) => {
  event.preventDefault();

  const searchTicker = searchInput.value.trim();
  const ticker = searchTicker.toUpperCase();
  console.log(ticker);

  const response = await fetch(`/api/portfolios`, {
    method: 'POST',
    body: JSON.stringify({ ticker }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/ratio');
  } else {
    alert('Failed to find company');
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/portfolios/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/ratio');
    } else {
      alert('Failed to delete');
    }
  }
};

if (addButton) {
  addButton.addEventListener('click', newSearch);
}

if (deleteButton) {
  deleteButton.addEventListener('click', delButtonHandler);
}

// Checkbox UI Management

// Event Handlers
// checkboxAll.on('change', function () {
//   if (!$(this).is(':checked')) {
//      singleEventTypeCheckbox.each(function () {
//         if ($(this).prop('checked', true)) {
//            $(this).prop('checked', false);
//         }
//      })
//   } else {
//      singleEventTypeCheckbox.each(function () {
//         $(this).prop('checked', true);
//      })
//   }
//   dataRefreshBtn.attr('disabled', false);
// })

// singleEventTypeCheckbox.on('change', function () {
//   if ($('.single-event-type:checked').length == singleEventTypeCheckbox.length) {
//      checkboxAll.prop('checked', true);
//   }

//   if (!$(this).is(':checked')) {
//      checkboxAll.prop('checked', false);
//   }

//   dataRefreshBtn.attr('disabled', false);
// })

// function name(params) {
//   // Looking at the checkboxes and if all or one is checked, push that event type to eventTypesArr which then is passed to the API call
//   let eventTypesArr = [];
//    if (checkboxAll.is(':checked')) {
//       eventTypesArr = [];
//    } else {
//       singleEventTypeCheckbox.each(function () {
//          if ($(this).is(':checked')) {
//             eventTypesArr.push($(this).attr('data-event-type'));
//          };
//       });
//    }
  
// }