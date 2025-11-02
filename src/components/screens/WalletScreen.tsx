import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Wallet, TrendingUp, ArrowDownToLine, DollarSign } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { ShimmerCard, ShimmerStats } from '../shared/ShimmerCard';
import { mockWalletData } from '../shared/mockData';

interface WalletScreenProps {
  onNavigate: (screen: string) => void;
}

export default function WalletScreen({ onNavigate }: WalletScreenProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerStats count={4} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-slate-900">My Wallet</h2>

      {/* Main Balance Card */}
      <Card className="p-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Current Deposit Balance</p>
              <h1 className="text-white mt-2">
                ${mockWalletData.depositBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h1>
            </div>
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <Wallet className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
            <div>
              <p className="text-white/80 text-sm">Tokens</p>
              <p className="text-white mt-1">{mockWalletData.tokens.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Token Rate</p>
              <p className="text-white mt-1">${mockWalletData.tokenRate} USD</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Breakdown Card */}
      <Card className="p-6">
        <h3 className="mb-6">Wallet Breakdown</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ArrowDownToLine className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Deposit</p>
                <p className="text-slate-900">${mockWalletData.totalDeposit.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">From Earnings</p>
                <p className="text-slate-900">${mockWalletData.earningsBalance.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Invested in Plans</p>
                <p className="text-slate-900">${mockWalletData.totalInvested.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Tiles */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Total Deposit"
          value={`$${mockWalletData.totalDeposit.toLocaleString()}`}
          icon={ArrowDownToLine}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Total Invested"
          value={`$${mockWalletData.totalInvested.toLocaleString()}`}
          icon={TrendingUp}
          gradient="from-purple-500 to-pink-500"
        />
        <StatCard
          title="Tokens (USD)"
          value={`$${(mockWalletData.tokens * mockWalletData.tokenRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle={`${mockWalletData.tokens.toFixed(2)} tokens`}
          icon={DollarSign}
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Available Balance"
          value={`$${mockWalletData.depositBalance.toLocaleString()}`}
          icon={Wallet}
          gradient="from-orange-500 to-red-500"
        />
      </div>

      {/* Action Button */}
      <Button
        size="lg"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        onClick={() => onNavigate('deposit')}
      >
        <ArrowDownToLine className="w-5 h-5 mr-2" />
        Deposit Amount
      </Button>
    </div>
  );
}
