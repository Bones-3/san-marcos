// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { obtenerProductos, guardarProductos } from "../data/productos";
import { agregarAlCarrito, cambiarCantidad, obtenerCarrito, obtenerLineasCarrito, contarCarrito } from "./carrito";

describe("carrito", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // OK COMPLEJO
  it("suma la cantidad si se agrega el mismo producto dos veces", () => {
    agregarAlCarrito(1, 2);
    agregarAlCarrito(1, 3);
    agregarAlCarrito(4, 1);

    const carrito = obtenerCarrito();

    expect(carrito.length).toBe(2);
    expect(carrito.find(item => item.id === 1).cantidad).toBe(5);
    expect(contarCarrito()).toBe(6);
  });

  it("usa el stock actual y excluye los productos eliminados o agotados", () => {
    agregarAlCarrito(1, 5);
    agregarAlCarrito(2, 2);
    agregarAlCarrito(3, 2);

    const [primero, segundo] = obtenerProductos();
    guardarProductos([{ ...primero, stock: 3 }, { ...segundo, stock: 0 }]);

    expect(obtenerLineasCarrito().map(({ id, cantidad }) => ({ id, cantidad })))
      .toEqual([{ id: 1, cantidad: 3 }]);
    expect(contarCarrito()).toBe(3);
  });

  it("guarda cantidades enteras y quita la línea si el stock es cero", () => {
    agregarAlCarrito(1, 2.5, 5);
    expect(obtenerCarrito()).toEqual([{ id: 1, cantidad: 2 }]);

    cambiarCantidad(1, 4.5, 3);
    expect(obtenerCarrito()).toEqual([{ id: 1, cantidad: 3 }]);

    cambiarCantidad(1, 1, 0);
    expect(obtenerCarrito()).toEqual([]);
  });
});
