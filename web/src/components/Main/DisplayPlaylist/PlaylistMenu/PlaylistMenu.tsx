import { Menu } from "@mantine/core";
import { useEffect, useState } from "react";
import { Edit, PlaylistAdd, Settings, Trash, X } from 'tabler-icons-react';
import AddModal from "./AddModal/AddModal";
import { fetchNui } from "../../../../utils/fetchNui";

interface Props {
    playlistActive: number;
    exitPlaylist: ()=>void;
}

export default function PlaylistMenu({playlistActive, exitPlaylist}:Props) {
    const [opened, setOpened] = useState(false);
    const [openedMenu, setOpenedMenu] = useState(false);
    const [addSong, setAddSong] = useState('Add song');
    const [deletePlaylist, setDeletePlaylist] = useState('Delete Playlist');

    const getLibraryLabel = async () => {
        try {
            const res = await fetchNui<string>('addSongLabel');
            if (res) {
                setAddSong(res)
            }
            const res2 = await fetchNui<string>('deletePlaylistLabel');
            if (res2) {
                setDeletePlaylist(res2)
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(()=>{
        getLibraryLabel();
    }, [])

    return (
        <div className="MenuPlaylist">
            <Menu opened={opened} onChange={setOpened}>
                <Menu.Target>
                    <div className='otherOptionsPlaylist'>
                        <Settings onClick={() => {setOpened(!opened)}} />
                    </div>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item color="white" onClick={()=>{setOpenedMenu(true)}} icon={<PlaylistAdd size={14} />}>{addSong}</Menu.Item>
                    <Menu.Item color="red" onClick={()=>{exitPlaylist()}} icon={<Trash size={14} />}>{deletePlaylist}</Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <AddModal opened={openedMenu} close={()=>{setOpenedMenu(false)}} playlistActive={playlistActive} />
        </div>  
    );
}
  