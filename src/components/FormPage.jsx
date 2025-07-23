import React, { useState } from 'react';
import { uid } from 'uid';
import Items from './Items';
import Modal from './Modal';
import incrementString from '../helpers/incrementString';

const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const FormPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([
    {
      id: uid(6),
      name: '',
      qty: 1,
      price: '1.00',
    },
  ]);

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);
  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  return (
    
    <form
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-4 rounded-lg bg-white  p-6 shadow-sm">
        {/* ENVOYCE Header */}
        <div className="border-b border-purple-100 pb-4">
          <h1 className="text-center ml-100 border-4 rounded-full w-38  border-purple-00 text-3xl font-bold tracking-tighter text-purple-600 font-mono">
            ENVOYCE
          </h1>
          <div className="flex flex-col justify-between pt-2 md:flex-row md:items-center">
            <div className="flex space-x-2 text-sm text-gray-600">
              <span className="font-medium">Date: </span>
              <span>{today}</span>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium" htmlFor="invoiceNumber">
                Invoice #:
              </label>
              <input
                required
                className="w-24 rounded-lg border border-gray-300 bg-white px-3 py-1 text-center focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                type="number"
                name="invoiceNumber"
                id="invoiceNumber"
                min="1"
                step="1"
                value={invoiceNumber}
                onChange={(event) => setInvoiceNumber(event.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Customer/Cashier - Stacked Layout */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="cashierName" className="text-sm font-medium">
              Cashier
            </label>
            <input
              required
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Name"
              type="text"
              name="cashierName"
              id="cashierName"
              value={cashierName}
              onChange={(event) => setCashierName(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="customerName" className="text-sm font-medium">
              Customer
            </label>
            <input
              required
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Name"
              type="text"
              name="customerName"
              id="customerName"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
            />
          </div>
        </div>

        {/* Items Table - Purple Accents */}
        <table className="w-full pt-4">
          <thead>
            <tr className="border-2 border-purple-200 bg-purple-50 text-sm text-purple-500">
              <th className="pl-2 text-left font-medium">ITEM</th>
              <th className="py-2 text-left font-medium">QTY</th>
              <th className="py-2 text-left font-medium">PRICE</th>
              <th className="pr-2 text-left font-medium">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <Items
                key={item.id}
                id={item.id}
                name={item.name}
                qty={item.qty}
                price={item.price}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}
              />
            ))}
          </tbody>
        </table>

        {/* Add Item Button */}
        <button
          type="button"
          onClick={addItemHandler}
          className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
          <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">+ Add Item</span>
          <span class="relative invisible">+ Add Item</span>
      
        </button>

        {/* Totals Section */}
        <div className="flex flex-col items-end space-y-3 pt-6">
          <div className="flex w-full justify-between md:w-1/2">
            <span className="text-sm font-medium">Subtotal:</span>
            <span className="font-medium">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="text-sm font-medium">Discount:</span>
            <span className="text-sm">({discount || '0'}%) ₹{discountRate.toFixed(2)}</span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="text-sm font-medium">Tax:</span>
            <span className="text-sm">({tax || '0'}%) ₹{taxRate.toFixed(2)}</span>
          </div>
          <div className="flex w-full justify-between border-t border-gray-200 pt-2 md:w-1/2">
            <span className="font-medium">Total:</span>
            <span className="font-bold text-purple-500">₹{total % 1 === 0 ? total : total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="basis-1/4 bg-transparent">
        <div className="sticky bg-purple-50 top-6 rounded-lg  z-10 space-y-10 divide-y shadow-sm  divide-gray-200 pb-18 pr-10 pl-4 pt-6 ">
          {/* Review Invoice Button */}
          <button
            type="submit"
            className="relative inline-flex items-center justify-center p-4 mt-6 px-10 py-3 w-48 ml-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
          <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">See Invoice</span>
          <span class="relative invisible">See Invoice</span>
          
          </button>

          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              invoiceNumber,
              cashierName,
              customerName,
              subtotal,
              taxRate,
              discountRate,
              total,
            }}
            items={items}
            onAddNextInvoice={addNextInvoiceHandler}
          />
          

          {/* Tax/Discount Inputs */}
          <div className="space-y-4 pt-1">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="tax">
                Tax Rate
              </label>
              <div className="flex">
                <input
                  className="w-full rounded-l-lg border border-r-0 border-purple-300 bg-white px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  type="number"
                  name="tax"
                  id="tax"
                  min="0.01"
                  step="0.01"
                  placeholder="0.0"
                  value={tax}
                  onChange={(event) => setTax(event.target.value)}
                />
                <span className="flex items-center rounded-r-lg bg-purple-500 px-3 text-sm text-white">
                  %
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="discount">
                Discount Rate
              </label>
              <div className="flex">
                <input
                  className="w-full rounded-l-lg border border-r-0 border-purple-300 bg-white px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  type="number"
                  name="discount"
                  id="discount"
                  min="0"
                  step="0.01"
                  placeholder="0.0"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                />
                <span className="flex items-center rounded-r-lg bg-purple-500 px-3 text-sm text-white">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormPage;