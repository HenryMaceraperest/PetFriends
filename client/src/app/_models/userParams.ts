import { User } from "./user";

export class UserParams {
    gender: string;
    petType: string;
    minAge = 0;
    maxAge = 30;
    pageNumber = 1;
    pageSize = 5;
    orderBy = 'lastActive';
 
    constructor(user: User) {
        this.gender = "";
        this.petType = user.petType === 'dog' ? 'dog' : 'cat';
    }
}