import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Wallet, TrendingUp, ArrowDownToLine, Package, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { StatCard } from '../shared/StatCard';
import { ShimmerCard, ShimmerStats } from '../shared/ShimmerCard';
import { mockWalletData, mockInvestmentPlans } from '../shared/mockData';

interface InvestScreenProps {
  onNavigate: (screen: string) => void;
}

export default function InvestScreen({ onNavigate }: InvestScreenProps) {
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(mockInvestmentPlans[0]);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleInvest = () => {
    const amountNum = parseFloat(amount);

    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (amountNum < 10) {
      toast.error('Minimum investment amount is $10');
      return;
    }

    if (amountNum < selectedPlan.minInvest) {
      toast.error(`Minimum investment for ${selectedPlan.name} is $${selectedPlan.minInvest}`);
      return;
    }

    if (amountNum > selectedPlan.maxInvest) {
      toast.error(`Maximum investment for ${selectedPlan.name} is $${selectedPlan.maxInvest}`);
      return;
    }

    if (amountNum > mockWalletData.depositBalance) {
      toast.error('Insufficient balance in deposit wallet');
      return;
    }

    setConfirmDialog(true);
  };

  const handleConfirmPurchase = async () => {
    setPurchasing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setPurchasing(false);
    setConfirmDialog(false);
    setAmount('');
    toast.success(`Successfully invested $${parseFloat(amount).toLocaleString()} in ${selectedPlan.name}!`);
  };

  const amountNum = parseFloat(amount) || 0;
  const expectedPayout = amountNum + (amountNum * selectedPlan.roi / 100);
  const directAmount = amountNum * 0.1; // 10% direct commission example

  if (loading) {
    return (
      <div className="space-y-6">
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerStats count={3} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-slate-900">Invest in Plans</h2>

      {/* Deposit Wallet Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-500 text-white">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Deposit Wallet Balance</p>
              <h2 className="text-white mt-2">
                ${mockWalletData.depositBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
            </div>
            <Wallet className="w-8 h-8 text-white/50" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
            <div>
              <p className="text-white/80 text-sm">Total Invested</p>
              <p className="text-white mt-1">${mockWalletData.totalInvested.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Total Deposit</p>
              <p className="text-white mt-1">${mockWalletData.totalDeposit.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Plan Selection */}
      <Card className="p-6">
        <h3 className="mb-4">Select Investment Plan</h3>
        <div className="space-y-3">
          {mockInvestmentPlans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedPlan.id === plan.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-slate-900">{plan.name}</p>
                  <p className="text-sm text-slate-600">{plan.description}</p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-xs text-slate-500">
                      ${plan.minInvest} - ${plan.maxInvest.toLocaleString()}
                    </span>
                    <span className="text-xs text-green-600">
                      {plan.roi}% ROI
                    </span>
                    <span className="text-xs text-blue-600">
                      {plan.duration} days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Investment Form */}
      <Card className="p-6">
        <h3 className="mb-4">Investment Amount</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="invest-amount">Amount (USD)</Label>
            <Input
              id="invest-amount"
              type="number"
              placeholder="Enter amount (min $10)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="10"
              step="0.01"
              className="mt-2"
            />
            <p className="text-sm text-slate-500 mt-2">
              Plan range: ${selectedPlan.minInvest} - ${selectedPlan.maxInvest.toLocaleString()}
            </p>
          </div>

          {amountNum > 0 && (
            <div className="p-4 bg-green-50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Investment:</span>
                <span className="text-slate-900">${amountNum.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">ROI ({selectedPlan.roi}%):</span>
                <span className="text-green-600">+${(amountNum * selectedPlan.roi / 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-900">Expected Payout:</span>
                <span className="text-slate-900">${expectedPayout.toLocaleString()}</span>
              </div>
            </div>
          )}

          <Button
            onClick={handleInvest}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
            size="lg"
          >
            <Package className="w-5 h-5 mr-2" />
            Invest Now
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Total Invested"
          value={`$${mockWalletData.totalInvested.toLocaleString()}`}
          icon={TrendingUp}
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Deposit"
          value={`$${mockWalletData.totalDeposit.toLocaleString()}`}
          icon={ArrowDownToLine}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Withdraw"
          value={`$${mockWalletData.totalWithdraw.toLocaleString()}`}
          icon={ArrowDownToLine}
          gradient="from-purple-500 to-pink-500"
        />
      </div>

      {/* Shortcut to Plans */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => onNavigate('plans')}
      >
        View Your Invested Plans
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog} onOpenChange={setConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Investment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <img
                src={selectedPlan.image}
                alt={selectedPlan.name}
                className="w-32 h-32 rounded-lg object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Plan:</span>
                <span className="text-slate-900">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Amount:</span>
                <span className="text-slate-900">${amountNum.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">ROI:</span>
                <span className="text-green-600">{selectedPlan.roi}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Expected Payout:</span>
                <span className="text-slate-900">${expectedPayout.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Direct Commission:</span>
                <span className="text-blue-600">${directAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                Your investment will be locked for {selectedPlan.duration} days. You will receive daily returns.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialog(false)}
              disabled={purchasing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPurchase}
              className="bg-gradient-to-r from-blue-500 to-purple-500"
              disabled={purchasing}
            >
              {purchasing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Investment'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
