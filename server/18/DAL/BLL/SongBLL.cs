using System;
using System.Collections.Generic;
using DTO;
using AutoMapper;
using DAL;
using DAL.Models;
using System.Linq;
///using System.Linq.Dynamic;

namespace BLL
{
    public class SongBLL : ISongBLL
    {
        //DALמופע מסוג ה
        ISongDAL _SongDAL;
        //IMapper מסוג ה
        IMapper _imapper;

        //ctor 
        //DALמקבל משתנה מסוג 
        //אתחול המשתנים שהגדרנו למעלה 
        public SongBLL(ISongDAL SongDAL)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<Auto>();

            });
            _imapper = config.CreateMapper();
            _SongDAL = SongDAL;
        }
        ////GetAllSongs
        ////פונקציה שמחזירה את כל השירים 
        //public List<SongDTO> GetAllSongs()
        //{
        //    List<SongTbl> listSongs = _SongDAL.GetAllSongs();
        //    //List<SongDTO> listReturn = new List<SongDTO>();
        //    try
        //    {
        //        //foreach (var item in listSongs)
        //        //{
        //        //    SongDTO s = _imapper.Map<SongTbl, SongDTO>(item);
        //        //    s.SingerImg = item.User.SingerTbls.ToArray()[0].SingerImg;
        //        //    listReturn.Add(s);

        //        //}
        //        //return listReturn;
        //        return _imapper.Map<List<SongTbl>, List<SongDTO>>(listSongs);
        //    }
        //    catch
        //    {
        //        throw new Exception("not succeed GetAllSongs!!");
        //    }
        //}

        //GetAllSongs
        //פונקציה שמחזירה את כל השירים 
        public List<SongDTO> GetAllSongs()
        {
            List<SongTbl> listSongs = _SongDAL.GetAllSongs();
            try
            {

                return _imapper.Map<List<SongTbl>, List<SongDTO>>(listSongs);
            }
            catch
            {
                throw new Exception("not succeed GetAllSongs!!");
            }
        }

        ////הוספת שיר חדש
        public List<SongDTO> AddSong(SongDTO s)
        {
            SongTbl songMap = _imapper.Map<SongDTO, SongTbl>(s);

            List<SongTbl> list = _SongDAL.AddSong(songMap);


            try
            {
                return _imapper.Map<List<SongTbl>, List<SongDTO>>(list);
            }
            catch
            {
                throw new Exception("faild!-add song");
            }
        }


        //חישוב נקודות
        public List<WinsDTO> GetWinsInPlan(List<SongDTO> listSong)
        {
            List<WinsDTO> listWins = new List<WinsDTO>();
            List<SongTbl> listModel = _SongDAL.GetAllSongs();
            decimal points = 0;
            int i = 0;
            try
            {
                foreach (var item in listSong)
                {
                    foreach (var element in listModel)
                    {
                        if (item.SongId == element.SongId)
                        {


                            //WinsDTO wins = _imapper.Map<SongTbl, WinsDTO>(element);
                            WinsDTO wins = new WinsDTO();
                            wins.nameSong = element.SongName;
                            wins.idSong = element.SongId;
                            //get all song לא נותן ב 
                            //לעשות include לUser
                            wins.nameSinger = item.UserFirstName+ " " + item.UserLastName;
                            foreach (var r in element.RatingTbls)
                            {
                                points += ((element.RatingTbls.ToArray()[i++].RatingFinal) * 100) / 300;
                            }
                            if(points>0)
                                wins.percentage = points / i + 1;
                            else
                                wins.percentage = 0;
                            wins.namePlan = element.StepInPlan.Plan.PlanName;

                            listWins.Add(wins);
                        }

                        i = 0;
                        points = 0;
                    }
                    
                }
                //var winsSort = listWins.AsQueryable().OrderBy("percentage").ToList();
                //return winsSort;
                
                return listWins.OrderByDescending(c => c.percentage).ToList();


            }

            catch
            {
                throw new Exception("not succeed get wins!!");
            }

            //המרה מסוג DTO לTBL
            //List<PlanDTO> listDto = GetAllPlans();
            //List<RatingDTO> listRaiting = GatA


        }

    }
}
