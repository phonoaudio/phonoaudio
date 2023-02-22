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
  const [filterListPerson, setFilterListPerson] = useState();
  const [search, setSearch] = useState("");

  function filterFunction(value) {
    return value.name.toLowerCase() === search.toLowerCase();
  }

  function searchPerson() {
    if (search) {
      return setFilterListPerson(listPerson.filter(filterFunction));
    }
    return setFilterListPerson(null);
  }

  useEffect(() => {
    if (listPerson) {
      setFilterListPerson(
        listPerson.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, listPerson]);

  return (
    <div className="register-wrapper">
      <label htmlFor="search">Busca: </label>
      <input
        type="text"
        value={search}
        id="searc"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchPerson}>Buscar</button>
      <div className="form-image-person">
        <table className="person-table">
          <thead>
            <tr>
              <th scope="col">CPF</th>
              <th scope="col">Nome</th>
              <th scope="col">Editar</th>
              <th scope="col">Exames</th>
            </tr>
          </thead>
          <tbody>
            {filterListPerson
              ? filterListPerson?.map((value) => {
                  return (
                    <Table
                      cpf={value?.cpf}
                      name={value?.name}
                      dn={value?.dn}
                      listPerson={listPerson}
                      setListPerson={setListPerson}
                    />
                  );
                })
              : listPerson?.map((value) => {
                  return (
                    <Table
                      cpf={value?.cpf}
                      name={value?.name}
                      dn={value?.dn}
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
