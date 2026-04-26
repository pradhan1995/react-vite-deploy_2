// src/App.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Spinner } from './components/ui/Spinner';

const CatalogPage       = lazy(() => import('./pages/CatalogPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage          = lazy(() => import('./pages/CartPage'));
const CheckoutPage      = lazy(() => import('./pages/CheckoutPage'));
const OtpPage           = lazy(() => import('./pages/OtpPage'));
const TrackingPage      = lazy(() => import('./pages/TrackingPage'));

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Spinner size={40} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"                  element={<CatalogPage />} />
            <Route path="/product/:id"       element={<ProductDetailPage />} />
            <Route path="/cart"              element={<CartPage />} />
            <Route path="/checkout"          element={<CheckoutPage />} />
            <Route path="/verify"            element={<OtpPage />} />
            <Route path="/track"             element={<TrackingPage />} />
            <Route path="/track/:orderRef"   element={<TrackingPage />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}
