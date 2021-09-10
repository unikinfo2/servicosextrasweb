import FinderSelect from 'react-finderselect'
import 'react-finderselect/dist/index.css'

export function ComboClientes(props) {
    return (
        <FinderSelect 
        data={props.lista} 
        label='razaoClifor' 
        value='codClifor' 
        extraInfo='codQuick' 
        name='cliente' 
        className={props.className}
        placeholder='Informe o cliente'
        onClick={props.onClick} 
        onChange={props.onChange} 
      /> );
}

export function ComboTiposServicos(props) {
  return (
      <FinderSelect 
      data={props.lista} 
      label='descAux' 
      value='codAux' 
      extraInfo='codigoAux' 
      name='tpservico' 
      className={props.className}
      placeholder='informe o tipo do serviço'
      onClick={props.onClick} 
      onChange={props.onChange} 
    /> );
}
