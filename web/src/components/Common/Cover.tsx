interface Playlist {
    id: number;
    name: string;
    songs: Song[];
}
  
interface Song {
    author: string;
    url: string;
    name: string;
}

interface Props {
    playlist: Playlist;
    width: number;
}


export default function Cover({ playlist, width }: Props) {
    return (
        <div className="playlist-cover">
            {playlist.songs.length >= 4 ? (
                playlist.songs.slice(0, 4).map((song, index) => (
                    <div key={index} style={{ width: `${width}vw`, height: `${width}vw`, overflow: 'hidden' }}>
                        <img className="playlist-cover-image" src={`https://i.ytimg.com/vi/${song.url}/mqdefault.jpg`} alt={song.name} />
                    </div>
                ))
            ) : (
                <div className="playlist-cover-large" style={{ width: `${width * 2}vw`, height: `${width * 2}vw`, overflow: 'hidden' }}>
                    <img
                        className="playlist-cover-image"
                        src={playlist.songs.length === 0 ? 'https://media.discordapp.net/attachments/919641744704954461/1128672258425114726/Screenshot_1.png' : `https://i.ytimg.com/vi/${playlist.songs[0].url}/mqdefault.jpg`}
                        alt={'defaulet'}
                    />
                </div>
            )}
        </div>
    );
}
  