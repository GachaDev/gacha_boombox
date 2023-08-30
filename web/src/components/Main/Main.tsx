import { useState } from 'react';
import Library from './Library/Library';
import DisplayPlaylist from './DisplayPlaylist/DisplayPlaylist';
import { Playlist } from './Library/Library';
import { VideoObject } from '../App';
import { fetchNui } from '../../utils/fetchNui';
import { useNuiEvent } from '../../hooks/useNuiEvent';

interface Props {
    playSong: (songUrl: string, playlist: Playlist, index: number) => void;
}

export default function Main({playSong}:Props) {
    const [Playlists, setPlaylists] = useState<Playlist[]>([
        {id: 0, name: 'Mi playlist 1', songs: [
            {id: 0, name: 'Mora - MEDIA LUNA (Visualizer) | ESTRELLA', author: 'Mora', maxDuration: 135, url: 'H3ZZA-X1QXE'},
            {id: 1, name: 'Feid, ICON - FERXXO 151 (Official Video)', author: 'Feid', maxDuration: 227, url: 'ww7UQTDsPEc'},
            {id: 2, name: 'YoSoyPlex, Ruven - Modo Avión (Video Oficial)', author: 'YoSoyPlex', maxDuration: 175, url: '2bczbzNRO4Y'},
            {id: 3, name: 'spreen - a casa pete', author: 'Spreen', maxDuration: 82, url: '5rjCRPG3mkw'},
            {id: 4, name: 'KAROL G, Peso Pluma - QLONA (Visualizer)', author: 'KAROL G', maxDuration: 172, url: 'BeUOBoSPWvA'},

        ]},
        {id: 1, name: 'Mi playlist 2', songs: [
            {id: 0, name: 'Feid, ICON - FERXXO 151 (Official Video)', author: 'Feid', maxDuration: 227, url: 'ww7UQTDsPEc'},
            {id: 1, name: 'KAROL G - MI EX TENÍA RAZÓN (Official Video)', author: 'KAROL G', maxDuration: 161, url: 'VBcs8DZxBGc'},
            {id: 2, name: 'YoSoyPlex, Ruven - Modo Avión (Video Oficial)', author: 'YoSoyPlex', maxDuration: 175, url: '2bczbzNRO4Y'},
        ]},
    ]);
    const [playlistActive, setPlaylistActive] = useState(-1);
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
        setPlaylistActive(-1);
        fetchNui('deletePlayList', Playlists[playlistActive].id);
    }

    useNuiEvent('getPlaylists', getPlaylists);
    return (
        <div className="main">
            <Library Playlists={Playlists} setPlaylistActive={setPlaylistActive} playlistActive={playlistActive} newPlaylist={newPlaylist}/>
            <DisplayPlaylist Playlists={Playlists} playlistActive={playlistActive} playSong={playSong} exitPlaylist={()=>{deletePlaylist()}}/>
        </div>
    );
}

function UseEffect(arg0: () => void, arg1: never[]) {
    throw new Error('Function not implemented.');
}
  