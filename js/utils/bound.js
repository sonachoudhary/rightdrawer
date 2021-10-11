function getBoundry(loc,apiKey) {
    return new Promise((resolve) => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc[0]},${loc[1]}&key=${apiKey}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
            
          resolve(data.results[0].address_components[4].long_name);
        })
        .catch(error => {
          
        });
    });
  };
