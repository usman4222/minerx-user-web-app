import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { TrendingUp, Users, Network, Award } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { ShimmerCard, ShimmerStats } from '../shared/ShimmerCard';
import { mockMonthlySalary } from '../shared/mockData';

export default function MonthlySalaryScreen() {
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('October 2024');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const months = ['October 2024', 'September 2024', 'August 2024', 'July 2024'];
  
  const salary = mockMonthlySalary;
  const isPreview = salary.mode === 'Preview';
  const displaySalary = isPreview ? salary.previewSalary : salary.snapshotSalary;

  const calculateProgress = (current: number, required: number, next: number) => {
    if (current >= next) return 100;
    if (current < required) return 0;
    return ((current - required) / (next - required)) * 100;
  };

  const levels = [
    {
      name: 'Bronze Star',
      self: { min: 100, max: 300 },
      direct: { min: 1000, max: 3000 },
      indirect: { min: 3000, max: 9000 },
    },
    {
      name: 'Silver Star',
      self: { min: 300, max: 500 },
      direct: { min: 3000, max: 5000 },
      indirect: { min: 9000, max: 15000 },
    },
    {
      name: 'Gold Star',
      self: { min: 500, max: 800 },
      direct: { min: 5000, max: 10000 },
      indirect: { min: 15000, max: 30000 },
    },
    {
      name: 'Platinum Star',
      self: { min: 800, max: 1600 },
      direct: { min: 10000, max: 16000 },
      indirect: { min: 30000, max: 48000 },
    },
  ];

  // Find current level
  const currentLevelIndex = levels.findIndex((level) => 
    salary.selfVolume >= level.self.min &&
    salary.directVolume >= level.direct.min &&
    salary.indirectVolume >= level.indirect.min
  );

  const currentLevel = currentLevelIndex >= 0 ? levels[currentLevelIndex] : null;
  const nextLevel = currentLevelIndex >= 0 && currentLevelIndex < levels.length - 1 
    ? levels[currentLevelIndex + 1] 
    : null;

  if (loading) {
    return (
      <div className="space-y-6">
        <ShimmerCard />
        <ShimmerStats count={3} />
        <ShimmerCard />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-slate-900">Monthly Star Salary</h2>

      {/* Month Selector */}
      <Card className="p-4">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger>
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {/* Salary Display */}
      <Card className="p-8 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 text-white">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-white/80 text-sm">{selectedMonth} Salary</p>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {isPreview ? 'Preview' : 'Final'}
                </Badge>
              </div>
              <h1 className="text-white">
                ${displaySalary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h1>
            </div>
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="pt-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-white" />
              <span className="text-white">Current Star: {salary.currentStar}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Volume Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Self Volume"
          value={`$${salary.selfVolume.toLocaleString()}`}
          icon={TrendingUp}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Direct Volume"
          value={`$${salary.directVolume.toLocaleString()}`}
          icon={Users}
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Indirect Volume"
          value={`$${salary.indirectVolume.toLocaleString()}`}
          icon={Network}
          gradient="from-purple-500 to-pink-500"
        />
      </div>

      {/* Progress Tracker */}
      <Card className="p-6">
        <h3 className="mb-6">Progress to Next Level</h3>
        
        {currentLevel && nextLevel ? (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Self Volume</span>
                <span className="text-slate-900">
                  ${salary.selfVolume.toLocaleString()} / ${nextLevel.self.max.toLocaleString()}
                </span>
              </div>
              <Progress
                value={calculateProgress(
                  salary.selfVolume,
                  nextLevel.self.min,
                  nextLevel.self.max
                )}
                className="h-3"
              />
              <p className="text-xs text-slate-500 mt-1">
                Target: ${nextLevel.self.min.toLocaleString()} - ${nextLevel.self.max.toLocaleString()}
              </p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Direct Volume</span>
                <span className="text-slate-900">
                  ${salary.directVolume.toLocaleString()} / ${nextLevel.direct.max.toLocaleString()}
                </span>
              </div>
              <Progress
                value={calculateProgress(
                  salary.directVolume,
                  nextLevel.direct.min,
                  nextLevel.direct.max
                )}
                className="h-3"
              />
              <p className="text-xs text-slate-500 mt-1">
                Target: ${(nextLevel.direct.min / 1000).toFixed(0)}k - ${(nextLevel.direct.max / 1000).toFixed(0)}k
              </p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Indirect Volume</span>
                <span className="text-slate-900">
                  ${salary.indirectVolume.toLocaleString()} / ${nextLevel.indirect.max.toLocaleString()}
                </span>
              </div>
              <Progress
                value={calculateProgress(
                  salary.indirectVolume,
                  nextLevel.indirect.min,
                  nextLevel.indirect.max
                )}
                className="h-3"
              />
              <p className="text-xs text-slate-500 mt-1">
                Target: ${(nextLevel.indirect.min / 1000).toFixed(0)}k - ${(nextLevel.indirect.max / 1000).toFixed(0)}k
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-slate-600">Next Rank</p>
                  <p className="text-slate-900">{nextLevel.name}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Award className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <p className="text-slate-900">Congratulations!</p>
            <p className="text-sm text-slate-600 mt-2">
              You've reached the highest star level
            </p>
          </div>
        )}
      </Card>

      {/* Info */}
      {isPreview && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-900">
            💡 This is a preview of your current month's salary based on ongoing performance. 
            Final amounts will be calculated at month end.
          </p>
        </Card>
      )}
    </div>
  );
}
