import React, { useState } from "react";
import FormDialog from "../dialog/dialog";

export const Table = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        name={props.name}
        cpf={props.cpf}
        insurance={props.insurance}
        listPerson={props.listPerson}
        setListPerson={props.setListPerson}
      />
      {console.log(props)}
      <tr key={props.cpf}>
        <td>{props.cpf}</td>
        <td>{props.name}</td>
        <td>{props.insurance}</td>

        <td>
          <button onClick={() => setOpen(true)}>Editar</button>
        </td>
      </tr>
    </>
  );
};
