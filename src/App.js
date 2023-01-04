//this application will calculate the checkin and the checkout time using useEffect,useState hook
//key features: 
//             1. Veification of roll number in the array of object
//             2. Displaying of real time
//             3. Responsive with the help of bootstrap
import React, { useState, useEffect } from "react";
import './App.css'

function App() {
  const date = new Date();
  const [student, setStudent] = useState([
    {
      name: "",
      rollNo: "",
      checkin: "",
      checkOut: "",
    },
  ]);

  const [credentials, setCredentials] = useState({
    name: "",
    rollNo: "",
    checkin: "",
    checkOut: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const findone = (roll) => { //to find if roll number already exist
    var c = 0;
    student.map((e) => {
      if (e.rollNo === roll) {
        c = 1;
      }
    });
    if (c === 0) {
      return false;
    } else {
      return true;
    }
  };

  const onCheckIn = () => {  //add object to state
    var time = date.getHours() + ":" + date.getMinutes();
    if (findone(credentials.rollNo)) {
      alert("the roll number already exists")
      return;
    }
    setCredentials({...credentials , checkin: time})
    setStudent([...student, credentials ]);
  };

  const onCheckOut = () => {  //updating checkout time in object
    var time = date.getHours() + ":" + date.getMinutes();
    var roll = credentials.rollNo;
    setStudent(student.map((e) => {
      if(e.rollNo === roll) {
        return {...e  , checkOut: time}
      }
      else{
        return e
      }
    }))
  }

  return (
    <>
      <h2 className="mx-auto" style={{ textAlign: "center" , marginTop: "20px" }}>
        Student Attendence
      </h2>
      <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 mx-auto">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="card shadow" style={{ height: "220px" , borderRadius: "20px" }}>
            <div className="col d-flex flex-wrap flex-row align-items-center">
              <input
                className="row form-control"
                name="name"
                input="text"
                placeHolder="Enter your Name"
                value={credentials.name}
                onChange={handleChange}
                style={{ width: "90%", margin: "auto" , marginTop: "30px" , borderRadius: "10px" }}
              />
              <input
                className="row form-control"
                name="rollNo"
                input="text"
                placeHolder="Enter your Roll Number"
                value={credentials.rollNo}
                onChange={handleChange}
                style={{ width: "90%", margin: "auto" , marginTop: "15px" , borderRadius: "10px" }}
              />
            </div>
            <div className="col d-flex flex-wrap justify-content-start" style={{marginTop: "30px"}}>
              <button
                className="btn btn-primary row mx-auto"
                onClick={onCheckIn}
                style={{height: "40px" , width: "30%"}}
              >
                Check In
              </button>
              <button
                className="btn btn-secondary row mx-auto"
                onClick={onCheckOut}
                style={{height: "40px" , width: "30%"}}
              >
                Check Out
              </button>
            </div>
          </div>
          <div className="col" style={{marginTop: "30px"}}>
            <h3>Total Number of students present: {student.length-1}</h3>
          </div>
          <div className="col w-100">
            
            <table className="table shadow table-striped w-100 scroll" style={{marginTop: "10px" , borderRadius: "15px"}}>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll Number</th>
                  <th>Check In Time</th>
                  <th>Check Out Time</th>
                </tr>
              </thead>
              {student ? (
                student.map((e) => {
                  if(e.rollNo !== ""){
                  return (
                    <tbody>
                      <tr>
                        <th scope="row">{e.name}</th>
                        <td>{e.rollNo}</td>
                        <td>{e.checkin}</td>
                        <td>{e.checkOut}</td>
                      </tr>
                    </tbody>
                  );
                  }
                })
              ) : (
                <h5>No students found</h5>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
