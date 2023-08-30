import { Input, Modal } from "@mantine/core";
import { useState } from "react";

interface Props {
    opened: boolean;
    close(): void;
    newPlaylist(name:string): void;
}

export default function ModalAddPlaylist({opened, close, newPlaylist}:Props) {
    const [name, setName] = useState('');

    return (
        <Modal opened={opened} onClose={close} title="Crear playlist">
            <Input.Wrapper label="Playlist nombre" required maw={320} mx="auto" onChange={(event) => setName((event.target as HTMLInputElement).value)}>
                <Input<any>
                    placeholder="Playlist name"
                />
                <div className='contBut'>
                    <button onClick={()=>{close(); newPlaylist(name)}} className='addSongButton'>Crear Playlist</button>
                </div>
            </Input.Wrapper>
        </Modal>
    );
}