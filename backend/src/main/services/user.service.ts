import { UserEntity }       from "@/main/entities/user.entity";
import { HashService }      from "@/main/services/hash.service";
import { Injectable }       from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository }       from "typeorm";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>, private readonly hashService: HashService) { }

  public async saveUser(name: string, email: string, password: string): Promise<UserEntity> {
    return await this.userRepository.save({
      name, email, password,
    });
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }

  public async getUserById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
