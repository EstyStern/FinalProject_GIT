import { AllSongs } from '../Components/AllSongs';
import { Outlet, useHistory, useNavigate, useParams } from "react-router-dom"
export const Songs = () => {
    let params = useParams()
    return <>
        


        <div>
            {(params.idUser == 0) ? <span></span> : <h1></h1>}
            <AllSongs></AllSongs>
        </div>
    </>
}