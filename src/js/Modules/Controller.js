import { GarbageScraper, Endpoints, MockupDates } from "./Api.js";
import { templateEngine } from "./TempEngine.js";
import { distinctResults } from "./JsonCleaner.js";

export const Controller = (id) => {
  //hardcoded objects
    const garbageScraperSidconOverView = GarbageScraper(Endpoints.Fill_Level.sidcon_fill_level, MockupDates.ResultSidconExistsDate);
    const garbageScraperEnevoOverView = GarbageScraper(Endpoints.Fill_Level.enevo_fill_level, MockupDates.ResultEnevoExistsDate);
    
    // Check which section is active
    const sections = document.querySelectorAll('section');
    let activeSection;
    let inactiveSection;
    sections.forEach(section => {
      section.className ==  'active'? activeSection = section : inactiveSection = section;
    });
    
    // Overview controller
    if(activeSection.dataset.route == 'overview') {
      console.log("overviewController");
      let distinctResult = [];

      garbageScraperSidconOverView.fetchCall(garbageScraperSidconOverView.url).then((result) => {
        distinctResults(result).forEach( object => {
          distinctResult.push(object);
        });

        garbageScraperEnevoOverView.fetchCall(garbageScraperEnevoOverView.url).then((result) => {
          // Get only Distinct records back based on garbagecontainer id
          distinctResults(result).forEach( object => {
              distinctResult.push(object);
          });
          templateEngine.overview(distinctResult);
          activeSection.style.display = "block" ;
          inactiveSection.style.display = "none";
        });
      });
    }

    const garbageScraperSidconDetail = GarbageScraper(Endpoints.Fill_Level.sidcon_fill_level, MockupDates.ResultSidconExistsDateDetail, '', id);
    const garbageScraperEnevoDetail = GarbageScraper(Endpoints.Fill_Level.enevo_fill_level, '', '', id);

      // Detail controller
      if(activeSection.dataset.route == 'detail') {
        console.log("detailController");
        let distinctResult = [];
        garbageScraperSidconDetail.fetchCall(garbageScraperSidconDetail.url).then((result) => {
          distinctResults(result).map( object => {
            distinctResult.push(object);
          });
          garbageScraperEnevoDetail.fetchCall(garbageScraperEnevoDetail.url).then((result) => {
            distinctResults(result).map( object => {
              distinctResult.push(object);
            });
            templateEngine.detail(distinctResult);
            activeSection.style.display = "block" ;
            inactiveSection.style.display = "none";

        });
      });
    }
  }