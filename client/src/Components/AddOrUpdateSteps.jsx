import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBModalFooter,
    MDBIcon,
    MDBCardHeader,
    MDBBtn
} from "mdbreact";
import { useState, useEffect } from 'react';


import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button1 from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { Button } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import { orange, red } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import SendIcon from '@mui/icons-material/Send';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAddStepsToStore, loadUpdateStepsToStore, LoadGetAllStepInPlans } from '../Redux/StepInPlan/StepInPlanActions'
import { AddSteps, UpdateSteps } from '../Redux/StepInPlan/StepInPlanThunk'
import { AllPlans } from "./AllPlans";
import { useRef } from "react";

export const AddOrUpdateSteps = () => {

    //שליפת כל התוכניות מהסטור
    const AllPlansFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Plans.Plans);
        return store.Plans.Plans;

    });
    let date2 = useRef()
    let date3 = useRef()
    let date4 = useRef()

    //לשלבי התוכנית
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [MyErrors, setMyErrors] = useState({ NameErros: '' });
    console.log("dateStart+++++++", AllPlansFromStore[AllPlansFromStore.length - 1].planStartDate);
    const [MyBackDate, setMyBackDate] = useState((AllPlansFromStore[AllPlansFromStore.length - 1].planStartDate));



    // useEffect(async () => {
    //     try {
    //        { setMyBackDate(Date.parse(AllPlansFromStore[AllPlansFromStore.length - 1]).planStartDate)} 

    //     } catch (error) {
    //       console.error(error.message);
    //     }
    //   }, []);

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     // myDispatch(loadAddStepsToStore())
    // };

    const handleBack = () => {
        setActiveStep((activeStep) => activeStep - 1);
    };

    // const [MyErrors, setMyErrors] = useState({ NameErros: '' });
    const myDispatch = useDispatch();
    const params = useParams()
    var myIdplanToUpdate = params.idPlan

    //  -שליפת כל שלבי התוכניות מהסטור לעדכון
    const allStepInPlanFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.StepInPlans.StepInPlans);
        return store.StepInPlans.StepInPlans;
    });

    //let StartDate=setMyBackDate(Date.parse(AllPlansFromStore[AllPlansFromStore.length - 1]).planStartDate);
    //console.log("StartDate!!!!!!!!!!!!!!!!!!!!!",StartDate);
    console.log("allStepInPlanFromStore!!", allStepInPlanFromStore);

    console.log("myIdplanToUpdate", myIdplanToUpdate);
    var MySteps = allStepInPlanFromStore.filter(x => x.planId == myIdplanToUpdate)
    console.log("MySteps", MySteps);
    let navigate = useNavigate()

    const ApproveFormToEditOrAddPlans = (event) => {

        debugger

        event.preventDefault();
        if (MyErrors.DateErrosRaiting != "!!תקין" || MyErrors.DateErrosJudge != "!!תקין" || MyErrors.DateErrosUploud != "!!תקין")
            alert('בדוק תרינות התאריכים')
        else {
            //קידום השלב
            setActiveStep((activeStep) => activeStep + 1);

            if (params.addOrUpdate == 1)//הוספה
            {
                //אובייקט להוספת שלבים בתוכנית
                const myStepsPlanToAdd = {
                    PlanId: Number(myIdplanToUpdate),
                    StepInPlanStartDate: event.target["StartDate"].value,
                    StepInPlanEndDateToUploadSong: event.target["EndDateToUploadSong"].value,
                    StepInPlanEndDateToJudg: event.target["EndDateToJudg"].value,
                    StepInPlanEndDateToRating: event.target["EndDateToRating"].value,
                    StepInPlanPart: activeStep + 1
                }
                debugger

                // myDispatch(LoadGetAllStepInPlans(myStepsPlanToAdd))
                //הוספת שלב לשרת
                debugger
                var p = AddSteps(myDispatch, myStepsPlanToAdd);
                console.log("p", p);

            }
            else//עדכון
            {
                debugger
                const myStepsPlanToUpdate = {
                    //StepInPlanId: Number(MySteps[0].stepInPlanId),
                    StepInPlanId: Number(MySteps[activeStep].stepInPlanId),
                    PlanId: Number(myIdplanToUpdate),
                    StepInPlanStartDate: event.target["StartDate"].value,
                    StepInPlanEndDateToUploadSong: event.target["EndDateToUploadSong"].value,
                    StepInPlanEndDateToJudg: event.target["EndDateToJudg"].value,
                    StepInPlanEndDateToRating: event.target["EndDateToRating"].value,
                    StepInPlanPart: activeStep + 1
                }

                myDispatch(loadUpdateStepsToStore(myStepsPlanToUpdate))

                var p2 = UpdateSteps(myDispatch, myStepsPlanToUpdate);
                console.log("p2", p2);
            }

            // שלב 3
            // if (activeStep == 2) {
            debugger
            if (params.addOrUpdate == 1)//הוספת שופטים לתוכנית
                // AddJudgesForCurrentPlan/:idPlan/:addOrUpdate
                // navigate(`/Nav/StepersAddUpdatePlan/${myIdplanToUpdate}`)
                navigate(`/Nav/StepersAddUpdatePlan/${myIdplanToUpdate}/AddJudgesForCurrentPlan/${myIdplanToUpdate}/1`)
            else//עדכון שופטים
                navigate(`/Nav/StepersAddUpdatePlan/${myIdplanToUpdate}/AddJudgesForCurrentPlan/${myIdplanToUpdate}/0`)
            // }


            // if (activeStep == 2) {
            //     debugger
            //     if (params.addOrUpdate == 1)//הוספת שופטים לתוכנית
            //         navigate(`/Nav/StepersAddUpdatePlan/${myIdplanToUpdate}/AddJudgeForCurrentPlan/${myIdplanToUpdate}/1`)
            //     else//עדכון שופטים
            //         navigate(`/Nav/StepersAddUpdatePlan/${myIdplanToUpdate}/AddJudgeForCurrentPlan/${myIdplanToUpdate}/0`)
            // }
            // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }



    // const validateDate = (e) => {
    //     { setMyBackDate((e.target.value)) }
    //     console.log("start@@@@@@@@@@@@@@@", MyBackDate);
    //     debugger;
    //     if ((e.target.value) < (Date())) {
    //         debugger;
    //         setMyErrors(
    //             {
    //                 ...MyErrors,
    //                 DateErros: "!תאריך זה קטן מהיום"
    //             })
    //     }
    //     else {
    //         debugger;
    //         setMyErrors(
    //             {
    //                 ...MyErrors,
    //                 DateErros: "!!תקין"
    //             })
    //     }
    // }

    const validateUploutDate = (e) => {
        console.log("start@@@@@@@@@@", MyBackDate);
        console.log("uplout-input", (e.target.value));
        console.log("if!!!!", e.target.value < AllPlansFromStore[AllPlansFromStore.length - 1].planStartDate);
        debugger;

        if ((e.target.value) < e.target.value < AllPlansFromStore[AllPlansFromStore.length - 1].planStartDate) {
            debugger;
            setMyErrors(
                {
                    ...MyErrors,
                    DateErrosUploud: "!תאריך זה קטן מהתאריך הקודם"
                })
        }
        else {
            debugger;
            setMyErrors(
                {
                    ...MyErrors,
                    DateErrosUploud: "!!תקין"
                })
            debugger
            setMyBackDate(e.target.value)
        }


    }

    const validateRaitingDate = (e) => {
        console.log("uploud@@@@@@@@@", MyBackDate);
        console.log("raiting", e.target.value);
        debugger;
        if ((e.target.value) < MyBackDate) {
            debugger;
            setMyErrors(
                {
                    ...MyErrors,
                    DateErrosRaiting: "!תאריך זה קטן מהתאריך הקודם"
                })
        }
        else {
            debugger;
            setMyErrors(
                {
                    ...MyErrors,
                    DateErrosRaiting: "!!תקין"
                })
            debugger
            { setMyBackDate(e.target.value) }
        }

    }

    const validateJudgeDate = (e) => {
        console.log("rating@@@@@@@@", MyBackDate);
        console.log("Judge", e.target.value);
        debugger;
        if ((e.target.value) < MyBackDate) {
            debugger;
            setMyErrors(
                {
                    ...MyErrors,
                    DateErrosJudge: "!תאריך זה קטן מהתאריך הקודם"
                })
        }
        else {
            debugger;
            setMyErrors(
                {
                    ...MyErrors,
                    DateErrosJudge: "!!תקין"
                })
            debugger
            { setMyBackDate(e.target.value) }
        }
    }
    return <>

        <div>
            <MDBContainer style={{ width: "50%" }}>
                <MDBRow >
                    <MDBCol md="200">
                        <MDBCard>
                            <MDBCardBody>
                                <div class="Login">

                                    <MDBCardHeader className="form-header ">
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: orange["900"] }} aria-label="recipe">
                                                </Avatar>
                                            }
                                            title={
                                                <h3 className='more'></h3>
                                            }
                                            subheader={
                                                <h3 className='more'> {(MySteps.length != 0) ? 'עדכון שלבים' : 'הוספת שלבים'}</h3>

                                            }

                                        />

                                    </MDBCardHeader>
                                </div>

                                <form onSubmit={(e) => { ApproveFormToEditOrAddPlans(e) }}  >
                                    <label
                                        htmlFor="defaultFormEmailEx"
                                        className="grey-text font-weight-light"
                                    ></label>

                                    {/*תאריך התחלת שלב*/}

                                    <h5 htmlFor="defaultFormEmailEx"
                                        className="grey-text font-weight-light"> תאריך התחלת תוכנית </h5>
                                    <div >
                                        <input
                                            id="StartDate"
                                            type="datetime-local"
                                            required="true"
                                            className="form-control"
                                            value={(AllPlansFromStore[AllPlansFromStore.length - 1]).planStartDate}
                                        // onChange={(e) => validateDate(e)}


                                        // ?????????
                                        // value={(MySteps.length != 0  && activeStep<MySteps.length) ? MySteps[activeStep].stepInPlanStartDate : ""}
                                        >

                                        </input>

                                    </div>
                                    <label
                                        htmlFor="defaultFormEmailEx"
                                        className="error"
                                    >
                                        {MyErrors.DateErros}
                                    </label>


                                    {/*תאריך סופי להעלאת שיר */}

                                    <h5 htmlFor="defaultFormEmailEx"
                                        className="grey-text font-weight-light">!בחר תאריך סופי להעלאת שיר </h5>
                                    <div >
                                        <input
                                            id="EndDateToUploadSong"
                                            type="datetime-local"
                                            required="true"
                                            className="form-control"
                                            onChange={(e) => validateUploutDate(e)}
                                            min={(AllPlansFromStore[AllPlansFromStore.length - 1]).planStartDate}
                                            ref={date2}
                                        /////???????????.
                                        // value={(MySteps.length != 0  && activeStep<MySteps.length) ? MySteps[activeStep].stepInPlanEndDateToUploadSong : ""}
                                        >
                                        </input>

                                    </div>
                                    <label
                                        htmlFor="defaultFormEmailEx"
                                        className="error"
                                    >
                                        {MyErrors.DateErrosUploud}
                                    </label>





                                    {/*תאריך סופי לדרוג  */}

                                    <h5 htmlFor="defaultFormEmailEx"
                                        className="grey-text font-weight-light">!בחר תאריך סופי לדרוג  </h5>
                                    <div >
                                        <input
                                            id="EndDateToRating"
                                            type="datetime-local"
                                            required="true"
                                            className="form-control"
                                            onChange={(e) => validateRaitingDate(e)}
                                            ref={date3}
                                            // min={date2.current.value}
                                        ////????????
                                        // value={(MySteps.length != 0  && activeStep<MySteps.length) ? MySteps[activeStep].stepInPlanEndDateToRating : ""}

                                        // value={myPlanToUpdate[0].planStartDate}
                                        // value={(myPlanToUpdate.length != 0) ? myPlanToUpdate[0].planStartDate : ""}
                                        >
                                        </input>
                                    </div>
                                    <label
                                        htmlFor="defaultFormEmailEx"
                                        className="error"
                                    >
                                        {MyErrors.DateErrosRaiting}
                                    </label>


                                    {/*תאריך סופי לשפיטה  */}

                                    <h5 htmlFor="defaultFormEmailEx"
                                        className="grey-text font-weight-light">!בחר תאריך סופי לשפיטה  </h5>
                                    <div >
                                        <input
                                            id="EndDateToJudg"
                                            type="datetime-local"
                                            required="true"
                                            className="form-control"
                                            onChange={(e) => validateJudgeDate(e)}
                                            ref={date3}
                                            // min={date3.current.value}
                                        ////????????????????????
                                        // value={(MySteps.length != 0  && activeStep<MySteps.length) ? MySteps[activeStep].stepInPlanEndDateToJudg : ""}

                                        // value={myPlanToUpdate[0].planStartDate}
                                        // value={(myPlanToUpdate.length != 0) ? myPlanToUpdate[0].planStartDate : ""}
                                        >
                                        </input>
                                    </div>
                                    <label
                                        htmlFor="defaultFormEmailEx"
                                        className="error"
                                    >
                                        {MyErrors.DateErrosJudge}
                                    </label>

                                    {/* <MobileStepper
                                        variant="progress"
                                        steps={3}
                                        position="static"
                                        activeStep={activeStep}
                                        sx={{ maxWidth: 400, flexGrow: 1 }}

                                        nextButton={

                                            <Button type="submit" size="medium" disabled={activeStep === 3}>
                                                שלב הבא
                                                {theme.direction === 'rtl' ? (
                                                    <KeyboardArrowLeft />
                                                ) : (
                                                    <KeyboardArrowRight />
                                                )}
                                            </Button>
                                        }
                                        backButton={
                                            <Button onClick={handleBack} size="small" disabled={activeStep === 0}>
                                                {theme.direction === 'rtl' ? (
                                                    <KeyboardArrowRight />
                                                ) : (
                                                    <KeyboardArrowLeft />
                                                )}
                                                שלב קודם
                                            </Button>
                                        }
                                    /> */}


                                    <div className="text-center mt-4">

                                        {/* <div className="text-center mt-4">
                                            <Button type='submit' variant="contained" class="BtnSend" endIcon={<SendIcon />}>
                                                אישור
                                            </Button>
                                            <Button type='submit' class='button'>הירשם</Button>
                                        </div> */}
                                        <button type='submit'>אישור</button>

                                    </div>

                                    <MDBModalFooter>

                                    </MDBModalFooter>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <Outlet></Outlet>
        </div>



    </>
}

export default AddOrUpdateSteps