import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from '../src/paginas/Login/login'
import ServicosExtras from '../src/paginas/ServicosExtras/cadServicosExtras';
import ListagemSE from '../src/paginas/ListagemSE/listagemSE';
import Navbar from './components/Navbar';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <div className="app">
                                                                                  <Login />
                                                                           </div>
                                                                 } />
      <Route path="/ServicosExtras" component={() =>
                                                                                          <div className="app">
                                                                                            <Navbar />
                                                                                             <ServicosExtras />
                                                                                          </div>
                                                                                      
                                                                              } />
      <Route path="/ListagemSE" component={() =>
                                                                                          <div className="app">   
                                                                                               <Navbar />
                                                                                               <ListagemSE/>
                                                                                         </div>
                                                                               
                                                                              } />
      <Route path="*" component={() => <h1>Pagina não existe</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;