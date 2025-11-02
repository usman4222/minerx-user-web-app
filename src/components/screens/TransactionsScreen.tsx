import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { ArrowUpFromLine, ArrowDownToLine, TrendingUp, DollarSign, Calendar, Award, Users, Dice6, UserPlus } from 'lucide-react';
import { ShimmerList } from '../shared/ShimmerCard';
import { mockTransactions } from '../shared/mockData';

export default function TransactionsScreen() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filters = [
    'All',
    'Plan Purchase',
    'Daily Income',
    'Team Income',
    'Rank Income',
    'Monthly Salary',
    'Deposit',
    'Withdraw',
    'Lucky Draw',
    'Direct Income',
  ];

  const filteredTransactions = filter === 'All'
    ? mockTransactions
    : mockTransactions.filter((t) => t.type === filter);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Deposit':
        return ArrowDownToLine;
      case 'Withdraw':
        return ArrowUpFromLine;
      case 'Daily Income':
      case 'Team Income':
      case 'Direct Income':
        return TrendingUp;
      case 'Plan Purchase':
        return Calendar;
      case 'Rank Income':
        return Award;
      case 'Monthly Salary':
        return DollarSign;
      case 'Lucky Draw':
        return Dice6;
      default:
        return DollarSign;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Deposit':
        return 'from-blue-500 to-cyan-500';
      case 'Withdraw':
        return 'from-purple-500 to-pink-500';
      case 'Daily Income':
      case 'Team Income':
      case 'Direct Income':
        return 'from-green-500 to-emerald-500';
      case 'Plan Purchase':
        return 'from-orange-500 to-red-500';
      case 'Rank Income':
      case 'Monthly Salary':
        return 'from-yellow-500 to-orange-500';
      case 'Lucky Draw':
        return 'from-pink-500 to-rose-500';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Failed':
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-slate-900">All Transactions</h2>
        <ShimmerList count={6} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-slate-900">All Transactions</h2>

      {/* Filter Button */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.slice(0, 5).map((f) => (
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
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1 border border-slate-300 rounded-md text-sm"
        >
          {filters.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Transactions List */}
      {filteredTransactions.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-slate-500">No transactions found</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => {
            const Icon = getTypeIcon(transaction.type);
            const gradient = getTypeColor(transaction.type);
            const isNegative = transaction.amount < 0;
            
            return (
              <Card
                key={transaction.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedTransaction(transaction)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-slate-900 truncate">{transaction.type}</p>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 truncate">{transaction.date}</p>
                    <p className="text-xs text-slate-500 truncate mt-1">{transaction.details}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className={`${isNegative ? 'text-red-600' : 'text-green-600'}`}>
                      {isNegative ? '-' : '+'}${Math.abs(transaction.amount).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Transaction Detail Dialog */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-center">
                {(() => {
                  const Icon = getTypeIcon(selectedTransaction.type);
                  const gradient = getTypeColor(selectedTransaction.type);
                  return (
                    <div className={`p-6 rounded-full bg-gradient-to-br ${gradient}`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                  );
                })()}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Type:</span>
                  <span className="text-slate-900">{selectedTransaction.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Amount:</span>
                  <span className={`${selectedTransaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {selectedTransaction.amount < 0 ? '-' : '+'}${Math.abs(selectedTransaction.amount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Status:</span>
                  <Badge className={getStatusColor(selectedTransaction.status)}>
                    {selectedTransaction.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Date & Time:</span>
                  <span className="text-slate-900">{selectedTransaction.date}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-slate-600">Details:</span>
                  <span className="text-slate-900 text-right max-w-[60%]">{selectedTransaction.details}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">
                  Transaction ID: {selectedTransaction.id}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Summary Card */}
      {filteredTransactions.length > 0 && (
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-white/80 text-sm">Total Transactions</p>
              <p className="text-white mt-1">{filteredTransactions.length}</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Net Amount</p>
              <p className="text-white mt-1">
                ${filteredTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
