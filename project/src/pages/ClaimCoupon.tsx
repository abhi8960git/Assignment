import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ticket } from 'lucide-react';
import Button from '../components/Button';
import { useWallet } from '../hooks/useWallet';

interface CouponDetails {
  id: string;
  orgId: number;
  discountAmount: number;
  isUsed: boolean;
  email: string;
}

export default function ClaimCoupon() {
  const { couponId } = useParams();
  const { isConnected, connectWallet } = useWallet();
  const [coupon, setCoupon] = useState<CouponDetails | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    if (couponId) {
      // TODO: Fetch coupon details from smart contract
    }
  }, [couponId]);

  const handleClaim = async () => {
    if (!isConnected || !coupon) return;
    
    setIsClaiming(true);
    try {
      // TODO: Claim coupon using smart contract
    } catch (error) {
      console.error('Failed to claim coupon:', error);
    } finally {
      setIsClaiming(false);
    }
  };

  if (!coupon) {
    return (
      <div className="text-center">
        <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Loading coupon details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center mb-6">
          <Ticket className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Claim Your Coupon</h2>
          <p className="text-gray-600">
            Connect your wallet to claim this ${coupon.discountAmount} discount coupon
          </p>
        </div>

        {!isConnected ? (
          <Button onClick={connectWallet} className="w-full">
            Connect Wallet to Claim
          </Button>
        ) : (
          <Button
            onClick={handleClaim}
            className="w-full"
            isLoading={isClaiming}
          >
            Claim Coupon
          </Button>
        )}
      </div>
    </div>
  );
}