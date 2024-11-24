import { Link } from 'react-router-dom';
import { Ticket, Building2, Wallet } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Blockchain-Powered Loyalty Coupons
        </h1>
        <p className="text-xl text-gray-600">
          Create, manage, and redeem digital coupons securely on the blockchain
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Building2 className="w-8 h-8" />}
          title="Create Organization"
          description="Set up your business and start issuing digital coupons"
        />
        <FeatureCard
          icon={<Ticket className="w-8 h-8" />}
          title="Issue Coupons"
          description="Create and distribute coupons to your customers"
        />
        <FeatureCard
          icon={<Wallet className="w-8 h-8" />}
          title="Secure Redemption"
          description="Customers can safely claim and use coupons with their wallet"
        />
      </div>

      <div className="text-center">
        <Link
          to="/create-organization"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Get Started
          <Building2 className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg bg-white shadow-md">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}