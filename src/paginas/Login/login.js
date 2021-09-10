import React, { useState } from "react";//import { push } from 'react-router-redux';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { UserContext } from "../../contexts/UserContext";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

//import { Base64 } from 'js-base64';
import "./login.css";

import { MdPerson, MdLock } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";

import imglogin from "../../img/logoemp.png";
const Login = (props) => {
   const initialValue = {
      username: "",
      password: "",
      //QuickSRV
      urlBase: props.urlBase,  //"http://localhost:3001/api/"
      dados: {
                      codusuario: "",
                      deptonome: "",
                      deptousuario: "",
                      emailusuario: "",
                      nomeusuario: "",
                      responsavel: ""
      }
   }
   
   const [values, setValues] = useState(initialValue);
   const [show, setShow] = useState(false);
   const [msgResp, setMsgResp] = useState("");
   UserContext.values = {urlBase: props.urlBase};

   //QuickSRV
   let history = useHistory();

   const handleClick = (e) => {
      e.preventDefault()
      setShow(!show);
   }

    async function onSubmit (ev) {
         ev.preventDefault();
         try {
            const cabe = new Headers([]);
            const pathApi = `${props.urlBase}validausuario`;
            await fetch(pathApi,
               {
                  method: 'POST',
                  mode: "cors",
                  headers: cabe,
                  body: JSON.stringify(values)
               } )
               .then(function (response){ 
                  return response.json();})
              .then(function(resp){
                  setMsgResp(""+resp.mensage);
                  if(resp.status === "ok"){
                     values.dados = resp.dados;
                     props.setUser(values);
                     history.replace("/ServicosExtras");
                     return true;
                  } else{
                     alert("Usuario ou senha invalida !");
                     history.replace("/");
                     return false;
                  }
              })
              .catch(function(erro){
                 console.log( erro);
               });
            } catch (err) {
                 console.log(err)
         }
         return true;
   }

    function onChange(ev) {
       const {name,  value} = ev.target;
       setValues({...values, [name]: value });
    }

   return (
     <form onSubmit={onSubmit}>
      <div className="logincontainer">
        <div className="loginform">
        <div className="loginform-cabe">
          <div className="loginform-logo">
            <img src={imglogin} alt="imglogin"/>
          </div>
          <div className="loginform-logo">
          <h1>Acessar Serviços Extras</h1>
          </div>
      </div>

            <div className="loginform-InputEmail">
               <MdPerson />
               <input
                  name="username"
                  id="username"
                  type="text"
                  placeholder="Digite o Usuario"
                  onChange={onChange}
                  className="form-control" 
               />
            </div>

            <div className="loginform-InputPassword">
               <MdLock />
               <input
                  name="password"
                  id="password"
                  placeholder="Digite sua Senha"
                  type={show ? "text" : "password"}
                  onChange={onChange}
                  className="form-control" 
               />
               <div className="loginform-eye">
                  {show ? (
                     <HiEye
                        size={10}
                        onClick={handleClick}
                     />
                  ) : (
                        <HiEyeOff
                           size={10}
                           onClick={handleClick}
                        />
                     )}
               </div>
            </div>

            <button type="submit"   className="btn btn-primary btn-lg px-4 gap-3" >
               Entrar
            </button>

            <div className="mensagem">
               <h3>{msgResp}</h3>
            </div>
         </div>
      </div>
      </form>
   )
}
const mapStateToProps = (state) =>{
return {
         username: state.usuariologado.username,
         urlBase: state.usuariologado.urlBase,
         dados: state.usuariologado.dados 
      };
};
const mapDispatchToProps = (dispatch) => {
      return {
         setUser: (newUser) => dispatch({
            type: 'SET_USUARIO',
            payload: {usuariologado: newUser}
         })
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);