import { Input, Modal } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { fetchNui } from "../../../../../utils/fetchNui";

interface Props {
    opened: boolean;
    close(): void;
    playlistActive: number;
}

export default function AddModal({opened, close, playlistActive}:Props) {
    const [url, setUrl] = useState('');
    const [urlT, setUrlT] = useState('');
    const [isAdded, setIsAdded] = useState(false);
    //@ts-ignore
    const playerRef = useRef<YT.Player | null>(null);
    const AddSong = async () => {
        const youtubeUrl = new URL(url);
        if (youtubeUrl.hostname === 'www.youtube.com' || youtubeUrl.hostname === 'youtu.be') {
          const videoIdRegex = /[?&]v=([^&]+)/;
          const match = youtubeUrl.search.match(videoIdRegex);
          let extractedVideoId = match ? match[1] : '';
          if (extractedVideoId === '') {
            extractedVideoId = youtubeUrl.pathname.split('/').pop() ?? '';
          }
          if (extractedVideoId !== '') {
            setUrlT(extractedVideoId);
            setIsAdded(true);
          }
        }
    };

    const syncAddSong = async () => {
        let author = '';
        let title = '';
        try {
            const response = await fetch(`https://noembed.com/embed?format=json&url=${url}`);
            const data = await response.json();
            title = data.title;
            author = data.author_name;
        } catch (error) {
            console.error('Error:', error);
        }
        const newSong = {
            url: urlT,
            name: title,
            author: author,
            maxDuration: playerRef?.current?.getDuration(),
            playlistActive: playlistActive
        };
        fetchNui('addSong', newSong)
        setIsAdded(false);
        setUrl('');
        setUrlT('');
        close();
    }

    const [addSongLabel, setAddSongLabel] = useState('Add song');


    const getLibraryLabel = async () => {
        try {
            const res = await fetchNui<string>('addSongLabel');
            if (res) {
                setAddSongLabel(res)
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(()=>{
        getLibraryLabel();
    }, [])

    return (
        <Modal opened={opened} onClose={close} title={addSongLabel}>
            <Input.Wrapper label="Youtube url" required maw={320} mx="auto" onChange={(event) => setUrl((event.target as HTMLInputElement).value)}>
                <Input<any>
                    placeholder="Example: https://www.youtube.com/watch?v=QlZNGcVfeF0"
                />
                <div className='contBut'>
                    <button onClick={()=>{AddSong()}} className='addSongButton'>{addSongLabel}</button>
                </div>
            </Input.Wrapper>
            <div style={{display: 'none'}}>
                <YouTube
                    key={urlT}
                    videoId={urlT}
                    opts={{
                        playerVars: {
                            autoplay: 1,
                            controls: 0,
                            disablekb: 1,
                            enablejsapi: 1,
                            volume: 0,
                            start: 0,
                            quality: "small"
                        },
                    }}
                    onReady={event => {
                        playerRef.current = event.target;
                        if (url !== '' && isAdded) {
                            syncAddSong()
                        }
                    }}
                />
            </div>
        </Modal>
    );
}