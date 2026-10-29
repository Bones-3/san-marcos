// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { agregarAlCarrito, obtenerCarrito, obtenerCantidadCarrito } from "./carrito";

describe("carrito", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // POSITIVO 
  it("suma la cantidad si se agrega el mismo producto dos veces", () => {
    agregarAlCarrito(1, 2);
    agregarAlCarrito(1, 3);
    agregarAlCarrito(4, 1);

    const carrito = obtenerCarrito();

    expect(carrito.length).toBe(2);
    expect(carrito.find(item => item.id === 1).cantidad).toBe(5);
    expect(obtenerCantidadCarrito()).toBe(6);
  });
});