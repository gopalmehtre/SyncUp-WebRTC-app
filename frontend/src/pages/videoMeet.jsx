import React, {useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { connectToSocket } from '../../../backend/src/controllers/socketManager';


const server_url = "http://localhost:8000";

var connections = {};

const peerConfigConnections = {
    "iceServers" : [
        {
            "urls" : "stun:stun.l.google.com:19302"
        }
    ]
}

export default function  VideoMeetComponent() {

    var socketRef = useRef();
    let socketIdRef = useRef();
    let localVideoRef = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState([]);
    let [audio, setAudio] = useState();
    let [screen, setScreen] = useState();
    let [showModal, setModal] = useState(true);
    let [screenAvailable, setScreenAvailable] = useState();
    let [messages, setMessages] = useState([])
    let [message, setMessage] = useState("");
    let [newMessages, setNewMessages] = useState(3);
    let [askForUsername, setAskForUsername] = useState(true);
    let [username, setUsername] = useState("");

    const videoRef = useRef([])

    let [videos, setVideos] = useState([])

    useEffect(() => {
        console.log("HELLO")
        getPermissions();

    })

    let getDislayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDislayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e))
            }
        }
    }

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({video:true});
            if(videoPermission) {
                setVideoAvailable(true);
                console.log('Video permission granted');
            } else {
                setVideoAvailable(false);
                console.log('video permission denied');
                
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (audioPermission) {
                setAudioAvailable(true);
                console.log('Audio permission granted');
            } else {
                setAudioAvailable(false);
                console.log('Audio permission denied');
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            } else {
                setScreenAvailable(false);
            }

            if(videoAvailable  || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video : videoAvailable, audio:audioAvailable});
                if(userMediaStream) {
                    window.localStream = userMediaStream;
                    if(localVideoRef.current) {
                        localVideoRef.current.srcObject = userMediaStream;
                    }
                }
            }


        }catch(error) {
        console.log(error);
    }

    };

    useEffect(()=> {
        if(video !== undefined && audio!== undefined) {
            getUserMedia();
            console.log("SET STATE HAS", video, audio);
        }

    }, [video, audio])

    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    }

    // let gertUserMediaSuccess = (stream) => {
    //     try {
    //         window.localStream.getTracks().forEach(track => track.stop())
    //     } catch (e) {
    //         console.log(e);
    //     }

    //     window.localStream = stream
    //     localVideoRef.current.srcObject = stream

    //     for(let id in connections) {
    //         if(id === socketIdRef.current) continue


    //     }
    // }


    let addMessage = () => {

    }

        let connectToSocketServer = ()=> {
            
        }
    

  return (
    <div>
        {askForUsername===true ?

            <div>
                 <h2>Enter into Lobby </h2>
                    <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
                    <Button variant="contained">Connect</Button>


                    <div>
                        <video ref={localVideoRef} autoPlay muted></video>
                    </div>
            </div> : <></>
        }
        
        

        
    </div>

  )
}
