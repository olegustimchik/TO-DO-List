import { Injectable } from '@nestjs/common';
import { ListsEntity } from '../entities/lists.entity';
import { ListRequest } from '../types/requests-data';

@Injectable()
export class ListToRequestData { 
    constructor() { }

    toRequestItem(data: ListsEntity): ListRequest{
        return {
            id: data.id,
            name: data.name
        }
    }

}