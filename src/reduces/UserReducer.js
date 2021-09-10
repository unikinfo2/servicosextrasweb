export const initialState = {
        username: "",
        password: "",
        //QuickSRV
        urlBase: "http://localhost:3001/api/",
        dados: {
                        codusuario: "",
                        deptonome: "",
                        deptousuario: "",
                        emailusuario: "",
                        nomeusuario: "",
                        responsavel: ""
        }
};

export const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USUARIO' :
             return { ...state, 
                            username: action.payload.usuariologado.username,
                            urlBase: action.payload.usuariologado.urlBase,
                            dados: action.payload.usuariologado.dados
                        };
        default:
            return state;
    }
}