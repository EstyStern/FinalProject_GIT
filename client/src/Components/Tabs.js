import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { AllUsers } from './AllUsers';
import { AllPlans } from './AllPlans';
import { color } from '@mui/system';
import RecipeReviewCard from '../Components/Plans';
import Alert from './Alert';
import { LoginForm } from './LoginForm';
import Trylogin from './Trylogin';
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';


import { GetAllSongsFromServer } from '../Redux/Song/SongThunk';
import { GetAllPlansFromServer } from '../Redux/Plan/PlanThunk'
import { GetAllStepInPlanFromServer } from '../Redux/StepInPlan/StepInPlanThunk'
import { useEffect, useState } from 'react';
import { GetAllJudgForPlanFromServer } from "../Redux/JudgForPlan/JudgForPlanThunk";
import { GetAllJudgesFromServer } from "../Redux/Judge/JudgeThunk";
import { LoadGetCurrentUser } from "../Redux/User/UserActions";
import { GetAllSingersFromServer } from '../Redux/Singer/SingerThunk';
import { SaveAllPlansToShow } from "../Redux/Plan/PlanActions";
import { IfFromArea } from '../Redux/User/UserActions'
import logo from '../images/logo.jpg'


// mdb
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { orange } from '@material-ui/core/colors';
import { colors } from '@mui/material';


//import RgisterOrUpdateForm from './RgisterOrUpdateForm'

// import CustomizedSteppers from './AllStepInPlans'

function TabPanel(props) {


  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 0,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));
export default function ScrollableTabsButtonForce(props) {

  const [showNavColor, setShowNavColor] = useState(false);
  let [isUpdate, setIsUpdate] = useState(false)
  let myDispatch = useDispatch();
  useEffect(async () => {
    try {
      let responsePlans = await GetAllPlansFromServer(myDispatch);
      let responseStepInPlan = await GetAllStepInPlanFromServer(myDispatch);
      let response1 = await GetAllSongsFromServer(myDispatch);
      let response2 = await GetAllJudgForPlanFromServer(myDispatch);
      let response3 = await GetAllJudgesFromServer(myDispatch);
      let allSingers = await GetAllSingersFromServer(myDispatch);
    } catch (error) {
      console.error(error.message);
    }
  }, [isUpdate]);
  let navigate = useNavigate()
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [CurrentUserName, setCurrentUserName] = useState("אורח");
  //שליפת המשתמש הנוכחי לצורך דירוג
  const CurrentUser = useSelector((store) => {
    console.log("store", store);
    console.log("uuuuuuuuuuuuu", store.Users.CurrentUser);

    return store.Users.CurrentUser;
  });

  const AllSingersFromStoer = useSelector((store) => {
    console.log(store.Singers.Singers);
    return store.Singers.Singers;
  });

  //שליפת כל המדרגים מהסטור
  const AllJudgesFromStore = useSelector((store) => {
    console.log("store", store);
    console.log(store.Judges.Judges);
    return store.Judges.Judges;
  });

  function funcToNameOfCurrentUser() {
    let CCurrentUserName = "אורח"
    if (CurrentUser != [] && CurrentUser.typeOfUser == 1) {
      // setCurrentUserName(`${CurrentUser.userFirstName}-מדרג`)
      CCurrentUserName = `${CurrentUser.userFirstName}-מדרג`
    }
    else
      if (CurrentUser != [] && CurrentUser.typeOfUser == 2) {
        // setCurrentUserName(`${CurrentUser.userFirstName}-שופט`)
        CCurrentUserName = `${CurrentUser.userFirstName}-שופט`
      }
      else
        if (CurrentUser != [] && CurrentUser.typeOfUser == 3) {
          // setCurrentUserName(`${CurrentUser.userFirstName}-זמר`)
          CCurrentUserName = `${CurrentUser.userFirstName}-מתמודד בתחרות`
        }
    if (CurrentUser != [] && CurrentUser.typeOfUser == 4) {
      // setCurrentUserName(`${CurrentUser.userFirstName}-זמר`)
      CCurrentUserName = `${CurrentUser.userFirstName}-מנהל`
    }
    return CCurrentUserName;
  }
  function funToLogOut() {
    myDispatch(LoadGetCurrentUser([]));
    myDispatch(SaveAllPlansToShow([]))
    myDispatch(IfFromArea(false))
    alert("תודה שהשתמשת באתר שלנו!")
    navigate(`/Nav/Plans`)
  }

  function funcToImgOfCurrentUser() {
    debugger
    console.log(CurrentUser.typeOfUser, "CurrentUser.typeOfUser2");
    let src = ""
    if (CurrentUser.typeOfUser == 0 || CurrentUser.typeOfUser == undefined ||
      CurrentUser.typeOfUser == 1)
      src = "anonymous.jpg"
    else {
      if (CurrentUser != [] && CurrentUser.typeOfUser == 2) {  //שופט
        debugger
        src = AllJudgesFromStore.filter(x => x.userId == CurrentUser.userId)[0].judgePic;
        console.log("src", src);
      }
      else
        if (CurrentUser != [] && CurrentUser.typeOfUser == 3) {//זמר
          debugger
          src = AllSingersFromStoer.filter(x => x.userId == CurrentUser.userId)[0].singerImg;
          console.log("src", src);
        }
        else {//מנהל
          src = "profile.png"
          //src = "1.JPG"

        }
    }
    return src;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let toLogin = 0;
  let nameUser = funcToNameOfCurrentUser();
  console.log(nameUser, "nameUser");






  return <>
    <div className="py-1 c" >
      <div className="container">
        <div className="row no-gutters d-flex align-items-start align-items-center px-md-0">
          <div className="col-lg-12 d-block">
          </div>
        </div>
      </div>
    </div>

    {/* container-xxs position-relative p-0 */}
    <div class="">
    {/* class="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0" */}
      <nav class="b navbar navbar-expand-lg navbar-dark bg-light  px-0 px-lg-0 py-0 py-lg-0" >
        {/* שם משתמש */}
        {console.log(nameUser, "nameUser2")}
        {/* {(nameUser= "אורח") ? <h4 style={{ marginLeft: "21%", marginTop: "1.5%" }}>{nameUser}</h4>  : <h4 style={{ marginLeft: "2%", marginTop: "1.5%" }}>{nameUser}</h4>}; */}
        <h4 style={{ marginLeft: "20%", marginTop: "1.5%" }}>{nameUser}</h4>
        <img style={{ marginTop: "1%" }} width="3%" height="3%" class="w3-circle" alt="Alps" src={`https://localhost:44324/Images/${funcToImgOfCurrentUser()}`}></img>
        {/* כפתור התנתקות */}
        {(CurrentUser.length != 0) ? <button style={{ marginLeft: "2%", marginTop: "2%", width: "1%", height: "1%" }} icon={<HelpIcon className='t' />} onClick={() => { funToLogOut() }}></button> : <span></span>}

        <img src={logo} class="logo3" ></img>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span class="fa fa-bars"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav ms-auto py-0 pe-10">

            {(CurrentUser.typeOfUser == 2 || CurrentUser.typeOfUser == 3) ?
              <Link to={`/Nav/Area/${CurrentUser.typeOfUser}`} class="nav-item nav-link">אזור אישי</Link>
              : (CurrentUser.typeOfUser == 4) ? <Link to={`/Nav/HomePageManager`} class="nav-item nav-link">אזור אישי</Link> : <span></span>}

            <Link to={"/Nav/Wins/a"} class="nav-item nav-link">ניצחונות</Link>
            <Link to={"/Nav/About"} class="nav-item nav-link">אודותנו</Link>

            {(CurrentUser.typeOfUser == 0 || CurrentUser.length == 0) ?
              <Link to={`/Nav/LoginForm/${toLogin}/${toLogin}`} class="nav-item nav-link">התחברות</Link>
              : <span></span>}

            <Link to={"/Nav/MySongs/0"} class="nav-item nav-link">השירים שלנו</Link>

            <Link to={"/Nav/Plans"} class="nav-item nav-link">דף הבית </Link>

          </div>
        </div>
      </nav>


    </div>


    {/* <MDBNavbar expand='lg' dark bgColor='white'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Navbar</MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarColor02'
          aria-controls='navbarColor02'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavColor(!showNavColor)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse show={showNavColor} navbar>
          <MDBNavbarNav className='me-auto mb-10 mb-lg-3'>

            <MDBNavbarItem className='active'  >
              <MDBNavbarLink aria-current='page' icon={<AudiotrackIcon className='t' />} ><Link color={orange} to={"/Nav/Wins/a"}>נצחונות</Link></MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem className='active' icon={<AudiotrackIcon className='t' />}>
              <MDBNavbarLink aria-current='page' ><Link to={"/Nav/MySongs/0"}>השירים שלנו</Link></MDBNavbarLink>
            </MDBNavbarItem>

            {(CurrentUser.typeOfUser >= 2) ?
              <MDBNavbarItem className='active' icon={<AudiotrackIcon className='t' />}>
                {(CurrentUser.typeOfUser == 3 || CurrentUser.typeOfUser == 2) ?
                  <MDBNavbarLink aria-current='page' ><Link to={`/Nav/Area/${CurrentUser.typeOfUser}`}>אזור אישי</Link></MDBNavbarLink> :
                  <MDBNavbarLink aria-current='page' > <Link to={`/Nav/HomePageManager`}>אזור אישי</Link></MDBNavbarLink>}


              </MDBNavbarItem>

              : <span></span>}

            {(CurrentUser.typeOfUser == 0 || CurrentUser.length == 0) ?
              <MDBNavbarItem className='active' icon={<AudiotrackIcon className='t' />}>
                <MDBNavbarLink aria-current='page' ><Link to={`/Nav/LoginForm/${toLogin}/${toLogin}`}>התחברות</Link></MDBNavbarLink>
             
              </MDBNavbarItem>
              : <span></span>}


            <MDBNavbarItem className='active' icon={<AudiotrackIcon className='t' />}>
              <MDBNavbarLink aria-current='page' ><Link to={"/Nav/About"}>אודותנו</Link></MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem className='active' icon={<AudiotrackIcon className='t' />}>
              <MDBNavbarLink href='#'><Link to={"/Nav/Plans"}>דף הבית </Link></MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          {console.log(nameUser, "nameUser2")}
          <h4 style={{ marginLeft: "10%", marginTop: "1.5%" }}>{nameUser}</h4>
          <img style={{ marginTop: "1%" }} width="3%" height="3%" class="w3-circle" alt="Alps" src={`https://localhost:44324/Images/${funcToImgOfCurrentUser()}`}></img>
          {(CurrentUser.length != 0) ? <button style={{ marginLeft: "2%", marginTop: "2%", width: "1%", height: "1%" }} icon={<HelpIcon className='t' />} onClick={() => { funToLogOut() }}></button> : <span></span>}

          <img src={logo} class="logo2" ></img>
        </MDBCollapse>

      </MDBContainer>
    </MDBNavbar> */}





    {/* <div>
      <AppBar position="static" color="orange">
        <Tabs className='tabs'

          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"

        >



          <Tab label="נצחונות" icon={<AudiotrackIcon className='t' />}   {...a11yProps(6)}>
            <Link to={"/Nav/Plans"}>דף הבית </Link>
          </Tab>
          <Tab label="שירים" icon={<FavoriteIcon className='t' />} {...a11yProps(5)} >
            <Link to={"/Nav/Plans"}>דף הבית </Link>
          </Tab>
          {(CurrentUser.typeOfUser == 0 || CurrentUser.length == 0) ? <Tab label="התחברות" icon={<PersonPinIcon className='t' />} {...a11yProps(4)} /> : <span></span>}
          <Tab label="אודותנו" icon={<HelpIcon className='t' />} {...a11yProps(3)} />
          {(CurrentUser.typeOfUser >= 2) ? <Tab label="אזור אישי" icon={<HelpIcon className='t' />} {...a11yProps(2)} /> : <label></label>}
          <Tab label="דף הבית" icon={<AudiotrackIcon className='t' />} {...a11yProps(1)} />


          <img src={logo} class="logo" ></img>

          {console.log(nameUser, "nameUser2")}
          <h4 style={{ marginLeft: "10%", marginTop: "1.5%" }}>{nameUser}</h4>
          <img style={{ marginTop: "1%" }} width="3%" height="3%" class="w3-circle" alt="Alps" src={`https://localhost:44324/Images/${funcToImgOfCurrentUser()}`}></img>
          {(CurrentUser.length != 0) ? <button style={{ marginLeft: "2%", marginTop: "2%", width: "1%", height: "1%" }} icon={<HelpIcon className='t' />} onClick={() => { funToLogOut() }}></button> : <span></span>}


        </Tabs>


      </AppBar>

    


      <TabPanel value={value} index={1}>
        <Link to={"/Nav/MySongs/0"}>השירים שלנו</Link>

      </TabPanel>

      <TabPanel value={value} index={5}>
        <Link to={"/Nav/Plans"}>דף הבית </Link>

      </TabPanel>


      {(CurrentUser.typeOfUser == 0 || CurrentUser.length == 0) ?
        <TabPanel value={value} index={2}>

          <Link to={`/Nav/LoginForm/${toLogin}/${toLogin}`}>התחברות</Link>
         
        </TabPanel>
        : <span></span>}

      <TabPanel value={value} index={3}>
        <Link to={"/Nav/About"}>אודותנו</Link>
      </TabPanel>


      {(CurrentUser.typeOfUser >= 2) ?
        <TabPanel value={value} index={4}>
          {(CurrentUser.typeOfUser == 3 || CurrentUser.typeOfUser == 2) ?
            <Link to={`/Nav/Area/${CurrentUser.typeOfUser}`}>אזור אישי</Link> :
            <Link to={`/Nav/HomePageManager`}>אזור אישי</Link>}
        </TabPanel> : <span></span>}

      <TabPanel value={value} index={0}>
        <Link to={"/Nav/Wins/a"}>נצחונות</Link>
      </TabPanel>

      
    </div > */}

    <Outlet></Outlet>


  </>;
}
