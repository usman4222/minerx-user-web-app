import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Users, Lock, TrendingUp, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { StatCard } from '../shared/StatCard';
import { ShimmerStats, ShimmerList } from '../shared/ShimmerCard';
import { mockTeamLevels } from '../shared/mockData';

export default function TeamLevelsScreen() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState<any>(null);

  const totalTodayIncome = mockTeamLevels.reduce((sum, l) => sum + l.todayIncome, 0);
  const totalIncome = mockTeamLevels.reduce((sum, l) => sum + l.totalIncome, 0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filters = ['All', 'Unlocked', 'Locked'];

  const filteredLevels = filter === 'All'
    ? mockTeamLevels
    : mockTeamLevels.filter((l) => l.status === filter);

  const handleLevelClick = (level: any) => {
    if (level.status === 'Locked') {
      toast.error(`Level ${level.level} is locked.`);
      return;
    }
    setSelectedLevel(level);
  };

  const getStatusColor = (status: string) => {
    return status === 'Unlocked'
      ? 'bg-green-100 text-green-700'
      : 'bg-slate-100 text-slate-700';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <ShimmerStats count={2} />
        <ShimmerList count={5} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-slate-900">Team Levels</h2>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Today's Team Income"
          value={`$${totalTodayIncome.toLocaleString()}`}
          icon={TrendingUp}
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Total Team Income"
          value={`$${totalIncome.toLocaleString()}`}
          icon={DollarSign}
          gradient="from-blue-500 to-purple-500"
        />
      </div>

      {/* Filter Tiles */}
      <div className="flex gap-2">
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

      {/* Levels List */}
      {filteredLevels.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-slate-500">No team levels found</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredLevels.map((level) => {
            const isLocked = level.status === 'Locked';
            
            return (
              <Card
                key={level.id}
                className={`p-6 hover:shadow-md transition-shadow cursor-pointer ${
                  isLocked ? 'opacity-60' : ''
                }`}
                onClick={() => handleLevelClick(level)}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${
                        isLocked
                          ? 'bg-slate-100'
                          : 'bg-gradient-to-br from-blue-500 to-purple-500'
                      }`}>
                        {isLocked ? (
                          <Lock className="w-6 h-6 text-slate-400" />
                        ) : (
                          <Users className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-slate-900">Level {level.level}</h3>
                        <Badge className={getStatusColor(level.status)}>
                          {level.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-slate-600">Members</p>
                      <p className="text-slate-900">{level.members}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  {!isLocked && (
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                      <div>
                        <p className="text-sm text-slate-600">Today's Income</p>
                        <p className="text-green-600 mt-1">${level.todayIncome.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Total Income</p>
                        <p className="text-slate-900 mt-1">${level.totalIncome.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Level Detail Dialog */}
      <Dialog open={!!selectedLevel} onOpenChange={() => setSelectedLevel(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Level {selectedLevel?.level} Team Members</DialogTitle>
          </DialogHeader>
          {selectedLevel && (
            <div className="space-y-4 py-4">
              {/* Stats Summary */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <Card className="p-4">
                  <p className="text-sm text-slate-600">Members</p>
                  <p className="text-slate-900 mt-1">{selectedLevel.members}</p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-slate-600">Today's Income</p>
                  <p className="text-green-600 mt-1">${selectedLevel.todayIncome.toLocaleString()}</p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-slate-600">Total Income</p>
                  <p className="text-slate-900 mt-1">${selectedLevel.totalIncome.toLocaleString()}</p>
                </Card>
              </div>

              {/* Users List */}
              {selectedLevel.users && selectedLevel.users.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedLevel.users.map((user: any) => (
                    <Card key={user.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm text-slate-900">{user.name}</p>
                            <p className="text-xs text-slate-600">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-900">${user.invested.toLocaleString()}</p>
                          <p className="text-xs text-slate-500">Joined {user.joined}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500">No team members to display</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Summary Card */}
      {filteredLevels.length > 0 && (
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-white/80 text-sm">Total Levels</p>
              <p className="text-white mt-1">{mockTeamLevels.length}</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Unlocked</p>
              <p className="text-white mt-1">
                {mockTeamLevels.filter((l) => l.status === 'Unlocked').length}
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Total Members</p>
              <p className="text-white mt-1">
                {mockTeamLevels.reduce((sum, l) => sum + l.members, 0)}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
