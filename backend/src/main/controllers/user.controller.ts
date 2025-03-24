import { Controller, Post, Body, BadRequestException } from "@nestjs/common";

import { UserSignUp, UserSignIn}                                  from "../dtos/user.dto";
import { HashService }                                 from "../services/hash.service";
import { UserService }                                 from "../services/user.service";
import { JwtService } from "@nestjs/jwt";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService, private hashService: HashService, private readonly jwtService: JwtService ) { }

  @Post("signup")
  async signUp(@Body() userSignUp: UserSignUp): Promise<{accessToken: string}> {
    const userExists = await this.userService.getUserByEmail(userSignUp.email);
    if (userExists) {
      throw new BadRequestException("User already exists");
    }
    const passwordHash = await this.hashService.hashPassword(userSignUp.password, 10);
    const newUser = await this.userService.saveUser(userSignUp.name, userSignUp.email, passwordHash);
    const token = await this.jwtService.sign({ email: newUser.email, id: newUser.id });
    if (newUser) {
      return { accessToken: token};
    }
    throw new BadRequestException("Can't save this user");
  }

  @Post("signin")
    async signIn(@Body() userSignIn: UserSignIn): Promise<{accessToken: string}> {
        const user = await this.userService.getUserByEmail(userSignIn.email);
        if (!user) {
            throw new BadRequestException("User not found");
        }
        const passwordMatch = await this.hashService.comparePassword(userSignIn.password, user.password);
        if (!passwordMatch) {
            throw new BadRequestException("Incorrect password");
        }
        const token = await this.jwtService.sign({ email: user.email, id: user.id });
        return { accessToken: token };
    }


}
