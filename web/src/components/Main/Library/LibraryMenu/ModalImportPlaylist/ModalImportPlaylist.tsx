import { NumberInput , Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchNui } from "../../../../../utils/fetchNui";

interface Props {
    opened: boolean;
    close(): void;
}

export default function ModalImportPlaylist({opened, close}:Props) {
    const [value, setValue] = useState<number>(0);
    const changeNumber = (val: number | '') => {
        if (typeof val == 'number') {
            setValue(val);
        } else {
            setValue(value)
        }
    }

    const importPlaylist = () => {
        if (value >= 1) {
            fetchNui('importNewPlaylist', value);
            setValue(0);
            close();
        }
    }
    const [importPlaylistLabel, setImportPlaylistLabel] = useState('Import playlist');


    const getLibraryLabel = async () => {
        try {
            const res = await fetchNui<string>('importPlaylistLabel');
            if (res) {
                setImportPlaylistLabel(res)
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(()=>{
        getLibraryLabel();
    }, [])

    return (
        <Modal opened={opened} onClose={close} title={importPlaylistLabel}>
            <NumberInput
                hideControls
                label="Id"
                required
                maw={320}
                min={1}
                value={value} 
                onChange={(event) => {changeNumber(event)}} 
                mx={"auto"}
            />
            <div className='contBut'>
                <button onClick={()=>{importPlaylist()}} className='addSongButton'>{importPlaylistLabel}</button>
            </div>
        </Modal>
    );
}