using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BLL;
using DTO;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class JudgeController : ControllerBase
    {
        //BLL משתנה פרטי מסוג שכבת
        IJudgeBLL _JudgeBll;
        public JudgeController(IJudgeBLL _jBll)
        {
            _JudgeBll = _jBll;
        }

        //שליפת רשימת שופטים
        [HttpGet("GetAllJudges")]
        public IActionResult GetAllJudges()
        {
            return Ok(_JudgeBll.GetAllJudges());
        }

        //הוספת זמר 
        [HttpPost("Addjudge")]
        public IActionResult Addjudge([FromBody] JudgeDTO t)
        {
            return Ok(_JudgeBll.Addjudge(t));
        }
    }
}
