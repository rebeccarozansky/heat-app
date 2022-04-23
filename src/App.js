import logo from './logo.svg';
import './App.css';

import React,  { useState, useEffect } from "react";

import myData from './data.json'

function App() {

  var mean = 97.7711;
  var std = 4.184;
  var p = 0;
  var ine;
  const [dataToShow, setData] = useState([]); // initialize it
  const [message, setMessage] = useState(""); // initialize it
  const [prog, setProg] = useState(0); // initialize it

  navigator.geolocation.getCurrentPosition((position) => {
    //doSomething(position.coords.latitude, position.coords.longitude);
    console.log(position.coords.latitude);
    ine = "("+position.coords.latitude.toString().substring(0,6) +", "+position.coords.longitude.toString().substring(0,7)+")"
    console.log(ine)
    console.log(myData["(35.913, -79.053)"])
    if(myData[ine]==NaN){
    var p = (myData["(35.913, -79.053)"]-mean)/std;
    }
    else{
      p = (myData[ine] - mean)/std;
    }
    console.log(p)
    setData(ine);
    if(p=>-.6 && p<=.6){
      setProg(50);
      setMessage("You're at a medium risk for heat exposure")
    }
    
    else if(p>.61 && p<=1.2){
      setProg(68);
      setMessage("You're at a high risk for heat exposure")

    }
    else if(p>1.2 && p<=2.7){
      setProg(95);
      setMessage("You're at a very high risk for heat exposure")

    }    
    else if(p>2.7){
      setProg(99);
      setMessage("You're at an extremely very high risk for heat exposure")

    }
    else if(p>-1.2 & p<-.6){
      setProg(34);
      setMessage("You're at a low risk for heat exposure")

    }
    else if(p>-2.7 & p<=-1.2){
      setProg(5);
      setMessage("You're at a very low risk for heat exposure")

    }
    else{
      setProg(1);
      setMessage("You're at an extremely low risk for heat exposure")

    }
  });



  const getIne = () => {
    var ine2
      navigator.geolocation.getCurrentPosition((position) => {
    //doSomething(position.coords.latitude, position.coords.longitude);
    console.log(position.coords.latitude);
    ine2 = "("+position.coords.latitude.toString().substring(0,6) +", "+position.coords.longitude.toString().substring(0,7)+")"
    console.log(ine)
    console.log(myData["(35.913, -79.053)"])
    var p = (myData["(35.913, -79.053)"]-mean)/std;
    console.log("pls")

  });

  return ine2;

  }

  const getProg = () => {
    
    console.log("here")

    console.log(prog)
    return prog
  }
  return  (<div>
    <h1>Heat Index by Location</h1>
      <p>Current Location: {dataToShow}</p>
      <p>Based on your current location, your percentile heat index is: {prog}%</p>
      <p>{message}</p>
    </div>)
}

export default App;
