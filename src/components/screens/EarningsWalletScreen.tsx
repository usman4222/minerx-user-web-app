import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { TrendingUp, Users, UserPlus, DollarSign, ArrowUpFromLine, ArrowRightLeft, Wallet, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { StatCard } from '../shared/StatCard';
import { ShimmerStats, ShimmerCard } from '../shared/ShimmerCard';
import { mockWalletData } from '../shared/mockData';

interface EarningsWalletScreenProps {
  onNavigate: (screen: string) => void;
}

export default function EarningsWalletScreen({ onNavigate }: EarningsWalletScreenProps) {
  const [loading, setLoading] = useState(true);
  const [transferDialog, setTransferDialog] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Mock earnings breakdown
  const earnings = {
    roi: 1250.50,
    teamProfit: 680.25,
    referralProfit: 410.00,
    total: mockWalletData.earningsBalance,
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);

    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (amount > earnings.total) {
      toast.error('Insufficient balance');
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setTransferDialog(false);
    setTransferAmount('');
    toast.success(`$${amount.toLocaleString()} transferred to Investment Wallet!`);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <ShimmerStats count={4} />
        <ShimmerCard />
        <ShimmerStats count={3} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-slate-900">Earnings Wallet</h2>

      {/* Earnings Cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="ROI Earnings"
          value={`$${earnings.roi.toLocaleString()}`}
          icon={TrendingUp}
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Team Profit"
          value={`$${earnings.teamProfit.toLocaleString()}`}
          icon={Users}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Referral Profit"
          value={`$${earnings.referralProfit.toLocaleString()}`}
          icon={UserPlus}
          gradient="from-purple-500 to-pink-500"
        />
        <StatCard
          title="Total Earned"
          value={`$${mockWalletData.totalEarned.toLocaleString()}`}
          icon={DollarSign}
          gradient="from-orange-500 to-red-500"
        />
      </div>

      {/* Horizontal Stats */}
      <Card className="p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-slate-600 text-sm">Total Invested</p>
            <p className="text-slate-900 mt-1">${mockWalletData.totalInvested.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-slate-600 text-sm">Total Deposit</p>
            <p className="text-slate-900 mt-1">${mockWalletData.totalDeposit.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-slate-600 text-sm">Total Withdraw</p>
            <p className="text-slate-900 mt-1">${mockWalletData.totalWithdraw.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      {/* Main Earnings Balance Card */}
      <Card className="p-8 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Earnings Balance</p>
              <h1 className="text-white mt-2">
                ${earnings.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h1>
            </div>
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <Wallet className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
            <div>
              <p className="text-white/80 text-sm">ROI</p>
              <p className="text-white mt-1">${earnings.roi.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Team</p>
              <p className="text-white mt-1">${earnings.teamProfit.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Referral</p>
              <p className="text-white mt-1">${earnings.referralProfit.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          onClick={() => onNavigate('withdraw')}
        >
          <ArrowUpFromLine className="w-5 h-5 mr-2" />
          Withdraw
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-2"
          onClick={() => setTransferDialog(true)}
        >
          <ArrowRightLeft className="w-5 h-5 mr-2" />
          Transfer to Investment
        </Button>
      </div>

      {/* Transfer Dialog */}
      <Dialog open={transferDialog} onOpenChange={setTransferDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer to Investment Wallet</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleTransfer} className="space-y-4 py-4">
            <div>
              <Label htmlFor="transfer-amount">Amount (USD)</Label>
              <Input
                id="transfer-amount"
                type="number"
                placeholder="Enter amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                min="0.01"
                step="0.01"
                className="mt-2"
                required
              />
              <p className="text-sm text-slate-500 mt-2">
                Available: ${earnings.total.toLocaleString()}
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                This will transfer funds from your Earnings Wallet to your Investment Wallet, allowing you to invest in new plans.
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setTransferDialog(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Transferring...
                  </>
                ) : (
                  'Transfer Now'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
