import { Books } from 'tabler-icons-react';
import { Plus } from 'tabler-icons-react';
import { ActionIcon } from '@mantine/core';
import Cover from '../../Common/Cover';
import LibraryMenu from './LibraryMenu/LibraryMenu';
import { useEffect, useState } from 'react';
import { fetchNui } from '../../../utils/fetchNui';

export interface Song {
    id: number;
    name: string;
    author: string;
    maxDuration: number;
    url: string;
}

export interface Playlist {
    id: number;
    name: string;
    songs: Song[];
}

interface Props {
    Playlists: Playlist[];
    setPlaylistActive: (i: number) => void;
    playlistActive: number;
    setOpenedPlaylist: (val:boolean)=> void;
}

export default function Library({Playlists, setPlaylistActive, playlistActive, setOpenedPlaylist}:Props) {
    const [libraryLabel, setLibraryLabel] = useState('Your library');

    const getLibraryLabel = async () => {
        try {
            const res = await fetchNui<string>('getLibraryLabel');
            if (res) {
                setLibraryLabel(res)
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(()=>{
        getLibraryLabel();
    }, [])

    return (
        <div className="myPlaylists">
            <div className="myPlaylistNav">
                <div className="myPlaylistTitle">
                    <Books strokeWidth={1} color={'white'}/>
                    <span>{libraryLabel}</span>
                </div>
                <div className="addPlaylists">
                    <LibraryMenu setOpenedPlaylist={setOpenedPlaylist} />
                </div>
            </div>
            <div className="myPlaylistList">
                {
                    Playlists.length >= 1 && Playlists.map((value, i) => (
                        <div
                            onClick={()=>{setPlaylistActive(i)}}
                            className={`playlist-item ${playlistActive === i ? 'active' : ''}`}
                        >
                            <Cover playlist={value} width={1.625} />
                            <div className='titleFlex'>
                                <span className="titleSongMyPlaylists" style={{color: 'white'}}>{value.name}</span>
                                <span className='idSongPlaylist'>Lista - {value.id}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
  