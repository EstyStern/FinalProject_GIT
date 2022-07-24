////==================================================
////  imports
////==================================================
import * as React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
//MUI
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from "react-router-dom";
import { GetCurrentStep } from '../Redux/StepInPlan/StepInPlanActions';
//Icons
import Add from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import swal from 'sweetalert';

import { GetCurentJudgesForPlans } from '../Redux/JudgForPlan/JudgForPlanActions';
import { GetWinsInPlanFromServer } from '../Redux/Plan/PlanThunk';
import { GetAllTypePlanFromServer } from "../Redux/TypePlan/TypePlanThunk";
import { orange } from '@material-ui/core/colors';
import { About } from './About';

////==================================================
////  component
////==================================================
export default function RecipeReviewCard(props) {

  ////==================================================
  ////  משתנים
  ////==================================================
  let navigate = useNavigate()
  const myDispatch = useDispatch();
  let myParams = useParams()

  ////==================================================
  ////  useState
  ////==================================================
  const [expanded, setExpanded] = React.useState(false);
  const [stepFinal, setstepFinal] = React.useState();
  const [valueButton, setValueButton] = React.useState("סיים תוכנית");
  const [AllJudgForPlan, setAllJudgForPlan] = React.useState();

  ////==================================================
  ////  useSelector
  ////==================================================

  //שליפת כל השירים מהסטור
  const AllSongsFromStore = useSelector((store) => {
    console.log("store", store);
    console.log(store.Songs.Songs);
    return store.Songs.Songs;
  });

  //שליפת המשתמש הנוכחי לצורך דירוג
  const CurrentUser = useSelector((store) => {
    console.log("store", store);
    console.log(store.Users.CurrentUser);
    return store.Users.CurrentUser;
  });

  //שליפת כל התוכניות מהסטור
  const AllPlansFromStore = useSelector((store) => {
    console.log("AllPlansFromStore", store);
    console.log(store.Plans.Plans);
    return store.Plans.Plans;
  });

  //שליפת כל סוגי התוכניות מהסטור
  const AllTypesPlanFromStore = useSelector((store) => {
    console.log(store.TypesPlan.TypesPlan);
    return store.TypesPlan.TypesPlan;
  });

  //שליפת כל התוכניות של משתמש מיוחד מהסטור
  const AllPlansToShow = useSelector((store) => {
    console.log("AllPlansToShow", store);
    console.log(store.Plans.PlansToShow);
    return store.Plans.PlansToShow;
  });

  //שליפת כל התוכניות של משתמש מיוחד מהסטור
  const IfFromArea = useSelector((store) => {
    console.log("IfFromArea", store);
    console.log(store.Users.IfFromArea);
    return store.Users.IfFromArea;
  });

  //שליפת כל תוכניות של השופטים-
  const AllJudgForPlanFromServer = useSelector((store) => {
    console.log("store", store);
    console.log(store.JudgForPlan.JudgForPlan);
    return store.JudgForPlan.JudgForPlan;
  });
  console.log("AllJudgForPlanFromServer////////////////////////////", AllJudgForPlanFromServer[0]
  );
  //שליפת כל השלבים מהסטור
  const AllStepInPlansFromStore = useSelector((store) => {
    console.log("AllStepInPlansFromStore", store.StepInPlans.StepInPlans);
    return store.StepInPlans.StepInPlans;
  });

  const allWinsFromStore=useSelector((store) => {
    return store.Plans.Wins;
  });
  
  ////==================================================
  ////  useEffect
  ////==================================================

  // בעת טעינת הקומפוננטה- שליפת כל סוגי התוכניות //
  useEffect(async () => {
    try {
      let r = await GetAllTypePlanFromServer(myDispatch)
    } catch (error) {
    }
  }, []);

  ////==================================================
  ////  functions
  ////==================================================

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = (e, item) => {
    debugger;
    setExpanded(!expanded);

    //פונקציה שמכניסה לתוך משתנה עבור תוכנית את תאריך סיום התוכנית
    const Step = AllStepInPlansFromStore.filter(u => u.planId == item.planId && u.stepInPlanPart == 3)

    //פונקציה שמחזירה עבור תוכנית את כל השופטים שלה
    const allJudgForPlan = AllJudgForPlanFromServer.filter(y => y.planId == item.planId)
    console.log(allJudgForPlan, "#################");
    setAllJudgForPlan(allJudgForPlan)
    myDispatch(GetCurentJudgesForPlans(allJudgForPlan))
  };

  //מעביר לשלבים של התוכנית
  const pushToAllStepInPlan = (idPlan) => {
    debugger
    console.log(idPlan);
    const idCurentStep = AllPlansFromStore.filter(t => t.planId == idPlan)[0].curentStepInPlanId;
    myDispatch(GetCurrentStep(AllStepInPlansFromStore.filter(y => y.stepInPlanId == idCurentStep)[0]))
    console.log(AllStepInPlansFromStore.filter(y => y.stepInPlanId == idCurentStep)[0]);
    navigate(`/Nav/AllStepInPlans/${idPlan}`)
  }

  const funcNevigatToAddOrUpdate = (idPlan) => {
    debugger
    // navigate(`/Nav/StepersAddUpdatePlan/${idPlan}/`)
    navigate(`/Nav/StepersAddUpdatePlan/${idPlan}/AddOrUpdatePlan/${idPlan}`)

  }

  //פונקציה בעת בחירת איזה סוג סינון
  function funcToSelect(e) {
    debugger
    // if(TypeOfFilters==0){
    debugger
    if (e.target.value == "שם תוכנית")
      setTypeOfFilters(1)
    else if (e.target.value == "סוג תוכנית")
      setTypeOfFilters(2)
    else {
      setTypeOfFilters(0)
      const s = AllPlanToShow()
      setAllShowSpecific(s.specific)
      setAllShowRegular(s.regular)
    }
    // }
  }

  //פונקציה בעת הסינון
  function funcTofilter(e) {

    debugger;
    if (TypeOfFilters == 1 && e.code == 'Enter') {
      const a = AllPlanToShow()
      let b = a;
      console.log(a, "111111111111111111111");
      setAllShowSpecific(b.specific)
      setAllShowRegular(b.regular)
      setAllShowSpecific(AllShowSpecific.filter(p => p.planName == e.target.value))
      setAllShowRegular(AllShowRegular.filter(p => p.planName == e.target.value))
      console.log("חיפוש חדש")
      console.log(a)
      console.log(b)

    }
    else if (TypeOfFilters == 2 && e.target.value != "סוג תוכנית....") {
      const f = AllPlanToShow()
      setAllShowSpecific(f.specific)
      setAllShowRegular(f.regular)
      console.log("e.target.value", e.target[1].value);
      const a = AllTypesPlanFromStore.filter(y => y.typePlanName == e.target.value);
      console.log(a);
      const s = AllPlanToShow()
      setAllShowSpecific(s.specific)
      setAllShowRegular(s.regular)
      setAllShowSpecific(AllShowSpecific.filter(p => p.typePlanId == a[0].typePlanId))
      setAllShowRegular(AllShowRegular.filter(p => p.typePlanId == a[0].typePlanId))
    }
    else {
      const s = AllPlanToShow()
      setAllShowSpecific(s.specific)
      setAllShowRegular(s.regular)
    }
  }
  //פונקצייה ששולחת את שירי התוכנית לשרת
  const funcCalcWins = (idPlan, namePlan) => {
    if (valueButton == "צפייה בניצחונות") {
      navigate(`/Nav/Wins/${namePlan}`)
    }
    else {
      let StepInPlanIdByPlan = AllPlansFromStore.filter(x => x.planId == idPlan)[0].curentStepInPlanId//שליפת השלב הנוכחי
      console.log("שלב נוכחי", StepInPlanIdByPlan);
      debugger;
      let songsPerPlan = AllSongsFromStore.filter(x => x.stepInPlanId == StepInPlanIdByPlan)//שליפת השירים בשלב זה
      console.log("שירים של התוכנית הנוכחית", songsPerPlan);
      //שליחה לשרת את השירים של התוכנית הבחורה
      var resultWinsFromServer = GetWinsInPlanFromServer(myDispatch, songsPerPlan);
      debugger
      console.log("result Wins:  ", resultWinsFromServer);
      debugger
      let result = window.confirm('האם אתה מעוניין לסיים את התוכנית?');
      let myIndexToRemove;
      //let arrDel = [];

      if (result == true) {
        debugger;
        setValueButton("צפייה בניצחונות")

        //var btn=document.getElementById("buttonFinish");
        //btn.value="צפייה בניצחונות";
        // for (let index = 0; index < AllPlansFromStore.length; index++) {
        // if (AllPlansFromStore[index].planId == idPlan)
        //  myIndexToRemove = index
        // }
        // debugger;
        //if (myIndexToRemove != undefined)
        //  arrDel = AllPlansFromStore.splice(myIndexToRemove, 0)
        // console.log(arrDel);

      }

      else
        alert("סיום התהליך בוטל")
    }

  }

  const funcNavigateWins = () => {
    navigate(`/Nav/Wins/${"allPlan"}`)
  }

  //משתנה שמציג את כל התוכניות לפי משתמש נוכחי
  const [AllShowRegular, setAllShowRegular] = useState(AllPlanToShow().regular);
  const [AllShowSpecific, setAllShowSpecific] = useState(AllPlanToShow().specific);
  //משתנה עבור סוג סינון
  //0-עבור בחירת סוג סינון
  //1=עבור סינון לפי שם תוכנית
  //2-עבור סינון לפי סוג תוכנית
  const [TypeOfFilters, setTypeOfFilters] = useState(0);


  //פונקציה שמראה את כל התוכניות לפי משתמש נוכחי
  function AllPlanToShow() {
    debugger
    const d = new Date()
    let PlanToShow = { specific: [], regular: [] }
    //אם מנהל מציג את כל ההתוכניות
    if (CurrentUser.typeOfUser == 4) {
      PlanToShow.specific = AllPlansFromStore;
    }

    //אם משתמש מיוחד ומגיע מהאזור האישי שלו 
    if (AllPlansToShow.length != 0 && IfFromArea == true) {
      PlanToShow.specific = AllPlansToShow
    }
    //!בדיקה שתוכנית בשלב הדרוג
    var stepInStepRating = AllStepInPlansFromStore.filter(g => Date.parse(g.stepInPlanEndDateToUploadSong) <= Date.parse(d) && Date.parse(g.stepInPlanEndDateToRating) >= Date.parse(d))
    console.log(stepInStepRating, "1");
    AllPlansFromStore.forEach(element => {
      stepInStepRating.forEach(item => {
        if (IfFromArea != true && element.curentStepInPlanId == item.stepInPlanId)//אם אתה מדרג והתוכנית הזו בשלב דרוג
          PlanToShow.regular.push(element)
        else if (element.curentStepInPlanId == item.stepInPlanId && IfFromArea == true && CurrentUser.typeOfUser == 3
          && AllSongsFromStore.filter(u => u.stepInPlanId == item.stepInPlanId && u.userId == CurrentUser.userId).length == 0) {//אם התוכנית בשלב דרוג ואין לך שיר שמה כי אתה מתמודד
          PlanToShow.regular.push(element)
        }
        else if (element.curentStepInPlanId == item.stepInPlanId && IfFromArea == true && CurrentUser.typeOfUser == 2
          && AllJudgForPlanFromServer.filter(u => u.planId == element.planId && u.userId == CurrentUser.userId).length == 0) {
          PlanToShow.regular.push(element)
        }
      });
    });

    if (PlanToShow.regular.length == 0 && PlanToShow.specific.length == 0) {
      swal("!שגיאה", ":) אין תוכניות זמינות כרגע", "error");
    }
    console.log(PlanToShow, "8989898898989898898989")
    return PlanToShow
  }

  ////==================================================
  ////  return
  ////==================================================
  return <>
    <h1>התוכניות שלנו </h1>
    <div>
      {(CurrentUser.typeOfUser == 4) ?
        //במקרה של הוספה 
        //Params=1
        <AddCircleOutlineIcon fontSize='large' onClick={() => funcNevigatToAddOrUpdate(1)}></AddCircleOutlineIcon>
        :
        <span></span>
      }
      <select onClick={(e) => { funcToSelect(e) }} >
        <option >מייון לפי....</option>
        <option >שם תוכנית</option>
        <option >סוג תוכנית</option>
      </select>
      {(TypeOfFilters == 1) ?
        <input type="text" placeholder="הקלד את שם התוכנית לסיום הקש אנטר.." name="nameOfPlan" onKeyPress={(e) => { funcTofilter(e) }}></input> :
        (TypeOfFilters == 2) ? <select onChange={(e) => { funcTofilter(e) }} >
          <option > סוג תוכנית....</option>
          {AllTypesPlanFromStore && AllTypesPlanFromStore.map((item) => {
            return <>
              <option >{item.typePlanName}</option>
            </>
          })}
        </select> : <span></span>}
      {(myParams.idUser == undefined) ?
        <section>
          <h5>תוכניות לדרוג</h5>
          <hr></hr>
        </section> : <span></span>}


      {(AllShowRegular != undefined && AllShowRegular.length == 0) ? <h1>לא נמצאו תוכניות התואמות לחיפושך</h1> : (AllShowRegular == undefined || AllShowSpecific == undefined) ? <h1>לא נמצאו תוכניות זמינות</h1> : (myParams.idUser == undefined) ?
        AllShowRegular && AllShowRegular.map((item) => {
          if (item.curentStepInPlanId != null) {
            let nameCurrentstep = ""
            let currentStep = AllStepInPlansFromStore.filter(x => item.curentStepInPlanId != null && x.stepInPlanId == item.curentStepInPlanId)[0]
            console.log("currentStep", currentStep);
            (currentStep != undefined && Date.parse(currentStep.stepInPlanStartDate) < Date.parse(Date()) && Date.parse(currentStep.stepInPlanEndDateToUploadSong) > Date.parse(Date())) ?
              nameCurrentstep = "שלב העלאת שיר" :
              (currentStep != undefined && Date.parse(currentStep.stepInPlanEndDateToUploadSong) < Date.parse(Date()) && Date.parse(currentStep.stepInPlanEndDateToRating) > Date.parse(Date())) ?
                nameCurrentstep = "שלב דרוג " :
                nameCurrentstep = "שלב שפיטה ";

            return <>
              {/* card */}
              <Card className='Card' sx={{ maxWidth: 345, backgroundColor: 'white' }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: orange["900"] }} aria-label="recipe">
                      {nameCurrentstep}
                    </Avatar>
                  }
                  title={
                    <h3 className='h3-name-plan'>{item.planName}</h3>
                  }
                  subheader={
                    <h5>{item.typePlanName}</h5>
                  }
                />
                <CardMedia
                  onClick={() => pushToAllStepInPlan(item.planId)}
                  component="img"
                  height="194"
                  image={`https://localhost:44324/Images/${item.pic}`}
                  alt="Paella dish"
                />
                <CardActions disableSpacing className='CardActions'>
                  {(CurrentUser.typeOfUser == 4) ?
                    <ModeEditIcon fontSize='large' onClick={() => funcNevigatToAddOrUpdate(item.planId)}></ModeEditIcon>
                    :
                    <span></span>
                  }
                  {(CurrentUser.typeOfUser == 4 &&
                    Date.parse(currentStep.stepInPlanEndDateToRating) < Date.parse(Date()) && Date.parse(currentStep.stepInPlanEndDateToJudg) > Date.parse(Date())
                  ) ?
                    //ניצחונות בתוכנית-צריך להיות אחרי סיום השלב בעת ארוע כלשהו.
                    <button id="buttonFinish" onClick={() => funcCalcWins(item.planId, item.planName)} >{valueButton}</button>
                    :
                    <span></span>
                  }
                  {/* פרטים נוספים */}
                  <ExpandMore
                    expand={expanded}
                    onClick={(e) => { handleExpandClick(e, item) }}
                    aria-expanded={expanded}
                  >
                    {/* More Details */}
                    <label className='more' >לפרטים נוספים</label>
                    <Add></Add>

                  </ExpandMore>

                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit className='Card' >
                  <CardContent className='Collapse'>
                    <Typography paragraph>
                      <h5 className='h3-name-plan'> פרטים נוספים אודות {item.planName}  </h5>
                    </Typography>
                    <Typography paragraph>
                      <label>{item.planStartDate} : תאריך פתיחת התוכנית</label>
                      <label> {currentStep.stepInPlanEndDateToJudg}: תאריך סיום התוכנית</label>
                      <label>:השופטים בתוכנית זו</label>
                      <ul>
                        {
                          AllJudgForPlanFromServer[0] && AllJudgForPlanFromServer[0].filter(x=>x.planId==item.planId).map((j) => {
                            return <>
                              <li> {j.userFirstName} {j.userLastName}</li>
                            </>
                          })}
                      </ul>

                    </Typography>

                    <Typography>
                      <h5>!בהנאה</h5>
                    </Typography>
                  </CardContent>
                </Collapse>

              </Card>

              <Outlet></Outlet>
            </>
          }
        })
        : <span></span>
      }
      {(!(CurrentUser.length == 0 || CurrentUser.typeOfUser == 1 || myParams.idUser != undefined)) ?
        <section>
          <h5>תוכניות שאתה משתתף בהם</h5>
          <hr></hr>
        </section>
        : <span></span>}
      {(CurrentUser.typeOfUser == 2 || CurrentUser.typeOfUser == 3 || CurrentUser.typeOfUser == 4) ? (AllShowSpecific != undefined && AllShowSpecific.length == 0) ? <h1>לא נמצאו תוכניות התואמות לחיפושך</h1> : (AllShowSpecific == undefined) ? <h1>לא נמצאו תוכניות זמינות</h1> :
        AllShowSpecific && AllShowSpecific.map((item) => {
          if (item.curentStepInPlanId != null) {
            let nameCurrentstep = ""
            let currentStep = AllStepInPlansFromStore.filter(x => item.curentStepInPlanId != null && x.stepInPlanId == item.curentStepInPlanId)[0]
            console.log("currentStep", currentStep);
            (currentStep != undefined && Date.parse(currentStep.stepInPlanStartDate) < Date.parse(Date()) && Date.parse(currentStep.stepInPlanEndDateToUploadSong) > Date.parse(Date())) ?
              nameCurrentstep = "שלב העלאת שיר" :
              (currentStep != undefined && Date.parse(currentStep.stepInPlanEndDateToUploadSong) < Date.parse(Date()) && Date.parse(currentStep.stepInPlanEndDateToRating) > Date.parse(Date())) ?
                nameCurrentstep = "שלב דרוג " :
                nameCurrentstep = "שלב שפיטה ";

            return <>

              <Card className='Card' sx={{ maxWidth: 345, backgroundColor: 'white' }}>
                <CardHeader
                  avatar={
                    <Avatar >
                      {nameCurrentstep}
                    </Avatar>
                  }

                  title={
                    <h3 className='h3-name-plan'>{item.planName}</h3>
                  }
                  subheader={
                    <h5>{item.typePlanName}</h5>
                  }
                />
                <CardMedia
                  onClick={() => pushToAllStepInPlan(item.planId)}

                  component="img"
                  height="194"
                  image={`https://localhost:44324/Images/${item.pic}`}
                  alt="Paella dish"
                />


                <CardActions disableSpacing className='CardActions'>

                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon></FavoriteIcon>
                  </IconButton>



                  {(CurrentUser.typeOfUser == 4) ?
                    <ModeEditIcon fontSize='large' onClick={() => funcNevigatToAddOrUpdate(item.planId)}></ModeEditIcon>
                    :
                    <span></span>
                  }
                  {(CurrentUser.typeOfUser == 4 &&
                    Date.parse(currentStep.stepInPlanEndDateToRating) < Date.parse(Date()) && Date.parse(currentStep.stepInPlanEndDateToJudg) > Date.parse(Date())
                  ) ?
                    //ניצחונות בתוכנית-צריך להיות אחרי סיום השלב בעת ארוע כלשהו.
                    <button id="buttonFinish" onClick={() => funcCalcWins(item.planId, item.planName)} >{valueButton}</button>
                    :
                    <span></span>
                  }
                  {/* פרטים נוספים */}
                  <ExpandMore
                    expand={expanded}
                    //onClick={handleExpandClick(item.planId)}
                    onClick={(e) => { handleExpandClick(e, item) }}
                    aria-expanded={expanded}
                  >
                    {/* More Details */}
                    <label className='more' >לפרטים נוספים</label>
                    <Add></Add>

                  </ExpandMore>

                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit className='Card' >
                  <CardContent className='Collapse'>
                    <Typography paragraph>
                      <h5 className='h3-name-plan'> פרטים נוספים אודות {item.planName}  </h5>
                    </Typography>
                    <Typography paragraph>
                      <label>{item.planStartDate} : תאריך פתיחת התוכנית</label>
                      <label>{stepFinal} : תאריך סיום התוכנית</label>
                      <label>:השופטים בתוכנית זו</label>
                      <ul>
                        {
                          AllJudgForPlan && AllJudgForPlan.map((item) => {
                            return <>
                              <li> {item.userFirstName} {item.userLastName}</li>
                            </>
                          })}
                      </ul>

                    </Typography>

                    <Typography>
                      <h5>!בהנאה</h5>
                    </Typography>
                  </CardContent>
                </Collapse>

              </Card>



              <Outlet></Outlet>
            </>
          }
        })
        : <span></span>
      }

    </div>
    <About></About>
    
  </>

}




