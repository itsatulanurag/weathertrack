import React from "react";
import apiKey from "./apiKey";

const dateFor = (date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];

  let currentDate = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let day = days[date.getDay()];

  return "${day}, ${month}, ${year}, ${day}";
};

class Weather extends React.Component {
  //initial state defined
  state = {
    lat: undefined,
    lon: undefined,
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: undefined,
    sunrise: undefined,
    sunset: undefined,
    errorMessage: undefined,
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.getPosition()
        .then((position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          this.getWeather(22.799714772095932, 86.16708445280247); //default location til the user hasn't allowed location access
          alert(
            "Location access disabled, showing results for default location. Allow 'This App' to access your location to get real time weather for your location."
          );
        });
    } else {
      alert("Location not available");
    }

    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID); //before component unmounts reset the timerID
  }

  //to try with async and not with promise
  getPosition = (value) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, value);
    });
  };
  getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKey.base}weather?lat=${lat}&lon=${lon}&appid=${apiKey.key}`
    );
    const data = await api_call.json();
    console.log(data);
    this.setState({
      lat: lat,
      lon: lon,
      city: data.name,
      temperature: data.main.temp, //have to round value
      humidity: data.main.humidity,
      condition: data.weather[0].main,
      country: data.sys.country,
      // sunrise: data.sys.sunrise,   //to be added later
      // sunset: data.sys.sunset,
    });
    switch (this.state.condition) {
      case "Haze":
        this.setState({ icon: "CLEAR_DAY" });
        break;
      case "Clouds":
        this.setState({ icon: "CLOUDY" });
        break;
      case "Rain":
        this.setState({ icon: "RAIN" });
        break;
      case "Snow":
        this.setState({ icon: "SNOW" });
        break;
      case "Dust":
        this.setState({ icon: "WIND" });
        break;
      case "Drizzle":
        this.setState({ icon: "SLEET" });
        break;
      case "Fog":
        this.setState({ icon: "FOG" });
        break;
      case "Smoke":
        this.setState({ icon: "FOG" });
        break;
      case "Tornado":
        this.setState({ icon: "WIND" });
        break;
      default:
        this.setState({ icon: "CLEAR_DAY" });
    }
  };
  render() {
    if (this.state.temperature) {
      return (
        <React.Fragment>
          <div className="city">
            <div className="title">
              <h2>{this.state.city}</h2>
              <h3>{this.state.country}</h3>
            </div>
            <div className="icon"></div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div>not hehehehe</div>
        </React.Fragment>
      );
    }
  }
}

export default Weather;
