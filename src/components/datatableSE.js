import React from 'react';
import MUIDataTable from "mui-datatables";
import moment from "moment";

const SPACED_DATE_FORMAT = "DD/MM/YYYY";

//const getHyphenatedDate = dateString => moment(dateString, "YYYY-MM-DD").format(SPACED_DATE_FORMAT);

export function DatatableSE(props) {
      const columns= [
        {
          name: 'dtsolicitacao',
          label: 'Dt.Solicitação',
          options: {
              filter: true,
              sort: true,
              customBodyRender: value =>
              moment(value, "YYYY-MM-DD").format(SPACED_DATE_FORMAT)
          }},
        {
        name: 'nmcliente',
        label: 'Nome Cliente',
        options: {
            filter: false,
            sort: true
        }},
       {
        name: 'nmtpservextr',
        label: 'Tipo Servico',
        options: {
          filter: true,
          sort: true
      }},
      {
        name: 'cobrarcliente',
        label: 'Cobrar',
        options: {
          filter: true,
          sort: true
      }},
      {
        name: 'valorservico',
        label: 'Valor Servicos',
        options: {
          filter: false,
          sort: true
      }},
    {
        name: 'porcdesconto',
        label: '% Desconto',
        options: {
          filter: false,
          sort: true
      }},
    {
        name: 'valorcobraca',
        label: 'Vlr.com Desconto',
        options: {
          filter: false,
          sort: true
      }},
    {
        name: 'nmdepto',
        label: 'Depto.',
        options: {
          filter: true,
          sort: true
      }},
     {
        name: 'nmusuario',
        label: 'Usuario',
        options: {
          filter: true,
          sort: true
      }},
      {
        name: 'descdoc',
        label: 'Descricao do Servico',
        options: {
          filter: false,
          sort: false,
          display:  'excluded'
      }},
      {
        name: 'detalhecob',
        label: 'Detalhes da Cobrança',

        options: {
          filter: false,
          sort: false,
          display: 'excluded'
      }}
      ];
    
      const options = {
        rowsPerPage: 50,
        rowsPerPageOptions: [50,100, 300],
        selectableRows: false,
        fixedHeaderOptions: {
          xAxis: false,
          yAxis: false
        },
        expandableRows: true,
        renderExpandableRow: ((rowData, rowMeta) => 
           {
            return(
            <React.Fragment>
              <tr>
                <td colSpan={10}>
                    <div className="listcampo-lado-a-lado" style={ { boxShadow: '0px 0px 5px 5px #f5910d',
                                                                                                       background: '#e8ebd4',
                                                                                                       color:'#0c0c83',
                                                                                                       fontWeight:'bold',
                                                                                                        fontSize: '15px',
                                                                                                        marginLeft:'20px',
                                                                                                        marginRight:'10px'
                                                                                                       }}>
                      <div style={ { width: '50%', 
                                              } }>
                          Documentos: {rowData[9]}
                      </div>
                      <div style={ { width: '50%', 
                                          } }>
                          Detalhes: {rowData[10]}
                      </div>
                  </div>
                </td>
              </tr>
            </React.Fragment>
           )
           }
           )
      };
      
      return (
          <MUIDataTable
            title={"Lista de Serviços Extras"}
            data={props.data}
            columns={columns}
            options={options}
            />
        );
  }