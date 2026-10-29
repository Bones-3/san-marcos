import { describe, it, expect } from "vitest";
import { correoValido, runValido } from "./validaciones";

describe("validaciones", () => {

  // POSITIVO 
  it("acepta un correo con dominio permitido", () => {
    expect(correoValido("victor@duoc.cl")).toBe(true);
  });

  // ERROR
  it("rechaza un correo con dominio no permitido", () => {
    expect(correoValido("victor@hotmail.com")).toBe(false);
  });

  // ERROR 
  it("rechaza RUN con formato o dígito verificador incorrecto", () => {
    expect(runValido("190110221")).toBe(false);    
    expect(runValido("19.011.022-2")).toBe(false); 
    expect(runValido("ABC12345")).toBe(false);     
    expect(runValido("12345")).toBe(false);        
  });
});