import React, { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/:token" element={<AddInfo />} />
        </Routes>
      </Router>
    </>
  );
}

const AddInfo = () => {
  const [name, setname] = useState("");
  const [secret, setsecret] = useState("");
  const [verifyemail, setverifyemail] = useState(false);
  const [email, setemail] = useState("");
  const { token } = useParams();
  useEffect(() => {
    axios
      .post("http://localhost:3000/verifyemail/verifytoken", { token })
      .then((res) => {
        if (res.data.email) setemail(res.data.email);
        console.log(res.data);
      });
  }, []);

  function handleAddCourse() {
    fetch("http://localhost:3000/verifyemail", {
      method: "POST",
      body: JSON.stringify({ name, secret, email }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setverifyemail(true);
      });
    });
  }
  return (
    <center>
      <Box sx={{ width: "500px", marginTop: "50px" }}>
        <Card variant="outlined">
          {!verifyemail ? (
            <div
              style={{
                padding: "10px",
              }}
            >
              <h2>Tell your info</h2>
              Name :{" "}
              <TextField
                variant="standard"
                name="name"
                id="name"
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
              <br /> <br />
              Secret :{" "}
              <TextField
                variant="standard"
                name="secret"
                id="secret"
                onChange={(e) => {
                  setsecret(e.target.value);
                }}
              />
              <br /> <br />
              <Button
                variant="outlined"
                onClick={() => {
                  handleAddCourse();
                }}
              >
                {" "}
                Verify Email{" "}
              </Button>
            </div>
          ) : (
            <div
              style={{
                padding: "10px",
              }}
            >
              <h4>
                Email has been verified successfully , please open the app to
                view your information
              </h4>{" "}
            </div>
          )}
        </Card>
      </Box>
    </center>
  );
};

export default App;
