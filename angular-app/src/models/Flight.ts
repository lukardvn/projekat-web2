import { Airline } from './Airline';

export class Flight {
    public constructor(init?: Partial<Flight>) {
        Object.assign(this, init);
    }

    Id: number;
    Origin: string;
    Destination: string;
    TakeoffTime: Date;
    LandingTime: Date;
    Duration: string;
    Distance: string;
    Stops: string;
    Price: string;
    SeatsLeft: number;
    Airline: Airline;
}