import { useEffect } from 'react';
import { useHistory, useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { LoadCalcWins } from "../Redux/Plan/PlanActions"

export const Wins = () => {
    let params = useParams();
    let navigate = useNavigate()
    const myDispatch = useDispatch();

    const winsFromStoragePerPlan = useSelector(() => {
        let WinsInPlanFromStorage = localStorage.getItem(params.namePlan);
        var JsonFromStorage = JSON.parse(WinsInPlanFromStorage);
        if (JsonFromStorage) {
            var length = JsonFromStorage.length;

            let wins = [];
            if (length > 3) {
                var win1 = JsonFromStorage[length - 1]
                wins.push(win1)
                var win2 = JsonFromStorage[length - 2]
                wins.push(win2)
                var win3 = JsonFromStorage[length - 3]
                wins.push(win3)
            }
            else if (length > 2) {
                var win1 = JsonFromStorage[length - 1]
                wins.push(win1)
                var win2 = JsonFromStorage[length - 2]
                wins.push(win2)
            }
            else if (length >= 1) {
                var win1 = JsonFromStorage[length - 1]
                wins.push(win1)

            }
            // myDispatch(LoadCalcWins(wins))
            return wins;
        }
        else
            return ""
    });

    const allWinsFromStore = useSelector((store) => {
        return store.Plans.Wins;
    });

    //שליפת כל השירים מהסטור
    const AllSongsFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Songs.Songs);
        return store.Songs.Songs;
    });

    const funcNavigateRaiting = (nameSong) => {
        debugger
        console.log(params.namePlan);
        let idSong = AllSongsFromStore.filter(x => x.songName == nameSong)[0].songId
        debugger
        console.log("idSong", idSong);
        navigate(`/Nav/ShowRaiting/0/${idSong}`)
    }

    var lastpercentage = 0;

    return <>

        <h1>ניצחונות</h1>
        {/* איך מוציאים את כל הסטורג?????????????????? */}
        {(params.namePlan == "allPlan") ? <h1>הניצחונות שלנו</h1> : <h2>{params.namePlan}</h2>}
        {
            //2 אחרונים מהסטור
            winsFromStoragePerPlan && winsFromStoragePerPlan.length > 0 && winsFromStoragePerPlan.map((item, index) => {

                return <>
                    {/* אם יש 2 מנחצים עם אותו ניקוד */}
                    {(lastpercentage == item.percentage) ? <h2 id="placeWin">{`מקום ${index}`}</h2> : <h2>{`מקום ${++index}`}</h2>}
                    <h3>{item.nameSinger}</h3>
                    <h3>{item.nameSong}</h3>
                    <h3>{`${item.percentage}%`}</h3>
                    <h3>{item.idSong}</h3>
                    <button onClick={() => funcNavigateRaiting(item.nameSong)} >צפייה בדירוגים </button>
                    <span>------------------------</span>
                    {console.log("lastpercentage", lastpercentage)}
                </>
                lastpercentage = item.percentage


            })
        }

    </>
}
export default Wins