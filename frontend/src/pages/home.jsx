import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const  {addToUserHistory} = useContext(AuthContext);

    let handleJoinVideoCall = async() => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }
  return (
    <>

    <div className='navBar'>

        <div style={{display: "flex", alignItems: "center"}} >

            <h2>SyncUP</h2>

        </div>

        <div style={{display: "flex", alignItems: "center", gap:'10px'}}>
            <IconButton onClick = {
                () => {
                    navigate("/history")
                }
            } >
                <RestoreIcon/>
             <p>History</p>
            </IconButton>

           

            <Button onClick = {()=> {
                localStorage.removeItem("token")
                navigate("/auth")
            }} variant='contained' >

                Logout

            </Button>

        </div>

    </div>

    <div className='meetContainer'>
            <div className='leftPanel' >
                <div>
                    <h2>No More Long Distance ;) </h2>

                    <br />

                    <div style={{display: 'flex', gap:'10px'}} >

                        <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant = "outlined" />

                            <Button onClick={handleJoinVideoCall} variant='contained' >Join</Button>

                    </div>
                </div>
            </div>

            <div className='rightPanel'>
                <img srcSet="/undraw_group-hangout_o22u.png" alt="" />
            </div>
    </div>

    </>
  )
}


export default withAuth(HomeComponent);