import {Service} from "typedi";
import {InjectRepository} from "typeorm-typedi-extensions";
import {UserRepository} from "../repository/user.repository";

@Service()
export class UserService {
    constructor(
        @InjectRepository()
        private readonly userRepository: UserRepository,
    ) {}

    async findAll() {
        return this.userRepository.find();
    }

}