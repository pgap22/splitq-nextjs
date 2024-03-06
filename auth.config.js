import Credentials from "next-auth/providers/credentials"

export default {
    providers: [Credentials({
        
        async authorize(data){
            console.log(data)
        }

    })]
}