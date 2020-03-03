using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymApi.Models;
using MercadoPago.DataStructures.Preference;
using MercadoPago.Resources;

namespace GymApi.Controllers{
    [Route("api/procesar-pago")]
    [ApiController]
    public class PagosController : ControllerBase{
        [HttpPost]
        public Task<ActionResult<Payment>> PostUser()
        {
            MercadoPago.SDK.AccessToken = "TEST-2474095106554044-030321-b561ca0f53559c1f508f4643fd6fb6eb-44152268";

            Preference preference = new Preference();

            preference.Items.Add(
                new Item(){
                    Title = "titulo",
                    Quantity = 1,
                    UnitPrice = (decimal)50
                }
            );

            preference.Save();

            return null;
        }
    }
}