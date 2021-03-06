import { FC, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { TopResultProp } from "../Search/TopResult";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface PlaylistSongProps {
  index: number;
  img_url: string;
  song_name: string;
  song_uri: string;
  playSong: (url: TopResultProp) => void;
  deleteSong: (id: string, playlist_id: string) => void;
  id: string;
  playlist_id: string;
}

interface SongOptionsProps {
  closeComponent: () => void;
  deleteSong: (id: string) => void;
  id: string;
  playlist_id: string;
  deleteTrue: boolean;
  setDelete: () => void
}

const SongOptions: FC<SongOptionsProps> = ({
  closeComponent,
  deleteSong,
  deleteTrue,
  setDelete,
  id,
}) => {
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
  if(deleteTrue) {
    setTimeout(() =>{
      deleteSong(id)
      setDelete()
    }, 500)
  }
  }, [deleteTrue])

  const closeHandler = (e: any): void => {
    if (optionsRef.current && !optionsRef.current.contains(e.target)) {
      closeComponent();
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeHandler, true);
    return () => document.removeEventListener("click", closeHandler);
  });

  return (
    <div className="song-options" ref={optionsRef}>
      <button className="delete-btn" onClick={setDelete}>
        Delete
        <FontAwesomeIcon icon={faTrashAlt as IconProp} style={{ marginLeft: "10px" }} />
      </button>
    </div>
  );
};

const PlaylistSong: FC<PlaylistSongProps> = ({
  index,
  img_url,
  song_name,
  song_uri,
  playSong,
  id,
  deleteSong,
  playlist_id,
}) => {
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [slideSong, setSlideSong] = useState<boolean>(false);

  return (
    <div className={!slideSong ? "Playlist_Song" : "Playlist_Song slide"}>
      <div className="song-main-info" onClick={() => playSong({name: song_name, image: img_url, song_url: song_uri})}>
        <div id="index" style={{ color: "#FFF" }}>
          <p>{index}</p>
          <span className="triangle"></span>
        </div>
        <div id="img-box">
          <img src={img_url} alt="" />
        </div>
        <div id="song-name" style={{ color: "#FFF" }}>
          {song_name}
        </div>
      </div>
      <div className="options">
        <div className="option-box" onClick={() => setOpenOptions(true)}>
          {openOptions ? (
            <SongOptions
              closeComponent={() => setOpenOptions(false)}
              deleteSong={() => deleteSong(id, playlist_id)}
              deleteTrue={slideSong}
              setDelete={() => setSlideSong(true)}
              id={id}
              playlist_id={playlist_id}
            />
          ) : null}
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
};

export default PlaylistSong;
