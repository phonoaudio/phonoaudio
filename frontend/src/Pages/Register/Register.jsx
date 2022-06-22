import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

import medicImg from "../../assets/img/undraw_medicine_b1ol.png";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyD_pahCxTTouGrHa4eJSoYXgesj1xVN47U",
  authDomain: "phonoaudio.firebaseapp.com",
  projectId: "phonoaudio",
});

export const Register = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState(0);
  const [email, setEmail] = useState("");
  const [dados, setDados] = useState("");
  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const userColectionsRef = collection(db, "user");

  async function createUser() {
    try {
      const user = await addDoc(collection(db, "user"), {
        name,
        cpf,
        dados,
        email,
      });

      console.log("dados salvos com sucessos", user);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userColectionsRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <div className="register-wrapper">
      <div className="container">
        <div className="form-image">
          <img src={medicImg} alt="" />
        </div>
        <div className="form">
          <form action="#">
            <div className="form-header">
              <div className="title">
                <h1>Cadastro do usuário</h1>
              </div>
              <div className="login-button">
                <Link to="/graph"> Gráficos</Link>
              </div>
            </div>

            <div className="input-group">
              <div className="input-box">
                <label htmlFor="firstname">Primeiro Nome</label>
                <input
                  id="firstname"
                  type="text"
                  name="firstname"
                  required
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input-box">
                <label htmlFor="lastname">Endereço</label>
                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  placeholder="Digite seu Endereço"
                  // value={}
                  // onChange={(e) => setName(name + " " + e.target.value)}
                />
              </div>
              <div className="input-box">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-box">
                <label htmlFor="number">CPF</label>
                <input
                  id="number"
                  type="number"
                  placeholder="xxx.xxx.xxx-xx"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>

              <div className="input-box">
                <label>Dados do paciente</label>
                <textarea
                  id=""
                  type="text"
                  name="confirmPassword"
                  placeholder=""
                  value={dados}
                  onChange={(e) => setDados(e.target.value)}
                />
              </div>
            </div>

            <div className="gender-inputs">
              <div className="gender-title">
                <h6>Gênero</h6>
              </div>

              <div className="gender-group">
                <div className="gender-input">
                  <input id="female" type="radio" name="gender" />
                  <label htmlFor="female">Feminino</label>
                </div>

                <div className="gender-input">
                  <input id="male" type="radio" name="gender" />
                  <label htmlFor="male">Masculino</label>
                </div>

                <div className="gender-input">
                  <input id="others" type="radio" name="gender" />
                  <label htmlFor="others">Outros</label>
                </div>

                <div className="gender-input">
                  <input id="none" type="radio" name="gender" />
                  <label htmlFor="none">Prefiro não dizer</label>
                </div>
              </div>
            </div>

            <div className="continue-button">
              <button onClick={createUser}>
                <a href="/google">Continuar</a>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
