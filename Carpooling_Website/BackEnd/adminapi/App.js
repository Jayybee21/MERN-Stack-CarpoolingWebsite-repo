//building our server app with express !
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const axios = require("axios");

//using cors to exchange information from node to react and vice versa
const cors = require("cors");

//using mongoose to connect to our database !
const mongoose = require("mongoose");

//getting the models (basically beans)
const UserModel = require("./Models/Users");
const LimniStats = require("./Models/Stats");

let CurrDate;

//adding multer to project to send files
//used to upload and get images from db
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images");
  },
  filename: (req, file, cb) => {
    CurrDate = Date.now();
    cb(null, CurrDate + "-" + file.fieldname);
  },
});
const upload = multer({ storage: storage });

//connecting to our database
//We used this string to connect to the application from the cloud side, and not the compass one
mongoose.connect(
  "mongodb+srv://JB:JvKarVCW63E64oH6@applicationcluster.a6o9h.mongodb.net/Limni_MongoDB?retryWrites=true&w=majority"
);

let tempInfo = false;

function startCounter() {
  setTimeout(function () {
    tempInfo = false;
  }, 500000);
}

app.use(express.json());

//Cors will allow cross platform information exchange !
app.use(cors());

const check = () => {
  console.log(tempInfo);
  if (tempInfo == false) {
    console.log("Not allowed to enter dashboard page before login !");
    res.send(JSON.stringify("/"));
  }
};

app.use("/settings", async (req, res) => {
  check;
});
app.use("/dashboard", async (req, res) => {
  console.log(tempInfo);
  if (tempInfo == false) {
    console.log("Not allowed to enter dashboard page before login !");
    res.send(JSON.stringify("/"));
  }
});
app.use("/user-management", async (req, res) => {
  check;
});
app.get("/logout", async (req, res) => {
  console.log("An admin has logged out at " + Date.now());
  tempInfo = false;
  console.log(tempInfo);
  res.send(JSON.stringify("/"));
});

app.get("/getdata", async (req, res) => {
  LimniStats.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
  //res.send(infoToSend);
  console.log("DATA SENT!");
});
app.get("/getCarAPI", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://car-data.p.rapidapi.com/cars/makes",
    headers: {
      "X-RapidAPI-Host": "car-data.p.rapidapi.com",
      "X-RapidAPI-Key": "7f1fad6bd5msh91f5095edde587dp1105c4jsn17dfd71c5185",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/getuser", async (req, res) => {
  res.send(JSON.stringify(tempInfo));
  console.log("USER SET!");
});

app.post("/", async (req, globalres) => {
  const u = req.body.User;
  const p = req.body.Pass;
  if (mongoose.connection.readyState != 1) {
    globalres.send(
      JSON.stringify({ link: "/", tokenMessage: "Connection Error !" })
    );
  }
  const adminExist = await UserModel.exists({
    "type.genre": "admin",
    "type.username": u,
    "type.password": p,
  });
  if (!adminExist) {
    console.log("Username or password is incorrect ! please try again !");
    tempInfo = false;
    globalres.send(
      JSON.stringify({ link: "/", tokenMessage: "Incorrect credentials !" })
    );
  } else {
    startCounter();
    tempInfo = true;
    console.log("Combination was checked, results are valid !");
    globalres.send(
      JSON.stringify({ link: "/dashboard", tokenMessage: "Welcome !" })
    );
  }
});

app.post(
  "/addclient",
  upload.single("addClientImage"),
  async (req, globalres) => {
    CurrDate = Date.now();
    console.log(req.body.addClientImage);
    const cltName = req.body.addClientName;
    const cltPass = req.body.addClientPassword;
    const cltNum = req.body.addClientNumber;
    const cltEmail = req.body.addClientEmail;
    const cltImage = CurrDate + "-" + req.body.addClientImage;

    const newUser = await new UserModel({
      type: {
        genre: "client",
        username: cltName,
        password: cltPass,
        number: cltNum,
        email: cltEmail,
        image: cltImage,
      },
    });
    if (mongoose.connection.readyState != 1) {
      globalres.send(JSON.stringify("Connection Error !"));
    } else if (cltName == "" || cltPass == "" || cltEmail == "") {
      globalres.send(JSON.stringify("Crucial Info is missing !"));
    } else {
      const clientExist = await UserModel.exists({
        "type.genre": "client",
        "type.username": cltName,
      });
      if (!clientExist) {
        await newUser.save();
        globalres.send(JSON.stringify("Added to database !"));
      } else {
        console.log(clientExist);
        globalres.send(JSON.stringify("User already exists !"));
      }
    }
  }
);

app.post(
  "/adddriver",
  upload.array("addDriverImage", "addDriverLicense"),
  async (req, globalres) => {
    CurrDate = Date.now();
    const drvName = req.body.addDriverName;
    const drvPass = req.body.addDriverPassword;
    const drvNum = req.body.addDriverNumber;
    const drvCarMake = req.body.addDriverCarMake;
    const drvCarName = req.body.addDriverCarName;
    const drvLicense = CurrDate + "-" + req.body.addDriverLicense;
    const drvImage = CurrDate + "-" + req.body.addDriverImage;
    const drvLicensePlate = req.body.addDriverLicensePlate;

    const newUser = await new UserModel({
      type: {
        genre: "driver",
        username: drvName,
        password: drvPass,
        number: drvNum,
        image: drvImage,
        driverLicense: drvLicense,
        driverLicensePlate: drvLicensePlate,
        car: drvCarMake + " " + drvCarName,
      },
    });
    if (mongoose.connection.readyState != 1) {
      globalres.send(JSON.stringify("Connection Error !"));
    } else if (
      drvName == "" ||
      drvPass == "" ||
      drvNum == "" ||
      drvImage == "" ||
      drvLicense == "" ||
      drvCarMake == "" ||
      drvCarName == "" ||
      drvLicensePlate == ""
    ) {
      globalres.send(JSON.stringify("Crucial Info is missing !"));
    } else {
      const driverExist = await UserModel.exists({
        "type.genre": "driver",
        "type.username": drvName,
      });
      if (!driverExist) {
        await newUser.save();
        globalres.send(JSON.stringify("Added to database !"));
      } else {
        console.log(driverExist);
        globalres.send(JSON.stringify("User already exists !"));
      }
    }
  }
);

app.post("/searchandfilldriver", async (req, res) => {
  const drvName = req.body.editDriverName;
  const driverExist = await UserModel.findOne({
    "type.genre": "driver",
    "type.username": drvName,
  });
  console.log(driverExist);
  if (driverExist) {
    let result = driverExist["type"];
    let resultP = result["password"];
    let resultN = result["number"];
    let resultC = result["car"];
    let resultL = result["driverLicense"];
    let resultLP = result["driverLicensePlate"];
    let resultI = "./Images/" + result["image"];
    res.send(
      JSON.stringify({
        driverpass: resultP,
        drivernumber: resultN,
        drivercar: resultC,
        driverlicenseplate: resultLP,
      })
    );
  }
});

app.post("/searchandfillclient", async (req, res) => {
  const cltName = req.body.editClientName;
  const clientExist = await UserModel.findOne({
    "type.genre": "client",
    "type.username": cltName,
  });
  if (clientExist) {
    let result = clientExist["type"];
    let resultP = result["password"];
    let resultN = result["number"];
    let resultE = result["email"];
    res.send(
      JSON.stringify({
        clientpass: resultP,
        clientnumber: resultN,
        clientemail: resultE,
      })
    );
  }
});

app.post(
  "/editdriver",
  upload.array("addDriverImage", "addDriverLicense"),
  async (req, globalres) => {
    CurrDate = Date.now();
    const drvName = req.body.editDriverName;
    const drvPass = req.body.editDriverPassword;
    const drvNum = req.body.editDriverNumber;
    const drvCarMake = req.body.editDriverCarMake;
    const drvCarName = req.body.editDriverCarName;
    const drvLicense = CurrDate + "-" + req.body.editDriverLicense;
    const drvImage = CurrDate + "-" + req.body.editDriverImage;
    const drvLicensePlate = req.body.editDriverLicensePlate;

    const updatedUser = await new UserModel({
      type: {
        genre: "driver",
        username: drvName,
        password: drvPass,
        number: drvNum,
        image: drvImage,
        driverLicense: drvLicense,
        driverLicensePlate: drvLicensePlate,
        car: drvCarMake + " " + drvCarName,
      },
    });
    if (mongoose.connection.readyState != 1) {
      globalres.send(JSON.stringify("Connection Error !"));
    } else if (drvName == "") {
      globalres.send(JSON.stringify("Crucial Info is missing !"));
    } else {
      const driverExist = await UserModel.findOneAndUpdate(
        {
          "type.genre": "driver",
          "type.username": drvName,
        },
        { updatedUser },
        {
          returnOriginal: false,
        }
      );
      if (driverExist) {
        globalres.send(
          JSON.stringify("Changes were made to " + drvName + " !")
        );
      } else {
        console.log(driverExist);
        globalres.send(JSON.stringify("User not found!"));
      }
    }
  }
);

app.post(
  "/editclient",
  upload.single("addClientImage"),
  async (req, globalres) => {
    CurrDate = Date.now();
    const cltName = req.body.editClientName;
    const cltPass = req.body.editClientPassword;
    const cltNum = req.body.editClientNumber;
    const cltEmail = req.body.editClientEmail;
    const cltImage = CurrDate + "-" + req.body.editClientImage;

    const updatedUser = await new UserModel({
      type: {
        genre: "client",
        username: cltName,
        password: cltPass,
        number: cltNum,
        image: cltImage,
        email: cltEmail,
      },
    });
    if (mongoose.connection.readyState != 1) {
      globalres.send(JSON.stringify("Connection Error !"));
    } else if (cltName == "") {
      globalres.send(JSON.stringify("Crucial Info is missing !"));
    } else {
      const clientExist = await UserModel.findOneAndUpdate(
        {
          "type.genre": "client",
          "type.username": cltName,
        },
        { updatedUser },
        {
          returnOriginal: false,
        }
      );
      if (clientExist) {
        globalres.send(
          JSON.stringify("Changes were made to " + cltName + " !")
        );
      } else {
        console.log(clientExist);
        globalres.send(JSON.stringify("User not found!"));
      }
    }
  }
);

app.post("/deleteclient", async (req, res) => {
  const cltName = req.body.deleteClientName;

  const clientExist = await UserModel.exists({
    "type.genre": "client",
    "type.username": cltName,
  });
  if (!clientExist) {
    console.log(clientExist);
    res.send(JSON.stringify("User does not exist !"));
  } else {
    await UserModel.deleteOne({
      "type.genre": "client",
      "type.username": cltName,
    });
    res.send(JSON.stringify("Removed from database !"));
  }
});

app.post("/deletedriver", async (req, res) => {
  const drvName = req.body.deleteDriverName;

  const driverExist = await UserModel.exists({
    "type.genre": "driver",
    "type.username": drvName,
  });
  if (!driverExist) {
    console.log(driverExist);
    res.send(JSON.stringify("User does not exist !"));
  } else {
    await UserModel.deleteOne({
      "type.genre": "driver",
      "type.username": drvName,
    });
    res.send(JSON.stringify("Removed from database !"));
  }
});

app.post("/searchclient", async (req, res) => {
  const cltName = req.body.searchClientName;

  const clientExist = await UserModel.find({
    "type.genre": "client",
    "type.username": { $regex: ".*" + cltName + ".*" },
  });
  if (!clientExist) {
    console.log(clientExist);
    res.send(JSON.stringify("User does not exist !"));
  } else {
    if (clientExist.length == 1) {
      let result = clientExist[0]["type"];
      let resultU = result["username"];
      let resultN = result["number"];
      let resultE = result["email"];
      let resultI = "./Images/" + result["image"];
      res.send(
        JSON.stringify({
          clientdata: "" + resultU + "\n" + resultN + "\n" + resultE + "\n",
          clientimage: resultI,
        })
      );
    } else if (clientExist.length <= 10) {
      let resultU = "";
      for (let i = 0; i < clientExist.length; i++) {
        let result = clientExist[i]["type"];
        resultU += " | " + result["username"];
      }
      res.send(
        JSON.stringify({
          clientdata: "Numerous users Found !\n\n" + resultU + "\n",
          clientimage: "",
        })
      );
    } else {
      res.send(
        JSON.stringify({
          clientdata: "Way too many results, try narrowing down the search !",
          clientimage: "",
        })
      );
    }
  }
});

app.post("/searchdriver", async (req, res) => {
  const drvName = req.body.searchDriverName;

  const driverExist = await UserModel.find({
    "type.genre": "driver",
    "type.username": { $regex: ".*" + drvName + ".*" },
  });
  if (!driverExist) {
    console.log(driverExist);
    res.send(JSON.stringify("User does not exist !"));
  } else {
    if (driverExist.length == 1) {
      let result = driverExist[0]["type"];
      let resultU = result["username"];
      let resultP = result["password"];
      let resultN = result["number"];
      let resultC = result["car"];
      let resultLP = result["driverLicensePlate"];
      let resultI = "/Images/" + result["image"];
      res.send(
        JSON.stringify({
          driverdata:
            "Name: " +
            resultU +
            "\nPassword: " +
            resultP +
            "\nNumber: " +
            resultN +
            "\nCar: " +
            resultC +
            "\nLicense Plate: " +
            resultLP +
            "\n",
          driverimage: "Image: " + resultI,
        })
      );
    } else if (driverExist.length <= 10) {
      let resultU;
      for (let i = 0; i < driverExist.length; i++) {
        let result = driverExist[i]["type"];
        resultU += " | " + result["username"];
      }
      res.send(
        JSON.stringify({
          driverdata: "Numerous users Found !\n\n" + resultU + "\n",
          driverimage: "",
        })
      );
    } else {
      res.send(
        JSON.stringify({
          driverdata: "Way too many results, try narrowing down the search !",
          driverimage: "",
        })
      );
    }
  }
});

app.listen(4000, () => {
  console.log("API server is ON !");
});
