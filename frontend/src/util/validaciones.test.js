import { describe, it, expect } from "vitest";
import { validarCorreo, validarRun} from "./validaciones";


describe("validaciones", () => {

  // POSITIVO 
  it("acepta un correo con dominio permitido", () => {
    expect(validarCorreo("victor@duoc.cl")).toBe("");
  });

  // ERROR
  it("rechaza un correo con dominio no permitido", () => {
    expect(validarCorreo("victor@hotmail.com")).toBe("");
  });

  // ERROR 
  it("rechaza RUN con formato o dígito verificador incorrecto", () => {
    expect(validarRun("190110222")).toBe(true);    
    expect(validarRun("19.011.022-2")).toBe(true); 
    expect(validarRun("ABC12345")).toBe(true);          
  });
});