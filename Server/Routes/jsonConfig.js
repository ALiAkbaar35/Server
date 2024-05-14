const express = require("express");
const router = express.Router();
//const axios = require("axios");
const registry = require("./registry.json");
const fs = require("fs");

router.post("/", (req, res) => {
  console.log(`Gateway called with register`);

  const registerInformation = req.body;
  // console.log(
  //     registerInformation.apiName,
  //     registerInformation.host,
  //     registerInformation.port,
  //     registerInformation.url
  // );
  registry.services[registerInformation.apiName] = {
    ...registerInformation,
  };

  let outFile = "./registry.json";

  fs.writeFile(outFile, JSON.stringify(registry, null, 4), (error) => {
    if (error) {
      res.send(
        "Service not registered '" + registerInformation.apiName + "'\n" + error
      );
    } else {
      res.send("Service registered '" + registerInformation.apiName + "'");
    }
  });
});
