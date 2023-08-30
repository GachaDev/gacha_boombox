import { Menu } from "@mantine/core";
import { useState } from "react";
import { Edit, PackgeImport, PlaylistAdd, Plus, Settings, Trash, X } from 'tabler-icons-react';
import ModalImportPlaylist from "./ModalImportPlaylist/ModalImportPlaylist";
import ModalAddPlaylist from "./ModalAddPlaylist/ModalAddPlaylist";

interface Props {
    newPlaylist: (name:string)=> void;
}

export default function LibraryMenu({newPlaylist}:Props) {
    const [opened, setOpened] = useState(false);
    const [openedMenu, setOpenedMenu] = useState(false);
    const [openedMenu2, setOpenedMenu2] = useState(false);
    return (
        <Menu opened={opened} onChange={setOpened}>
            <Menu.Target>
                <div className='otherOptionsPlaylist'>
                    <Plus strokeWidth={1} color={'white'}/>
                </div>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item color="white" onClick={()=>{setOpenedMenu2(true)}} icon={<PlaylistAdd size={14} />}>Añadir nueva playlist</Menu.Item>
                <Menu.Item color="white" onClick={()=>{setOpenedMenu(true)}} icon={<PackgeImport size={14} />}>Importar Playlist Existente</Menu.Item>
            </Menu.Dropdown>
            <ModalImportPlaylist opened={openedMenu} close={()=>{setOpenedMenu(false)}} />
            <ModalAddPlaylist opened={openedMenu2} close={()=>{setOpenedMenu2(false)}} newPlaylist={newPlaylist} />
        </Menu>
    );
}
  