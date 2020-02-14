class GarbageContainer {

    constructor(fill_level, location, scrapeDate) {
      this.fill_level = fill_level;
      this.location = location;
      this.scrapeDate = scrapeDate;
    }

    // if geo coordinates are retrieved then get location address by an API (google maps or alt..)
    // As enevo en sidcoms addresses should be of same format to print on UI
    formatLocation()  {
      const address = this.location; 

      //TODO


      return address
    }
  }