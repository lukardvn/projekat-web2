import { Flight } from 'src/models/Flight';
import { User } from 'src/models/User';

export class Reservation {
    public constructor(init?: Partial<Reservation>) {
        Object.assign(this, init);
    }

    Id: number;
    User: User;
    DepartingFlight: Flight;
    ReturningFlight: Flight;
}