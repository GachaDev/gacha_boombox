import { Menu } from "@mantine/core";
import { useState } from "react";
import { Edit, PlaylistAdd, Settings, Trash, X } from 'tabler-icons-react';
import AddModal from "./AddModal/AddModal";

interface Props {
    playlistActive: number;
    exitPlaylist: ()=>void;
}

export default function PlaylistMenu({playlistActive, exitPlaylist}:Props) {
    const [opened, setOpened] = useState(false);
    const [openedMenu, setOpenedMenu] = useState(false);
    return (
        <div className="MenuPlaylist">
            <Menu opened={opened} onChange={setOpened}>
                <Menu.Target>
                    <div className='otherOptionsPlaylist'>
                        <Settings onClick={() => {setOpened(!opened)}} />
                    </div>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item color="white" onClick={()=>{setOpenedMenu(true)}} icon={<PlaylistAdd size={14} />}>Añadir canción</Menu.Item>
                    <Menu.Item color="red" onClick={()=>{exitPlaylist()}} icon={<Trash size={14} />}>Eliminar Playlist</Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <AddModal opened={openedMenu} close={()=>{setOpenedMenu(false)}} playlistActive={playlistActive} />
        </div>  
    );
}
  