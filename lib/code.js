export function generarCodigoVerificacion() {
    return Math.random().toString(36).split("0.")[1] +  Math.random().toString(36).split("0.")[1] +  Math.random().toString(36).split("0.")[1] +  Math.random().toString(36).split("0.")[1]

}