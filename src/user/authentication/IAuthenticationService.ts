import { CreateUserDto } from "../dto/create-user.dto";

export interface IAuthenticationService{
    register(createUserDto : CreateUserDto),
    getAuthenticatedUser(email: string, password: string)
}