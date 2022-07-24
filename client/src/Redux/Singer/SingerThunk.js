import axios from "axios"
import { useDispatch } from "react-redux"
import {LoadGetAllSingers,UpdateSinger} from './SingerActions'

export const defaultURL = `https://localhost:44324/api/Singer`

export const GetAllSingersFromServer = async (dispatch) => {
    try {
        const AllSingers = await axios.get(`${defaultURL}/GetAllSingers`);
        await console.log(AllSingers.data)
        await dispatch(LoadGetAllSingers(AllSingers.data))
        return AllSingers.data;
    } catch (e) {
        console.log(e)
    }
}

export const UpdateSingerInServer = async (dispatch, getState, updateSinger) => {
    try {
        debugger
        const allSingersAfterUpdate = await axios.put(`${defaultURL}/UpdateSinger`,updateSinger);
        await console.log(allSingersAfterUpdate.data)
        await dispatch(UpdateSinger(allSingersAfterUpdate.data))
        return allSingersAfterUpdate.data;
    } catch (e) {
        console.log(e)
    }
}


export const AddSinger = async (dispatch, c) => {
    debugger
    try {
        debugger;
        console.log(c);
        debugger;
        const allSingersAfterAdding = await axios.post(`${defaultURL}/AddSinger`, c);
        console.log("all", allSingersAfterAdding.data)
        // await dispatch(AddUserAction(c))
        return allSingersAfterAdding.data;
    } catch (e) {
        console.log(e)
    }
}