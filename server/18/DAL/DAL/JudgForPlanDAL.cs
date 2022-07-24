using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class JudgForPlanDAL : IJudgForPlanDAL
    {
        //יצירת משתנה מסוג הDB
        DB_projectContext _DB;
        //מאתחלת ב-CTOR
        public JudgForPlanDAL(DB_projectContext DB)
        {
            _DB = DB;
        }
        //פונקציה שמחזירה את כל השופטים של כל התוכנית  

        public List<JudgForPlanTbl> GetAllJudgForPlans()
        {
            return _DB.JudgForPlanTbls.Include(a => a.User).Include(e => e.User.JudgeTbls).ToList();
        }


        //הוספת  שופט 
        public List<JudgForPlanTbl> AddJudge(JudgForPlanTbl t)
        {
            try
            {
                _DB.JudgForPlanTbls.Add(t);
                _DB.SaveChanges();
                //return _DB.JudgForPlanTbls.Include(a => a.TypePlan)
                return _DB.JudgForPlanTbls.Include(a => a.User).Include(e => e.User.JudgForPlanTbls).ToList();
            }
            catch
            {
                throw new Exception("faild!-add plan");
            }

        }


        //עדכון שופט 
        public List<JudgForPlanTbl> UpdateJudge(List<JudgForPlanTbl> p)
        {
            List<JudgForPlanTbl> newJudgs = p;//רשימת שופטים חדשה 
            List<JudgForPlanTbl> prevJudgs = GetAllJudgForPlans().FindAll(x => x.PlanId == p[0].PlanId);//רשימת שופטים קודמת
            for (int i = 0; i < prevJudgs.Count(); i++)
            {
                prevJudgs[i].UserId = newJudgs[i].UserId;
            }
            //  var JudgeToEdit = _DB.JudgForPlanTbls.FirstOrDefault(a => a.JudgForPlanId == p.JudgForPlanId);
            //if (JudgeToEdit != null)
            // {
            // JudgeToEdit.UserId = p.UserId;

            _DB.SaveChanges();
            return _DB.JudgForPlanTbls.ToList();
        }
        //    return null;
        //}
    }
}
