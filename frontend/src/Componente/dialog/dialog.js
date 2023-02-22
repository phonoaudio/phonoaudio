import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    cpf: props.cpf,
    name: props.name,
    insurance: props.insurance,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditPerson = () => {
    Axios.put("http://localhost:3001/edit", {
      cpf: editValues.cpf,
      name: editValues.name,
      insurance: editValues.insurance,
    }).then(() => {
      props.setListPerson(
        props.listPerson.map((value) => {
          return value.cpf === editValues.cpf
            ? {
                cpf: editValues.cpf,
                name: editValues.name,
                insurance: editValues.insurance,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeletePerson = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.cpf}`).then(() => {
      props.setListPerson(
        props.listPerson.filter((value) => {
          return value.cpf !== editValues.cpf;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.cpf}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            defaultValue={props.name}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="insurance"
            label="Convênio"
            defaultValue={props.insurance}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeletePerson()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditPerson()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
