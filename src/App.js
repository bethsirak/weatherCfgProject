import React, { useState } from 'react';
const api = {
   key: "ba8243220930af6f39c852cb0514be6c",
    base:"https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState ({});

  const search = evt => {
    if (evt.key === "Enter"){
     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
       .then(res => res.json())
       .then(result =>{
         setWeather(result);
          setQuery=("");
          //console.log(result);
        });    
    }
  }
     

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={
      (typeof weather.main != "undefined") ? ((weather.main.temp >16) ? "app.sunset" : "app") : "app"}>
    <main>
      <div className="searchBox">
        <input 
        className="searchBar" 
        type="text" 
        placeholder="Search..."
        onChange={e => setQuery(e.target.value)}
        value ={query}
       onKeyDown ={search}
        />
      </div>
      {(typeof weather.main !="underfined") ? (
      <div>
        <div className= "locationBox">
        <div className="location">{weather.name}, {weather.sys?.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>  
        </div>
        <div className= "weatherBox">
          <div className = "temp">
           {Math.round(weather.main?.temp)}°c
        </div>
        </div>
      </div>
      ) : ("")}
    </main>
  </div>
  );
}

export default App;
//<div className="weather">{weather.weather[0].main}</div>
// the above line of code (place at line 60) would tell you what type of weather
//the place has(rain,sun etc), unfortunatly, the [0] throws an error. 
// I have googled, but with not much luck