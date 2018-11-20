const sevenWonders =['Great Pyramid of Giza','Hanging Gardens of Babylon', 'Colossus of Rhodes', 'Pharos of Alexandria', 'Statue of Zeus at Olympia', 'Temple of Artemis','Mausoleum at Halicarnassus']
let output = {}
// Ask: let or const?
// Ask: should we use this hash?

const reportStatus = (message) => {
  $('#status-message').html(message);
};

const loadWonders = () => {
  reportStatus('<strong>Loading wonders...</strong>');
  // Prep work
  const wonderList = $('#wonder-list');
  wonderList.empty();


  // Actually load the wonders one request at a time
  sevenWonders.forEach( target => {
    let URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${target}&key=AIzaSyCVTf_TESiHHnglpnlqJL1WPG7QYOzSm6w`;
    axios.get(URL)
         .then((response) => {
           // reportStatus('<strong>Loading wonders...</strong>');
          let location = response.data.results[0].geometry.location
          console.log('location:', location) // object object issue - ask Charles
          wonderList.append(`<li>${target}: &nbsp &nbsp  <small>${location.lat}, ${location.lng}</small></li>`);
          })
         .catch((error) => {
            reportStatus(`Encountered an error while loading wonders: ${error.message}`);
            console.log(error);
    });
  });
  reportStatus(`Successfully loaded wonders`); // ask Charles -- how do we make this delay a little?
  // ${output.length}
};

$(document).ready(() => {
  $('#load').click(loadWonders);
});
