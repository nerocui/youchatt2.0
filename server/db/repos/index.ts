import { UsersRepository } from './users';
import { RequestRepository } from './requests';

interface IExtensions {
    users: UsersRepository,
    requests: RequestRepository,
}

export {
    IExtensions,
    UsersRepository,
    RequestRepository,
};
