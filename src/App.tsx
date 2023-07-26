import { useEffect, useState } from 'react';
import './App.css'
import ReactPlayer from 'react-player';
import { M3uMedia, M3uParser } from 'm3u-parser-generator';

function App() {
  let [playlist, setPlaylist] = useState<M3uMedia[]>([]);
  let [selectedPlaylist, setSelectedPlaylist] = useState<string>("");
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/iptv-org/iptv/master/streams/kh.m3u").then(async (res) => {
      let playlistString = await res.text();
      let playlistLocation = M3uParser.parse(playlistString).medias;
      setPlaylist(playlistLocation);
      setSelectedPlaylist(playlistLocation[0].location);
    }).catch((err) => {
      console.log(err);
    });

  }, []);
  return (
    playlist.length == 0 ?
      <>Loading...</> :
      <>
        <select onChange={(e) => {
          setSelectedPlaylist(e.target.value);
        }
        }>
          {playlist.map((item, index) => {
            return <option key={index} value={item.location}>{item.name}</option>
          })}
        </select>
        <ReactPlayer url={selectedPlaylist}
          config={{
            file: {
              forceHLS: true,
              hlsOptions: {
                autoStartLoad: true,
              }
            }
          }}
          controls
          playing
        />
      </>
  )
}

export default App
