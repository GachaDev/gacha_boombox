import { ActionIcon } from "@mantine/core";
import Cover from "../../Common/Cover";
import { Playlist } from "../Library/Library";
import { PlayerPlay } from 'tabler-icons-react';
import { useState } from "react";
import PlaylistMenu from "./PlaylistMenu/PlaylistMenu";
import { Trash } from 'tabler-icons-react';
import { fetchNui } from "../../../utils/fetchNui";
interface Props {
    Playlists: Playlist[];
    playlistActive: number;
    playSong: (songUrl: string, playlist: Playlist, index: number) => void;
    exitPlaylist: ()=>void;
}

export default function DisplayPlaylist({Playlists, playlistActive, playSong, exitPlaylist}:Props) {
    const [isHovered, setIsHovered] = useState(-1);
    const deleteSongPlaylist = (id: number) => {
        fetchNui('deleteSongPlaylist', {playlist: Playlists[playlistActive].id, songId: id});
    }
    return (
        <div className="playlistSection">
            {
                Playlists[playlistActive] ? 
                (
                    <div className="playlistCont">
                        <div className="iPlaylist">
                            <Cover playlist={Playlists[playlistActive]} width={3.25} />
                            <div className='infoPlaylist'>
                                <div className='titlePlaylist'>
                                    <h3>{Playlists[playlistActive].name}</h3>
                                </div>
                                <div className='controlPlaylist'>
                                    {Playlists[playlistActive].songs.length >= 1 ? (
                                        <div className='playPlaylist'>
                                            <ActionIcon onClick={()=>{playSong(Playlists[playlistActive].songs[0].url, Playlists[playlistActive], 0)}} color="green" style={{borderRadius: '20px'}} variant="filled">
                                                <PlayerPlay color="black" strokeWidth={1}/>
                                            </ActionIcon>
                                        </div>
                                    ) : null}
                                    <PlaylistMenu playlistActive={Playlists[playlistActive].id} exitPlaylist={exitPlaylist}/>
                                </div>
                            </div>
                        </div>
                        <div className='listSongs'>
                            {Playlists[playlistActive]?.songs.map((value, index) => (
                                <div className='songPlaylist' key={index} onMouseEnter={() => setIsHovered(index)} onMouseLeave={() => setIsHovered(-1)} >
                                    <div className='imgContainer' >
                                        <img className={`imgSong ${isHovered === index ? 'hovered' : ''}`} src={`https://i.ytimg.com/vi/${value.url}/mqdefault.jpg`} alt={value.name}/>                          
                                        {isHovered === index && (
                                            <div className='playSong' onClick={()=>{playSong(value.url, Playlists[playlistActive], index)}}>
                                                <ActionIcon variant="transparent">
                                                    <PlayerPlay color="white" strokeWidth={1}/>
                                                </ActionIcon>
                                            </div>
                                        )}
                                    </div>
                                    <div className="songControl">
                                        <div className='infoSong'>
                                            <span className={`songNameP`}>{value.name}</span>
                                            <span className='authorP'>{value.author}</span>
                                        </div>
                                        {isHovered === index && (
                                            <div className="deleteSong">
                                                <ActionIcon onClick={()=>{deleteSongPlaylist(value.id)}}>
                                                    <Trash />
                                                </ActionIcon>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>  
                    </div>
                ) : (
                    <div className="noPlaylistSelected">
                        <h4>No Playlist selected</h4>
                    </div>
                )
            }
        </div>
    );
}
  