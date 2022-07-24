import axios from "axios"
import { useDispatch } from "react-redux"
import { LoadGetAllUsers, LoadGetCurrentUser,AddUserAction } from './UserActions'

export const defaultURL = `https://localhost:44324/api/User`

export const GetAllUsersFromServer = async (dispatch, getState) => {
    try {
        const AllUsers = await axios.get(`${defaultURL}/GetAllUsers`);
        await console.log(AllUsers.data)
        await dispatch(LoadGetAllUsers(AllUsers.data))
        return AllUsers.data;
    } catch (e) {
        console.log(e)
    }
}

export const GetCurrentUserByNameAndPassFromServer = async (dispatch, getState, Lname, Fname, pass) => {
    try {
        console.log("thunk");
        const CurrentUser = await axios.get(`${defaultURL}/GetCurrentUserByNameAndPass/${Lname}/${Fname}/${pass}`);
        await console.log(CurrentUser.data)
        await dispatch(LoadGetCurrentUser(CurrentUser.data))
        return CurrentUser.data;
    } catch (e) {
        console.log(e)
    }
}

export const AddUser = async (dispatch, c) => {
    try {
        debugger;
        console.log(c);
        debugger;
        const allUsersAfterAdding = await axios.post(`${defaultURL}/AddUser`, c);
        console.log("all", allUsersAfterAdding.data)
        await dispatch(AddUserAction(c))
        return allUsersAfterAdding.data;
    } catch (e) {
        console.log(e)
    }
}