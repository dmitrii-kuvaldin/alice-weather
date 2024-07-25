import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import styles from "./form.module.css";
interface IWeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
interface ITown {
  town: string;
}
const initialData: IWeatherData = {
  coord: {
    lon: 0,
    lat: 0,
  },
  weather: [],
  base: "",
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    sea_level: 0,
    grnd_level: 0,
  },
  visibility: 0,
  wind: {
    speed: 0,
    deg: 0,
  },
  clouds: {
    all: 0,
  },
  dt: 0,
  sys: {
    type: 0,
    id: 0,
    country: "",
    sunrise: 0,
    sunset: 0,
  },
  timezone: 0,
  id: 0,
  name: "",
  cod: 0,
};
export default function Form() {
  const apiKey = "f41d0a5204972a8e7800e61c223fb9a9";

  const [data, setData] = useState<IWeatherData>(initialData);
  const [image, setImage] = useState("");
  const [visible, setVisible] = useState(false);

  const schema = Yup.object().shape({
    town: Yup.string()
      .typeError("Incorrect data type")
      .required("Fill that input")
      .matches(/^[a-zA-Z\s]+$/, "Please do not use number symbols"),
  });

  const formik = useFormik({
    initialValues: {
      town: "",
    } as ITown,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: (values: ITown, { resetForm }) => {
      const getWeather = fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${values.town}&appid=${apiKey}&units=metric`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("City not found or server error");
          }
          return res.json();
        })
        .then((data: IWeatherData) => {
          setData(data);
          if (data.weather && data.weather.length > 0) {
            setImage(data.weather[0].icon);
          }
        });
      setVisible(true);
      resetForm();
    },
  });

  return (
    <div className="lesson-container">
      <form onSubmit={formik.handleSubmit} className={styles.townForm}>
        <input
          className={styles.input}
          type="text"
          placeholder="Berlin"
          onChange={formik.handleChange}
          name="town"
          value={formik.values.town}
        />
        <button className={styles.buttonSearch} type="submit">
          Search
        </button>
      </form>

      <div className={`${visible ? styles.container: styles.invisible} `} >
        <div className={styles.tempCityCont}>
          <h5 className={styles.temp}> {Math.round(data?.main.temp)}°C</h5>
          <h5 className={styles.city}>{data?.name}</h5>
        </div>
        <div className={styles.iconsButtons}>
          <div className={styles.icon}>
            <img
              className={styles.weatherIcon}
              src={`https://openweathermap.org/img/w/${image}.png`}
              alt="Weather icon"
            />
            {/* <img
            className={styles.weatherIcon}
            src={`https://openweathermap.org/img/w/${image}.png`}
            alt="Weather icon"
          />
          <img
            className={styles.weatherIcon}
            src={`https://openweathermap.org/img/w/${image}.png`}
            alt="Weather icon"
          /> */}
          </div>

          <div className={styles.buttons}>
            <button className={styles.button}>Save</button>
            <button className={styles.button}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
