/** Línea del carrito: producto + cantidad. */
export type CartLine = {
  productId: string;
  qty: number;
};

/** Añade 1 unidad (o incrementa si ya estaba). Devuelve un array nuevo (inmutable). */
export function addToCart(lines: CartLine[], productId: string): CartLine[] {
  const existing = lines.find((line) => line.productId === productId);
  if (existing) {
    return lines.map((line) =>
      line.productId === productId ? { ...line, qty: line.qty + 1 } : line,
    );
  }
  return [...lines, { productId, qty: 1 }];
}

export function removeFromCart(lines: CartLine[], productId: string): CartLine[] {
  return lines.filter((line) => line.productId !== productId);
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}
