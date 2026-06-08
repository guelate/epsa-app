import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {

    //Log in user
    async login({ request, response }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])
        const user = await User.verifyCredentials(email, password)
        const token = await User.accessTokens.create(user)


        return response.ok({
            token: token.value!.release(),
            user: {
                id: user.id,
                email: user.email,
            },
        })
    }


    //Log out user
    async logout({ auth, response }: HttpContext) {
        const user = auth.getUserOrFail()
        const token = auth.user!.currentAccessToken

        if (!token) {
            return response.unauthorized({ message: 'No active token found' })
        }

        await User.accessTokens.delete(user, token.identifier)
        return response.ok({ message: 'Déconnecté avec succès' })
    }


    // Get the current user
    async me({ auth, response }: HttpContext) {
        return response.ok({ user: auth.user })
    }
}