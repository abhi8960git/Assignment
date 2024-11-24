import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building2 } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useWallet } from '../hooks/useWallet';

const schema = z.object({
  name: z.string().min(3, 'Organization name must be at least 3 characters'),
});

type FormData = z.infer<typeof schema>;

export default function CreateOrganization() {
  const navigate = useNavigate();
  const { isConnected, connectWallet } = useWallet();
  const [isCreating, setIsCreating] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!isConnected) return;
    
    setIsCreating(true);
    try {
      // TODO: Create organization using smart contract
      navigate('/manage-coupons');
    } catch (error) {
      console.error('Failed to create organization:', error);
    } finally {
      setIsCreating(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-md mx-auto text-center">
        <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600 mb-6">
          Please connect your wallet to create an organization
        </p>
        <Button onClick={connectWallet}>Connect Wallet</Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Organization</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Organization Name
          </label>
          <Input
            id="name"
            {...register('name')}
            error={!!errors.name}
            placeholder="Enter organization name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" isLoading={isCreating}>
          Create Organization
        </Button>
      </form>
    </div>
  );
}