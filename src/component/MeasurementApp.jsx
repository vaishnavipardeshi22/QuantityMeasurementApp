import React from "react";
import axios from 'axios';

class MeasurementApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: ['Length'],
            unitType: ['FEET', 'INCH', 'CENTIMETER', 'YARD'],
            selectedUnit: '',
            inputUnit: 'FEET',
            outputUnit: 'FEET' ,
            inputValue: 0,
            outputValue: 0
        };
        this.changeUnit=this.changeUnit.bind(this);
    }

    componentDidMount() {
        this.setState({unit:[{name:'Length', unitType:['FEET', 'INCH', 'CENTIMETER', 'YARD']},
                {name: 'Volume', unitType: ["LITRE", "MILLILITRE", "GALLON"]},
                {name: 'Temperature', unitType: ["CELSIUS", "FAHRENHEIT"]},
                {name: 'Weight', unitType: ["GRAM", "KILOGRAM", "TONNE"]}]});
    }

    changeUnit(event){
        this.setState({selectedUnit: event.target.value});
        this.setState({unitType: this.state.unit.find(unit => unit.name === event.target.value).unitType});
    }

    setInputValue(event) {
        this.setState({inputValue: event.target.value})
    }
    changeInputUnit(event) {
        this.setState({inputUnit: event.target.value});
    }

    changeOutputUnit(event) {
        this.setState({outputUnit: event.target.value});
    }

    getConvert() {
        axios.get("http://localhost:8080/quantityConversion/getConversion" + this.state.inputUnit + "_" + this.state.outputUnit + "/" + this.state.inputValue)
            .then(response => {
                this.setState({outputValue: response.data})
            })
            .catch(error => {alert("Enter Valid Value")})
    }

    render() {
        return (
            <div>
                <select style={{width: 400, height: 30, background: "BurlyWood"}} name="dropdown"
                        defaultValue={"Length"} onChange={this.changeUnit}>
                    {this.state.unit.map((e,key) =>{return <option key={key}>{e.name}</option>;})}
                </select>
            <br/>
            <br/>
                <div>
                    <input type={"text"} style={{width: 188, height:20}} value={this.state.inputValue} onChange={this.setInputValue.bind(this)}/>
                    &nbsp; &nbsp;&nbsp;
                    =
                    &nbsp; &nbsp; &nbsp;
                    <input type={"text"} style={{width: 188, height:20}} value={this.state.outputValue}/><br/>
                </div>
                <div>
                    <select value={this.state.inputUnit} onChange={this.changeInputUnit.bind(this)} style={{width: 192, height: 30, background: "BurlyWood"}} name="dropdown">
                        {this.state.unitType.map((e,key) => {return <option key={key}>{e}</option>; })}
                    </select>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp;
                    <select value={this.state.outputUnit} onChange={this.changeOutputUnit.bind(this)} style={{width: 192, height: 30, background: "BurlyWood"}} name="dropdown">
                        {this.state.unitType.map((e,key) => {return <option key={key}>{e}</option>; })}
                    </select>
                </div>

                <div>
                    <button onClick={this.getConvert.bind(this)}>Convert</button>
                </div>
            </div>
        )
    }
}

export default MeasurementApp;