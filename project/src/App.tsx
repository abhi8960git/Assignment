import { Routes, Route } from 'react-router-dom';
import { Provider } from 'jotai';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateOrganization from './pages/CreateOrganization';
import ManageCoupons from './pages/ManageCoupons';
import ClaimCoupon from './pages/ClaimCoupon';

function App() {
  return (
    <Provider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-organization" element={<CreateOrganization />} />
            <Route path="/manage-coupons" element={<ManageCoupons />} />
            <Route path="/claim/:couponId" element={<ClaimCoupon />} />
          </Routes>
        </main>
      </div>
    </Provider>
  );
}

export default App;