import React, { useState, useEffect } from 'react';
import WeatherInfo from './WeatherInfo';
import './Weather.css';


const WeatherApp = () => {
    const [info, setInfo] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('sonoma');

    const API_KEY = /* '36ed3dfc4ff24137f47a06fffebaa187' */  'cf3faa22250a94532c402637c18e357f';

    // Weather Properties
    const [locations, setLocations] = useState([]);
    const [temperatures, setTemperatures] = useState([]);
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [icons, setIcons] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [wind_speeds, setWind_Speeds] = useState([]);
    const [pressures, setPressures] = useState([]);
    const [humiditys, setHumiditys] = useState([]);
    const [precips, setPrecips] = useState([]);
    const [fahrenheits, setFahrenheits] = useState([]);
    const [date, setDate] = useState();
    const [curr_Day, setCurr_Day] = useState();
    const [time, setTime] = useState();
    const [feels, setFeels] = useState();
    const [fl_fah, setFl_Fah] = useState();
    const [visibilities, setVisibilities] = useState();
    const [sunset, setSunset] = useState([]);



    useEffect(() => {
        getWeather();
    }, [query])

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }

    const updateSearch = e => {
        e.preventDefault();
        setSearch(e.target.value);
        console.log('search value...', search);
    }

    const getWeather = async () => {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=${API_KEY}&query=${query}`);
        const data = await response.json();
        setInfo(data);
        console.log('info...', data);


        // Values for the App
        const location = data.location.name
        setLocations(location)
        const temperature = data.current.temperature
        setTemperatures(temperature)
        const country = data.location.country
        setCountries(country)
        const region = data.location.region
        setRegions(region)
        const icon = data.current.weather_icons
        setIcons(icon)
        const description = data.current.weather_descriptions[0]
        setDescriptions(description)
        const wind_speed = data.current.wind_speed
        setWind_Speeds(wind_speed)
        const pressure = data.current.pressure
        setPressures(pressure)
        const humidity = data.current.humidity
        setHumiditys(humidity)
        const precip = data.current.precip
        setPrecips(precip)
        const fahrenheit = Math.floor(temperature * 9 / 5 + 32)
        setFahrenheits(fahrenheit)
        const feels_like = data.current.feelslike
        setFeels(feels_like)
        const fahrenheit2 = Math.floor(feels_like * 9 / 5 + 32)
        setFl_Fah(fahrenheit2)
        const visibility = data.current.visibility
        setVisibilities(visibility)


        // Current Date
        const today = new Date();
        const current_date = today.getMonth() + 1 + '/' + (today.getDate()) + '/' + today.getFullYear();
        const date = current_date
        setDate(date)


        // Current Day
        const days = today.getDay();
        const daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
        setCurr_Day(daylist[days])
    }


    return (
      <div>
        {/* <div className='search-section'>
                <div className='timeNdate'>
                    <div className='title'>
                        <h1>Tashi's Weather App</h1>
                    </div>
                    <form onSubmit={getSearch} className='search-form'>
                        <div className='search'>
                            <input className='search-bar' type='text' placeholder='Search by City or Country' value={search} onChange={updateSearch} />
                            <button className='search-button' type='submit'><i class="fas fa-arrow-circle-right"></i>Search</button>
                        </div>
                    </form>
                </div>
            </div> */}
        <div className="header">
          <div className="title">
            <h1>Tashi's Weather App</h1>
          </div>
        </div>

        <form onSubmit={getSearch} className="search-form">
          <div className="search">
            <input
              className="search-bar"
              type="text"
              placeholder="Search by City or Country"
              value={search}
              onChange={updateSearch}
            />
            <button className="search-button" type="submit">
              <i class="fas fa-arrow-circle-right"></i>Search
            </button>
          </div>
        </form>

        <div className="info">
          <WeatherInfo
            location={locations}
            temperature={temperatures}
            country={countries}
            region={regions}
            icon={icons}
            description={descriptions}
            wind_speed={wind_speeds}
            pressure={pressures}
            humidity={humiditys}
            precip={precips}
            fahrenheit={fahrenheits}
            date={date}
            curr_Day={curr_Day}
            time={time}
            feelslike={fl_fah}
            visibility={visibilities}
          />
        </div>
      </div>
    );

}

export default WeatherApp;