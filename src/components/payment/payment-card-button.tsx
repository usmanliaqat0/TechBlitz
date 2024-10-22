'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CheckoutForm } from './(testing)/checkout-form';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { createSubscription } from '@/actions/stripe/stripe-subscription';
import { useState } from 'react';
import type { StripeProduct } from '../../types/StripeProduct';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const getClientSecret = async (
  product: StripeProduct
): Promise<{
  invoice: string;
  paymentPrice: number;
} | null> => {
  const response = await createSubscription(product);
  if (!response || !response.invoice) return null;
  return response;
};

export function PaymentButton({ product }: { product: StripeProduct }) {
  const [loading, setLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleClientSecret = async (plan: StripeProduct) => {
    setLoading((prevLoading) => ({
      ...prevLoading,
      [plan.id]: true,
    }));

    try {
      const response = await getClientSecret(plan);

      if (!response) {
        toast.error('Failed to create subscription');
        return;
      }

      setClientSecret(response.invoice);
      setOpen(true);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while trying to create the subscription');
    } finally {
      setLoading((prevLoading) => ({
        ...prevLoading,
        [plan.id]: false,
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={async () => await handleClientSecret(product)}
          className="flex gap-x-2 min-w-[84px] duration-300 ease-in-out"
          variant={product.metadata.mostPopular ? 'secondary' : 'default'}
        >
          {loading[product.id] ? (
            <ReloadIcon className="w-3 h-3 animate-spin" />
          ) : (
            'Buy now'
          )}
        </Button>
      </DialogTrigger>
      {clientSecret && (
        <DialogContent>
          <Elements stripe={stripe} options={{ clientSecret }}>
            <CheckoutForm
              productPrice={product.default_price.unit_amount as number}
            />
          </Elements>
        </DialogContent>
      )}
    </Dialog>
  );
}
