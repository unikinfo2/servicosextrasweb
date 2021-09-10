import React from 'react';

//QuickSRV
const UserContext = React.createContext({
    urlBase: "http://localhost:3001/api/",
});
export { UserContext };