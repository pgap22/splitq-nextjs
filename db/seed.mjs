import { PrismaClient } from "@prisma/client"
import bcryptjs from "bcryptjs"

const prismaDev = new PrismaClient();

const seedDB = async()=>{
    await prismaDev.users.createMany({
        data: [
            {
                name: "Admin",
                password: await bcryptjs.hash('123123123', 5),
                email: "admin@splitq.com",
                role: 'admin'
            },
            {
                name: "Seller",
                password: await bcryptjs.hash('123123123', 5),
                email: "seller@s.com",
                role: 'seller'
            },
            {
                name: "Moderador",
                password: await bcryptjs.hash('123123123', 5),
                email: "mod@splitq.com",
                role: 'mod'
            },
            {
                name: "asd",
                lastname: "asd",
                password: await bcryptjs.hash('123123123', 5),
                email: "asd@a.com",
                role: 'user'
            },
        ]
    })
    console.log("USER CREATED")
    
    await prismaDev.categories.createMany({
        data: [
            {
                name: 'Bebidas'
            },
            {
                name: 'Desayunos'
            },
            {
                name: 'Almuerzos'
            },
            {
                name: 'Postres'
            },
            {
                name: 'Snacks'
            },
        ]
    })
    console.log("ROLES CREATED")
}

seedDB();