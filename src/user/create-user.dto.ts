export class CreateUserDTO{
    readonly userId: number;
    readonly name:string;
    readonly email:string;
    readonly password:string;
    readonly administrator:boolean;
    readonly score:number;
}