export function distinctResults(jsonData)
{
  var cleanResults = jsonData.results;
  // cleanResults = cleanResults.slice(0, 2);
  var lookup = {};
  var result = [];
  // Only distinct records. (Reason: api response includes alot of duplicate values)
  try {
    cleanResults.map( (item, index) => {
      var name;
      item.e_site_name == null? name = item.container_id : name = item.e_site_name;
    // If name doesnt exist in lookup then add to array and add the name in lookup for the check
      if (!(name in lookup)) {
        lookup[name] = 1;
        result.push(item);
      }
    });
    // for (var item, i = 0; item = cleanResults[i++];) {
    //   var name;
    //   item.e_site_name == null? name = item.container_id : name = item.e_site_name;
    // // If name doesnt exist in lookup then add to array and add the name in lookup for the check
    //   if (!(name in Lookup)) {
    //     Lookup[name] = 1;
    //     Result.push(item);
    //   }
    // }
} catch (e) {
    if (e instanceof TypeError) {
        alert(e + " || No results found to clean", true);
    } else {
        alert(e, false);
    }
}
      return result;
}