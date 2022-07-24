import axios from "axios"
import { useDispatch } from "react-redux"
import {LoadGetAllJudges} from './JudgeActions'

export const defaultURL = `https://localhost:44324/api/Judge`

export const GetAllJudgesFromServer = async (dispatch) => {
    try {
        const AllJudges = await axios.get(`${defaultURL}/GetAllJudges`);
        await console.log(AllJudges.data)
        await dispatch(LoadGetAllJudges(AllJudges.data))
        return AllJudges.data;
    } catch (e) {
        console.log(e)
    }
}

export const Addjudge = async (dispatch, c) => {
    try {
        debugger;
        console.log(c);
        debugger;
        const alljudgesAfterAdding = await axios.post(`${defaultURL}/Addjudge`, c);
        console.log("all", alljudgesAfterAdding.data)
        // await dispatch(AddUserAction(c))
        return alljudgesAfterAdding.data;
    } catch (e) {
        console.log(e)
    }
}