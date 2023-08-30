import { Slider } from "@mantine/core";
import { PlayerPause, PlayerPlay, PlayerTrackNext, PlayerTrackPrev, Volume } from 'tabler-icons-react';
import { BrandCitymapper } from 'tabler-icons-react';
import { fetchNui } from "../../utils/fetchNui";
import { VideoObject } from "../App";
import { useEffect, useState } from "react";
interface Props {
    author: string;
    name: string;
    image: string;
    setVolumeReproActive:(n:number)=>void;
    tempChangeVolume:(n:number)=>void;
    volumeReproActive: number;
    distReproActive: number;
    reproActive: number;
    maxDuration: number;
    pausedTime: number;
    paused: boolean;
    repros: VideoObject[];
    setDistReproActive:(n:number)=>void;
    changeDist:(n:number)=>void;
}

export default function Navbar({author, name, image, volumeReproActive, setVolumeReproActive, tempChangeVolume, distReproActive, setDistReproActive, changeDist, reproActive, maxDuration, repros, paused, pausedTime}:Props) {
    const [value, setValue] = useState(0);
    const nextSong = () => {
        fetchNui('nextSong', {repro: reproActive, time: new Date().getTime()})
    }

    const prevSong = () => {
        fetchNui('prevSong', {repro: reproActive, time: new Date().getTime()})
    }

    function formatTime(seconds:number) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);
    
        const formattedHours = hours > 0 ? `${hours}:` : '';
        const formattedMinutes = `${minutes < 10 && hours > 0 ? '0' : ''}${minutes}`;
        const formattedSeconds = `${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    
        return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
    }    

    const changeTime = (val: number) => {
        setValue(val);
        repros[reproActive].playerRef.current.seekTo(val)
    }

    const syncTime = (val: number) => {
        fetchNui('syncNewTime', {repro: reproActive, time: new Date().getTime() - (val * 1000)})
    }

    const updateTime = () => {
        if (repros[reproActive] && repros[reproActive].playerRef && repros[reproActive].playerRef.current && repros[reproActive].playerRef.current.playerInfo && !paused) {
            setValue(repros[reproActive].playerRef.current.playerInfo.currentTime);
        }
        if (paused) {
            setValue(pausedTime);
        }
    }

    const pauseSong = () => {
        fetchNui('pauseSong', {repro: reproActive, value: repros[reproActive].playerRef.current.playerInfo.currentTime, time: new Date().getTime()})
    }

    useEffect(()=> {
        if (paused) {
            setValue(pausedTime);
        } else {
            setValue(0);
        }
        const intervalId = setInterval(updateTime, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [repros, reproActive, paused])

    return (
        <div className="navbar">
            <div className="infoSong">
                <div style={{ width: `3.25rem`, height: `3.25rem`, overflow: 'hidden', borderRadius: "5px", minWidth: '3.25rem' }}>
                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={image} alt="des" />
                </div>
                <div className="artist">
                    <div className='title'>{name}</div>
                    <span className='author'>{author}</span>
                </div>
            </div>
            <div className="controlSong">
                <div className="controls">
                    <PlayerTrackPrev className="butControl" strokeWidth={1} onClick={()=>{prevSong()}}/>
                    {
                        !paused ? (
                            <PlayerPause className="pause" color="black" size='1.2rem' onClick={()=>{pauseSong()}} />
                        ) : (
                            <PlayerPlay className="pause" color="black" size='1.2rem' onClick={()=>{pauseSong()}} />
                        )
                    }
                    <PlayerTrackNext className="butControl" strokeWidth={1} onClick={()=>{nextSong()}}/>
                </div>
                <div className="slider-container">
                    <div className="time-display">
                        {formatTime(value)}
                    </div>
                    <Slider id="timeVideo" color="gray" size="xs" showLabelOnHover={false} value={value} max={maxDuration} onChange={changeTime} onChangeEnd={syncTime} />
                    <div className="time-display">
                        {formatTime(maxDuration)}
                    </div>
                </div>
            </div>
            <div className="controlDistVol">
                <div className="volume">
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <Volume size={'1rem'} />
                        <div>
                            <Slider color="gray" size="xs" showLabelOnHover={false} className="volumeSLider" value={volumeReproActive} onChangeEnd={(event)=>{setVolumeReproActive(event)}} onChange={(event)=>{tempChangeVolume(event)}} />
                        </div>
                    </div>
                </div>
                <div className="volume">
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <BrandCitymapper size={'1rem'} />
                        <div>
                            <Slider color="gray" size="xs" showLabelOnHover={false} min={2} max={50} className="volumeSLider" value={distReproActive} onChangeEnd={(event)=>{changeDist(event)}} onChange={(event)=>{setDistReproActive(event)}} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}