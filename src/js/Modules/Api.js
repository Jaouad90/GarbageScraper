// Start composition over inheritance
// API call which returns a promise with the fetch reponse
function fetchCall(url) {
  console.log("url : ", url)
  try {
    return fetch(url)
     .then(response => {
       if (!response.ok)   {
         throw alert(Error(response.statusText + " To API "));
       }
       else{
         var responseJson = response.json();
         return responseJson;
       }
     })
   } catch (err) {
     console.error(err);
     // Handle errors here
   }
}

export function API(url){
  return {
    url: url,
    fetchCall: () => fetchCall(url) 
  };
}

// export function formatLocation(locationFilter) {
//   return locationFilter;
// }

// amsterdam api garbage info
export function GarbageScraper(endpoint, dateFilterContext, locationFilter, idFilterContext) {
  var dateFilter;
  var detailFilter = '/?detailed=1';
  var idFilter;
  endpoint.substring(1,6)=='enevo'? dateFilter = '&time=' : dateFilter = '&communication_date_time=' ;
  endpoint.substring(1,6)=='enevo'? idFilter = '&e_site=' : idFilter = '&container_id=' ;

  // Check from which supplier the id is
  if(typeof idFilterContext != 'undefined'){
    idFilterContext.toString().length < 8 && endpoint.substring(1,6)=='enevo' ? idFilterContext : idFilterContext = '';
  }
  
  var url = `https://api.data.amsterdam.nl/afval/suppliers${endpoint}${detailFilter}${dateFilter}${dateFilterContext!=null?dateFilterContext:''}${idFilter}${idFilterContext!=null?idFilterContext:''}`;
  return {
    url: url,
    // formatLocation: () => formatLocation(locationFilter),
    fetchCall: () => fetchCall(url) 
  };
}

// geo services api
export function LocationScraper(endpoint, dateFilterContext, locationFilter, idFilterContext) {
  var url = `https://api.data.amsterdam.nl/afval/suppliers${endpoint}/?&time=${dateFilterContext!=null?dateFilterContext:''}`;
  return {
    url: url,
    // formatLocation: () => formatLocation(locationFilter),
    fetchCall: () => fetchCall(url) 
  };
}
// End composition over inheritance

//List of endpoints
export const Endpoints = {
  Fill_Level: {
    enevo_fill_level: '/enevo/filllevels',
    sidcon_fill_level: '/sidcon/filllevels',
  }
}

let dt = new Date();  
//List of dates
export const MockupDates = {
  DateNow: dt.toISOString(),
  ResultSidconExistsDateOverview: '2020-02-20T18:56:47.123000Z',
  ResultEnevoExistsDateOverview: '2020-02-08T15:03:50Z',
  ResultSidconExistsDateDetail: '2020-02-28T11:00:04.260000Z',
  ResultEnevoExistsDateDetail: '2020-02-28T08:00:00Z',
}




// Start ES6 inheritance
// export class API {
//   constructor(url) {
//     this.url = url;
//   }
//   fetchCall() {
//     try {
//      return fetch(this.url)
//       .then(response => {
//         if (!response.ok)   {
//           throw alert(Error(response.statusText + " To API " + this.endpoint));
//         }
//         else{
//           var responseJson = response.json();
//           return responseJson;
//         }
//       }).then(result => {
//           return result
//       })
//     } catch (err) {

//       console.error(err);
//       // Handle errors here
//     }
//   }
// }

// export class GarbageScraper extends API{
//   constructor(endpoint, dateFilter) {
//     const url = `https://api.data.amsterdam.nl/afval/suppliers${endpoint}/?&time=${dateFilter!=null?dateFilter:''}`;
//     super(url)
//   }
// }

// export class LocationScraper extends API{
//   constructor(endpoint, dateFilter) {
//     // const Url = `https://api.data.amsterdam.nl/afval/suppliers${Endpoint}${DateFilter!=null?DateFilter:''}`;
//     super(url)
//   }
// }
// End ES6 inheritance
