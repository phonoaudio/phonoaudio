import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialogExam(props) {
  const [exams, setExams] = useState();
  useEffect(() => {
    Axios.get(`http://localhost:3001/exam/${props.cpf}`, {
      cpf: props.cpf,
    }).then((response) => {
      setExams(response.data);
      console.log(exams[0]);
    });
  });

  const handleClose = () => {
    props.setOpen(false);
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
          <div className="form-image-person">
            <table className="person-table">
              <thead>
                <tr>
                  <th scope="col">CPF</th>
                  <th scope="col">Laudo</th>
                </tr>
              </thead>
              {exams?.map((value) => (
                <tbody>
                  <td>{value?.person_cpf}</td>
                  <td>{value?.laudo}</td>
                </tbody>
              ))}
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
