import { Flight } from './Flight';

export class Airline {
    public constructor(init?: Partial<Airline>) {
        Object.assign(this, init);
    }

    Id: number;
    Name: string;
    Description: string;
    Address: string;
    Flights: Flight[];
    AirlineDestinations;
}