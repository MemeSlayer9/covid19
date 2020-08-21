import React, {useState, useEffect} from 'react';
import { MenuItem, FormControl, Select, Card, CardContent} from '@material-ui/core';
import "./App.css";
import InfoBox from './Infobox';
import Map from './Map';
import Table from './Table';
import {sortData, prettyPrintStat} from './util';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter]  = useState({  lat: 34.8076, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountires] = useState([]);
  const [casesType, setCasesType] = useState('cases');



 useEffect(() =>{
  fetch("https://disease.sh/v3/covid-19/all")
  .then(response => response.json())
  .then((data) =>{
    setCountryInfo(data);
  });
  },[])

  useEffect(() =>{
    const getCountriesData = async () =>{
     await fetch("https://disease.sh/v3/covid-19/countries")
     .then((response) => response.json())
     .then((data) =>{
       const countries = data.map((country) => (
         {
           name: country.country,
           value: country.countryInfo.iso2
         }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountires(data);
          setCountries(countries); 
     });
    };
    getCountriesData();

  }, []);

  const onCountryChange = async (e) =>{
    const countryCode = e.target.value;
    console.log("FUCK U", countryCode);

    setCountry(countryCode);
    
    const url =
    countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" 
    :  `https://disease.sh/v3/covid-19/countries/${countryCode}`;

   await fetch(url)
    .then(response => response.json())
    .then(data =>{
      setCountry(countryCode);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });
  
  
  };
  console.log("country info", countryInfo);
  
  return (
    <div className="app">
      <div className="app-left">
    <div className="app-header">
      <h1>COVID </h1>
      <FormControl className="app-dropdown">
        <Select variant="outlined" onChange={onCountryChange} value={country}>
          <MenuItem value="worldwide">WorldWide</MenuItem>
          {countries.map(country =>(
            <MenuItem value={country.value}>{country.name}</MenuItem>
            )) }
        </Select>

      </FormControl>
      </div>
      <div className="app-stats">
            <InfoBox 
            isRed
            active={casesType === 'cases'}
            onClick={e => setCasesType('cases')}
            title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} 
            total={prettyPrintStat(countryInfo.cases)}></InfoBox>
            <InfoBox 
            active={casesType === 'recovered'}
            onClick={e => setCasesType('recovered')}
            title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} 
            total={prettyPrintStat(countryInfo.recovered)}></InfoBox>
            <InfoBox 
            isRed
            active={casesType === 'deaths'}
            onClick={e => setCasesType('deaths')}
            title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} 
            total={prettyPrintStat(countryInfo.deaths)}></InfoBox>
      </div>
            <Map casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
            />
            </div>
            <Card className="app-right">
        <CardContent>
          <h3 className="app-tableTitle">Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="app-graphTitle">Worldwide New {casesType}</h3>
          <LineGraph className="app-graph" casesType={casesType} />
              </CardContent>

            </Card>
    </div>
    
    
  );
}

export default App;
