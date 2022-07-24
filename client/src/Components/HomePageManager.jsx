
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';

export const HomePageManager = () => {
    let navigate=useNavigate();
    //טעינת הלקוח הנוכחי מהסטור
    const myCurrentUser = useSelector((store) => {
        debugger;
        console.log("myCurrentUser", store.Users.CurrentUser);
        return store.Users.CurrentUser;
    })

    const AllSonsgFromStore = useSelector((store) => {
        debugger;
        console.log("AllSonsgFromStore", store.Songs.Songs);
        return store.Songs.Songs;
    })

    const routeToSingers = () => {
        navigate('/Nav/HomePageManager/AllSingers')
    }
    
    const routeToAllRaiting = () => {
        // AllSonsgFromStore.map((item) =>{
        //     navigate(`/Nav/HomePageManager/AllRaiting/${item.songId}`)
        // })
        navigate(`/Nav/HomePageManager/FinalRaiting`)
    }
    
    const routeToAllJudges = () => {
        navigate('/Nav/HomePageManager/AllJudges')
    }

    const routeToAllPlans = () => {
        navigate('/Nav/HomePageManager/AllPlans')
    }
    // const routeToAllSongs = () => {
    //     history.push({ pathname: "/AllSongs" })
    // }
    return <>
        <input value="שופטים" type="button" onClick={() => routeToAllJudges()}></input>
        <input value="מתמודדים" type="button" onClick={() => routeToSingers()}></input>
        {/* //<input value="Message" type="button" onClick={() => routeToAllMessage(myCurrentUser.userId)}></input> */}
        {/* <input value="מדרגים" type="button" onClick={() => routeToAllRaiting()}></input> */}

        <input value="תוכניות" type="button" onClick={() => routeToAllPlans()}></input>
        {/* <input value="Songs" type="button" onClick={()=>routeToAllSongs() }></input> */}
        <Outlet></Outlet>
    </>
}