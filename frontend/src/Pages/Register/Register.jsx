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
import { proficioes } from "../../laudos/proficioes";
import { solicitantes } from "../../laudos/solicitantes";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export const Register = () => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [insurance, setInsurance] = useState("");
  const [requester, setRequester] = useState("");
  const [age] = useState(0);
  const [sex, setSex] = useState("");
  const [dn, setDn] = useState("");
  const [di, setDi] = useState("");
  const [fono, setFono] = useState("");
  const [isLaudo, setIsLaudo] = useState(false);
  const [laudo, setLaudo] = useState("");
  const [borning, setBorning] = useState("");
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

  const [e1, setE1] = useState(0.0);
  const [e2, setE2] = useState(0.0);
  const [e3, setE3] = useState(0.0);
  const [e4, setE4] = useState(0.0);
  const [e5, setE5] = useState(0.0);
  const [e6, setE6] = useState(0.0);
  const [e7, setE7] = useState(0.0);
  const [e8, setE8] = useState(0.0);

  const [d1, setD1] = useState(0.0);
  const [d2, setD2] = useState(0.0);
  const [d3, setD3] = useState(0.0);
  const [d4, setD4] = useState(0.0);
  const [d5, setD5] = useState(0.0);
  const [d6, setD6] = useState(0.0);
  const [d7, setD7] = useState(0.0);
  const [d8, setD8] = useState(0.0);

  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    if (dn !== "") {
      const dataAux = dn?.split("-");
      setBorning(dataAux[2] + "/" + dataAux[1] + "/" + dataAux[0]);
    }
  }, [dn]);
  const handleFocus = (event) => event.target.select();

  const handleClick = (event) => {
    setOpen(true);
    event.preventDefault();

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
    });
  };

  function searchPerson(cpf) {
    Axios.get(`http://localhost:3001/person/${cpf}`, { cpf: cpf }).then(
      function (response) {
        if (response.data) {
          setDi(cpf);
          setDn(response.data[0].dn);
          setFono(response.data[0].fono);
          setInsurance(response.data[0].insurance);
          setName(response.data[0].name);
          setProfession(response.data[0].profession);
          setRequester(response.data[0].requester);
          setSex(response.data[0].sex);
        }
      }
    );
  }

  function searchPersonExam(cpf, idExam) {
    Axios.get(`http://localhost:3001/person/${cpf}`, { cpf: cpf }).then(
      function (response) {
        if (response.data) {
          setDi(cpf);
          setDn(response.data[0].dn);
          setFono(response.data[0].fono);
          setInsurance(response.data[0].insurance);
          setName(response.data[0].name);
          setProfession(response.data[0].profession);
          setRequester(response.data[0].requester);
          setSex(response.data[0].sex);
        }
      }
    );

    Axios.get(`http://localhost:3001/exam/${cpf}`, { cpf: cpf }).then(function (
      response
    ) {
      if (response.data) {
        var filterExam = response.data.filter(
          (item) => item.id === parseInt(idExam)
        );

        setIsLaudo(true);
        setComplD(filterExam[0].complD);
        setComplE(filterExam[0].complE);
        setContraLD1(filterExam[0].contraLD1);
        setContraLD2(filterExam[0].contraLD2);
        setContraLD3(filterExam[0].contraLD3);
        setContraLD4(filterExam[0].contraLD4);
        setContraLE1(filterExam[0].contraLE1);
        setContraLE2(filterExam[0].contraLE2);
        setContraLE3(filterExam[0].contraLE3);
        setContraLE4(filterExam[0].contraLE4);
        setD1(parseFloat(filterExam[0].d1));
        setD2(parseFloat(filterExam[0].d2));
        setD3(parseFloat(filterExam[0].d3));
        setD4(parseFloat(filterExam[0].d4));
        setD5(parseFloat(filterExam[0].d5));
        setD6(parseFloat(filterExam[0].d6));
        setD7(parseFloat(filterExam[0].d7));
        setD8(parseFloat(filterExam[0].d8));
        setE1(parseFloat(filterExam[0].e1));
        setE2(parseFloat(filterExam[0].e2));
        setE3(parseFloat(filterExam[0].e3));
        setE4(parseFloat(filterExam[0].e4));
        setE5(parseFloat(filterExam[0].e5));
        setE6(parseFloat(filterExam[0].e6));
        setE7(parseFloat(filterExam[0].e7));
        setE8(parseFloat(filterExam[0].e8));
        setDbnaD(filterExam[0].dbnaD);
        setDbnaE(filterExam[0].dbnaE);
        setDissE(filterExam[0].dissE);
        setFechaD(filterExam[0].fechaD);
        setFechaE(filterExam[0].fechaE);
        setGradD(filterExam[0].gradD);
        setGradE(filterExam[0].gradE);
        setIpsiD1(parseFloat(filterExam[0].ipsiD1));
        setIpsiD2(parseFloat(filterExam[0].ipsiD2));
        setIpsiD3(parseFloat(filterExam[0].ipsiD3));
        setIpsiD4(parseFloat(filterExam[0].ipsiD4));
        setIpsiE1(parseFloat(filterExam[0].ipsiE1));
        setIpsiE2(parseFloat(filterExam[0].ipsiE2));
        setIpsiE3(parseFloat(filterExam[0].ipsiE3));
        setLaudo(filterExam[0].laudo);
        setMonoD(filterExam[0].monoD);
        setMonoE(filterExam[0].monoE);
        setPressaoD(filterExam[0].pressaoD);
        setPressaoE(filterExam[0].pressaoE);
        setSrtD(filterExam[0].srtD);
        setSrtE(filterExam[0].srtE);
        setVolumeD(filterExam[0].volumeD);
        setVolumeE(filterExam[0].volumeE);
      }
    });
  }

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cpf = searchParams.get("cpf");
  const idExam = searchParams.get("id");

  useEffect(() => {
    if (cpf) {
      searchPersonExam(cpf, idExam);
    }
  }, []);

  return (
    <>
      {" "}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Exame registrado!</DialogTitle>
      </Dialog>
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
                  <p>{borning}</p>
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
                    <h5>OD</h5>
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
                    <TableCell align="center">OD</TableCell>
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
                  <label htmlFor="DI">Documento</label>
                  <input
                    id="DI"
                    type="text"
                    value={di}
                    placeholder="Documento do pacien"
                    onChange={(e) => setDi(e.target.value)}
                  />
                  <button onClick={() => searchPerson(di)}>+</button>
                </div>
                <div className="input-box">
                  <label htmlFor="firstname">Nome</label>
                  <input
                    onClick={(e) => e.select}
                    id="firstname"
                    type="text"
                    name="firstname"
                    required
                    placeholder="Nome do pacien"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="Requester">Profissão</label>
                  <select
                    id="profession"
                    type="text"
                    name="profession"
                    placeholder="Profissão do paciente"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                  >
                    {proficioes.map((name) => {
                      return <option value={name}>{name}</option>;
                    })}
                  </select>
                </div>
                <div className="input-box">
                  <label htmlFor="Requester">Solicitante</label>
                  <select
                    id="Requester"
                    type="text"
                    name="Requester"
                    placeholder="Solicitante do exame"
                    value={requester}
                    onChange={(e) => setRequester(e.target.value)}
                  >
                    {solicitantes.map((name) => {
                      return <option value={name}>{name}</option>;
                    })}
                  </select>
                </div>

                <div className="input-box">
                  <label htmlFor="HealthInsurance">Convênio</label>
                  <input
                    id="HealthInsurance"
                    type="text"
                    placeholder="Convênio do pacien"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
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
                    placeholder="Sexo do pacien"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    defaultChecked={"other"}
                  >
                    <option value="" data-default disabled selected></option>
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
                    placeholder="0,25"
                    onChange={(e) => {
                      setE1(parseFloat(e.target.value));
                    }}
                    onFocus={handleFocus}
                    value={e1}
                    defaultValue={e1}
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
                    value={e2}
                    defaultValue={e2}
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
                    value={e3}
                    defaultValue={e3}
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
                    value={e4}
                    defaultValue={e4}
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
                    value={e5}
                    defaultValue={e5}
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
                    value={e6}
                    defaultValue={e6}
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
                    value={e7}
                    defaultValue={e7}
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
                    value={e8}
                    defaultValue={e8}
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
                    value={d1}
                    defaultValue={d1}
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
                    value={d2}
                    defaultVlue={d2}
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
                    value={d3}
                    defaultValue={d3}
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
                    value={d4}
                    DefaultValue={d4}
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
                    value={d5}
                    DefaultValue={d5}
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
                    value={d6}
                    defaultValue={d6}
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
                    value={d7}
                    defaultValue={d7}
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
                    value={d8}
                    defaultValue={d8}
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
                      value={monoE}
                      defaultValue={monoE}
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
                      value={dissE}
                      defaultValue={dissE}
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
                      value={dbnaE}
                      defaultValue={dbnaE}
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
                      value={srtE}
                      defaultValue={srtE}
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
                    value={monoD}
                    defaultValue={monoD}
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
                    value={dissD}
                    defaultValue={dissD}
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
                    value={dbnaD}
                    defaultValue={dbnaD}
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
                    value={srtD}
                    defaultValue={srtD}
                  ></input>
                  <label htmlFor="">dBNA</label>
                </div>
              </div>
              <hr />

              <div className="title">
                <h3>Cadastrar Impedanciometria</h3>

                <div className="impedanciometria-inputs">
                  <label htmlFor="">OD: </label>
                  <div className="Impedanciometria">
                    <label htmlFor=""> Pressão</label>
                    <input
                      className="charts-inputs"
                      type="number"
                      name="pressaoE"
                      onChange={(e) => {
                        setPressaoE(parseFloat(e.target.value));
                      }}
                      value={pressaoE}
                      defaultValue={pressaoE}
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
                      value={complE}
                      defaultValue={complE}
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
                      value={volumeE}
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
                      value={gradE}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <label htmlFor="">Fecha</label>
                    <input
                      className="charts-inputs"
                      type="number"
                      name="fecha"
                      defaultValue={fechaE}
                      onChange={(e) => {
                        setFechaE(parseFloat(e.target.value));
                      }}
                    ></input>
                  </div>
                </div>
                <div className="impedanciometria-inputs">
                  <label htmlFor="">OE: </label>
                  <div className="Impedanciometria">
                    <label htmlFor=""> Pressão</label>
                    <input
                      className="charts-inputs"
                      type="number"
                      name="pressaoD "
                      onChange={(e) => {
                        setPressaoD(parseFloat(e.target.value));
                      }}
                      value={pressaoD}
                      defaultValue={pressaoD}
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
                      value={complD}
                      defaultValue={complD}
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
                      value={volumeD}
                      defaultValue={volumeD}
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
                      value={gradD}
                      defaultValue={gradD}
                    ></input>
                  </div>
                  <div className="Impedanciometria">
                    <label htmlFor="">Fecha</label>
                    <input
                      className="charts-inputs"
                      type="number"
                      name="fechaD"
                      value={fechaD}
                      defaultValue={fechaD}
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
                      value={contraLD1}
                      defaultValue={contraLD1}
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
                      value={contraLD2}
                      defaultValue={contraLD2}
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
                      value={contraLD3}
                      defaultValue={contraLD3}
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
                      value={contraLD4}
                      defaultValue={contraLD4}
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
                      value={contraLE1}
                      defaultValue={contraLE1}
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
                      value={contraLE2}
                      defaultValue={contraLE2}
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
                      value={contraLE3}
                      defaultValue={contraLE3}
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
                      value={contraLE4}
                      defaultValue={contraLE4}
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
                      value={ipsiD1}
                      defaultValue={ipsiD1}
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
                      value={ipsiD2}
                      defaultValue={ipsiD2}
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
                      value={ipsiD3}
                      defaultValue={ipsiD3}
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
                      value={ipsiD4}
                      defaultValue={ipsiD4}
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
                      value={ipsiE1}
                      defaultValue={ipsiE1}
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
                      value={ipsiE2}
                      defaultValue={ipsiE2}
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
                      value={ipsiE3}
                      defaultValue={ipsiE3}
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
                      value={ipsiE4}
                      defaultValue={ipsiE4}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="continue-button">
                <button onClick={(e) => handleClick(e)}>
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
