export class Destination {
    public constructor(init?: Partial<Destination>) {
        Object.assign(this, init);
    }

    Id: number;
    City: string;
    State: string;
}