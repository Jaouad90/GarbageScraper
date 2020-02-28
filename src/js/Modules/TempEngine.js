export const templateEngine = {
  overview: function(cleanData) {
    console.log("template engine : Overview");
    var overviewSection = document.querySelector(".garbage-box-overview");
    overviewSection.innerHTML  = "";
      cleanData.forEach((arrayObject) => {
        var id = arrayObject.e_site == undefined ? arrayObject.container_id : arrayObject.e_site;
        const html = `
        <div class="garbage-container">
          <a href="#detail/${id}">
          <h2>id: ${id}</h2>
          </a>
        </div>`;
        overviewSection.insertAdjacentHTML('afterbegin', html);
    });
},
  detail: function(cleanData) {
    console.log("template engine : detail");
    var detailSection = document.querySelector(".garbage-box-detail");

    detailSection.innerHTML = "";
    console.log("cleanData", cleanData)

    cleanData.forEach(element => {
        var id = element.e_site === undefined ? element.container_id : element.e_site;
        var fillLevel = element.fill_level === undefined ? element.filling : element.fill_level;
        const html = `
        <div class="garbage-container">
          <h2>id: ${id}</h2>
          <p> Fill level: ${fillLevel}</p>
        </div>`;
        console.log(fillLevel);
        detailSection.insertAdjacentHTML('afterbegin', html);
  });
  }
}