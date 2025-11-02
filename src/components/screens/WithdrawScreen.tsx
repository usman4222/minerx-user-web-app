import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Wallet, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ShimmerList, ShimmerCard } from '../shared/ShimmerCard';
import { mockWalletData, mockWithdrawTransactions } from '../shared/mockData';

export default function WithdrawScreen() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState('All');
  const [withdrawDialog, setWithdrawDialog] = useState(false);
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [activeWithdrawal, setActiveWithdrawal] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Check if there's a processing withdrawal
      const processing = mockWithdrawTransactions.find((t) => t.status === 'Processing');
      if (processing) {
        setActiveWithdrawal(processing);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);

    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!address.trim()) {
      toast.error('Please enter a wallet address');
      return;
    }

    if (amountNum > mockWalletData.earningsBalance) {
      toast.error('Insufficient balance');
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setSubmitting(false);
    setWithdrawDialog(false);
    setAmount('');
    setAddress('');
    
    // Play success sound (simulated)
    toast.success('Withdrawal request submitted successfully!');
    
    // Create optimistic update
    const newWithdrawal = {
      id: Date.now().toString(),
      amount: amountNum,
      status: 'Processing',
      date: new Date().toLocaleString(),
      address: address,
    };
    setActiveWithdrawal(newWithdrawal);
  };

  const handleCancelWithdrawal = async () => {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitting(false);
    setActiveWithdrawal(null);
    toast.success('Withdrawal canceled successfully');
  };

  const filters = ['All', 'Pending', 'Processing', 'Completed', 'Rejected', 'Canceled'];
  
  const filteredTransactions = filter === 'All'
    ? mockWithdrawTransactions
    : mockWithdrawTransactions.filter((t) => t.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Processing':
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Rejected':
      case 'Canceled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <ShimmerCard />
        <ShimmerList count={5} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-slate-900">Withdraw Funds</h2>

      {/* Withdraw Wallet Card */}
      <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm">Withdraw Wallet Balance</p>
            <h2 className="text-white mt-2">
              ${mockWalletData.earningsBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
          </div>
          <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
            <Wallet className="w-8 h-8 text-white" />
          </div>
        </div>
        
        {activeWithdrawal ? (
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleCancelWithdrawal}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Canceling...
              </>
            ) : (
              'Cancel Active Withdrawal'
            )}
          </Button>
        ) : (
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => setWithdrawDialog(true)}
          >
            Withdraw Now
          </Button>
        )}
      </Card>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
            className={filter === f ? 'bg-purple-500' : ''}
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-slate-500">No withdrawal transactions found</p>
          </Card>
        ) : (
          filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-slate-900">${transaction.amount.toLocaleString()}</p>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-slate-600">{transaction.date}</p>
                <p className="text-xs text-slate-400 font-mono break-all">{transaction.address}</p>
                {transaction.reason && (
                  <p className="text-sm text-red-600">Reason: {transaction.reason}</p>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialog} onOpenChange={setWithdrawDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Withdrawal</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleWithdraw} className="space-y-4 py-4">
            <div>
              <Label htmlFor="withdraw-amount">Amount (USD)</Label>
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0.01"
                step="0.01"
                className="mt-2"
                required
              />
              <p className="text-sm text-slate-500 mt-2">
                Available: ${mockWalletData.earningsBalance.toLocaleString()}
              </p>
            </div>

            <div>
              <Label htmlFor="withdraw-address">Wallet Address</Label>
              <Input
                id="withdraw-address"
                type="text"
                placeholder="Enter your wallet address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-2"
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setWithdrawDialog(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Withdrawal'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
