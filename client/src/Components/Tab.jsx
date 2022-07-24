


// import React, { useState } from 'react';
// import {
//     MDBNavbar,
//     MDBContainer,
//     MDBIcon,
//     MDBNavbarNav,
//     MDBNavbarItem,
//     MDBNavbarLink,
//     MDBNavbarToggler,
//     MDBNavbarBrand,
//     MDBCollapse
// } from 'mdb-react-ui-kit';

// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import PhoneIcon from '@material-ui/icons/Phone';
// import AudiotrackIcon from '@mui/icons-material/Audiotrack';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import PersonPinIcon from '@material-ui/icons/PersonPin';
// import HelpIcon from '@material-ui/icons/Help';
// import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
// import ThumbDown from '@material-ui/icons/ThumbDown';
// import ThumbUp from '@material-ui/icons/ThumbUp';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import { AllUsers } from './AllUsers';
// import { AllPlans } from './AllPlans';
// import { color } from '@mui/system';
// import RecipeReviewCard from '../Components/Plans';
// import Alert from './Alert';
// import { LoginForm } from './LoginForm';
// import Trylogin from './Trylogin';
// import { Link, Outlet, useNavigate } from "react-router-dom"
// import { useDispatch, useSelector } from 'react-redux';


// import { GetAllSongsFromServer } from '../Redux/Song/SongThunk';
// import { GetAllPlansFromServer } from '../Redux/Plan/PlanThunk'
// import { GetAllStepInPlanFromServer } from '../Redux/StepInPlan/StepInPlanThunk'
// import { GetAllJudgForPlanFromServer } from "../Redux/JudgForPlan/JudgForPlanThunk";
// import { GetAllJudgesFromServer } from "../Redux/Judge/JudgeThunk";
// import { LoadGetCurrentUser } from "../Redux/User/UserActions";
// import { GetAllSingersFromServer } from '../Redux/Singer/SingerThunk';
// import { SaveAllPlansToShow } from "../Redux/Plan/PlanActions";
// import { IfFromArea } from '../Redux/User/UserActions'
// import logo from '../images/logo.jpg'

// export default function App() {
//     const [showNavColor, setShowNavColor] = useState(false);
//     const [showNavColorSecond, setShowNavColorSecond] = useState(false);
//     const [showNavColorThird, setShowNavColorThird] = useState(false);

//     return (
//         <>
//             <MDBNavbar expand='lg' dark bgColor='primary'>
//                 <MDBContainer fluid>
//                     <MDBNavbarBrand href='#'>Navbar</MDBNavbarBrand>
//                     <MDBNavbarToggler
//                         type='button'
//                         data-target='#navbarColor02'
//                         aria-controls='navbarColor02'
//                         aria-expanded='false'
//                         aria-label='Toggle navigation'
//                         onClick={() => setShowNavColor(!showNavColor)}
//                     >
//                         <MDBIcon icon='bars' fas />
//                     </MDBNavbarToggler>
//                     <MDBCollapse show={showNavColor} navbar>
//                         <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>

//                             <MDBNavbarItem className='active' >
//                                 <MDBNavbarLink aria-current='page' ><Link to={"/Nav/Wins/a"}>נצחונות</Link></MDBNavbarLink>
//                             </MDBNavbarItem>

//                             {(CurrentUser.typeOfUser >= 2) ?
//                                 <MDBNavbarItem>
//                                     {(CurrentUser.typeOfUser == 3 || CurrentUser.typeOfUser == 2) ?
//                                         <MDBNavbarLink aria-current='page' ><Link to={`/Nav/Area/${CurrentUser.typeOfUser}`}>אזור אישי</Link></MDBNavbarLink> :
//                                         <MDBNavbarLink aria-current='page' > <Link to={`/Nav/HomePageManager`}>אזור אישי</Link></MDBNavbarLink>}


//                                 </MDBNavbarItem>

//                                 : <span></span>}

//                             {(CurrentUser.typeOfUser == 0 || CurrentUser.length == 0) ?
//                                 <MDBNavbarItem>
//                                     <MDBNavbarLink aria-current='page' ><Link to={`/Nav/LoginForm/${toLogin}/${toLogin}`}>התחברות</Link></MDBNavbarLink>
//                                     {/* <Trylogin></Trylogin> */}
//                                     {/* <LoginForm></LoginForm> */}
//                                     {/* <RgisterOrUpdateForm></RgisterOrUpdateForm> */}
//                                 </MDBNavbarItem>
//                                 : <span></span>}


//                             <MDBNavbarItem>
//                                 <MDBNavbarLink aria-current='page' ><Link to={"/Nav/About"}>אודותנו</Link></MDBNavbarLink>
//                             </MDBNavbarItem>

//                             <MDBNavbarItem>
//                                 <MDBNavbarLink href='#'><Link to={"/Nav/Plans"}>דף הבית </Link></MDBNavbarLink>
//                             </MDBNavbarItem>
//                         </MDBNavbarNav>

//                     </MDBCollapse>
//                 </MDBContainer>
//             </MDBNavbar>

//         </>
//     );
// }