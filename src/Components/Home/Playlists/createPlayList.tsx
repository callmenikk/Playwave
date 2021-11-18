import { FC, useState, useReducer } from "react";
import ImageInput from "./imageInput";
import "../scss/createPlaylist.css";
import { reducer } from "../../../Hooks/reducer";
import NoImage from "./NoImage";

export type State = {
  playlistUri: string;
  playlistName: string;
  playlist_id: string;
  songs?: { 
    name: string;
    albumUri: string;
    artist: string;
  }[];
};

export const defaultState: State = {
  playlistUri: "",
  playlistName: "",
  playlist_id: "",
  songs: []
};

const CreatePlayList: FC<{ close: () => void, setData: (data: State[]) => void }> = ({ close, setData }) => {
  const [openImageInput, setOpenImageInput] = useState<boolean>(true);
  const [state, dispatch] = useReducer(reducer, defaultState);

  const imageInputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({
      type: "ON_CHANGE",
      payload: { ...state, playlistUri: e.target.value },
    });
  };

  const addPlayList = () => {
    if(!localStorage.getItem("playlists")){
        localStorage.setItem("playlists", "[]")
    }
    const currPlayLists = JSON.parse(localStorage.getItem("playlists")!)
    const updatePlayList: State[] = [...currPlayLists, {...state, playlist_id: new Date().getTime().toString()}]
    
    localStorage.setItem("playlists", JSON.stringify(updatePlayList))
    setData!(updatePlayList)

    close!()
  };

  return (
    <div className="createPlaylist">
      {!openImageInput ? (
        <ImageInput
          value={state.playlistUri}
          inputHandler={imageInputHandler}
          close={() => setOpenImageInput(true)}
        />
      ) : null}
      <div className="createPlayList-container">
        <div className="text-bar">
          <h3 style={{ color: "#FFF", paddingTop: "20px" }}>Create Playlist</h3>
        </div>
        <div className="circle" onClick={() => setOpenImageInput(false)}>
          {state.playlistUri ? (
            <img src={state.playlistUri} alt="" />
          ) : (
            <NoImage />
          )}
        </div>
        <form>
          <input
            type="text"
            value={state.playlistName}
            onChange={(e) =>
              dispatch({
                type: "ON_CHANGE",
                payload: { ...state, playlistName: e.target.value },
              })
            }
            placeholder="Playlist name"
          />
        </form>
        <div className="save-container">
          <button onClick={close}>Cancel</button>
          <button onClick={() => addPlayList()}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlayList;
