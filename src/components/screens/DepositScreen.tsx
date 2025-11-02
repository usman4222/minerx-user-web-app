import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Copy, QrCode, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { CopyField } from '../shared/CopyField';
import { ShimmerList } from '../shared/ShimmerCard';
import { mockDepositTransactions } from '../shared/mockData';

export default function DepositScreen() {
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [filter, setFilter] = useState('All');
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [countdown, setCountdown] = useState(1800); // 30 minutes

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (paymentDialog && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [paymentDialog, countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);

    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (amountNum < 5) {
      toast.error('Minimum deposit amount is $5');
      return;
    }

    setPaymentDialog(true);
    setCountdown(1800);
  };

  const filters = ['All', 'Pending', 'Approved', 'Expired'];
  
  const filteredTransactions = filter === 'All'
    ? mockDepositTransactions
    : mockDepositTransactions.filter((t) => t.status === filter);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Expired':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-slate-900">Deposit Funds</h2>

      {/* Deposit Form */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Deposit Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount (min $5)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="5"
              step="0.01"
              className="mt-2"
            />
            <p className="text-sm text-slate-500 mt-2">Minimum deposit: $5.00</p>
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500">
            Continue to Payment
          </Button>
        </form>
      </Card>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
            className={filter === f ? 'bg-blue-500' : ''}
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Transactions List */}
      {loading ? (
        <ShimmerList count={5} />
      ) : (
        <div className="space-y-3">
          {filteredTransactions.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-slate-500">No deposit transactions found</p>
            </Card>
          ) : (
            filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-slate-900">${transaction.amount.toLocaleString()}</p>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">{transaction.date}</p>
                    <p className="text-xs text-slate-400 mt-1 font-mono">{transaction.txHash}</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Payment Dialog */}
      <Dialog open={paymentDialog} onOpenChange={setPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Deposit</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* QR Code */}
            <div className="flex justify-center">
              <div className="p-4 bg-white border-2 border-slate-200 rounded-lg">
                <div className="w-48 h-48 bg-slate-100 flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-slate-400" />
                  <div className="absolute text-xs text-slate-500">QR Code</div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <div>
                <Label>Wallet Address</Label>
                <CopyField value="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Amount</Label>
                  <p className="mt-2 text-slate-900">${amount || '0.00'}</p>
                </div>
                <div>
                  <Label>Expires In</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <p className={`${countdown < 300 ? 'text-red-600' : 'text-slate-900'}`}>
                      {formatTime(countdown)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                Send exactly <strong>${amount || '0.00'}</strong> to the address above. Your deposit will be credited after confirmation.
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setPaymentDialog(false);
                setAmount('');
                toast.success('You can continue later. Check transaction status below.');
              }}
            >
              I've Made the Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
