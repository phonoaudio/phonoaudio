import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Person.css";
import { Table } from "../../Componente/table/Table";

export const Person = () => {
  useEffect(() => {
    Axios.get("http://localhost:3001/persons").then((response) => {
      setListPerson(response.data);
    });
  }, []);

  const [listPerson, setListPerson] = useState();

  return (
    <div className="register-wrapper">
      <div className="form-image-person">
        <table className="person-table">
          <thead>
            <tr>
              <th scope="col">CPF</th>
              <th scope="col">Name</th>
              <th scope="col">Convênio</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            {listPerson?.map((value) => {
              return (
                <Table
                  cpf={value?.cpf}
                  name={value?.name}
                  dn={value?.dn}
                  insurance={value.insurance}
                  listPerson={listPerson}
                  setListPerson={setListPerson}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
