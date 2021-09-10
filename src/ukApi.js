import { UserContext } from "./contexts/UserContext";

const UkApi = {
  apiClientes: async() => {
    const urlBase = UserContext.values.urlBase;
    let cabe = new Headers([]);
      let requestOptions = {
        method: "GET",
        mode: "cors",
        redirect: "follow",
        headers: cabe
      };
      let pathApi = `${urlBase}clientes`;
      const res = await fetch(pathApi, requestOptions )
                              .then(function(response) {return response}) 
                              .then(function(resp)
                              {
                                return resp;
                              })
                              .catch(function(erro)
                              {
                                  console.log( erro);
                                  return erro;
                              });
  const json = await res.json();
  return json;    
  },
  apiTiposServicosExtras: async() => {
    const urlBase = UserContext.values.urlBase;
    let cabe = new Headers([]);
    let requestOptions = {
      method: "GET",
      mode: "cors",
      redirect: "follow",
      headers: cabe
    };
    let pathApi = `${urlBase}tiposservicosextras`;
    const res = await fetch(pathApi, requestOptions)
                            .then(function(response) {return response}) 
                            .then(function(resp)
                            {
                              return resp;
                            })
                            .catch(function(erro)
                            {
                                console.log( erro);
                                return erro;
                            });
const json = await res.json();
return json;    
},
apiListaServicoExtra  : async () => {
  const urlBase = UserContext.values.urlBase;
  let cabe = new Headers([]);
  let requestOptions = {
                                      method: "GET",
                                      mode: "cors",
                                      redirect: "follow",
                                      headers: cabe
                                    };
  let pathApi = `${urlBase}servicosextras`;
  const res = await fetch(pathApi, requestOptions )
                          .then(function(response) {return response}) 
                          .then(function(resp)
                          {
                            return resp;
                          })
                          .catch(function(erro)
                          {
                              console.log( erro);
                              return erro;
                          });
const json = await res.json();
return json;    
},
apiSalvaServicoExtra: async (dados) => {
  const urlBase = UserContext.values.urlBase;
  let cabe = new Headers([]);
  let raw = JSON.stringify(dados);
  let requestOptions = {
    method: "POST",
    body: raw,
    mode: "cors",
    redirect: "follow",
    headers: cabe
  };
  let pathApi = `${urlBase}salvaservicoextra`;
  const res = await fetch(pathApi, requestOptions)
   .then(function(response) {return response}) 
   .then(function(resp) {
     return resp;
   }).catch(function(erro) {
       console.log( erro);
       return erro;
   });
  const json = await res.json();
  return json;    
}
};
export default UkApi;