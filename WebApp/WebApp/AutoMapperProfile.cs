using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Dtos.Flight;
using WebApp.Dtos.Reservation;
using WebApp.Dtos.User;
using WebApp.Models;

namespace WebApp
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, GetUserDto>();
            CreateMap<AddUserDto, User>();
            CreateMap<AddReservationDto, Reservation>();
        }
    }
}
