import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Award, Lock, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ShimmerList } from '../shared/ShimmerCard';
import { mockRanks } from '../shared/mockData';

export default function RankRewardsScreen() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedRank, setSelectedRank] = useState<any>(null);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filters = ['All', 'Claimable', 'Locked', 'Claimed'];

  const filteredRanks = filter === 'All'
    ? mockRanks
    : mockRanks.filter((r) => 
        filter === 'Rank' ? true : r.status === filter
      );

  const handleClaim = async (rank: any) => {
    setClaiming(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setClaiming(false);
    setSelectedRank(null);
    toast.success(`Claimed ${rank.name} reward: $${rank.reward.toLocaleString()}!`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Claimed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'Claimable':
        return <Award className="w-5 h-5 text-yellow-600" />;
      case 'Locked':
        return <Lock className="w-5 h-5 text-slate-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Claimed':
        return 'bg-green-100 text-green-700';
      case 'Claimable':
        return 'bg-yellow-100 text-yellow-700';
      case 'Locked':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getRankGradient = (index: number) => {
    const gradients = [
      'from-orange-500 to-red-500',
      'from-slate-400 to-slate-600',
      'from-yellow-500 to-orange-500',
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-slate-900">Rank Rewards</h2>
        <ShimmerList count={5} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-slate-900">Rank Rewards</h2>

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

      {/* Ranks List */}
      {filteredRanks.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-slate-500">No ranks found</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredRanks.map((rank, index) => {
            const gradient = getRankGradient(index);
            const isLocked = rank.status === 'Locked';
            const isClaimable = rank.status === 'Claimable';
            
            return (
              <Card
                key={rank.id}
                className={`p-6 hover:shadow-md transition-shadow cursor-pointer ${
                  isLocked ? 'opacity-60' : ''
                }`}
                onClick={() => setSelectedRank(rank)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-lg bg-gradient-to-br ${gradient} shrink-0`}>
                    <span className="text-3xl">{rank.icon}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-slate-900">{rank.name}</h3>
                      <Badge className={getStatusColor(rank.status)}>
                        {rank.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{rank.requirement}</p>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-slate-900">
                        Reward: ${rank.reward.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {getStatusIcon(rank.status)}
                  </div>
                </div>

                {isClaimable && (
                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRank(rank);
                    }}
                  >
                    Claim Reward
                  </Button>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Rank Detail Dialog */}
      <Dialog open={!!selectedRank} onOpenChange={() => setSelectedRank(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rank Details</DialogTitle>
          </DialogHeader>
          {selectedRank && (
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-center">
                <div className={`p-8 rounded-full bg-gradient-to-br ${getRankGradient(mockRanks.indexOf(selectedRank))}`}>
                  <span className="text-6xl">{selectedRank.icon}</span>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-slate-900 mb-2">{selectedRank.name}</h3>
                <Badge className={getStatusColor(selectedRank.status)}>
                  {selectedRank.status}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Requirements</p>
                  <p className="text-slate-900">{selectedRank.requirement}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Reward</p>
                  <p className="text-green-600">${selectedRank.reward.toLocaleString()}</p>
                </div>
              </div>

              {selectedRank.status === 'Claimable' && (
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedRank(null)}
                    disabled={claiming}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-yellow-500 to-orange-500"
                    onClick={() => handleClaim(selectedRank)}
                    disabled={claiming}
                  >
                    {claiming ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Claiming...
                      </>
                    ) : (
                      <>
                        <Award className="w-4 h-4 mr-2" />
                        Claim Reward
                      </>
                    )}
                  </Button>
                </DialogFooter>
              )}

              {selectedRank.status === 'Locked' && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">
                    Complete the requirements to unlock this rank and claim the reward.
                  </p>
                </div>
              )}

              {selectedRank.status === 'Claimed' && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <p className="text-sm">Reward already claimed</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Summary Card */}
      {filteredRanks.length > 0 && (
        <Card className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-white/80 text-sm">Total Ranks</p>
              <p className="text-white mt-1">{mockRanks.length}</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Claimable</p>
              <p className="text-white mt-1">
                {mockRanks.filter((r) => r.status === 'Claimable').length}
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Claimed</p>
              <p className="text-white mt-1">
                {mockRanks.filter((r) => r.status === 'Claimed').length}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
