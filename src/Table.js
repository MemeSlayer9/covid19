import React from 'react';
import numeral from 'numeral';
import './Table.css';

function Table({countries}) {
    return (
    <div className="table">
        {countries.map(({country, cases,countryInfo}) =>(
            <tr>
                <td>
                    <div className="info-flag">
                    <img src={ countryInfo.flag } style={{height:"26px",width:"38px"}}/>
                    
                    </div>
                </td>
                <td>{country}</td>
                <td>
        <strong>{numeral(cases).format('0.0a')}</strong>
                </td> 
            </tr>
            
        ))}       
            
        </div>
    )
}

export default Table
