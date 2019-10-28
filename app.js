window.addEventListener('load', ()=> {
    let lat = 24.7037952;
    let long = 59.4075648;

    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureDescription = document.querySelector(".temperature-description");
    let locationTimeZone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    let temperatureSectionSpan = document.querySelector(".degree-section span");
   
    //setIcon(icon, document.querySelector(".icon"));



    /*if(navigator.geolocation){   Google Chrome
         navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log("Long: ", long);
            console.log("Lat: ", lat);
         })
    }*/
    console.log("Long: ", long);
    console.log("Lat: ", lat);


    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api = `${proxy}https://api.darksky.net/forecast/45691c7c70dbbea66c18c050aa70adb9/${long},${lat}`;

    fetch(api)
    .then(response =>{
        return response.json();
    })
    .then(data => {
        const {temperature, summary, icon} = data.currently;
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = summary;
        locationTimeZone.textContent = data.timezone;
        setIcon(icon, document.querySelector(".icon"));
        let celsius = (temperature - 32) * (5/9);
        temperatureSection.addEventListener('click',() => {
            if(temperatureSectionSpan.textContent === "F"){
                temperatureSectionSpan.textContent = "C";
                temperatureDegree.textContent = Math.floor(celsius);
            } else{
                temperatureSectionSpan.textContent = "F";
                temperatureDegree.textContent = temperature;
            }
            
        })

    })

    function setIcon(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});


