import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import logo from '../images/logo.jpg'

export const About = () => {
  //שליפת כל השופטים מהסטור
  const AllJudgesFromStore = useSelector((store) => {
    console.log("store", store);
    console.log(store.Judges.Judges);
    return store.Judges.Judges;
  });

  const allWinsFromStore = useSelector((store) => {
    return store.Plans.Wins;
  });

  console.log(allWinsFromStore, "allWinsFromStore");

  //שליפת כל התוכניות מהסטור
  const AllPlansFromStore = useSelector((store) => {
    console.log("AllPlansFromStore", store);
    console.log(store.Plans.Plans);
    return store.Plans.Plans;
  });

  // const winsFromStoragePerPlan = useSelector(() => {
  //   debugger
  //   AllPlansFromStore.map((x) => {
  //     let WinsInPlanFromStorage = localStorage.getItem(x.planName);
  //     console.log(WinsInPlanFromStorage, "WinsInPlanFromStorage++");
  //     var JsonFromStorage = JSON.parse(WinsInPlanFromStorage);
  //     if (JsonFromStorage) {
  //       var length = JsonFromStorage.length;

  //       let wins = [];
  //       if (length > 3) {
  //         var win1 = JsonFromStorage[length - 1]
  //         wins.push(win1)
  //         var win2 = JsonFromStorage[length - 2]
  //         wins.push(win2)
  //         var win3 = JsonFromStorage[length - 3]
  //         wins.push(win3)
  //       }
  //       else if (length > 2) {
  //         var win1 = JsonFromStorage[length - 1]
  //         wins.push(win1)
  //         var win2 = JsonFromStorage[length - 2]
  //         wins.push(win2)
  //       }
  //       else if (length >= 1) {
  //         var win1 = JsonFromStorage[length - 1]
  //         wins.push(win1)

  //       }
  //       // myDispatch(LoadCalcWins(wins))
  //       return wins;
  //     }

  //     else
  //       return ""
  //   })
  // });
  // console.log(winsFromStoragePerPlan, "winsFromStoragePerPlan++++++++++++");

  return <>
    <img src={logo} ></img>
    <h1 className='.h3-name-plan' >אתר הקול קובע- תחרויות שירה</h1>
    <h3>חוויה מוזיקלית קצבית ומאתגרת</h3>
    <h3>!כל אחד יכול</h3>
    <h3>האתר מעניק הזדמנות לכל אחד
      להוציא לפועל את הכוחות המוזיקליים שבו</h3>
    <h3>-כאן, דרך האתר</h3>
    <br></br>
    <h3>,תוכל לשתף את הצופים בסרטון שלך</h3>
    <h3>לקבל ניקוד מהצופים ומשופטי האתר המקצועיים</h3>
    <br></br>
    <h2>...כך תסלול את הדרך שלך לעולם המוזיקה</h2>
    <br></br>
    <h4>מלבד זאת האתר מקנה לצופים אתגר מוזיקלי</h4>
    <h4>ע"י צפייה בסרטוני המתמודדים בתחרות ודרוג שמשפיע על הניצחון בתחרות </h4>
    <br></br>
    <h3>בסיום כל תוכנית יבחרו שלושה מנצחים עפ"י הניקוד שניתן להם</h3>
    <h2>המנצח במקום ראשון יזכה בהוצאת אלבום אישי ע"י צוות השופטים</h2>
    <h2>המנצח במקום השני יזכה בהוצאת סינגל </h2>
    <h2>והמנצח במקום השלישי יזכה בסך ₪2000 </h2>
    <br></br>
    <br></br>
    <br></br>
    <h1>....השופטים שלנו</h1>
    {console.log(AllJudgesFromStore, "!@#!@#!@#!@#!@#$!@#$%!@#$%^!@#$%^7")}
    {AllJudgesFromStore && AllJudgesFromStore.map((item, i) => {
      return <>
        {/* <div class="mic">
          <i class="mic-icon"></i>
          <div class="mic-shadow"></div>
        </div> */}
        <Card className='Card' sx={{ maxWidth: 150, backgroundColor: 'white' }}>
          <CardHeader

            title={
              <h3 className='h3-name-plan'>{item.userFirstName} {item.userLastName}</h3>
            }
            subheader={
              <h5> סגנון {item.judgeType}</h5>
            }
          />
          <CardMedia
            component="img"
            height="100"
            image={`https://localhost:44324/Images/${item.judgePic}`}
            alt="Paella dish"
          />
          <CardActions disableSpacing className='CardActions'>

            <IconButton aria-label="add to favorites">
              {/* <FavoriteIcon></FavoriteIcon> */}
            </IconButton>
            משהו מיוחד בשופט זה :
            {item.judgeCancalingReason}
          </CardActions>
        </Card>
      </>
    })}

    <h1>המנצחים שלנו</h1>
    {allWinsFromStore[0] && allWinsFromStore[0].map((win) => {
      console.log(win, "win");
      return <>
        <li> {win.nameSong}</li>
      </>
    })}


    <h1>ליצירת קשר</h1>

    {/* <section class="projects" id="projects">
      <div class="body-projects">
        <div class="container pro-con">
            <input type="radio" name="slider" id="item-1" checked>
            <input type="radio" name="slider" id="item-2">
            <input type="radio" name="slider" id="item-3">
            <div class="cards">
                <h2 class="mt-4 mb-5" data-aos="fade-up">Projects</h2>
              <label class="me-card" for="item-1" id="song-1">
                <div class="item" data-aos="zoom-in">
                    <div class="item-image">
                        <img loading="lazy" src={logo} alt="dev-home" style="height: 50%;">
                    </div>
                    <div class="item-text">
                        <div class="item-text-wrap">
                          <p class="item-text-category">Front End Project</p>
                          <h4 class="item-text-title">Mardi Gra Project</h4>
                          <div class="item-links">
                            <h6><a href="https://chava-mardigras.netlify.app/" target="_blank">To Website</a></h6>
                          </div>
                        </div>
                      </div>
                </div>
    
              </label>
              <label class="me-card" for="item-2" id="song-2">
                <div class="item" data-aos="zoom-in"     data-aos-delay="500"
                >
                    <div class="item-image">
                        <img loading="lazy" src="img/vod.JPG " alt="dev-home">
                    </div>
                    <div class="item-text">
                        <div class="item-text-wrap">
                          <p class="item-text-category">Jquery  Node js Project</p>
                          <h4 class="item-text-title">CRM System - vod</h4>
                          <div class="item-links">
                            <h6><a href="https://vodcrm.herokuapp.com/" target="_blank">To Website</a></h6>
                          </div>
                        </div>
                      </div>
                </div>
              </label>
              <label class="me-card" for="item-3" id="song-3">
                <div class="item"  data-aos="zoom-in" data-aos-delay="800">
                    <div class="item-image">
                        <img loading="lazy" src="img/טאלנט.JPG " alt="dev-home">
                    </div>
                    <div class="item-text">
                        <div class="item-text-wrap">
                          <p class="item-text-category">React & Node js Project</p>
                          <h4 class="item-text-title">Next Talent</h4>
                          <div class="item-links">
                            <h6><a href="https://nextalent.herokuapp.com/" target="_blank">To Website</a></h6>
                          </div>
                        </div>
                      </div>
                </div>
              </label>
            </div>
          
          </div>
        </div>

    </section> */}
    <section class="contact" id="contact">
      <div>
        <div class="container">
          <div class="contact-items">
            <div class="contact-item">
              <div data-aos="fade-down-right" data-aos-delay="200" class="me-contact-info">
                <i class="far fa-envelope"></i>
                <h4>אימייל</h4>
                <p onclick="document.location='mailto:c7193394@gmail.com'" >Esty3353@gmail.com </p>
                <p onclick="document.location='mailto:c7193394@gmail.com'" >yafi99428@gmail.com </p>
              </div>
            </div>
            <div data-aos="fade-down" data-aos-delay="200" class="contact-item">
              <div class="me-contact-info">
                <i class="fas fa-phone-alt"></i>
                <h4>Phone</h4>
                <p><a href="tel:+972527193394" >054-857-3353</a></p>
                <p><a href="tel:+972527193394" >058-329-9428</a></p>
              </div>
            </div>
            
          </div>
          <form id="id_form" autocomplete="on" class="col-10 col-md-8 col-lg-6">
            <div class="formIn">
              <div class="div_input1">
                <input type="text" id="id_name" name="name" class="form-control" placeholder="Name" required />
              </div>
              <div class="div_input2">
                <input type="tel" id="id_phone" name="phone" class="form-control" placeholder="Phone" required />
              </div>
              <div class="div_input3 ">
                <input type="email" id="id_email" name="email" class="form-control" placeholder="Email" required />
              </div>
            </div>
            <div class="div_input4">
              <input type="text" id="id_subject" name="subject" class="form-control" placeholder="Subject" required />
            </div>
            <textarea type="text" rows="4" name="message" id="id_message" class="col form-control" placeholder="Your Message" required></textarea>
            <div class="center mt-3">
              <button type="submit" class="col-12 col-md-4">send message</button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <footer class="me-footer">
      <div class="me-footer-copyright">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="me-copyright-block">
                <p>&copy; 2021 All right reserved by Chava</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  </>

}