const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const PORT = process.env.PORT || 3000;

const app = express();
app.get("/", function (req, res) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some went wrong");
    }

    data = data.replace(/__OG_TITLE__/g, "Home Page");
    data = data.replace(/__OG_DESCRIPTION__/g, "This is Home Page");
    data = data.replace(/__DESCRIPTION__/g, "This is Home Page");
    return res.send(data);
  });
});

app.get("/digimon/:id", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");

  fs.readFile(filePath, "utf8", async (err, data) => {
    try {
      const a = await axios.get(
        `https://digi-api.com/api/v1/digimon/${req.params.id}`
      );
      if (a.data) {
        data = data.replace(/__OG_TITLE__/g, a.data.name);
        data = data.replace(
          /__OG_DESCRIPTION__/g,
          a.data?.descriptions?.[0]?.description
        );
        data = data.replace(
          /__DESCRIPTION__/g,
          a.data?.descriptions?.[0]?.description
        );
      }
    } catch (error) {
      throw error;
    }

    if (err) {
      console.log(err);
      return res.status(500).send("Some went wrong");
    }
    return res.send(data);
  });
});

app.use(express.static(path.resolve(__dirname, "./build")));

app.get("*", function (req, res) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some went wrong");
    }

    data = data.replace(/__OG_TITLE__/g, "Home Page");
    data = data.replace(/__OG_DESCRIPTION__/g, "This is Home Page");
    data = data.replace(/__DESCRIPTION__/g, "This is Home Page");
    return res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
