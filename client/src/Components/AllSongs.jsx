import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VideoPlayer from 'react-video-js-player';
import { FastForward } from '@material-ui/icons';
import React from 'react'
import ReactPlayer from 'react-player'
import { MDBIcon } from 'mdbreact'
//MUI
// import { CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blueGrey, orange, red } from '@mui/material/colors';
import { border } from '@mui/system';
import swal from 'sweetalert';
//Icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import Add from '@mui/icons-material/Add';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import p1 from '../images/plans/p1.jpg'
//Images
// import {v} from '../Components/v.mp4';
// import p2 from '../images/p2.jpg';
import { Outlet, useHistory, useNavigate, useParams } from "react-router-dom"
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { IfThisUserRatingThisSong } from '../Redux/Rating/RatingThunk'
import { IfThisUserRatingSongs } from "../Redux/Rating/RatingThunk";
import { GetAllUsersFromServer } from '../Redux/User/UserThunk'
import { LoadGetAllUsers } from '../Redux/User/UserActions'

export const AllSongs = (props) => {
  debugger
  console.log("song!!!!!!!!!!!!!!!!!!");
  let navigate = useNavigate()
  let params = useParams()
  const myDispatch = useDispatch();
  const [ifFromArea, setIfFromArea] = useState(false)
  const [ifratingforjudege, setifratingforjudege] = useState()

  useEffect(async () => {
    debugger
    try {
      let response2 = await GetAllUsersFromServer(myDispatch);
      myDispatch(LoadGetAllUsers(response2))
      if (params.idUser > 0)
        setIfFromArea(true)
          ;
      if (params.idUser == 0) {
        setAllSongs(AllSongsFromStore)
      }
      if ((Date.parse(currentStep.stepInPlanEndDateToRating)) < Date.parse(Date()) && Date.parse(currentStep.stepInPlanEndDateToJudg) > Date.parse(Date()) && CurrentUser.typeOfUser == 2 && AllJudgForPlanFromServer.filter(p => p.planId == currentStep.planId && p.userId == CurrentUser.userId).length >= 1) {
        let AllSongForThisPlan = AllSongsFromStore.filter(u => u.stepInPlanId == currentStep.stepInPlanId)
        console.log(AllSongForThisPlan, "!!!!!!!!!!");
        let c = await IfThisUserRatingSongs(AllSongForThisPlan, CurrentUser.userId)
        console.log(c, "ljljljljljklk");
        setifratingforjudege(c)
        console.log(ifratingforjudege, "afteraffterafter");
      }
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  //שליפת כל השירים מהסטור
  const AllSongsFromStore = useSelector((store) => {
    console.log("store", store);
    console.log(store.Songs.Songs);
    return store.Songs.Songs;
  });
  //שליפת כל תוכניות של השופטים-

  const AllJudgForPlanFromServer = useSelector((store) => {
    console.log("store", store);
    console.log(store.JudgForPlan.JudgForPlan);
    return store.JudgForPlan.JudgForPlan;
  });

  //בדיקה האם עכשיו בשלב השפיטה
  const CheckIfStepInJudge = useSelector((store) => {
    console.log("store", store);
    console.log(store.Judges.IfStepInJudge);
    return store.Judges.IfStepInJudge;
  })
  //שליפת העונה הנוכחית
  const currentStep = useSelector((store) => {
    debugger;
    console.log("storeee", store.StepInPlans.CurrentStepInPlanId);
    return store.StepInPlans.CurrentStepInPlanId;
  })
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", currentStep);

  //שליפת כל הדרוגים
  const AllRatingForPlanFromServer = useSelector((store) => {
    console.log("store", store);
    console.log(store.Rating.Rating);
    return store.Rating.Rating;
  });
  //שליפת המשתמש הנוכחי לצורך דירוג
  const CurrentUser = useSelector((store) => {
    console.log("store", store);
    console.log(store.Users.CurrentUser);
    return store.Users.CurrentUser;
  });

  //שליפת כל הזמרים מהסטור
  const AllSingersFromStore = useSelector((store) => {
    console.log("store", store);
    console.log(store.Singers.Singers);
    return store.Singers.Singers;
  });

  const AllUserFromStore = useSelector((store) => {
    console.log("store", store);
    console.log(store.Users.Users);
    return store.Users.Users;
  });

  //פונקציה שבודקת האם המדרג דירג שיר זה כבר
  const IfThisUserCanRatingThisSong = async (IdSong, IdUser) => {
    let response = await IfThisUserRatingThisSong(IdSong, IdUser)
    return response;
  }
  const funcToRating = async (idSong) => {
    debugger;
    console.log("הגעתי לפונקציה של הניתובים");
    console.log(CurrentUser);
    const temp = []

    //נכנסתי מהאזור האישי של זמר ואני יעביר אותו לצפות בכל הדרוגים של השיר הנוכחי
    if (ifFromArea == true) {
      navigate(`/Nav/AllRaitingsForSong/${idSong}`)
    }
    if (CurrentUser.typeOfUser == 2 && AllJudgForPlanFromServer.filter(x => x.planId == params.idPlan && x.userId == CurrentUser.userId).length == 1 && CheckIfStepInJudge == 1)//אם שופט בתוכנית זו בשלב שפיטה
    {
      navigate(`/Nav/AllRaitings/${idSong}/1/${params.idPlan}`)
    }
    else
      //אם הוא אורח או לא נרשם
      // if (CurrentUser.length == 0 && temp.length == 0 || CurrentUser == null) {
      if (CurrentUser.length == 0 || CurrentUser == undefined) {
        debugger
        //אמור להיות הודעה רק לכמה דקות!!1
        alert(" על מנת לדרג יש להתחבר למערכת, הינך מועבר להתחברות")
        navigate(`/Nav/LoginForm/${idSong}/${params.idPlan}`)
      }
      else {
        let ifOk = await IfThisUserCanRatingThisSong(idSong, CurrentUser.userId)
        await console.log("+++++++++++++++++++++==", ifOk);
        if (CheckIfStepInJudge == 0 && CurrentUser.typeOfUser == 1 && ifOk == false ||
          CheckIfStepInJudge == 0 && CurrentUser.typeOfUser == 2 && AllJudgForPlanFromServer.filter(x => x.planId == params.idPlan && x.userId == CurrentUser.userId).length == 0 //אם שופט בתוכנית אחרת
          || CheckIfStepInJudge == 0 && CurrentUser.typeOfUser == 3 && AllSongsFromStore.filter(x => x.userId == CurrentUser.userId && x.stepInPlanId == currentStep.stepInPlanId) == [])//אם מתמודד בתוכנית אחרת
          navigate(`/Nav/AllRaitings/${idSong}/0/${params.idPlan}`)
        else
          if (CheckIfStepInJudge == 1) {
            alert("אין לך הרשאת גישה לדרג בשלב השפיטה")
            navigate(`/Nav/AllStepInPlans/${params.idPlan}`)
          }
          else
            if (CurrentUser.typeOfUser == 1) {
              // אמור להיות רק כמה שניות על המסך!!!!!!??????????????
              alert("כבר דירגת שיר זה")
              navigate(`/Nav/AllStepInPlans/${params.idPlan}`)
            }
            else
              if (CurrentUser.typeOfUser == 2) {
                // אמור להיות רק כמה שניות על המסך!!!!!!??????????????
                alert("אינך יכול לדרג משום שכעת שלב דרוג ואתה שופט בתוכנית זו")
                navigate(`/Nav/AllStepInPlans/${params.idPlan}`)
              }
              else
                if (CurrentUser.typeOfUser == 3) {
                  //אמור להיות רק כמה שניות על המסך!!!!!!??????????????
                  alert("אינך יכול לדרג משום שאתה מתמודד בשלב זה")
                  navigate(`/Nav/AllStepInPlans/${params.idPlan}`)
                }
                else {
                  //אם מנהל
                  swal("!שגיאה", ":) בתפקיד שלך לא ניתן לדרג ", "error");
                  navigate(`/Nav/HomePageManager`)
                }
      }
  }

  const funcNavigateShowRaiting = (idsong) => {
    if (ifFromArea == true) {//אם מגיע מהאזור האישי
      navigate(`/Nav/ShowRaiting/0/${idsong}`)
    }
    else if (params.idUser == 0) {//מגיע מכל השירים
      navigate(`/Nav/ShowRaiting/-2/${idsong}`)
    }
    else {
      navigate(`/Nav/ShowRaiting/${params.idPlan}/${idsong}`)
    }

  }
  //משתנה עבור סוג סינון
  //0-עבור בחירת סוג סינון
  //1=עבור סינון לפי שם זמר
  //2-עבור סינון לפי שם שיר
  const [TypeOfFilters, setTypeOfFilters] = useState(0);
  const [AllSongs, setAllSongs] = useState(AllSongsFromStore.filter(u => u.stepInPlanId == currentStep.stepInPlanId));

  //פונקציה בעת בחירת איזה סוג סינון
  function funcToSelect(e) {
    debugger
    // if(TypeOfFilters==0){
    debugger
    if (e.target.value == "שם מתמודד")
      setTypeOfFilters(1)
    else if (e.target.value == "שם שיר")
      setTypeOfFilters(2)
    else {
      setTypeOfFilters(0)
      if (params.idUser != 0) {
        const a = AllSongsFromStore.filter(u => u.stepInPlanId == currentStep.stepInPlanId)
        setAllSongs(a)
      }
      else {
        const a = AllSongsFromStore;
        setAllSongs(a)
      }
    }

    // }
  }
  //פונקציה בעת הסינון
  function funcTofilter(e) {
    debugger;
    if (TypeOfFilters == 1 && e.code == 'Enter') {

      if (params.idUser != 0) {
        const a = AllSongsFromStore.filter(u => u.stepInPlanId == currentStep.stepInPlanId)
        setAllSongs(a)
      }
      else {
        const a = AllSongsFromStore;
        setAllSongs(a)
      }
      const name = e.target.value.split(" ")
      const fname = name[0]
      const lname = name[1]
      setAllSongs(AllSongs.filter(p => p.userFirstName == fname && p.userLastName == lname))
      console.log(AllSongs, "55555555555555555");
    }
    else if (TypeOfFilters == 2 && e.code == 'Enter') {
      console.log("e.target.value", e.target.value);
      // const a = AllSongsFromStore.filter(u => u.stepInPlanId == currentStep.stepInPlanId)
      // setAllSongs(a)
      if (params.idUser != 0) {
        const a = AllSongsFromStore.filter(u => u.stepInPlanId == currentStep.stepInPlanId)
        setAllSongs(a)
      }
      else {
        const a = AllSongsFromStore;
        setAllSongs(a)
      }
      setAllSongs(AllSongs.filter(p => p.songName == e.target.value))
      console.log("AllSongs", AllSongs);
    }
    else {
      if (params.idUser != 0) {
        const a = AllSongsFromStore.filter(u => u.stepInPlanId == currentStep.stepInPlanId)
        setAllSongs(a)
      }
      else {
        const a = AllSongsFromStore;
        setAllSongs(a)
      }
    }
  }

  let i = 0
  return <>

    <select onClick={(e) => { funcToSelect(e) }} >
      <option >מייון לפי....</option>
      <option >שם מתמודד</option>
      <option >שם שיר</option>
    </select>
    <input type="text" placeholder="הקלד את השם ולסיום הקש אנטר.." name="nameOfPlan" onKeyPress={(e) => { funcTofilter(e) }}></input>


    {

      (AllSongs.length == 0) ?
        <h1>לא נמצאו שירים התואמים לחיפושך</h1> :

        AllSongs && AllSongs.map((item, i) => {
          if (params.idUser == 0 || params.idUser > 0 && item.userId == params.idUser || ifFromArea != true && currentStep != [] && item.stepInPlanId == currentStep.stepInPlanId) {
            return <>


              {/* בדיקה איזה שיר לעשות כלא נשמע */}
              <Card className='Card' sx={{ maxWidth: 345, backgroundColor: 'white', opacity: (ifratingforjudege != undefined && ifratingforjudege[i] == true) ? 0.3 : 1 }}>

                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: orange["900"] }} aria-label="recipe">
                      {/* <MovieFilterIcon></MovieFilterIcon> */}
                      {AllSingersFromStore && AllSingersFromStore.filter(x => x.userId == item.userId).map((singer) => {
                        console.log(singer.singerImg, "singer");
                        return <>
                          <img width="100%" src={`https://localhost:44324/images/${singer.singerImg}`}  ></img>
                        </>
                      })}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      {/* <MoreVertIcon /> */}
                    </IconButton>
                  }
                  title={
                    <h2 className='h3-name-plan'>{item.songName}</h2>
                  }
                  subheader={

                    <h5 >{item.userFirstName} {item.userLastName}</h5>
                  }


                />
                {AllSingersFromStore && AllSingersFromStore.filter(x => x.userId == item.userId).map((singer) => {
                  console.log(singer.singerImg, "singer");
                  return <>
                    <img width="50%" src={`https://localhost:44324/images/${singer.singerImg}`}  ></img>
                    <br></br>
                    {AllUserFromStore.filter(z => z.userId == singer.userId).map((x) => {
                      return <>
                        <h4>{x.userFirstName + ' ' + x.userLastName}</h4>
                      </>
                    })
                    }

                  </>
                })}
                <br></br>


                <video height="200px" width="300px" controls={true}>
                  <source src={`https://localhost:44324/VideoSong/${item.songFile}`} type="video/mp4" />

                </video>


                <CardActions disableSpacing className='CardActions'>
                  {/* אם מגיע מהאזור האישי לא יכול לדרג בתור זמר */}
                  {(params.idPlan != -2 || params.idUser != 0) ?
                    <IconButton aria-label="add to favorites">
                      {/* <FavoriteIcon></FavoriteIcon> */}
                      {(ifratingforjudege == undefined || ifratingforjudege[i] == false) ? <MDBIcon icon="thumbs-up" onClick={() => { funcToRating(item.songId) }} ></MDBIcon> : <span></span>}

                      {/* {(ifFromArea) ? <span onClick={() => { funcToRating(item.songId) }}>לצפייה בכל הדרוגים</span> : <MDBIcon icon="thumbs-up" onClick={() => { funcToRating(item.songId) }}></MDBIcon>} */}
                    </IconButton> : <span></span>}
                  <p >{`"${item.songChoosingReason}"`}</p>
                  <p>{item.songComment}</p>
                  <p> :בנימה אישית</p>
                  <br></br>
                  <button onClick={() => funcNavigateShowRaiting(item.songId)}>צפייה בדרוגים</button>

                </CardActions>


              </Card>

              <Outlet></Outlet>
            </>
          }

        })
    }
  </>
}



