import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { UserListService } from '@/main/services/user-list.service';
import { UserRoles } from '@/main/enums/user-roles';

@Injectable()
export class ListRoleAccessGuard implements CanActivate {
  constructor(
    private readonly userListService: UserListService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const listId = request.params.id; // or wherever your listId comes from

    if (!user || !listId) {
      throw new ForbiddenException('Invalid user or list ID');
    }

    const userRoles = await this.userListService.getUserRoleInList(user.id, listId);
    if(!userRoles){ 
        throw new BadRequestException("List not found");
    }

    if ((userRoles.role !== UserRoles.OWNER) && (userRoles.role !== UserRoles.EDITOR)){ 
        throw new ForbiddenException("This user can't update or delete this list")
      }
    return true;
  }
}
