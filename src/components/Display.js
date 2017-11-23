import React from 'react'

const Display = (props) => (
 <div>
   <h3>Weather at lat:{props.fcc.coord.lat}, lon:{props.fcc.coord.lon}</h3>
   <ul>
     <li>Temp: {props.fcc.main.temp}</li>
   </ul>
   {/* <ul><li>{props.weatherInfo.main.temp} degrees celcius</li></ul> */}
 </div> 
)

export default Display