import { User } from './User';
import { Flight } from './Flight';

export class Review {
    constructor(userId: number, flightId: number, rating: number){
        this.UserId = userId,
        this.FlightId = flightId,
        this.Rating = rating
    }

    Id: number;
    UserId: number;
    FlightId: number;
    Rating: number;
}