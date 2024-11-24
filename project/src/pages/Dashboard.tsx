import { useEffect, useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { Ticket } from 'lucide-react';
import Button from '../components/Button';

interface Coupon {
  id: number;
  orgId: number;
  discountAmount: number;
  isUsed: boolean;
}

export default function Dashboard() {
  const { wallet, isConnected } = useWallet();
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    if (isConnected) {
      // TODO: Fetch user's coupons from smart contract
      setCoupons([]);
    }
  }, [isConnected]);

  if (!isConnected) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600 mb-4">Please connect your wallet to view your coupons</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Coupons</h2>
      {coupons.length === 0 ? (
        <div className="text-center py-8">
          <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">You don't have any coupons yet</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">Discount Coupon</h3>
                  <p className="text-2xl font-bold">${coupon.discountAmount}</p>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${coupon.isUsed ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-800'}`}>
                  {coupon.isUsed ? 'Used' : 'Active'}
                </span>
              </div>
              <Button
                className="w-full"
                disabled={coupon.isUsed}
                onClick={() => {/* TODO: Handle coupon usage */}}
              >
                Use Coupon
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}