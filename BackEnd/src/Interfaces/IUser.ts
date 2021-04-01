import { IEvent } from './IEvent';

export interface IUser{
    name: string,
    username: string,
    password: string,
    tickets : [],
    favorites :[]
    token?: string,
    admin: boolean
}