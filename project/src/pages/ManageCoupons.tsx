import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ticket, Send } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  amount: z.string().transform((val) => Number(val)),
});

type FormData = z.infer<typeof schema>;

export default function ManageCoupons() {
  const [isCreating, setIsCreating] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsCreating(true);
    try {
      // TODO: Create and send coupon using smart contract
      reset();
    } catch (error) {
      console.error('Failed to create coupon:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Manage Coupons</h2>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Create New Coupon</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Email
              </label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                error={!!errors.email}
                placeholder="user@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Discount Amount ($)
              </label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                {...register('amount')}
                error={!!errors.amount}
                placeholder="0.00"
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full" isLoading={isCreating}>
            <Send className="w-4 h-4 mr-2" />
            Create and Send Coupon
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Issued Coupons</h3>
        <div className="text-center py-8">
          <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No coupons issued yet</p>
        </div>
      </div>
    </div>
  );
}