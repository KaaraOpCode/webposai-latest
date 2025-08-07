'use client';
import { useState } from 'react';
import { MarketHeader } from '@/components/Market/MarketHeader';

interface Product {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  price: number | null;
  quantity: number | null;
  alert_threshold: number | null;
  category: string | null;
  store: string | null;
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    sku: 'WH-001',
    barcode: '1234567890123',
    price: 29.99,
    quantity: 50,
    alert_threshold: 10,
    category: 'Electronics',
    store: 'Main Branch',
  },
  {
    id: '2',
    name: 'Cotton T-Shirt',
    sku: 'CT-001',
    barcode: '1234567890124',
    price: 19.99,
    quantity: 30,
    alert_threshold: 5,
    category: 'Clothing',
    store: 'Main Branch',
  },
];

const categories = ['Clothing', 'Electronics', 'Groceries', 'Stationery', 'Toys'];
const stores = ['Main Branch', 'Online Store'];

export default function ProductCRUDPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStore, setFilterStore] = useState('');

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormData(product);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = () => {
    const newProduct: Product = {
      id: (products.length + 1).toString(),
      name: formData.name || '',
      sku: formData.sku || '',
      barcode: formData.barcode || '',
      price: parseFloat(formData.price as never) || 0,
      quantity: parseInt(formData.quantity as never) || 0,
      alert_threshold: parseInt(formData.alert_threshold as never) || 0,
      category: formData.category || '',
      store: formData.store || '',
    };
    setProducts(prev => [...prev, newProduct]);
    setFormData({});
  };

  const handleUpdate = () => {
    if (!selectedProduct) return;
    setProducts(prev =>
      prev.map(p => (p.id === selectedProduct.id ? { ...p, ...formData, id: p.id } : p))
    );
    setSelectedProduct(null);
    setFormData({});
  };

  const handleDelete = () => {
    if (!selectedProduct) return;
    setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
    setSelectedProduct(null);
    setFormData({});
  };

  const handleClearForm = () => {
    setSelectedProduct(null);
    setFormData({});
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode.includes(searchQuery);
    const matchesCategory = !filterCategory || p.category === filterCategory;
    const matchesStore = !filterStore || p.store === filterStore;
    return matchesSearch && matchesCategory && matchesStore;
  });

  return (
    <main className="w-full h-screen flex flex-col bg-gray-50">
      <MarketHeader />

      <div className="flex-1 flex overflow-hidden px-6 py-4 space-x-6">
        {/* Left: Products List */}
        <div className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-md w-1/2 min-w-[480px] overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Products List</h2>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Search by name, SKU, barcode..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-grow p-2 border rounded text-sm"
              />
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="w-48 p-2 border rounded text-sm"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
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
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <li
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className={`p-4 border rounded cursor-pointer hover:bg-gray-100 ${
                    selectedProduct?.id === product.id ? 'bg-gray-200' : ''
                  }`}
                >
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                  <p className="text-sm text-gray-600">Barcode: {product.barcode}</p>
                  <p className="text-sm text-gray-600">Price: LSL {product.price}</p>
                  <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                  <p className="text-sm text-gray-600">Threshold: {product.alert_threshold}</p>
                  <p className="text-sm text-gray-600">Category: {product.category}</p>
                  <p className="text-sm text-gray-600">Store: {product.store}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No products found.</p>
            )}
          </ul>
        </div>

        {/* Right: CRUD Operations */}
        <div className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-md w-1/2 min-w-[480px] p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-6">{selectedProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <div className="space-y-5 flex-grow overflow-auto">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
            />
            <input
              type="text"
              name="sku"
              placeholder="SKU"
              value={formData.sku || ''}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
            />
            <input
              type="text"
              name="barcode"
              placeholder="Barcode"
              value={formData.barcode || ''}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price || ''}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity || ''}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
            />
            <input
              type="number"
              name="alert_threshold"
              placeholder="Alert Threshold"
              value={formData.alert_threshold || ''}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
            />
            <select
              name="category"
              value={formData.category || ''}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
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
              {selectedProduct ? (
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
                  Create Product
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
