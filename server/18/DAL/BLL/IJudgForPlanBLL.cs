using System;
using System.Collections.Generic;
using System.Text;
using DTO;

namespace BLL
{
    public interface IJudgForPlanBLL
    {
        //GetAllJudgForPlans
        //פונקציה שמחזירה את כל השופטים של כל התוכניות 
        List<JudgForPlanDTO> GetAllJudgForPlans();

        //הוספת שופט
        List<JudgForPlanDTO> AddJudge(JudgForPlanDTO t);

        //עדכון שופט
        public List<JudgForPlanDTO> UpdateJudge(JudgForPlanDTO p);
    }
}
