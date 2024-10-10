export class UserService {
    constructor(userDao) {
        this.userDao = userDao;
    }

    getUserById(id) {
        const user = this.userDao.findById(id);
        if (!user) throw new Error('User not found');
        return user;
    }
}