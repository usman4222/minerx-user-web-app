import React from 'react';
import { Card } from '../ui/card';
import * as Icons from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: keyof typeof Icons;
  gradient?: string;
  trend?: 'up' | 'down';
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  gradient = 'from-blue-500 to-purple-500',
  trend,
  className = '',
}: StatCardProps) {
  const Icon = icon ? Icons[icon] : null;

  return (
    <Card className={`p-6 hover:shadow-lg transition-shadow ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-slate-600 text-sm mb-2">{title}</p>
          <p className="text-slate-900">{value}</p>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
    </Card>
  );
}
