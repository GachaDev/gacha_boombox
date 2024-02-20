import { useState } from 'react';
import Library from './Library/Library';
import DisplayPlaylist from './DisplayPlaylist/DisplayPlaylist';
import { Playlist } from './Library/Library';
import { VideoObject } from '../App';
import { fetchNui } from '../../utils/fetchNui';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import ModalAddPlaylist from './Library/LibraryMenu/ModalAddPlaylist/ModalAddPlaylist';

interface Props {
    playSong: (songUrl: string, playlist: Playlist, index: number) => void;
}

export default function Main({playSong}:Props) {
    const [Playlists, setPlaylists] = useState<Playlist[]>([]);
    const [openedCreatePlaylist, setOpenedCreatePlaylist] = useState(false);
    const [playlistActive, setPlaylistActive] = useState(0);
    const newPlaylist = async (name:string) => {
        try {
            const res = await fetchNui<number>('getNewPlaylist', name);
            if (res) {
                if (Playlists.length === 0) {
                    setPlaylists([
                        {id: res, name: name, songs: []}
                    ])
                } else {
                    const newPlaylist: Playlist = {
                        id: res,
                        name: name,
                        songs: []
                    };

                    setPlaylists(prevPlaylists => [...prevPlaylists, newPlaylist]);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
    const getPlaylists = async () => {
        try {
            const res = await fetchNui<Playlist[]>('getPlaylists');
            setPlaylists(res);
        } catch (e) {
            console.error(e);
        }
    }

    const deletePlaylist = async () => {
        setPlaylistActive(!playlistActive ? 0 : playlistActive - 1);
        fetchNui('deletePlayList', Playlists[playlistActive].id);
    }

    useNuiEvent('getPlaylists', getPlaylists);
    return (
        <div className="main">
            <Library Playlists={Playlists} setPlaylistActive={setPlaylistActive} playlistActive={playlistActive} setOpenedPlaylist={setOpenedCreatePlaylist}/>
            <DisplayPlaylist Playlists={Playlists} playlistActive={playlistActive} playSong={playSong} exitPlaylist={()=>{deletePlaylist()}} setOpenedPlaylist={setOpenedCreatePlaylist}/>
            <ModalAddPlaylist opened={openedCreatePlaylist} close={()=>{setOpenedCreatePlaylist(false)}} newPlaylist={newPlaylist} />
        </div>
    );
}