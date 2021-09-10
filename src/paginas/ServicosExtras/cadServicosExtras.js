import React, { useState, useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./cadServicosExtras.css";
import 'moment/locale/pt-br.js';
import { DatePickerInput } from 'rc-datepicker'; //DatePicker, 
import 'rc-datepicker/lib/style.css';
import { useHistory } from "react-router";
import { connect } from "react-redux";
import UkApi from "../../ukApi";
import {ComboClientes, ComboTiposServicos} from '../../components/CombosUnik'
import imglogo from "../../img/logoemp.png";

const ServicosExtras = (props) => {
   const initialValue = {
      idse : null,
      cliente : "",
      tpservico: "",
      descdoc: "",
      detalhescob: "",
      valorservico: "0.00",
      desconto: "0.00",
      valcomdesconto: "0.00",
      cobrarcliente: "Sim",
      dtsolicitacao: "",
      username: props.username,
      urlBase: props.urlBase,
      codusuario: props.dados.codusuario,
      deptousuario: props.dados.deptousuario,
      deptonome: props.dados.deptonome,
      emailusuario: props.dados.emailusuario,
      nomeusuario: props.dados.nomeusuario,
      responsavel: props.dados.responsavel   
      };
   const [values, setValues] = useState(initialValue);
   const [listCli, setListCli] = useState([]);
   const [dtSolicit, setDtSolicit] = useState(new Date());
   const [chkCobrarcliente, setChkCobrarcliente] = useState(true);
   const [servicoSalvo, setServicoSalvo] = useState(false);
   const [listServExtras, setListServExtras] = useState([]);
   const history = useHistory();
    
   const  carregaListas = async () => {
      setListServExtras([]);
      let res1 = await UkApi.apiTiposServicosExtras();
      setListServExtras(res1);

      setListCli([]);
      let res2 = await UkApi.apiClientes();
      setListCli(res2);
   }  

   useEffect(()=>{
       carregaListas();
      },[]);

   const  salvarDados = async () => {
      values.dtsolicitacao =
      ( dtSolicit.getDate()<10 
      ? '0'+(dtSolicit.getDate()) 
      : ''+(dtSolicit.getDate()))+'/'+
      ( dtSolicit.getMonth()+1<10 
         ? '0'+(dtSolicit.getMonth()+1) 
         : ''+(dtSolicit.getMonth()+1))+'/'+
         dtSolicit.getFullYear();
      
      let se = values;
      se.cobrarcliente = chkCobrarcliente ? "Sim": "Nao";
      let res = await UkApi.apiSalvaServicoExtra( se );
      //console.log("retorno apiSalvar: ", res);
      //console.log("tamanho: ", res.length);
      setServicoSalvo(res.length >= 1);
      if(res.length >= 1){
         setServicoSalvo(true);
         alert("Serviço Extra Salvo com Sucesso !!!");
         values.descdoc = "";
         values.detalhescob =  "";
         values.valorservico =  "0.00";
         values.desconto =  "0.00";
         values.valcomdesconto =  "0.00";
         setValues(values);
         history.replace("/ServicosExtras");
         return;
      } else {
         alert("Houve problemas na gravação, verifique os dados antes de salvar");
      };
   }

      function onSubmit (ev) {
         ev.preventDefault();
         console.log("values", values);
         let camposVazios = "";
         if(values.cliente === null) {
            camposVazios = camposVazios + "cliente/";
         }
         if(values.tpservico === null){
            camposVazios = camposVazios + "tipo de serviço/";
         }
         if(parseFloat(values.valorservico) <= 0){
            camposVazios = camposVazios + "valor dos serviços/";
         }
         console.log("elemento", document.getElementById("nmusuario"));
         if(camposVazios === "" ){
            salvarDados();
            console.log("servico salvo", servicoSalvo);
            let cli = values.cliente;
            let tps = values.tpservico;
            let cob = values.cobrarcliente;
            setValues(initialValue);
            values.cliente = cli;
            values.tpservico = tps;
            values.cobrarcliente = cob;
            //document.getElementById('cliente').value = values.cliente;
            //document.getElementById('tpservico').value = values.tpservico;
            setValues(values);
         } else {
            alert('Os campos '+camposVazios+" precisam ser preenchidos !");
         }
   }

   function onChangeChk(ev){
      if(ev.target.checked){
         setChkCobrarcliente(true);
         console.log("cobrar ", chkCobrarcliente); 
      } else {
         setChkCobrarcliente(false);
         console.log("cobrar ", chkCobrarcliente); 
      }
   }

   function onChangeSel(ev) {
      setValues({...values, [ev.name]: ev.value });
   }

   function onChangeData(jsDate, dateString) {
          setDtSolicit(jsDate);
   }

    function onChange(ev) {
       const {name,  value} = ev.target;
       if(name === "valorservico"){
         value === "" ? values.valorservico = parseFloat("0.00").toFixed(2) : values.valorservico = parseFloat(value).toFixed(2);
       }
       if(name === "desconto"){
         value === "" ? values.desconto = parseFloat("0.00").toFixed(2) : values.desconto = parseFloat(value).toFixed(2);
       }

       let vValDesc =  values.valorservico * (values.desconto / 100); 

       values.valcomdesconto = (values.valorservico - vValDesc).toFixed(2);

       //console.log("Valores: ", values);
       setValues({...values, [name]: value });
    }

   return (
     <form onSubmit={onSubmit}>
      <div className="container">
         <div className="formulario">
            <div className="formulario-logo">
                <img className="formulario-imagem" src={imglogo} alt="imglogin"/>
            </div>
            <div className="formulario-titulo">
               <h3>Lançamento dos Serviços Extras</h3>
            </div>
            <div className="formulario-conteudo">
            <div className="campo-lado-a-lado">
                <div className="campo">
                   <label>Usuario</label>
                   <input name="nmusuario" id="nmusuario" type="text" className="form-control"
                              value={props.dados.nomeusuario}  disabled/>
                </div>
                <div className="campo">
                  <label>Departamento</label>
                  <input name="nmdepto" id="nmdepto" type="text" className="form-control"
                              value={props.dados.deptonome}  disabled/>
                </div>
                <div className="campo">
                  <label>Data Emissão</label>
                     <DatePickerInput
                           displayFormat='DD/MM/YYYY'
                           returnFormat='YYYY-MM-DD'
                           onChange={onChangeData}
                           value={dtSolicit}
                           name="dtsolicitacao" 
                           id="dtsolicitacao"
                           className='my-custom-datepicker-component'
                           showOnInputClick
                           locale='pt-br' 
                        />
                </div>
            </div>
          
            <div className="campo-lado-a-lado">
                <div className="campo-cliente">
                   <label htmlFor="edtcliente">Informe o cliente</label>
                   <ComboClientes lista={listCli} id="edtcliente" name="edtcliente"  className="selcliente form-control"
                           onChange={onChangeSel}  value={values.cliente}/>
                </div>
                <div className="campo-cliente">
                  <label htmlFor="edttpservico">Tipo do Serviço</label>
                  <ComboTiposServicos lista={listServExtras} id="edttpservico" name="edttpservico"  className="selcliente form-control"
                                    onChange={onChangeSel} value={values.tpservico}/>
                </div>
            </div>

            <div className="campo">
                   <label htmlFor="descdoc">Descrição dos Documentos</label>
                   <div className="campo-lado-a-lado">
                      <textarea rows="8" cols="75" maxLength="500" name="descdoc" id="descdoc" className="form-control"
                               placeholder="informe os documentos"  onChange={onChange}   value={values.descdoc}  required={true}/>
                   </div>
            </div>

            <div className="campo">
               <label htmlFor="detalhescob">Detalhes da Cobrança</label>
               <div className="campo-lado-a-lado">
                   <textarea rows="4" cols="75" maxLength="500" name="detalhescob" id="detalhescob" className="form-control"
                            placeholder="informe os detalhe de cobrança"  onChange={onChange} value={values.detalhescob}/>
               </div>
            </div>
            <div className="campo-lado-a-lado">
               <div className="campo">
                  <div className="campo custom-control  custom-checkbox">
                     <input type="checkbox" className="custom-control-input" checked={chkCobrarcliente} value={chkCobrarcliente} id="cobrarcliente" name="cobrarcliente" 
                              onChange={onChangeChk}/>
                     <label className="custom-control-label" htmlFor="cobrarcliente">Cliente deve ser cobrado</label>
                  </div>
                </div>
            </div>          
            <div className="campo-lado-a-lado">
               <div className="campo">
                        <label htmlFor="valorservico">Valor dos Serviços</label>
                        <input name="valorservico" id="valorservico" type="number" className="form-control"
                        onChange={onChange} value={values.valorservico}/>
               </div>
               <div className="campo">
                        <label htmlFor="desconto">% de Desconto</label>
                        <input name="desconto" id="desconto" type="number" className="form-control"
                        onChange={onChange}   value={values.desconto}/>
               </div>
               <div className="campo">
                        <label>Valor com Desconto</label>
                        <input name="valcomdesconto" id="valcomdesconto" type="number" className="form-control"
                              onChange={onChange} value={values.valcomdesconto}  disabled/>
               </div>
            </div>
            </div>
            <div className="formulario-botao">
                  <button type="submit" className="btn btn-primary btn-lg px-4 gap-3">
                        Salvar
                   </button>
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
export default connect(mapStateToProps)(ServicosExtras);