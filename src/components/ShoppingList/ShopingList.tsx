import { useState } from 'react';

export const ShoppingList = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const addItem = () => {
    const value = input.trim();
    if (value) {
      setCart([...cart, value]);
    }
    setInput('');
  };

  const clear = () => {
    setCart([]);
  };
  const deleteItem = (index: number) => {
    setCart(cart.filter((_, idx) => idx !== index));
  };

  return (
    <div data-testid="shopping-list">
      <h1>Shopping list</h1>
      <input
        type="text"
        placeholder="Add item"
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={() => addItem()}>Add</button>
      <button onClick={() => clear()}>clear all</button>
      {cart.length > 0 && (
        <ul>
          {cart.map((item, index) => {
            return (
              <li key={`{item.slice(0,10)-${index}`}>
                <p>{item}</p>
                <button onClick={() => deleteItem(index)}>delete</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
