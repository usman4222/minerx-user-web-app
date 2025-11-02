import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Dice6, TrendingUp, Loader2, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import { ShimmerList } from '../shared/ShimmerCard';
import { mockLuckyDrawWinners, mockWalletData } from '../shared/mockData';

export default function LuckyDrawScreen() {
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [investing, setInvesting] = useState(false);

  const totalInvested = mockWalletData.totalInvested;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleInvest = async () => {
    setInvesting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setInvesting(false);
    setConfirmDialog(false);
    
    // Simulate lucky draw result
    const won = Math.random() > 0.7;
    if (won) {
      const prize = Math.floor(Math.random() * 1000) + 100;
      toast.success(`🎉 Congratulations! You won $${prize}!`);
    } else {
      toast.info('Better luck next time! Keep investing to increase your chances.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-slate-900">Lucky Draw</h2>

      {/* Hero Card */}
      <Card className="p-8 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white mb-2">Lucky Draw</h2>
              <p className="text-white/80">Invest $1 for a chance to win big!</p>
            </div>
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <Dice6 className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="pt-6 border-t border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/80 text-sm">Your Total Invested</p>
                <p className="text-white mt-1">${totalInvested.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>

            <Button
              className="w-full bg-white text-purple-600 hover:bg-white/90"
              size="lg"
              onClick={() => setConfirmDialog(true)}
            >
              <Dice6 className="w-5 h-5 mr-2" />
              Invest $1 & Try Your Luck
            </Button>
          </div>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <div className="flex items-start gap-3">
          <Trophy className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
          <div>
            <p className="text-yellow-900 mb-2">How it works:</p>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Invest $1 to enter the lucky draw</li>
              <li>• Higher total investment increases winning chances</li>
              <li>• Winners are announced instantly</li>
              <li>• Prizes range from $100 to $10,000</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Recent Winners */}
      <div>
        <h3 className="mb-4">Recent Winners</h3>
        {loading ? (
          <ShimmerList count={5} />
        ) : (
          <div className="space-y-3">
            {mockLuckyDrawWinners.map((winner, index) => (
              <Card key={winner.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={winner.avatar} />
                      <AvatarFallback>{winner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {index < 3 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Trophy className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-slate-900">{winner.name}</p>
                    <p className="text-sm text-slate-600">{winner.date}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-green-600">${winner.amount.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">Prize</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Stats Card */}
      <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-white/80 text-sm">Total Winners</p>
            <p className="text-white mt-1">{mockLuckyDrawWinners.length}</p>
          </div>
          <div>
            <p className="text-white/80 text-sm">Total Prizes</p>
            <p className="text-white mt-1">
              ${mockLuckyDrawWinners.reduce((sum, w) => sum + w.amount, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog} onOpenChange={setConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Lucky Draw Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex justify-center">
              <div className="p-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500">
                <Dice6 className="w-16 h-16 text-white" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Entry Cost:</span>
                <span className="text-slate-900">$1.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Your Total Invested:</span>
                <span className="text-slate-900">${totalInvested.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Prize Range:</span>
                <span className="text-green-600">$100 - $10,000</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                Your winning chances increase with higher total investment. Good luck!
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialog(false)}
              disabled={investing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleInvest}
              className="bg-gradient-to-r from-pink-500 to-purple-500"
              disabled={investing}
            >
              {investing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Drawing...
                </>
              ) : (
                <>
                  <Dice6 className="w-4 h-4 mr-2" />
                  Invest $1 & Draw
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
