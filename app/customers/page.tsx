'use client';
import { useState } from 'react';
import { MarketHeader } from '@/components/Market/MarketHeader';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  loyalty_points: number | null;
  notes: string;
  store: string | null;
}

const initialCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '62000001',
    address: 'Maseru CBD',
    loyalty_points: 120,
    notes: 'Frequent buyer',
    store: 'Main Branch',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '62000002',
    address: 'Pioneer Mall',
    loyalty_points: 80,
    notes: '',
    store: 'Main Branch',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mikej@example.com',
    phone: '62000003',
    address: 'Southside',
    loyalty_points: 50,
    notes: 'VIP',
    store: 'Online Store',
  },
];

const stores = ['Main Branch', 'Online Store'];

export default function CustomerCRUDPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<Partial<Customer>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStore, setFilterStore] = useState('');

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormData(customer);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = () => {
    const newCustomer: Customer = {
      id: (customers.length + 1).toString(),
      name: formData.name || '',
      email: formData.email || '',
      phone: formData.phone || '',
      address: formData.address || '',
      loyalty_points: parseInt(formData.loyalty_points as never) || 0,
      notes: formData.notes || '',
      store: formData.store || '',
    };
    setCustomers(prev => [...prev, newCustomer]);
    setFormData({});
  };

  const handleUpdate = () => {
    if (!selectedCustomer) return;
    setCustomers(prev =>
      prev.map(c => (c.id === selectedCustomer.id ? { ...c, ...formData, id: c.id } : c))
    );
    setSelectedCustomer(null);
    setFormData({});
  };

  const handleDelete = () => {
    if (!selectedCustomer) return;
    setCustomers(prev => prev.filter(c => c.id !== selectedCustomer.id));
    setSelectedCustomer(null);
    setFormData({});
  };

  const handleClearForm = () => {
    setSelectedCustomer(null);
    setFormData({});
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    const matchesStore = !filterStore || c.store === filterStore;
    return matchesSearch && matchesStore;
  });

  return (
    <main className="w-full h-screen flex flex-col bg-gray-50">
      <MarketHeader />

      <div className="flex-1 flex overflow-hidden px-6 py-4 space-x-6">
        {/* Left: Customers List */}
        <div className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-md w-1/2 min-w-[480px] overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Customers List</h2>

            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-grow p-2 border rounded text-sm"
              />
              <select
                value={filterStore}
                onChange={e => setFilterStore(e.target.value)}
                className="w-48 p-2 border rounded text-sm"
              >
                <option value="">All Stores</option>
                {stores.map(store => (
                  <option key={store} value={store}>
                    {store}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ul className="flex-1 overflow-y-auto p-5 space-y-3">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map(customer => (
                <li
                  key={customer.id}
                  onClick={() => handleSelectCustomer(customer)}
                  className={`p-4 border rounded cursor-pointer hover:bg-gray-100 ${
                    selectedCustomer?.id === customer.id ? 'bg-gray-200' : ''
                  }`}
                >
                  <h3 className="font-medium">{customer.name}</h3>
                  <p className="text-sm text-gray-600">Email: {customer.email}</p>
                  <p className="text-sm text-gray-600">Phone: {customer.phone}</p>
                  <p className="text-sm text-gray-600">Store: {customer.store}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No customers found.</p>
            )}
          </ul>
        </div>

        {/* Right: CRUD Operations */}
        <div className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-md w-1/2 min-w-[480px] p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-6">{selectedCustomer ? 'Edit Customer' : 'Add New Customer'}</h2>
          <div className="space-y-5 flex-grow overflow-auto">
            <input
              type="text"
              name="name"
              placeholder="Customer Name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email || ''}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone || ''}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address || ''}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
            />
            <input
              type="number"
              name="loyalty_points"
              placeholder="Loyalty Points"
              value={formData.loyalty_points || ''}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
            />
            <textarea
              name="notes"
              placeholder="Notes"
              value={formData.notes || ''}
              onChange={handleInputChange}
              className="w-full border p-3 rounded resize-y min-h-[80px]"
            />
            <select
              name="store"
              value={formData.store || ''}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
            >
              <option value="">Select Store</option>
              {stores.map(store => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>

            <div className="flex space-x-4">
              {selectedCustomer ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="flex-grow bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-grow bg-red-600 text-white px-5 py-3 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleClearForm}
                    className="flex-grow bg-gray-500 text-white px-5 py-3 rounded hover:bg-gray-600"
                  >
                    Clear
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCreate}
                  className="w-full bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700"
                >
                  Create Customer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
