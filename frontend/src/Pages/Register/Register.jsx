import { useEffect, useState, useMemo } from "react";
import "./Register.css";
import React from "react";
import { Chart } from "react-google-charts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LaudoPre } from "../../laudos/laudo";
import Axios from "axios";
import { Alert, AlertTitle } from "@mui/material";
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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  //limiares audiometricos
  const [monoE, setMonoE] = useState(0.0);
  const [dissE, setDissE] = useState(0.0);
  const [dbnaE, setDbnaE] = useState(0.0);
  const [srtE, setSrtE] = useState(0.0);
  const [monoD, setMonoD] = useState(0.0);
  const [dissD, setDissD] = useState(0.0);
  const [dbnaD, setDbnaD] = useState(0.0);
  const [srtD, setSrtD] = useState(0.0);

  // Impedanciometria
  const [pressaoE, setPressaoE] = useState(0);
  const [complE, setComplE] = useState(0);
  const [volumeE, setVolumeE] = useState(0);
  const [gradE, setGradE] = useState(0);
  const [fechaE, setFechaE] = useState(-200);

  const [pressaoD, setPressaoD] = useState(0);
  const [complD, setComplD] = useState(0);
  const [volumeD, setVolumeD] = useState(0);
  const [gradD, setGradD] = useState(0);
  const [fechaD, setFechaD] = useState(-200);

  const [contraLD1, setContraLD1] = useState(0);
  const [contraLD2, setContraLD2] = useState(0);
  const [contraLD3, setContraLD3] = useState(0);
  const [contraLD4, setContraLD4] = useState(0);
  const [contraLE1, setContraLE1] = useState(0);
  const [contraLE2, setContraLE2] = useState(0);
  const [contraLE3, setContraLE3] = useState(0);
  const [contraLE4, setContraLE4] = useState(0);

  const [ipsiD1, setIpsiD1] = useState(0);
  const [ipsiD2, setIpsiD2] = useState(0);
  const [ipsiD3, setIpsiD3] = useState(0);
  const [ipsiD4, setIpsiD4] = useState(0);
  const [ipsiE1, setIpsiE1] = useState(0);
  const [ipsiE2, setIpsiE2] = useState(0);
  const [ipsiE3, setIpsiE3] = useState(0);
  const [ipsiE4, setIpsiE4] = useState(0);

  const DOptions = {
    title: "Audiometria",
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

  function createData(OD, limit, OE) {
    return { OD, limit, OE };
  }

  function createData2(ipsiD, lateraisD, hertz, lateraisE, ipsiE) {
    return { ipsiD, lateraisD, hertz, lateraisE, ipsiE };
  }
  const rows = [
    createData(volumeD, "Volume (ml)", volumeE),
    createData(pressaoD, "Pressão(daPa)", pressaoE),
    createData(complD, "Complacência (ml)", complE),
    createData(gradD, "Gradiente (ml)", gradE),
  ];

  const rowsTable2 = [
    createData2(ipsiD1, contraLD1, 500, ipsiE1, contraLE1),
    createData2(ipsiD2, contraLD2, 1000, ipsiE2, contraLE2),
    createData2(ipsiD3, contraLD3, 2000, ipsiE3, contraLE3),
    createData2(ipsiD4, contraLD4, 4000, ipsiE4, contraLE4),
  ];
  const [Dchart, setDChart] = useState(Ddata);

  useEffect(() => {
    setDChart(Ddata);
  }, [Ddata]);

  const handleFocus = (event) => event.target.select();

  const handleClick = () => {
    setError("");
    setSuccess("");
    Axios.post("http://localhost:3001/register", {
      cpf: di,
      name: name,
      profession: profession,
      insurance: insurance,
      requester: requester,
      age: age,
      sex: sex,
      dn: dn,
      fono: fono,

      person_cpf: di,
      laudo: laudo,
      monoE: monoE,
      dissE: dissE,
      dbnaE: dbnaE,
      srtE: srtE,
      monoD: monoD,
      dbnaD: dbnaD,
      srtD: srtD,
      pressaoE: pressaoE,
      complE: complE,
      volumeE: volumeE,
      gradE: gradE,
      fechaE: fechaE,
      pressaoD: pressaoD,
      complD: complD,
      volumeD: volumeD,
      gradD: gradD,
      fechaD: fechaD,
      contraLD1: contraLD1,
      contraLD2: contraLD2,
      contraLD3: contraLD3,
      contraLD4: contraLD4,
      contraLE1: contraLE1,
      contraLE2: contraLE2,
      contraLE3: contraLE3,
      contraLE4: contraLE4,
      ipsiD1: ipsiD1,
      ipsiD2: ipsiD2,
      ipsiD3: ipsiD3,
      ipsiD4: ipsiD4,
      ipsiE1: ipsiE1,
      ipsiE2: ipsiE2,
      ipsiE3: ipsiE3,
      e1: e1,
      e2: e2,
      e3: e3,
      e4: e4,
      e5: e5,
      e6: e6,
      e7: e7,
      e8: e8,
      d1: d1,
      d2: d2,
      d3: d3,
      d4: d4,
      d5: d5,
      d6: d6,
      d7: d7,
      d8: d8,
    }).then(function (response) {
      if (response.data.errno === 1062) {
        setError("CPF já cadastrada verifique!");
      } else if (response.data.serverStatus === 2) {
        setSuccess("Cadastrado com sucesso");
      }
    });
  };

  return (
    <>
      {" "}
      <div className="register-wrapper">
        <div className="container">
          <div className="form-image">
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success">
                <AlertTitle>Sucesso</AlertTitle>
                {success}
              </Alert>
            )}
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

                <Chart
                  chartType="ScatterChart"
                  width="80%"
                  height="400px"
                  data={data}
                  options={options}
                />
              </div>
            </div>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>OE</TableCell>

                    <TableCell align="center">Medidas de Limitância</TableCell>
                    <TableCell align="center">OE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.limit}>
                      <TableCell component="th" scope="row">
                        {row.OD}
                      </TableCell>
                      <TableCell align="center">{row.limit}</TableCell>
                      <TableCell align="center">{row.OE}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="reflexos-warpper">
              <div className="title">
                <h3>Reflexos estapedianos (dBNA)</h3>
              </div>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>ipsi-laterais</TableCell>
                      <TableCell align="center">Contra-laterais</TableCell>
                      <TableCell align="center">Hertz</TableCell>
                      <TableCell align="center">ipsi-laterais</TableCell>
                      <TableCell align="center">Contra-laterais</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsTable2.map((row) => (
                      <TableRow key={row.hertz}>
                        <TableCell component="th" scope="row">
                          {row.ipsiD}
                        </TableCell>
                        <TableCell align="center">{row.lateraisD}</TableCell>
                        <TableCell align="center">{row.hertz}</TableCell>
                        <TableCell align="center">{row.lateraisE}</TableCell>
                        <TableCell align="center">{row.ipsiE}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
                  <label htmlFor="female">Laudar</label>
                </div>
                <select
                  name="laudo"
                  id="laudo"
                  onChange={(e) => setLaudo(e.target.value)}
                  disabled={!isLaudo}
                >
                  {LaudoPre.map((l) => {
                    return <option value={l.audiometria}>{l.name}</option>;
                  })}
                </select>
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
                    step= "any"
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
                    step= "any"
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
                    step= "any"
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
                    step= "any"
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
                    step= "any"
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
                    step= "any"
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
                    step= "any"
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
                    step= "any"
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
                    step= "any"
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
                    step= "any"
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
                    step= "any"
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
                    step= "any"
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
                    step= "any"
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
                    step= "any"
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
                    step= "any"
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
                    step= "any"
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

              <div className="title">
                <h3>Cadastrar Impedanciometria</h3>

                <div className="impedanciometria-inputs">
                  <label htmlFor="">OE: </label>
                  <div className="Impedanciometria">
                    <label htmlFor=""> Pressão</label>
                    <input
                      className="charts-inputs"
                      type="number"
                      name="pressao "
                      onChange={(e) => {
                        setPressaoE(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <label htmlFor="">Compl.</label>
                    <input
                      className="charts-inputs"
                      type="number"
                      name="compl"
                      onChange={(e) => {
                        setComplE(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <label htmlFor="">Volume</label>
                    <input
                      className="charts-inputs"
                      type="number"
                      name="volume"
                      onChange={(e) => {
                        setVolumeE(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <label htmlFor="">Grad.</label>
                    <input
                      className="charts-inputs"
                      type="grad"
                      name="srt"
                      onChange={(e) => {
                        setGradE(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <label htmlFor="">Fecha</label>
                    <input
                      className="charts-inputs"
                      type="number"
                      name="fecha"
                      value={fechaE}
                      onChange={(e) => {
                        setFechaE(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                </div>
                <div className="impedanciometria-inputs">
                  <label htmlFor="">OD: </label>
                  <div className="Impedanciometria">
                    <label htmlFor=""> Pressão</label>
                    <input
                      className="charts-inputs"
                      type="number"
                      name="pressaoD "
                      onChange={(e) => {
                        setPressaoD(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <label htmlFor="">Compl.</label>
                    <input
                      className="charts-inputs"
                      type="number"
                      name="complD"
                      onChange={(e) => {
                        setComplD(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <label htmlFor="">Volume</label>
                    <input
                      className="charts-inputs"
                      type="number"
                      name="volumeD"
                      onChange={(e) => {
                        setVolumeD(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <label htmlFor="">Grad.</label>
                    <input
                      className="charts-inputs"
                      type="gradD"
                      name="srt"
                      onChange={(e) => {
                        setGradD(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <label htmlFor="">Fecha</label>
                    <input
                      className="charts-inputs"
                      type="number"
                      name="fechaD"
                      value={fechaD}
                      onChange={(e) => {
                        setFechaD(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                </div>
              </div>

              <div className="title">
                <div className="impedanciometria-inputs">
                  <label htmlFor=""> Contra Laterias - Direito</label>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais contra-laterais"
                      type="number"
                      name="contraLD "
                      placeholder="500"
                      onChange={(e) => {
                        setContraLD1(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais"
                      type="number"
                      name="contraLD"
                      placeholder="1000"
                      onChange={(e) => {
                        setContraLD2(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais"
                      type="number"
                      name="contraLD3"
                      placeholder="2000"
                      onChange={(e) => {
                        setContraLD3(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais"
                      type="number"
                      name="contraLD4"
                      placeholder="4000"
                      onChange={(e) => {
                        setContraLD4(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                </div>
                <div className="impedanciometria-inputs">
                  <label htmlFor=""> Contra Laterias - Esque.</label>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais contra-laterais"
                      type="number"
                      name="contraLE "
                      placeholder="500"
                      onChange={(e) => {
                        setContraLE1(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais"
                      type="number"
                      name="contraLE"
                      placeholder="1000"
                      onChange={(e) => {
                        setContraLE2(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais"
                      type="number"
                      name="contraLE3"
                      placeholder="2000"
                      onChange={(e) => {
                        setContraLE3(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais"
                      type="number"
                      name="contraLE4"
                      placeholder="4000"
                      onChange={(e) => {
                        setContraLE4(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="title">
                <div className="impedanciometria-inputs">
                  <label htmlFor=""> IPSI Laterias - Esque.</label>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais contra-laterais"
                      type="number"
                      name="ipsiD1 "
                      placeholder="500"
                      onChange={(e) => {
                        setIpsiD1(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais"
                      type="number"
                      name="ipsiD2"
                      placeholder="1000"
                      onChange={(e) => {
                        setIpsiD2(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais"
                      type="number"
                      name="ipasiD3"
                      placeholder="2000"
                      onChange={(e) => {
                        setIpsiD3(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais"
                      type="number"
                      name="ipsiD4"
                      placeholder="4000"
                      onChange={(e) => {
                        setIpsiD4(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                </div>
                <div className="impedanciometria-inputs">
                  <label htmlFor=""> IPSI Laterias - Esque.</label>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais contra-laterais"
                      type="number"
                      name="ipsiE1 "
                      placeholder="500"
                      onChange={(e) => {
                        setIpsiE1(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais"
                      type="number"
                      name="ipsiE2"
                      placeholder="1000"
                      onChange={(e) => {
                        setIpsiE2(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais"
                      type="number"
                      name="ipsiE3"
                      placeholder="2000"
                      onChange={(e) => {
                        setIpsiE3(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <input
                      className="charts-inputs contra-laterais"
                      type="number"
                      name="ipsiE4"
                      placeholder="4000"
                      onChange={(e) => {
                        setIpsiE4(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="continue-button">
                <button onClick={handleClick}>
                  <p>Cadastrar</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
