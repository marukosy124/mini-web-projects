import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const [timeslot, setTimeslot] = useState({
    startTime: '00:00:00',
    endTime: '00:00:05',
  });

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  const getVideoURL = (blob) => {
    if (!blob.url) {
      blob.url = URL.createObjectURL(blob);
    }
    return blob.url;
  };

  const onTimeChange = (e) => {
    setTimeslot({
      ...timeslot,
      [e.target.id]: e.target.value,
    });
  };

  const convertToGif = async () => {
    // Write the file to memory
    ffmpeg.FS('writeFile', 'temp.mp4', await fetchFile(video));

    // Run the FFMpeg command
    await ffmpeg.run(
      '-i',
      'temp.mp4',
      '-t',
      timeslot.endTime,
      '-ss',
      timeslot.startTime,
      '-f',
      'gif',
      'output.gif',
    );

    // Read the result
    const data = ffmpeg.FS('readFile', 'output.gif');

    // Create a URL
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: 'image/gif' }),
    );
    setGif(url);
  };

  const saveGif = async () => {
    axios({
      method: 'get',
      url: gif,
      responseType: 'arraybuffer',
    })
      .then((response) => {
        var link = document.createElement('a');
        link.href = URL.createObjectURL(
          new Blob([response.data], { type: 'application/octet-stream' }),
        );
        link.download = 'output.gif';

        document.body.appendChild(link);

        link.click();
        setTimeout(function () {
          URL.revokeObjectURL(link);
        }, 200);
      })
      .catch((error) => console.log(error));
  };

  return ready ? (
    <div className="App">
      {video && <video controls width="300" src={getVideoURL(video)}></video>}
      <div>
        Start time:&nbsp;
        <input
          type="text"
          id="startTime"
          placeholder="00:00:00"
          onChange={onTimeChange}
        />
        &nbsp;End time:&nbsp;
        <input
          type="text"
          id="endTime"
          placeholder="00:00:00"
          onChange={onTimeChange}
        />
      </div>
      <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))} />
      <button onClick={convertToGif}>Convert</button>
      <h3>Result</h3>
      {gif && <img src={gif} width="300" />}
      <button onClick={saveGif}>Save</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default App;
