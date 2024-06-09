const link =
  "http://api.weatherapi.com/v1/current.json?key=a42d113e753f4c66a30204211240806";
 
 const root = document.getElementById("root");

let store = {
  city: "Yerevan",
  feelslike_c: 0,  
  temp_c: 0, 
  last_updated: "00: 00", 
  is_day: 0,
  condition: "",
  properties: {
    cloud: {},
    humidity: {},
    wind_degree: {},
    pressure_in: {},
    uv: {},
    vis_km: {},
  }
 };
const fetchData = async () => {
  const result = await fetch(`${link}&query=${store.city}`);
  const data = await result.json();
  console.log(data);
  const {
    current: {
      feelslike_c: feelslike,
      cloud,
      temp_c: temp,
      humidity,
      last_updated: lastUpdated,
      pressure_in: pressure,
      uv,
      vis_km: visKm,
      is_day: isDay,
      wind_degree: windDegree,
      condition: {text: conditionText, icon: icon}
       },
  } = data;

   store = {
    ...store,
    feelslike,   
    temp,
    lastUpdated,  
    isDay,    
    conditionText, 
    icon,
    properties: {
        cloud : {
        title: "cloud",
        value: `${cloud}`,
        icon: "cloud.png",
        },
        humidity: {
        title: "humidity",
        value: `${humidity}%`,
        icon: "humidity.png",
        },
        wind_degree: {
        title: "Wind Degree",
        value: `${windDegree}km/h`,
        icon: "wind.png",
        },
        pressure_in: {
        title: "pressure",
        value: `${pressure}%`,
        icon: "gauge.png",
        },
        uv: {
        title: "UV Index",
        value: `${uv}%`,
        icon: "uv-index.png",
        },
        vis_km: {
        title: "Visibility",
        value: `${visKm}%`,
        icon: "visibility.png",
        },
      }
  };
  renderComponent();
};
const renderProperty = (properties) => {
   return Object.values(properties).map((data) => {        
        const {title, value, icon} = data;
        return  `<div class="property">
        <div class="property-icon">
          <img src="./img/icons/${icon}" alt="">
        </div>
        <div class="property-info">
          <div class="property-info__value">${value}</div>
          <div class="property-info__description">${title}</div>
        </div>
      </div>`;
    }).join("");
  
}
const markup = () => {
    const {city, lastUpdated,temp, conditionText, icon, isDay,properties} = store;
    const containerClass = isDay === 1 ? "is-day" : "";
    return `<div class="container ${containerClass}"> 
    <div class="top">
      <div class="city">
        <div class="city-subtitle">Weather Today in</div>
          <div class="city-title" id="city">
          <span>${city}</span>
        </div>
      </div>
      <div class="city-info">
        <div class="top-left">
        <img class="icon" src="${icon}" alt="" />
        <div class="description">${conditionText}</div>
      </div>
    
      <div class="top-right">
        <div class="city-info__subtitle">as of ${lastUpdated}</div>
        <div class="city-info__title">${temp}°</div>
      </div>
    </div>
  </div>
<div id="properties">${renderProperty(properties)}</div>
</div>`;
}
const renderComponent = () => {
    root.innerHTML = markup();
}
fetchData();
