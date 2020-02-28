import { routes } from "./Modules/Routing.js";

const app = {
  init: function() {
    routes();
  }
}


app.init();












// https://api.data.amsterdam.nl/afval/suppliers/ ~ API call on Suppliers which returns jsonData to the render function
// function apiCall(Endpoint, DateFilter) {
//   const Url = `https://api.data.amsterdam.nl/afval/suppliers${Endpoint}${DateFilter!=null?DateFilter:''}`;
//   try {
//     fetch(Url)
//     .then(Response => {
//       if (!Response.ok)   {
//         throw alert(Error(Response.statusText + " To API " + Endpoint));
//       }
//       else{
//         var JsonData = Response.json();
//         return JsonData;
//       }
//     })
//     .then(JsonData => {
//       cleanupJson(JsonData);
//     })
//   } catch (Err) {
//     console.error(Err);
//     // Handle errors here
//   }
// }

// function getFillLevels() {
//   getEnevoFillLevels();
//   getSidconFillLevels();
// }

// Enevo supplier
// function getEnevoFillLevels() {
//     // Api filter properties handling for enevo
//   let DateFilter = '/?&time=2020-02-08T15%3A03%3A50Z';
//   const EnevoEndpoint = '/enevo/filllevels';
//   apiCall(EnevoEndpoint, DateFilter);
// }

// // Sidcom supplier
// function getSidconFillLevels() {
//   // Api filter properties handling for sidcon
//   let DateFilter = '/?detailed=1&communication_date_time=2020-02-08T11%3A00%3A03.210000Z';
//   const SidconEndpoint = '/sidcon/filllevels';
//   apiCall(SidconEndpoint, DateFilter);
// }

// function cleanupJson(JsonData)
// {
//   // console.log("jsonData", JsonData);
//   var CleanResults = JsonData.results;
//   // CleanResults = CleanResults.slice(0, 2);

//   var Lookup = {};
//   var Result = [];
//   // Only distinct records. (Reason: api response includes alot of duplicate values)
//   try {
//     for (var Item, i = 0; Item = CleanResults[i++];) {
//       var Name;
//       Item.e_site_name == null? name = Item.container_id : name = Item.e_site_name;
//     // If name doesnt exist in lookup then add to array and add the name in lookup for the check
//       if (!(Name in Lookup)) {
//         Lookup[Name] = 1;
//         Result.push(Item);
//       }
//     }
// } catch (e) {
//     if (e instanceof TypeError) {
//         alert(e + " || No results found to clean", true);
//     } else {
//         alert(e, false);
//     }
// }
//       createGarbageContainers(Result);
// }

// // Create garbage container elements
// function createGarbageContainers(cleanResult) {

//   cleanResult.forEach(element => {
//     var fill_level = element.fill_level == undefined ? element.filling : element.fill_level;
//     var location = element.e_site_name == undefined ? element.geometrie.coordinates : element.e_site_name
//     let garbageContainer = new GarbageContainer(fill_level, location);

//     let garbageSection = document.getElementById('GarbageContainers');
//     let containerElement = document.createElement("div");
//     let textContainerElement = document.createElement("div");
//     let fillLvlTextElem = document.createElement("p");
//     let locationTextElement = document.createElement("p");

//     containerElement.setAttribute('class', 'garbage-container');
//     textContainerElement.setAttribute('class', 'garbage-text-container');
//     fillLvlTextElem.setAttribute('class', 'garbage-text');
//     locationTextElement.setAttribute('class', 'garbage-text');
    
//     fillLvlTextElem.textContent = "Fill Level: " + garbageContainer.fill_level;
//     locationTextElement.textContent = "Location: " + garbageContainer.formatLocation();

//     garbageSection.appendChild(containerElement);
//     containerElement.appendChild(textContainerElement);
//     textContainerElement.appendChild(fillLvlTextElem);
//     textContainerElement.appendChild(locationTextElement);
//   });
// }
