import UserRepository from "../repositories/user.repository.js"

class UsersService {
    static async getById(userId) {
        const userFound = await UserRepository.getById(userId)

        const user = {
            _id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            role: userFound.role, 
            image_url: userFound.image_url, 
            created_at: userFound.created_at,
            reviews_count: userFound.reviews_count,
            comments_count: userFound.comments_count
        }

        return user
    }

    static async searchUsers({ search, maxResults, startIndex }) {
        const usersFound = await UserRepository.searchUsers({ search, maxResults, startIndex })

        return usersFound
    }
}

export default UsersService