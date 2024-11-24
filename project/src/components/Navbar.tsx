import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { Wallet, Menu } from 'lucide-react';
import { authAtom } from '../store/auth';
import { shortenAddress } from '../lib/utils';

export default function Navbar() {
  const [auth] = useAtom(authAtom);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            LoyaltyCoupons
          </Link>

          <div className="flex items-center gap-6">
            {auth.wallet ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary">
                  Dashboard
                </Link>
                {auth.isAdmin && (
                  <Link to="/manage-coupons" className="text-gray-700 hover:text-primary">
                    Manage Coupons
                  </Link>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Wallet className="w-4 h-4" />
                  <span>{shortenAddress(auth.wallet)}</span>
                </div>
              </>
            ) : (
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {/* Wallet connect handler will be added */}}
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}