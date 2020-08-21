import React from 'react';
import './Infobox.css';
import { Card, CardContent, Typography } from '@material-ui/core';



function Infobox({ title, cases, isRed, active,  total, ...props}) {
    return (
        <Card onClick={props.onClick}
        className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
            <CardContent>
                <Typography className="infobox-title"color="textSecondary">{title}
                </Typography>
                <h2 className={`infoBox-cases ${!isRed && 'infoBox--cases--green'}`}>{cases}</h2>
                <Typography className="infobox-total" color="textSecondary">{total} Total
                </Typography>
            </CardContent>
            
        </Card>
    )
}

export default Infobox
