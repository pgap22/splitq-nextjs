import Credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"
import { getUserByEmail } from "./lib/user";

export default {
    providers: [Credentials({

        async authorize(data) {
            const { email, password } = data;

            const user = await getUserByEmail(email);

            if (!user) return null

            const isSamePassword = await bcryptjs.compare(password, user.password)

            if (!isSamePassword) return null
            return user
        }

    })]
}