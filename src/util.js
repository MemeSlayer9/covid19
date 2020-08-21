import React from 'react';
import numeral from 'numeral';
import {Circle, Popup} from 'react-leaflet';

const caseTypeColors ={
    cases: {
        hex : '#CC1034',
      
        multiplier: 800,
    },
    recovered: {
        hex: '#7dd71d',
       
        multiplier: 1200,
    },
    deaths:{
        hex: '#fb4443',
       
        multiplier: 2000,
    },
};



export const sortData = (data) =>{
    const sortedData =[...data];

    sortedData.sort((a, b) =>{
        if (a.cases > b.cases){
            return -1;
        } else{
            return 1;
        }
    });
    return sortedData;
};

export const prettyPrintStat = (stat) => 
stat ? `+${numeral(stat).format('0.0a')}`: '+0';

export const showDataOnMap = (data, casesType='cases') =>(
    data.map(country =>(
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}color={caseTypeColors[casesType].hex}
            fillcolor={caseTypeColors[casesType].hex}
            radius={Math.sqrt(country[casesType]) * caseTypeColors[casesType].multiplier}>
                <Popup>
                        <div className='info-container'>
                            <div className='info-flag'
                             style={{backgroundImage: `url(${country.countryInfo.flag})`}}/>
                             
                            <div className='info-name'>{country.country}</div>
                            <div className='info-confirmed'>Cases: {numeral(country.cases).format("0a")}</div>
                            <div className='info-recover'>Recovered: {numeral(country.recovered).format("0a")}</div>
                            <div className='info-deaths'>Deaths: {numeral(country.deaths).format("0a")}</div>
                     </div>               
                </Popup>
        </Circle>
    ))
);