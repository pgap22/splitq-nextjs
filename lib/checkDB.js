export async function checkDB(url){
    try {
        const data = !!(await prisma.$queryRaw`SELECT 1`)

        return !!data
    } catch (error) {
        return false
    }
}