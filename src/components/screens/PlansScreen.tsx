import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Calendar, TrendingUp, Package } from 'lucide-react';
import { ShimmerList } from '../shared/ShimmerCard';
import { mockPurchasedPlans } from '../shared/mockData';

export default function PlansScreen() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filters = ['All', 'Active', 'Expired'];
  
  const filteredPlans = filter === 'All'
    ? mockPurchasedPlans
    : mockPurchasedPlans.filter((p) => p.status === filter);

  const getStatusColor = (status: string) => {
    return status === 'Active'
      ? 'bg-green-100 text-green-700'
      : 'bg-slate-100 text-slate-700';
  };

  const calculateProgress = (plan: any) => {
    return (plan.earned / plan.totalPayout) * 100;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-slate-900">My Investment Plans</h2>
        <ShimmerList count={4} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-slate-900">My Investment Plans</h2>

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

      {/* Plans List */}
      {filteredPlans.length === 0 ? (
        <Card className="p-12 text-center">
          <Package className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">No investment plans found</p>
          <p className="text-sm text-slate-400 mt-2">Start investing to see your plans here</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredPlans.map((plan) => (
            <Card key={plan.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-slate-900">{plan.planName}</h3>
                      <Badge className={getStatusColor(plan.status)}>
                        {plan.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">
                      Invested: ${plan.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">ROI</p>
                    <p className="text-green-600">{plan.roi}%</p>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Earnings Progress</span>
                    <span className="text-slate-900">
                      ${plan.earned.toLocaleString()} / ${plan.totalPayout.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={calculateProgress(plan)} className="h-2" />
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
                  <div>
                    <p className="text-xs text-slate-500">Purchase Date</p>
                    <p className="text-sm text-slate-900 mt-1">{plan.purchaseDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Expiry Date</p>
                    <p className="text-sm text-slate-900 mt-1">{plan.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Earned So Far</p>
                    <p className="text-sm text-green-600 mt-1">${plan.earned.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Total Payout</p>
                    <p className="text-sm text-slate-900 mt-1">${plan.totalPayout.toLocaleString()}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>{plan.roi}% Returns</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {plan.status === 'Active' ? 'Active Investment' : 'Completed'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Card */}
      {filteredPlans.length > 0 && (
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-white/80 text-sm">Total Invested</p>
              <p className="text-white mt-1">
                ${filteredPlans.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Total Earned</p>
              <p className="text-white mt-1">
                ${filteredPlans.reduce((sum, p) => sum + p.earned, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Active Plans</p>
              <p className="text-white mt-1">
                {filteredPlans.filter((p) => p.status === 'Active').length}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
