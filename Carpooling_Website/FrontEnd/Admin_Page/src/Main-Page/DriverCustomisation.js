import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import {
  SmallBlackContainer,
  SmallContainerBox,
  AlertContainer,
} from "../Styled-Components/Container";
import {
  ButtonSubmitDriver,
  ButtonCancel,
  ButtonConfirm,
} from "./../Styled-Components/Button";
import { InputDriver, SelectCar } from "./../Styled-Components/TextBox";
import { Toaster, toast } from "react-hot-toast";
import { H1, H2White, H3, H4Blue, H5, H6, P } from "../Styled-Components/Tags";
import { confirm } from "react-confirm-box";

//this hook saves what we did in a previous page
import { useNavigate } from "react-router-dom";
import Axios from "axios";
function DriverCustomisation() {
  /*
   *navigate variable, for navigation...
   */
  let navigate = useNavigate();

  /*
   *Hooks for adding,editing,deleteing and searching driver data
   */
  const [addDriverName, setAddDriverName] = useState("");
  const [addDriverPassword, setAddDriverPassword] = useState("");
  const [addDriverNumber, setAddDriverNumber] = useState("");
  const [addDriverImage, setAddDriverImage] = useState("");
  const [addDriverLicense, setAddDriverLicense] = useState("");
  const [addDriverCarMake, setAddDriverCarMake] = useState("");
  const [addDriverCarName, setAddDriverCarName] = useState("");
  const [addDriverLicensePlate, setAddDriverLicensePlate] = useState("");
  const [editDriverName, setEditDriverName] = useState("");
  const [editDriverPassword, setEditDriverPassword] = useState("");
  const [editDriverNumber, setEditDriverNumber] = useState("");
  const [editDriverImage, setEditDriverImage] = useState("");
  const [editDriverLicense, setEditDriverLicense] = useState("");
  const [editDriverLicensePlate, setEditDriverLicensePlate] = useState("");
  const [editDriverCarMake, setEditDriverCarMake] = useState("");
  const [editDriverCarName, setEditDriverCarName] = useState("");
  const [deleteDriverName, setDeleteDriverName] = useState("");
  const [searchDriverName, setSearchDriverName] = useState("");

  const [newPass, setNewPass] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newCarName, setNewCarName] = useState("");
  const [newDriverLicensePlate, setNewDriverLicensePlate] = useState("");

  const [optionsList, setOptionsList] = useState([]);

  //Constant for creating the alert box when trying to edit or delete driver
  const options = {
    render: (message, onConfirm, onCancel) => {
      return (
        <AlertContainer>
          <H4Blue>{message}</H4Blue>
          <ButtonCancel onClick={onCancel}>No</ButtonCancel>
          <ButtonConfirm onClick={onConfirm}>Yes</ButtonConfirm>
        </AlertContainer>
      );
    },
  };

  const addDriver = async () => {
    await Axios.post("http://localhost:4000/adddriver", {
      addDriverName: addDriverName.trim(),
      addDriverPassword: addDriverPassword.trim(),
      addDriverNumber: addDriverNumber.trim(),
      addDriverImage: addDriverImage.replace(/C:\\fakepath\\/, ""),
      addDriverLicense: addDriverLicense.replace(/C:\\fakepath\\/, ""),
      addDriverLicensePlate: addDriverLicensePlate.trim(),
      addDriverCarMake: addDriverCarMake.trim(),
      addDriverCarName: addDriverCarName.trim(),
    }).then((response) => {
      toast(response.data, {
        icon: "ℹ️",
        style: {
          borderRadius: "10px",
        },
      });
    });
  };
  const editDriver = async () => {
    const result = await confirm("Are you sure?", options);
    if (result) {
      await Axios.post("http://localhost:4000/editdriver", {
        editDriverName: editDriverName.trim(),
        editDriverPassword: editDriverPassword.trim(),
        editDriverNumber: editDriverNumber.trim(),
        editDriverImage: editDriverImage.replace(/C:\\fakepath\\/, ""),
        editDriverLicense: editDriverLicense.replace(/C:\\fakepath\\/, ""),
        editDriverLicensePlate: editDriverLicensePlate.trim(),
        editDriverCarMake: editDriverCarMake.trim(),
        editDriverCarName: editDriverCarName.trim(),
      }).then((response) => {
        toast(response.data, {
          icon: "ℹ️",
          style: {
            borderRadius: "10px",
          },
        });
      });
    } else {
      toast("No changes made !", {
        icon: "ℹ️",
        style: {
          borderRadius: "10px",
        },
      });
    }
  };
  const deleteDriver = async () => {
    const result = await confirm("Are you sure?", options);
    if (result) {
      await Axios.post("http://localhost:4000/deletedriver", {
        deleteDriverName: deleteDriverName.trim(),
      }).then((response) => {
        toast(response.data, {
          icon: "ℹ️",
          style: {
            borderRadius: "10px",
          },
        });
      });
    } else {
      toast("No changes made !", {
        icon: "ℹ️",
        style: {
          borderRadius: "10px",
        },
      });
    }
  };
  const searchDriver = async () => {
    await Axios.post("http://localhost:4000/searchdriver", {
      searchDriverName: searchDriverName.trim(),
    }).then((response) => {
      toast(response.data.driverdata + " \n " + response.data.driverimage, {
        icon: "ℹ️",
        style: {
          borderRadius: "10px",
        },
      });
    });
  };
  const findForEditDriver = async () => {
    await Axios.post("http://localhost:4000/searchandfilldriver", {
      editDriverName: editDriverName.trim(),
    }).then((response) => {
      setNewPass(response.data.driverpass);
      setNewNumber(response.data.drivernumber);
      setNewCarName(response.data.drivercar);
      setNewDriverLicensePlate(response.data.driverlicenseplate);
    });
  };

  useEffect(() => {
    const canLogin = async () => {
      await Axios.get("http://localhost:4000/user-management", {}).then(
        (response) => {
          console.log("response >>> ", response.data);
          navigate(response.data);
        }
      );
    };
    canLogin();
    const apiRetriever = async () => {
      await Axios.get("http://localhost:4000/getCarAPI", {}).then(
        (response) => {
          setOptionsList(response.data);
        }
      );
    };
    apiRetriever();
  }, []);

  document.body.style.backgroundColor = "#000";
  return (
    <>
      <Sidebar />
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <SmallContainerBox>
        <SmallBlackContainer>
          <H2White>Add a Driver</H2White>
          <InputDriver
            type="text"
            name="addDriverName"
            placeholder="Full Name"
            onChange={(e) => {
              setAddDriverName(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <InputDriver
            type="text"
            name="addDriverPassword"
            placeholder="Password"
            onChange={(e) => {
              setAddDriverPassword(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <InputDriver
            type="number"
            name="addDriverNumber"
            placeholder="Number"
            onChange={(e) => {
              setAddDriverNumber(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <SelectCar
            name="addDriverCarMake"
            placeholder="Select Model"
            onChange={(e) => {
              setAddDriverCarMake(e.target.value);
            }}
          >
            <option value="Select Car Model">Select Car Model</option>
            {optionsList.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </SelectCar>
          <br></br>
          <br></br>
          <InputDriver
            type="text"
            name="addDriverCarName"
            placeholder="Car Name"
            onChange={(e) => setAddDriverCarName(e.target.value)}
          />
          <br></br>
          <br></br>
          <InputDriver
            type="text"
            name="addDriverLicensePlate"
            placeholder="License Plate"
            onChange={(e) => setAddDriverLicensePlate(e.target.value)}
          />
          <br></br>
          <br></br>
          <H3>Driver Image</H3>
          <InputDriver
            type="file"
            name="addDriverImage"
            formEncType="multipart/form-data"
            accept="image/png, image/jpeg"
            onChange={(e) => setAddDriverImage(e.target.value)}
          />
          <H3>Driver License</H3>
          <InputDriver
            type="file"
            name="addDriverLicense"
            formEncType="multipart/form-data"
            accept="image/png, image/jpeg"
            onChange={(e) => setAddDriverLicense(e.target.value)}
          />
          <br></br>
          <br></br>
          <ButtonSubmitDriver onClick={addDriver}>
            Add Driver
          </ButtonSubmitDriver>
        </SmallBlackContainer>
        <SmallBlackContainer>
          <H2White>Edit Driver</H2White>
          <InputDriver
            type="text"
            name="editDriverName"
            placeholder="Full Name"
            onChange={(e) => {
              setEditDriverName(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <button onClick={findForEditDriver}>Search and Fill</button>
          <br></br>
          <br></br>
          <InputDriver
            type="text"
            name="editDriverPassword"
            value={newPass}
            placeholder="Password"
            onChange={(e) => {
              setEditDriverPassword(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <InputDriver
            type="number"
            value={newNumber}
            name="editDriverNumber"
            placeholder="Number"
            onChange={(e) => {
              setEditDriverNumber(e.target.value);
            }}
          />
          <br></br>
          <br></br>

          <SelectCar
            name="editDriverCarMake"
            placeholder="Select Model"
            onChange={(e) => {
              setEditDriverCarMake(e.target.value);
            }}
          >
            <option value="Select Car Model">Select Car Model</option>
            {optionsList.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </SelectCar>
          <br></br>
          <br></br>
          <InputDriver
            type="text"
            value={newCarName}
            name="editDriverCarName"
            placeholder="Car Name"
            onChange={(e) => setEditDriverCarName(e.target.value)}
          />
          <br></br>
          <br></br>
          <InputDriver
            type="text"
            value={newDriverLicensePlate}
            name="editDriverLicensePlate"
            placeholder="License Plate"
            onChange={(e) => setEditDriverLicensePlate(e.target.value)}
          />
          <br></br>
          <br></br>
          <H3>Driver Image</H3>
          <InputDriver
            type="file"
            name="editDriverImage"
            formEncType="multipart/form-data"
            accept="image/png, image/jpeg"
            onChange={(e) => setEditDriverImage(e.target.value)}
          />
          <H3>Driver License</H3>
          <InputDriver
            type="file"
            name="editDriverLicense"
            formEncType="multipart/form-data"
            accept="image/png, image/jpeg"
            onChange={(e) => setEditDriverLicense(e.target.value)}
          />
          <br></br>
          <br></br>
          <ButtonSubmitDriver onClick={editDriver}>
            Edit Driver
          </ButtonSubmitDriver>
        </SmallBlackContainer>
      </SmallContainerBox>
      <SmallContainerBox>
        <SmallBlackContainer>
          <H2White>Delete Driver</H2White>
          <InputDriver
            type="text"
            name="deleteDriverName"
            placeholder="Full Name"
            onChange={(e) => {
              setDeleteDriverName(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <ButtonSubmitDriver onClick={deleteDriver}>
            Delete Driver
          </ButtonSubmitDriver>
        </SmallBlackContainer>
        <SmallBlackContainer>
          <H2White>Search Driver</H2White>
          <InputDriver
            type="text"
            name="searchDriverName"
            placeholder="Full Name"
            onChange={(e) => {
              setSearchDriverName(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <ButtonSubmitDriver onClick={searchDriver}>
            Search Driver
          </ButtonSubmitDriver>
        </SmallBlackContainer>
      </SmallContainerBox>
    </>
  );
}

export default DriverCustomisation;
