import React, { useState } from "react";
import FormDialog from "../dialog/dialog";
import FormDialogExam from "../exam/dialogExam";
export const Table = (props) => {
  const [open, setOpen] = useState(false);
  const [openExam, setOpenExam] = useState(false);
  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        name={props.name}
        cpf={props.cpf}
        listPerson={props.listPerson}
        setListPerson={props.setListPerson}
      />

      <FormDialogExam open={openExam} setOpen={setOpenExam} cpf={props.cpf} />
      <tr key={props.cpf}>
        <td>{props.cpf}</td>
        <td>{props.name}</td>

        <td>
          <button onClick={() => setOpen(true)}>Editar</button>
        </td>
        <td>
          <button onClick={() => setOpenExam(true)}>Ver exames</button>
        </td>
      </tr>
    </>
  );
};
