import React, { useState, useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import "./listagemSE.css";
import UkApi from "../../ukApi";  //{apiListaServicoExtra, apiClientes, apiTiposServicosExtras }
import {ComboClientes, ComboTiposServicos} from '../../components/CombosUnik'
import {DatatableSE} from '../../components/datatableSE'

import imglogo from "../../img/logoemp.png";

const ListagemSE = () => {
   
   const [listaAux, setListaAux] = useState([]);
   const [listSE, setListSE] = useState([]);
   const [listCliente, setListCliente] = useState([]);
   const [listTpservico, setListTpservico] = useState([]);

   const  carregaListas = async () => {
      setListSE([]);
      setListaAux([]);
      let res1 = await UkApi.apiListaServicoExtra();
      setListSE(res1);
      setListaAux(res1);

      setListCliente([]);
      let res2 = await UkApi.apiClientes();
      setListCliente(res2);
      setListTpservico([]);
      let res3 = await UkApi.apiTiposServicosExtras();
      setListTpservico(res3);
   }  
  
   function onClickSelLst(ev){
      setListSE(listaAux);
  }

  function onChangeSelLst(ev) {
      if(ev.value === ""){
        setListSE(listaAux);
      }
      if(ev.name==="cliente") {
      setListSE(listaAux.filter(objeto => objeto.idcliente === parseInt(ev.value))); //listTpservico(tpservico)
     }
    if(ev.name==="tpservico") {
      if(ev.value === ""){
        setListSE(listaAux);
      } else {
        setListSE(listaAux.filter(objeto => objeto.idtpservextr === parseInt(ev.value))); //listTpservico(tpservico)
      }
    }
 }

   useEffect(()=>{
         carregaListas();
      }, []);

   return (
     <form>
      <div className="listcontainer">
         <div className="listform">
            <div className="listform-logo">
                <img className="listform-imagem" src={imglogo} alt="imglogin"/>
            </div>
            <div className="listform-titulo">
               <h3>Lista de Serviços Extras</h3>
            </div>
            <div className="listcampo-lado-a-lado">
                  <div className="listcampo-cliente">
                        <label htmlFor='lscliente'>Filtrar por cliente</label>
                        <ComboClientes lista={listCliente} id="lscliente" name="lscliente"  
                           onChange={onChangeSelLst} onClick={onClickSelLst} className="listSelCliente form-control" />
                  </div>
                  <div className="listcampo-cliente">
                        <label htmlFor="lstpservico">Filtrar por Tipo de Serviço</label>
                        <ComboTiposServicos lista={listTpservico} id="lstpservico" name="lstpservico"
                                    onChange={onChangeSelLst} onClick={onClickSelLst} className="listSelCliente form-control" />
                  </div>
            </div>

            <div className="form-group">
              <DatatableSE 
                data={listSE}
                />
            </div>
      </div>
      </div>
   </form>
   )
}
export default ListagemSE;
