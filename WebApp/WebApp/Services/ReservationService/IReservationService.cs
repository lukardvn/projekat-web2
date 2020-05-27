using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Dtos.Reservation;
using WebApp.Models;

namespace WebApp.Services.ReservationService
{
    public interface IReservationService
    {
        Task<ServiceResponse<List<Reservation>>> GetAllReservations();
        Task<ServiceResponse<List<Reservation>>> AddReservation(AddReservationDto newReservation);
    }
}
