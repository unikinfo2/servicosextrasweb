import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
    title:'Sair',
    path:"/",
    icon:<AiIcons.AiFillHome/>,
    cName: 'nav-text'
    },
    {
    title:'Lista Serv.Extras',
    path:"/ListagemSE",
    icon:<IoIcons.IoIosPaper />,
    cName: 'nav-text'
    },
    {
    title:'Novo Serv.Extra',
    path:"/ServicosExtras",
    icon:<FaIcons.FaArchive />,
    cName:'nav-text'
    }

]

export default SidebarData;
