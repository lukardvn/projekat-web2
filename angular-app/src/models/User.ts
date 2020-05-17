export class User {
    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    Id: number;
    Email: string;
    Password: string;
    Name: string;
    Surname: string;
    City: string;
    PhoneNumber: string;
}