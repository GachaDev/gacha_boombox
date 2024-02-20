import YouTube from "react-youtube";
import { VideoObject } from "../App";
import { createRef } from 'react';

interface ReprosProps {
    repros: VideoObject[];
    setRepros: (repros: VideoObject[]) => void;
}

export default function Repros({ repros, setRepros }: ReprosProps) {
    return (
        <div className='videoYoutube'>
            {repros && repros.map((val, i) => (
                <YouTube
                    key={i}
                    videoId={val?.url}
                    opts={{
                        playerVars: {
                            autoplay: 1,
                            controls: 0,
                            disablekb: 1,
                            enablejsapi: 1,
                            volume: val.volume,
                            start: val.time,
                            quality: "small"
                        },
                    }}
                    onError={error => {
                        console.error('YouTube player error:', error);
                    }}
                    onReady={event => {
                        const updatedRepros = [...repros];
                        if (updatedRepros[i]) {
                            updatedRepros[i].playerRef = createRef<YT.Player | null>();
                            //@ts-ignore
                            updatedRepros[i].playerRef.current = event.target;
                            updatedRepros[i].playerRef.current?.setVolume(val.volume);
                            updatedRepros[i].playerRef.current?.seekTo(val.time, false)
                            setRepros(updatedRepros);
                        }
                    }}
                />
            ))}
        </div>
    );
}
