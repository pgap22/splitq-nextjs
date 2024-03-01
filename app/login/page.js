function GetData(delay) {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
}

export default async function LoginPage() {
    await GetData(5000);
    return (
        <p>Hola Login</p>
    )
}