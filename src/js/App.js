function init() {
  // doSomething();
  getFillLevels();
}
// https://api.data.amsterdam.nl/afval/suppliers/ ~ API call on Suppliers which returns jsonData to the render function
function apiCall(Endpoint, DateFilter) {
  const Url = `https://api.data.amsterdam.nl/afval/suppliers${Endpoint}${DateFilter!=null?DateFilter:''}`;
  console.log(Url);
  try {
    fetch(Url)
    .then(response => {
      if (!response.ok)   {
        throw alert(Error(response.statusText + " To API " + Endpoint));
      }
      else{
        var jsonData = response.json();
        return jsonData;
      }
    })
    .then(jsonData => {
      cleanupJson(jsonData);
    })
  } catch (Err) {
    console.error(Err);
    // Handle errors here
  }
}

function getFillLevels() {
  getEnevoFillLevels();
  getSidconFillLevels();
}

// Enevo supplier
function getEnevoFillLevels() {
  let DateFilter = '/?&time=2020-02-08T15%3A03%3A50Z';
  const EnevoEndpoint = '/enevo/filllevels';
  apiCall(EnevoEndpoint, DateFilter);
}

// Sidcom supplier
function getSidconFillLevels() {
  let DateFilter = '/?detailed=1&communication_date_time=2020-02-08T11%3A00%3A03.210000Z';
  const SidconEndpoint = '/sidcon/filllevels';
  apiCall(SidconEndpoint, DateFilter);
}

function cleanupJson(jsonData)
{
  console.log("jsonData", jsonData);
  var cleanResults = jsonData.results;
  cleanResults = cleanResults.slice(0, 2);
  //Filter the coordinates to array<<<<============
  // var geometrie = cleanResults.results.geometrie.coordinates;
  console.log(cleanResults.results.geometrie.coordinates);
  var lookup = {};
  var result = [];
  // Only distinct records. (Reason: api response includes alot of duplicate values)
  for (var item, i = 0; item = cleanResults[i++];) {
    var name
    item.e_site_name == null? name = item.container_id : name = item.e_site_name;
  // If name doesnt exist in lookup then add to array and add the name in lookup for the check
    if (!(name in lookup)) {
      lookup[name] = 1;
      result.push(item);
    }
  }
    createGarbageContainers(result);
}

// Create garbage container elements
function createGarbageContainers(cleanResult) {
  cleanResult.forEach(element => {

    let garbageSection = document.getElementById('GarbageContainers');
    let containerElement = document.createElement("div");
    let textContainerElement = document.createElement("div");
    let fillLvlTextElem = document.createElement("p");
    let locationTextElement = document.createElement("p");


    containerElement.setAttribute('class', 'garbage-container');
    textContainerElement.setAttribute('class', 'garbage-text-container');
    fillLvlTextElem.setAttribute('class', 'garbage-text');
    locationTextElement.setAttribute('class', 'garbage-text');
    
    var fillLevel = element.fill_level == undefined ? element.filling : element.fill_level;

    fillLvlTextElem.textContent = "Fill Level: " + fillLevel;
    locationTextElement.textContent = "Location: " + element.e_site_name;

    garbageSection.appendChild(containerElement);
    containerElement.appendChild(textContainerElement);
    textContainerElement.appendChild(fillLvlTextElem);
    textContainerElement.appendChild(locationTextElement);
  });
}
