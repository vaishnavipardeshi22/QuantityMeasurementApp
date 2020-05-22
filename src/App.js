import React from 'react';
import "./App.css";
import MeasurementApp from "./component/MeasurementApp";

function App() {
  return (
    <div style={{border:"solid white", width:500, height:300, paddingLeft:120, marginLeft:240, marginTop:100}}>
        <div className="App">
        <h1><i>Quantity Measurement App</i></h1><br/>
        </div>
        <MeasurementApp/>
        <br/>
    </div>
  );
}
export default App;
