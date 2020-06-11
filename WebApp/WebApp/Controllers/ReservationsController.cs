using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Dtos.Reservation;
using WebApp.Services.ReservationService;

namespace WebApp.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationsController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet("GetAll")] //GET localhost/Reservations/GetAll za rezervacije trenutnog korisnika
        public async Task<IActionResult> Get()
        {
            //int userId = int.Parse(User.Claims.FirstOrDefault(r =W> r.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _reservationService.GetAllReservations());
        }

        [HttpPost("AddReservation")]
        public async Task<IActionResult> Add(AddReservationDto newReservation)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(await _reservationService.AddReservation(newReservation));
        }

        [HttpGet("{id}")] //GET localhost/Reservations/GetAll za rezervacije trenutnog korisnika
        public async Task<IActionResult> GetSingle(int id)
        {
            //int userId = int.Parse(User.Claims.FirstOrDefault(r =W> r.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _reservationService.GetSingle(id));
        }

        [HttpDelete("CancelReservation/{reservationId}")]
        public async Task<IActionResult> Cancel(int reservationId)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(await _reservationService.CancelReservation(reservationId));
        }
    }
}