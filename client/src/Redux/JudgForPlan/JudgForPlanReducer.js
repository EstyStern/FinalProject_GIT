import produce from 'immer';

const JudgForPlanInitialState = {
    JudgForPlan: [],
    CurentJudgesForPlan: []
}

export const JudgForPlanReducer = produce((state, action) => {
    
    switch (action.type) {
        case 'LOAD_GET_ALL_JUDGE_FOR_PLANS':
            {
                state.JudgForPlan.push(action.payload);
                break;
            }
        case 'GET_CURENT_JUDGES_FOR_PLANS':
            {
                state.CurentJudgesForPlan = action.payload;
                break;
            }
        case 'LOAD_ADD_JUDGE':
            {
                state.JudgForPlan = action.payload;
                break;

            }
        case 'LOAD_UPDATE_JUDGE':
            {
                state.JudgForPlan = action.payload;
                break;

            }
    }
}, JudgForPlanInitialState)