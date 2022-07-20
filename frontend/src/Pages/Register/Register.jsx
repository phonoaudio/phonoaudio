import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, addDoc } from "firebase/firestore";
import { useEffect, useState, useMemo } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import React from "react";
import { Chart } from "react-google-charts";

// const firebaseApp = initializeApp({
//   apiKey: "AIzaSyD_pahCxTTouGrHa4eJSoYXgesj1xVN47U",
//   authDomain: "phonoaudio.firebaseapp.com",
//   projectId: "phonoaudio",
// });

export const Register = () => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [insurance, setInsurance] = useState("");
  const [requester, setRequester] = useState("");
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState("");
  const [dn, setDn] = useState("");
  const [di, setDi] = useState("");
  const [fono, setFono] = useState("");
  const [isLaudo, setIsLaudo] = useState(false);
  const [laudo, setLaudo] = useState("");

  //limiares audiometricos
  const [monoE, setMonoE] = useState(0);
  const [dissE, setDissE] = useState(0);
  const [dbnaE, setDbnaE] = useState(0);
  const [srtE, setSrtE] = useState(0);
  const [monoD, setMonoD] = useState(0);
  const [dissD, setDissD] = useState(0);
  const [dbnaD, setDbnaD] = useState(0);
  const [srtD, setSrtD] = useState(0);

  const [setUsers] = useState({});

  // const db = getFirestore(firebaseApp);
  // const userColectionsRef = collection(db, "user");

  const DOptions = {
    title: "Audiometria",
    curveType: "function",
    legend: { position: "bottom" },
  };

  const exp = {
    title: "Teste",
    curveType: "function",
    legend: { position: "bottom" },
  };

  const [e1, setE1] = useState(1);
  const [e2, setE2] = useState(1);
  const [e3, setE3] = useState(1);
  const [e4, setE4] = useState(1);
  const [e5, setE5] = useState(1);
  const [e6, setE6] = useState(1);
  const [e7, setE7] = useState(1);
  const [e8, setE8] = useState(1);

  const [d1, setD1] = useState(1);
  const [d2, setD2] = useState(1);
  const [d3, setD3] = useState(1);
  const [d4, setD4] = useState(1);
  const [d5, setD5] = useState(1);
  const [d6, setD6] = useState(1);
  const [d7, setD7] = useState(1);
  const [d8, setD8] = useState(1);

  const Ddata = useMemo(
    () => [
      ["dB", "Esquerdo", "Direito"],
      ["0,25", e1, d1],
      ["0,5", e2, d2],
      ["1", e3, d3],
      ["2", e4, d4],
      ["3", e5, d5],
      ["4", e6, d6],
      ["6", e7, d7],
      ["8", e8, d8],
    ],
    [d1, d2, d3, d4, d5, d6, d7, d8, e1, e2, e3, e4, e5, e6, e7, e8]
  );

  const data = [
    ["Diameter", "Age"],
    [1, -200],
    [200, 1],
  ];

  const options = {
    title: "",
    hAxis: { title: "Diameter" },
    vAxis: { title: "Age" },
    legend: "none",
    trendlines: { 0: {} },
  };

  const [Dchart, setDChart] = useState(Ddata);

  // async function createUser() {
  //   try {
  //     const user = await addDoc(collection(db, "user"), {
  //       name,
  //       profession,
  //       insurance,
  //       requester,
  //       age,
  //       sex,
  //       dn,
  //       di,
  //       fono,
  //     });

  //     console.log("dados salvos com sucessos", user);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(userColectionsRef);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getUsers();
  // }, [setUsers, userColectionsRef]);

  useEffect(() => {
    setDChart(Ddata);
  }, [Ddata]);

  const handleFocus = (event) => event.target.select();
  return (
    <div className="register-wrapper">
      <div className="container">
        <div className="form-image">
          <div className="form-header">
            <div className="title">
              <h3>Dados</h3>
            </div>
          </div>
          <div className="group-forms-information">
            <div className="information-group">
              <div className="form-information">
                <label>Nome:</label>
                <p> {name}</p>
              </div>

              <div className="form-information">
                <label>Profissão: </label>
                <p>{profession}</p>
              </div>

              <div className="form-information">
                <label>Solicitante: </label>
                <p>{requester}</p>
              </div>

              <div className="form-information">
                <label>Convênio: </label>
                <p>{insurance}</p>
              </div>
            </div>

            <div className="information-group">
              <div className="form-information">
                <label>Idade: </label>
                <p>{age}</p>
              </div>
              <div className="form-information">
                <label>Sexo: </label>
                <p>
                  {sex === "masculine"
                    ? "Masculino"
                    : sex === "feminine"
                    ? "Feminino"
                    : "Outro"}
                </p>
              </div>
              <div className="form-information">
                <label>Nascimento: </label>
                <p>{dn}</p>
              </div>
              <div className="form-information">
                <label>Documento: </label>
                <p>{di}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="App">
            <div className="form-header">
              <div className="title">
                <h3>Gráficos</h3>
              </div>
            </div>
            <div className="charts">
              <Chart
                chartType="ScatterChart"
                width="80%"
                height="300px"
                data={Dchart}
                options={DOptions}
              />

              <table>
                <tr>
                  <h5>OE</h5>
                  <p>
                    IRF= {monoE} Mono: {dbnaE} dBNA {dissE} Diss: {dbnaE} dBNA{" "}
                  </p>
                  <p>SRT = {srtE} dBNA</p>
                </tr>
                <tr>
                  <h5>OR</h5>
                  <p>
                    IRF= {monoD} Mono: {dbnaD} dBNA {dissD} Diss: {dbnaD} dBNA{" "}
                  </p>
                  <p>SRT = {srtD} dBNA</p>
                </tr>
              </table>
            </div>
            <div className="laudo">
              <h4>Laudo e Observações: </h4>
              <p>{isLaudo ? laudo : "//"}</p>
            </div>
            <hr />

            <div className="title">
              <h3>Gráficos</h3>
            </div>

            <div className="charts">
              <Chart
                chartType="ScatterChart"
                width="80%"
                height="400px"
                data={data}
                options={options}
              />
            </div>
          </div>
        </div>

        <div className="form">
          <form action="#">
            <div className="form-header">
              <div className="title">
                <h3>Cadastro do usuário</h3>
              </div>
            </div>
            <div className="input-group">
              <div className="input-box">
                <label htmlFor="firstname">Nome</label>
                <input
                  onClick={(e) => e.select()}
                  id="firstname"
                  type="text"
                  name="firstname"
                  required
                  placeholder="Nome do pasciente"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input-box">
                <label htmlFor="profession">Profissão</label>
                <input
                  id="profession"
                  type="text"
                  name="profession"
                  placeholder="Profissão do pasciente"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label htmlFor="Requester">Solicitante</label>
                <input
                  id="Requester"
                  type="text"
                  name="Requester"
                  placeholder="Solicitante do exame"
                  value={requester}
                  onChange={(e) => setRequester(e.target.value)}
                />
              </div>

              <div className="input-box">
                <label htmlFor="HealthInsurance">Convênio</label>
                <input
                  id="HealthInsurance"
                  type="text"
                  placeholder="Convênio do pasciente"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                />
              </div>

              <div className="input-box">
                <label htmlFor="age">Idade</label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  placeholder="Idade do pasciente"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="input-box">
                <label htmlFor="DI">DI</label>
                <input
                  id="DI"
                  type="text"
                  value={di}
                  placeholder="Documento do pasciente"
                  onChange={(e) => setDi(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label htmlFor="fono">Fono</label>
                <input
                  id="fono"
                  type="text"
                  placeholder="Fono"
                  value={fono}
                  onChange={(e) => setFono(e.target.value)}
                />
              </div>

              <div className="input-box">
                <label htmlFor="sex">Sexo</label>
                <select
                  name="sex"
                  id="sex"
                  placeholder="Sexo do pasciente"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="masculine">Masculino</option>
                  <option value="feminine">Feminino</option>
                  <option value="other">Outro</option>
                </select>
              </div>
              <div className="input-box">
                <label htmlFor="DN">DN</label>
                <input
                  id="DN"
                  type="date"
                  placeholder=""
                  value={dn}
                  onChange={(e) => setDn(e.target.value)}
                />
              </div>
            </div>
            <div className="input-box">
              <label htmlFor="laudo">Laudar</label>
              <div className="gender-input">
                <input
                  id="laudo"
                  type="checkbox"
                  name="gender"
                  value={isLaudo}
                  onChange={() => setIsLaudo(!isLaudo)}
                />
                {console.log(isLaudo)}
                <label htmlFor="female">Laudar</label>
              </div>
              <input
                id="laudo"
                type="text"
                placeholder="Digite o laudo do pasciente"
                disabled={!isLaudo}
                value={laudo}
                onChange={(e) => setLaudo(e.target.value)}
              />
            </div>
            <div className="gender-inputs">
              <div className="gender-title">
                <h6>Exame</h6>
              </div>

              <div className="gender-group">
                <div className="gender-input">
                  <input id="female" type="checkbox" name="gender" />
                  <label htmlFor="female">Audiometria</label>
                </div>

                <div className="gender-input">
                  <input id="male" type="checkbox" name="gender" />
                  <label htmlFor="male">Impedanciometria</label>
                </div>
              </div>
            </div>
            <hr />
            <div className="form-header">
              <div className="title">
                <h3>Limiares Audiométricos</h3>
              </div>
            </div>
            <div className="spaces-inputs">
              <div className="inputs">
                <input
                  className="charts-inputs"
                  type="number"
                  name="0,25 "
                  placeholder="0,25"
                  onChange={(e) => {
                    setE1(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>

                <input
                  className="charts-inputs"
                  type="number"
                  name="0,5"
                  placeholder="0,5"
                  onChange={(e) => {
                    setE2(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>

                <input
                  className="charts-inputs"
                  type="number"
                  name="1"
                  placeholder="1"
                  onChange={(e) => {
                    setE3(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>

                <input
                  className="charts-inputs"
                  type="number"
                  name="2"
                  placeholder="2"
                  onChange={(e) => {
                    setE4(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>

                <input
                  className="charts-inputs"
                  type="number"
                  name="3"
                  placeholder="3"
                  onChange={(e) => {
                    setE5(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>

                <input
                  className="charts-inputs"
                  type="number"
                  name="4"
                  placeholder="4"
                  onChange={(e) => {
                    setE6(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>

                <input
                  className="charts-inputs"
                  type="number"
                  name="6"
                  placeholder="6"
                  onChange={(e) => {
                    setE7(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>

                <input
                  className="charts-inputs"
                  type="number"
                  name="8"
                  placeholder="8"
                  onChange={(e) => {
                    setE8(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>
              </div>

              <div className="inputsD">
                <input
                  className="charts-inputs"
                  type="number"
                  name="D25"
                  placeholder="0,25"
                  onChange={(e) => {
                    setD1(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>

                <input
                  className="charts-inputs"
                  type="number"
                  name="D5"
                  placeholder="0,5"
                  onChange={(e) => {
                    setD2(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>

                <input
                  className="charts-inputs"
                  type="number"
                  name="D1"
                  placeholder="1"
                  onChange={(e) => {
                    setD3(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>

                <input
                  className="charts-inputs"
                  type="number"
                  name="D2"
                  placeholder="2"
                  onChange={(e) => {
                    setD4(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>

                <input
                  className="charts-inputs"
                  type="number"
                  name="D3"
                  placeholder="3"
                  onChange={(e) => {
                    setD5(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>

                <input
                  className="charts-inputs"
                  type="number"
                  name="D4"
                  placeholder="4"
                  onChange={(e) => {
                    setD6(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>

                <input
                  className="charts-inputs"
                  type="number"
                  name="D6"
                  placeholder="6"
                  onChange={(e) => {
                    setD7(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>

                <input
                  className="charts-inputs"
                  type="number"
                  name="D8"
                  placeholder="8"
                  onChange={(e) => {
                    setD8(parseFloat(e.target.value));
                  }}
                  onFocus={handleFocus}
                ></input>
              </div>
            </div>
            <div className="spaces-inputs">
              <div className="limiares-inputs">
                <div className="limiar">
                  <label htmlFor="">IRF: </label>
                  <input
                    className="charts-inputs"
                    type="number"
                    name="mono "
                    onChange={(e) => {
                      setMonoE(parseFloat(e.target.value));
                    }}
                  ></input>
                  <label htmlFor="">% Mono</label>
                </div>
                <div className="limiar">
                  <input
                    className="charts-inputs"
                    type="number"
                    name="diss"
                    onChange={(e) => {
                      setDissE(parseFloat(e.target.value));
                    }}
                  ></input>
                  <label htmlFor="">% Diss</label>
                </div>
                <div className="limiar">
                  <input
                    className="charts-inputs"
                    type="number"
                    name="dBNA"
                    onChange={(e) => {
                      setDbnaE(parseFloat(e.target.value));
                    }}
                  ></input>
                  <label htmlFor="">dBNA</label>
                </div>
                <div className="limiar">
                  <label htmlFor="">SRT:</label>
                  <input
                    className="charts-inputs"
                    type="number"
                    name="SRT"
                    onChange={(e) => {
                      setSrtE(parseFloat(e.target.value));
                    }}
                  ></input>
                  <label htmlFor="">dBNA</label>
                </div>
              </div>
            </div>
            <div className="limiares-inputs">
              <div className="limiar">
                <label htmlFor="">IRF: </label>
                <input
                  className="charts-inputs"
                  type="number"
                  name="mono "
                  onChange={(e) => {
                    setMonoD(parseFloat(e.target.value));
                  }}
                ></input>
                <label htmlFor="">% Mono</label>
              </div>
              <div className="limiar">
                <input
                  className="charts-inputs"
                  type="number"
                  name="diss"
                  onChange={(e) => {
                    setDissD(parseFloat(e.target.value));
                  }}
                ></input>
                <label htmlFor="">% Diss</label>
              </div>
              <div className="limiar">
                <input
                  className="charts-inputs"
                  type="number"
                  name="dbna"
                  onChange={(e) => {
                    setDbnaD(parseFloat(e.target.value));
                  }}
                ></input>
                <label htmlFor="">dBNA</label>
              </div>
              <div className="limiar">
                <label htmlFor="">SRT:</label>
                <input
                  className="charts-inputs"
                  type="number"
                  name="srt"
                  onChange={(e) => {
                    setSrtD(parseFloat(e.target.value));
                  }}
                ></input>
                <label htmlFor="">dBNA</label>
              </div>
            </div>
            <hr />
            <div className="continue-button">
              <button>
                <a href="/google">Cadastrar</a>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
