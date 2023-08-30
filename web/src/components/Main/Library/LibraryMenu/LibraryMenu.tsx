import { Menu } from "@mantine/core";
import { useEffect, useState } from "react";
import { PackgeImport, PlaylistAdd, Plus } from 'tabler-icons-react';
import ModalImportPlaylist from "./ModalImportPlaylist/ModalImportPlaylist";
import { fetchNui } from "../../../../utils/fetchNui";

interface Props {
    setOpenedPlaylist: (val:boolean)=> void;
}

export default function LibraryMenu({setOpenedPlaylist}:Props) {
    const [opened, setOpened] = useState(false);
    const [openedMenu, setOpenedMenu] = useState(false);
    const [newPlaylist, setNewPlaylist] = useState('New Playlist');
    const [importPlaylist, setImportPlaylist] = useState('Import a existing Playlist');

    const getLibraryLabel = async () => {
        try {
            const res = await fetchNui<string>('newPlaylistLabel');
            if (res) {
                setNewPlaylist(res)
            }
        } catch (e) {
            console.error(e);
        }

        try {
            const res2 = await fetchNui<string>('importPlaylistLabel');
            if (res2) {
                setImportPlaylist(res2)
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(()=>{
        getLibraryLabel();
    }, [])
    return (
        <Menu opened={opened} onChange={setOpened}>
            <Menu.Target>
                <div className='otherOptionsPlaylist'>
                    <Plus strokeWidth={1} color={'white'}/>
                </div>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item color="white" onClick={()=>{setOpenedPlaylist(true)}} icon={<PlaylistAdd size={14} />}>{newPlaylist}</Menu.Item>
                <Menu.Item color="white" onClick={()=>{setOpenedMenu(true)}} icon={<PackgeImport size={14} />}>{importPlaylist}</Menu.Item>
            </Menu.Dropdown>
            <ModalImportPlaylist opened={openedMenu} close={()=>{setOpenedMenu(false)}} />
        </Menu>
    );
}
  