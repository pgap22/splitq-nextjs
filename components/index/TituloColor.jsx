import { useEffect, useState } from "react";

function TituloColor({ texto }) {
  const [ultimaPalabra, setUltimaPalabra] = useState("");

  useEffect(() => {
    if (texto) {
      const palabras = texto.split(" ");
      const quitarPalabra = palabras[palabras.length - 1];
      const quitada = texto.replace(quitarPalabra, "");
      const ultimaPalabraConEstilos = (
        <>
          <span>{quitada}</span>
          <span className="text-gradient bg-gradient-principal">{quitarPalabra}</span>
        </>
      );
      setUltimaPalabra(ultimaPalabraConEstilos);
    }
  }, [texto]);

  return <div className="capitalize font-black text-center md:text-6xl text-2xl">{ultimaPalabra}</div>;
}

export default TituloColor;
