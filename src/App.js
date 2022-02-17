import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {

  const apiBaseUrl  = 'https://api.hgbrasil.com/weather?woid=449704&format=json-cors&locale=pt';
  const [ data, setData ] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiBaseUrl);
        const data = await response.json();

        setData(data);

      } catch(e) {
        return null;
      }
    }
      fetchData();
    }, []);

    return (
      <div className="container">
        <h4> { data?.results?.city_name }</h4>

        <table className="center-text__table table table-primary table-striped table-hover">
          <thead>
            <tr className='table-danger'>
              <th> Data </th>
              <th> Min. </th>
              <th> Max. </th>
              <th> Previsão </th>
              <th>Icone</th>
            </tr>
          </thead>

          <tbody>
            {
              data?.results?.forecast.map((day, index) => {
                return(
                  <tr key={index}>
                    <td>{day.date}</td>
                    <td>{day.min}</td>
                    <td>{day.max}</td>
                    <td>{day.description}</td>
                    <td><img src={`/weather-icons/${day.condition}.svg`} alt={day.description}/></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }


    // exemplo da chamada com axios
    // axios.get(this.apiBaseUrl).then(
    //   ({ data }) => {
    //     this.setState({
    //       city: data.results.city_name,
    //       forecast: data.results.forecast,
    //     })
    // });