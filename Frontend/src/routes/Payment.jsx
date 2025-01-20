import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QiEw1LgwSSYx4xAHVWHK9Aarq765JxeUHD1q04ytwg4nnGYZ6clIgLJN5DdU4rn8Pg4PaU1kUCXbWcXuMlkgNpU00dH5bw8GR');

const Payment = () => {
    const [items, setItems] = useState([
        { name: '', price: '', quantity: '' },
    ]);

    const handleInputChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const addItem = () => {
        setItems([...items, { name: '', price: '', quantity: '' }]);
    };

    const createCheckoutSession = async () => {
        const lineItems = items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: { name: item.name },
                unit_amount: Math.round(parseFloat(item.price) * 100), // Convert dollars to cents
            },
            quantity: parseInt(item.quantity),
        }));

        try {
            const response = await axios.post('/api/v1/payment/create-checkout-session', { lineItems });
            const sessionId = response.data.sessionId;

            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                console.error('Stripe checkout error:', error);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Dynamic Stripe Payment</h2>

            {items.map((item, index) => (
                <div key={index} className="flex flex-col space-y-2 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={item.name}
                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="number"
                        placeholder="Price (in USD)"
                        value={item.price}
                        onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
            ))}

            <button
                onClick={addItem}
                className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
            >
                Add Another Item
            </button>

            <button
                onClick={createCheckoutSession}
                className="px-6 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600"
            >
                Proceed to Checkout
            </button>
        </div>
    );
};

export default Payment;