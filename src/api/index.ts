// src/api/index.ts
import type {
  CatalogResponse,
  ProductDetail,
  OrderPayload,
  OrderResponse,
  TrackingInfo,
} from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || '';

// ─── Mock Data ──────────────────────────────────────────────────────────────
const MOCK_PRODUCTS = [
  { id: '1', name: 'Basmati Rice', price: 120, category: 'Grocery', emoji: '🌾', description: 'Premium aged long-grain basmati, 1kg', inStock: true, unit: '1 kg' },
  { id: '2', name: 'Toor Dal', price: 85, category: 'Grocery', emoji: '🫘', description: 'Fresh toor dal, protein-rich, 500g', inStock: true, unit: '500 g' },
  { id: '3', name: 'Mustard Oil', price: 160, category: 'Grocery', emoji: '🫙', description: 'Pure cold-pressed mustard oil, 1L', inStock: true, unit: '1 L' },
  { id: '4', name: 'Atta (Wheat Flour)', price: 60, category: 'Grocery', emoji: '🌾', description: 'Whole wheat chakki-fresh atta, 2kg', inStock: true, unit: '2 kg' },
  { id: '5', name: 'Amul Full Cream Milk', price: 62, category: 'Dairy', emoji: '🥛', description: 'Fresh pasteurized full cream milk, 1L', inStock: true, unit: '1 L' },
  { id: '6', name: 'Paneer', price: 90, category: 'Dairy', emoji: '🧀', description: 'Fresh soft cottage cheese, 200g', inStock: true, unit: '200 g' },
  { id: '7', name: 'Curd (Dahi)', price: 40, category: 'Dairy', emoji: '🥣', description: 'Thick creamy set curd, 400g', inStock: true, unit: '400 g' },
  { id: '8', name: 'Butter', price: 55, category: 'Dairy', emoji: '🧈', description: 'Amul salted butter, 100g', inStock: true, unit: '100 g' },
  { id: '9', name: 'Lay\'s Classic Salted', price: 20, category: 'Snacks', emoji: '🥔', description: 'Crispy potato chips, classic salt flavour', inStock: true, unit: '26 g' },
  { id: '10', name: 'Biscuit Parle-G', price: 10, category: 'Snacks', emoji: '🍪', description: 'Classic glucose biscuits, family pack', inStock: true, unit: '100 g' },
  { id: '11', name: 'Haldiram\'s Bhujia', price: 50, category: 'Snacks', emoji: '🫘', description: 'Spicy crunchy moong dal bhujia', inStock: true, unit: '150 g' },
  { id: '12', name: 'Maggi Noodles', price: 14, category: 'Snacks', emoji: '🍜', description: 'Masala instant noodles, 2-minute recipe', inStock: true, unit: '70 g' },
  { id: '13', name: 'Coca-Cola', price: 40, category: 'Beverages', emoji: '🥤', description: 'Chilled refreshing cola, 600ml PET', inStock: true, unit: '600 ml' },
  { id: '14', name: 'Tropicana Orange', price: 55, category: 'Beverages', emoji: '🍊', description: 'Real fruit orange juice, 1L pack', inStock: true, unit: '1 L' },
  { id: '15', name: 'Green Tea', price: 120, category: 'Beverages', emoji: '🍵', description: 'Organic green tea bags, 25 sachets', inStock: true, unit: '25 bags' },
  { id: '16', name: 'Sprite', price: 20, category: 'Beverages', emoji: '💧', description: 'Lemon-lime sparkling drink, 250ml', inStock: true, unit: '250 ml' },
  { id: '17', name: 'Poha', price: 35, category: 'Grocery', emoji: '🌾', description: 'Thin beaten rice flakes, 500g', inStock: true, unit: '500 g' },
  { id: '18', name: 'Ghee', price: 280, category: 'Dairy', emoji: '🧈', description: 'Pure cow ghee, traditionally churned, 500ml', inStock: false, unit: '500 ml' },
];

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  if (!BASE_URL) {
    return getMockData<T>(path, options);
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getMockData<T>(path: string, options?: RequestInit): Promise<T> {
  await new Promise((r) => setTimeout(r, 600)); // simulate latency

  if (path === '/api/catalog') {
    return { products: MOCK_PRODUCTS } as T;
  }

  const detailMatch = path.match(/^\/api\/catalog\/(.+)$/);
  if (detailMatch) {
    const id = detailMatch[1];
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) throw new Error('Product not found');
    const related = MOCK_PRODUCTS.filter((p) => p.category === product.category && p.id !== id).slice(0, 4);
    return { ...product, related } as T;
  }

  if (path === '/api/order' && options?.method === 'POST') {
    const ref = 'DNS' + Math.floor(100000 + Math.random() * 900000);
    return { orderId: ref, orderRef: ref, message: 'OTP sent' } as T;
  }

  if (path === '/api/order/verify' && options?.method === 'POST') {
    const body = JSON.parse(options.body as string);
    if (body.otp === '000000') throw new Error('Invalid OTP');
    return { success: true, message: 'Order confirmed' } as T;
  }

  if (path === '/api/order/resend-otp' && options?.method === 'POST') {
    return { success: true } as T;
  }

  const trackMatch = path.match(/^\/api\/track\/(.+)$/);
  if (trackMatch) {
    const ref = trackMatch[1];
    return {
      orderRef: ref,
      status: 'accepted',
      customer: { name: 'Rahul Kumar', phone: '+91 98765 43210' },
      items: [
        { productId: '1', name: 'Basmati Rice', quantity: 2, price: 120 },
        { productId: '5', name: 'Amul Full Cream Milk', quantity: 1, price: 62 },
      ],
      total: 342,
      deliveryMode: 'delivery',
      paymentLink: 'https://rzp.io/l/mock-payment',
      timeline: [
        { status: 'verified', timestamp: new Date(Date.now() - 3600000).toISOString(), label: 'Order Verified' },
        { status: 'accepted', timestamp: new Date(Date.now() - 1800000).toISOString(), label: 'Order Accepted' },
      ],
    } as T;
  }

  throw new Error(`Mock: no handler for ${path}`);
}

// ─── API Functions ───────────────────────────────────────────────────────────
export const api = {
  getCatalog: (): Promise<CatalogResponse> => request('/api/catalog'),

  getProduct: (id: string): Promise<ProductDetail> => request(`/api/catalog/${id}`),

  placeOrder: (payload: OrderPayload): Promise<OrderResponse> =>
    request('/api/order', { method: 'POST', body: JSON.stringify(payload) }),

  verifyOtp: (orderRef: string, otp: string): Promise<{ success: boolean }> =>
    request('/api/order/verify', { method: 'POST', body: JSON.stringify({ orderRef, otp }) }),

  resendOtp: (orderRef: string, phone: string): Promise<{ success: boolean }> =>
    request('/api/order/resend-otp', { method: 'POST', body: JSON.stringify({ orderRef, phone }) }),

  trackOrder: (orderRef: string): Promise<TrackingInfo> =>
    request(`/api/track/${orderRef}`),
};
