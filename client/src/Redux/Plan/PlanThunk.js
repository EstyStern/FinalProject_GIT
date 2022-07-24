import axios from "axios"
import { LoadGetAllPlans, LoadAddPlan, LoadUpdateMyPlan, LoadCalcWins } from "./PlanActions"

export const defaultURL = `https://localhost:44324/api/Plan`

export const GetAllPlansFromServer = async (dispatch) => {
    try {
        const AllPlans = await axios.get(`${defaultURL}/GetAllPlans`);
        await console.log(AllPlans.data)
        await dispatch(LoadGetAllPlans(AllPlans.data))
        return AllPlans.data;
    } catch (e) {
        console.log(e)
    }
}

export const AddPlan = async (dispatch, p) => {
    debugger
    try {
        debugger
        console.log(p);
        const allPlansAfterAdding = await axios.post(`${defaultURL}/AddPlan`, p);
        await console.log("all", allPlansAfterAdding.data)
        debugger
        await dispatch(LoadAddPlan(allPlansAfterAdding.data))
        return allPlansAfterAdding.data;
    } catch (e) {
        console.log(e)
    }
}

export const UpdatePlan = async (dispatch, p) => {
    debugger
    try {
        debugger
        const PlanToUpdate = await axios.put(`${defaultURL}/UpdatePlan`, p);
        await console.log(PlanToUpdate.data)
        debugger
        await dispatch(LoadUpdateMyPlan(PlanToUpdate.data))
        return PlanToUpdate.data;
    } catch (e) {
        console.log(e)
    }

}

export const GetWinsInPlanFromServer = async (dispatch, songsPerPlan) => {
    try {
        debugger
        const AllWinsInPlan = await axios.post(`https://localhost:44324/api/Song/GetWinsInPlan`, songsPerPlan);
        await console.log("WINS IN PLAN", AllWinsInPlan.data)
        var length =  AllWinsInPlan.data.length;
        let wins = [];
        if (length > 3) {
            var win1 = AllWinsInPlan.data[length - 1]
            wins.push(win1)
            var win2 = AllWinsInPlan.data[length - 2]
            wins.push(win2)
            var win3 = AllWinsInPlan.data[length - 3]
            wins.push(win3)
        }
        else if (length > 2) {
            var win1 = AllWinsInPlan.data[length - 1]
            wins.push(win1)
            var win2 = AllWinsInPlan.data[length - 2]
            wins.push(win2)
        }
        else if (length >= 1) {
            var win1 = AllWinsInPlan.data[length - 1]
            wins.push(win1)

        }

        await dispatch(LoadCalcWins(wins))
        //לstorage הכנסה 
        debugger
        var WinsFromStorage
        localStorage.setItem(AllWinsInPlan.data && AllWinsInPlan.data[0].namePlan, JSON.stringify(wins));
        //AllWinsInPlan.data.forEach(element => {
        //localStorage.setItem(element.nameSong, JSON.stringify(element));
        WinsFromStorage = localStorage.getItem(AllWinsInPlan.data[0].namePlan);
        // });

        console.log("WinsFromStorage!!!!!!!!!", WinsFromStorage);
        // var ourPicturesFromStorage = JSON.parse(imagesFromStorage);
        // const idContainer = document.getElementById('idContainer');
        return AllWinsInPlan.data;
    } catch (e) {
        console.log(e)
    }
}