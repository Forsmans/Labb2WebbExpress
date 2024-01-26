const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;
const cors = require("cors")

const path = require('path');

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// C
app.post("/user/:name/:age", async (req, res) => {
  try {
    const { name, age } = req.params;
    const response = await axios.post(`https://mafoapi.azurewebsites.net/user`, {
      Name: name,
      Age: parseInt(age),
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// R all
app.get("/users", async (req, res) => {
  try {
    const response = await axios.get("https://mafoapi.azurewebsites.net/users");
    res.json(response.data);
    
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//R by id
app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://mafoapi.azurewebsites.net/user/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// U
app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age } = req.body;

    const response = await axios.put(`https://mafoapi.azurewebsites.net/user/${id}`, {
      Name: name,
      Age: parseInt(age),
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// D
app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(`https://mafoapi.azurewebsites.net/user/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

