import { ShoppingList } from './ShopingList';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ShoppingList component', () => {
  it('render component without crushing', () => {
    render(<ShoppingList />);
    const root = screen.getByTestId('shopping-list');
    expect(root).toBeInTheDocument();
  });
  it('adding an item into the shopping cart', async () => {
    render(<ShoppingList />);
    const input = screen.getByPlaceholderText('Add item');
    const addBtn = screen.getByText('Add');

    await userEvent.type(input, 'add new item');
    await userEvent.click(addBtn);

    expect(screen.getByText('add new item')).toBeInTheDocument();
  });

  it('not adding an empty value', async () => {
    render(<ShoppingList />);
    const addBtn = screen.getByText('Add');
    await userEvent.click(addBtn);

    const shoppingList = screen.queryAllByRole('listitem');

    expect(shoppingList.length).toBe(0);
  });

  it('delete an item', async () => {
    render(<ShoppingList />);
    const input = screen.getByPlaceholderText('Add item');
    const addBtn = screen.getByText('Add');

    await userEvent.type(input, 'add new item');
    await userEvent.click(addBtn);
    const removeBtn = screen.getByText('delete');
    await userEvent.click(removeBtn);

    const shoppingList = screen.queryAllByRole('listitem');

    expect(shoppingList.length).toBe(0);
  });

  it('clear all items', async () => {
    render(<ShoppingList />);
    const input = screen.getByPlaceholderText('Add item');
    const addBtn = screen.getByText('Add');
    const clearBtn = screen.getByText('clear all');

    await userEvent.type(input, 'add item');
    await userEvent.click(addBtn);

    await userEvent.type(input, 'add item2');
    await userEvent.click(addBtn);

    await userEvent.type(input, 'add item3');
    await userEvent.click(addBtn);

    await userEvent.click(clearBtn);

    const shoppingList = screen.queryAllByRole('listitem');

    expect(shoppingList.length).toBe(0);
  });
});
