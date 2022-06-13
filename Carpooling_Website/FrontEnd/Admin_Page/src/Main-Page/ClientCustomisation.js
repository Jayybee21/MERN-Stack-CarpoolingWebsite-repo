import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import {
  SmallBlackContainer,
  SmallContainerBox,
  AlertContainer,
} from "../Styled-Components/Container";
import {
  ButtonSubmitClient,
  ButtonCancel,
  ButtonConfirm,
} from "./../Styled-Components/Button";
import { InputClient } from "./../Styled-Components/TextBox";
import { Toaster, toast } from "react-hot-toast";
import { H2White, H3, H4Blue } from "../Styled-Components/Tags";
import { confirm } from "react-confirm-box";

//this hook saves what we did in a previous page
import { useNavigate } from "react-router-dom";
import Axios from "axios";
function ClientCustomisation() {
  /*
   *navigate variable, for navigation...
   */
  let navigate = useNavigate();

  /*
   *Hooks for adding,editing,deleteing and searching client data
   */
  const [addClientName, setAddClientName] = useState("");
  const [addClientPassword, setAddClientPassword] = useState("");
  const [addClientImage, setAddClientImage] = useState("");
  const [addClientNumber, setAddClientNumber] = useState("");
  const [addClientEmail, setAddClientEmail] = useState("");
  const [editClientName, setEditClientName] = useState("");
  const [editClientPassword, setEditClientPassword] = useState("");
  const [editClientImage, setEditClientImage] = useState("");
  const [editClientNumber, setEditClientNumber] = useState("");
  const [editClientEmail, setEditClientEmail] = useState("");
  const [deleteClientName, setDeleteClientName] = useState("");
  const [searchClientName, setSearchClientName] = useState("");

  const [newClientNumber, setNewClientNumber] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientPass, setNewClientPass] = useState("");

  /*
   *Constant for creating the alert box when trying to edit or delete driver
   */
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

  const addClient = async () => {
    await Axios.post("http://localhost:4000/addclient", {
      addClientName: addClientName.trim(),
      addClientPassword: addClientPassword.trim(),
      addClientImage: addClientImage.replace(/C:\\fakepath\\/, ""),
      addClientNumber: addClientNumber.trim(),
      addClientEmail: addClientEmail.trim(),
    }).then((response) => {
      toast(response.data, {
        icon: "ℹ️",
        style: {
          borderRadius: "10px",
        },
      });
    });
  };
  const editClient = async () => {
    const result = await confirm("Are you sure?", options);
    if (result) {
      await Axios.post("http://localhost:4000/editclient", {
        editClientName: editClientName.trim(),
        editClientPassword: editClientPassword.trim(),
        editClientImage: editClientImage.replace(/C:\\fakepath\\/, ""),
        editClientNumber: editClientNumber.trim(),
        editClientEmail: editClientEmail.trim(),
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
  const deleteClient = async () => {
    const result = await confirm("Are you sure?", options);
    if (result) {
      await Axios.post("http://localhost:4000/deleteclient", {
        deleteClientName: deleteClientName.trim(),
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
  const searchClient = async () => {
    await Axios.post("http://localhost:4000/searchclient", {
      searchClientName: searchClientName.trim(),
    }).then((response) => {
      toast(response.data.clientdata + " \n " + response.data.clientimage, {
        icon: "ℹ️",
        style: {
          borderRadius: "10px",
        },
      });
    });
  };
  const findForEditClient = async () => {
    await Axios.post("http://localhost:4000/searchandfillclient", {
      editClientName: editClientName.trim(),
    }).then((response) => {
      setNewClientPass(response.data.clientpass);
      setNewClientNumber(response.data.clientnumber);
      setNewClientEmail(response.data.clientemail);
    });
  };
  useEffect(() => {
    Axios.get("http://localhost:4000/user-management", {}).then((response) => {
      console.log("response >>> ", response.data);
      navigate(response.data);
    });
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
          <H2White>Add Client</H2White>
          <InputClient
            type="text"
            name="addClientName"
            placeholder="Full Name"
            onChange={(e) => {
              setAddClientName(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <InputClient
            type="text"
            name="addClientPassword"
            placeholder="Password"
            onChange={(e) => {
              setAddClientPassword(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <InputClient
            type="number"
            name="addClientNumber"
            placeholder="Number (optional)"
            onChange={(e) => setAddClientNumber(e.target.value)}
          />
          <br></br>
          <br></br>
          <InputClient
            type="text"
            name="addClientEmail"
            placeholder="Email"
            onChange={(e) => setAddClientEmail(e.target.value)}
          />
          <br></br>
          <br></br>
          <H3>Client Image</H3>
          <InputClient
            type="file"
            name="addClientImage"
            formEncType="multipart/form-data"
            accept="image/png, image/jpeg"
            onChange={(e) => setAddClientImage(e.target.files[0].name)}
          />
          <br></br>
          <br></br>
          <ButtonSubmitClient onClick={addClient}>
            Add Client
          </ButtonSubmitClient>
        </SmallBlackContainer>
        <SmallBlackContainer>
          <H2White>Edit Client</H2White>
          <InputClient
            type="text"
            name="editClientName"
            placeholder="Full Name"
            onChange={(e) => {
              setEditClientName(e.target.value);
            }}
          />
          <br></br>
          <br></br>

          <button onClick={findForEditClient}>Search and Fill</button>
          <br></br>
          <br></br>
          <InputClient
            type="text"
            value={newClientPass}
            name="editClientPassword"
            placeholder="Password"
            onChange={(e) => {
              setEditClientPassword(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <InputClient
            type="number"
            value={newClientNumber}
            name="editClientNumber"
            placeholder="Number (optional)"
            onChange={(e) => setEditClientNumber(e.target.value)}
          />
          <br></br>
          <br></br>
          <InputClient
            type="text"
            value={newClientEmail}
            name="editClientEmail"
            placeholder="Email"
            onChange={(e) => setEditClientEmail(e.target.value)}
          />
          <br></br>
          <br></br>
          <H3>Client Image</H3>
          <InputClient
            type="file"
            name="editClientImage"
            formEncType="multipart/form-data"
            accept="image/png, image/jpeg"
            onChange={(e) => setEditClientImage(e.target.files[0].name)}
          />

          <br></br>
          <br></br>
          <ButtonSubmitClient onClick={editClient}>
            Edit Client
          </ButtonSubmitClient>
        </SmallBlackContainer>
      </SmallContainerBox>
      <SmallContainerBox>
        <SmallBlackContainer>
          <H2White>Delete Client</H2White>
          <InputClient
            type="text"
            name="deleteClientName"
            placeholder="Full Name"
            onChange={(e) => {
              setDeleteClientName(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <ButtonSubmitClient onClick={deleteClient}>
            Delete Client
          </ButtonSubmitClient>
        </SmallBlackContainer>
        <SmallBlackContainer>
          <H2White>Search Client</H2White>
          <InputClient
            type="text"
            name="searchClientName"
            placeholder="Full Name"
            onChange={(e) => {
              setSearchClientName(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <ButtonSubmitClient onClick={searchClient}>
            Search Client
          </ButtonSubmitClient>
        </SmallBlackContainer>
      </SmallContainerBox>
    </>
  );
}

export default ClientCustomisation;
