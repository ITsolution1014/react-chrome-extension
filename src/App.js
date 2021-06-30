/*global chrome*/

import React, { Component,useEffect,useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactFileReader from 'react-file-reader'
import Papa from 'papaparse';



const App = ()=> {

  const [data,setData] = useState([]);
  const [htmlData,setHtmlData] = useState([]);

  const handleCsvFiles = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        // Use reader.result
        var csv = reader.result;

        var data = Papa.parse(csv);
        setData(data.data);
    }
    reader.readAsText(file);
    
  }

  const handleSubmit = () =>{
    if(data !=''){
      var tmp = document.querySelectorAll('tr');
      for(let i = 1;i<tmp.length;i++){
        var result = tmp[i].querySelectorAll('td');
        result[0].innerHTML = data[i-1][0];
        result[1].querySelector('select').value = data[i-1][1];
      }  
    }
  }

  useEffect(() => {
    if(data ==''){
      var tmp = document.querySelectorAll('tr');
      var htmlData = [];
      for(let i = 1;i<tmp.length;i++){
        var result = tmp[i].querySelectorAll('td');
        htmlData.push([result[0].innerHTML,result[1].querySelector('select').value]);
      }
      setHtmlData(htmlData);
    }
  },[]);

  useEffect(()=>{
  },[data]);

    return (
      <div className="App">
        <h1 className = "title">Attendance</h1>
        <div className = "buttonPosition">
          <label className = "importButton" for="csvfile" >Import CSV</label>
          <input 
              id = "csvfile"
              type="file"
              onChange={(event) => handleCsvFiles(event) }
              accept=".csv"
              hidden
          />
        </div>
        <table id="t01">
          <tr>
            <th style = {{width:"40%"}}>Student name</th>
            <th style = {{width:"40%"}}>Attendence type</th>
          </tr>
          {data && data.map((row,i) => (
            row[0] != ""&&
            <tr>
              <td>{row[0]}</td>
              <td style={{padding:0}}>
                <select className = "selectState" disabled>
                  {row[1] == 'Absent' ? (<option selected>Absent</option>):<option>Absent</option>}
                  {row[1] == 'Present' ? (<option selected>Present</option>):<option>Present</option>}
                  {row[1] == 'Late' ? (<option selected>Late</option>):<option>Late</option>}
                </select>
              </td>
            </tr>
          ))
          }
          {data =='' && htmlData.map((row,i) => (
            row[0] != ""&&
            <tr>
              <td>{row[0]}</td>
              <td style={{padding:0}}>
                <select className = "selectState" disabled>
                  {row[1] == 'Absent' ? (<option selected>Absent</option>):<option>Absent</option>}
                  {row[1] == 'Present' ? (<option selected>Present</option>):<option>Present</option>}
                  {row[1] == 'Late' ? (<option selected>Late</option>):<option>Late</option>}
                </select>
              </td>
            </tr>
          ))
          }
            
        
        </table>
        <div>
          <button className = "importButton" onClick = {handleSubmit}>
            submit
          </button>
          <button className = "importButton">
            save
          </button>
        </div>
      </div>
    );
}

export default App;
