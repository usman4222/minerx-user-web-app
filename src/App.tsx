import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { Home, Wallet, ArrowDownToLine, ArrowUpFromLine, TrendingUp, Package, Calendar, History, Award, Users, Dice6, User } from 'lucide-react';
import HomeScreen from './components/screens/HomeScreen';
import WalletScreen from './components/screens/WalletScreen';
import DepositScreen from './components/screens/DepositScreen';
import WithdrawScreen from './components/screens/WithdrawScreen';
import EarningsWalletScreen from './components/screens/EarningsWalletScreen';
import InvestScreen from './components/screens/InvestScreen';
import PlansScreen from './components/screens/PlansScreen';
import MonthlySalaryScreen from './components/screens/MonthlySalaryScreen';
import TransactionsScreen from './components/screens/TransactionsScreen';
import RankRewardsScreen from './components/screens/RankRewardsScreen';
import TeamLevelsScreen from './components/screens/TeamLevelsScreen';
import LuckyDrawScreen from './components/screens/LuckyDrawScreen';
import ProfileScreen from './components/screens/ProfileScreen';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');

  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'deposit', label: 'Deposit', icon: ArrowDownToLine },
    { id: 'withdraw', label: 'Withdraw', icon: ArrowUpFromLine },
    { id: 'earnings', label: 'Earnings', icon: TrendingUp },
    { id: 'invest', label: 'Invest', icon: Package },
    { id: 'plans', label: 'Plans', icon: Calendar },
    { id: 'salary', label: 'Star Salary', icon: Award },
    { id: 'transactions', label: 'Transactions', icon: History },
    { id: 'ranks', label: 'Rank Rewards', icon: Award },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'lucky', label: 'Lucky Draw', icon: Dice6 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen onNavigate={setActiveScreen} />;
      case 'wallet':
        return <WalletScreen onNavigate={setActiveScreen} />;
      case 'deposit':
        return <DepositScreen />;
      case 'withdraw':
        return <WithdrawScreen />;
      case 'earnings':
        return <EarningsWalletScreen onNavigate={setActiveScreen} />;
      case 'invest':
        return <InvestScreen onNavigate={setActiveScreen} />;
      case 'plans':
        return <PlansScreen />;
      case 'salary':
        return <MonthlySalaryScreen />;
      case 'transactions':
        return <TransactionsScreen />;
      case 'ranks':
        return <RankRewardsScreen />;
      case 'team':
        return <TeamLevelsScreen />;
      case 'lucky':
        return <LuckyDrawScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen onNavigate={setActiveScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Toaster position="top-center" richColors />
      
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 lg:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              InvestDash
            </h1>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-slate-200 sticky top-0 h-screen">
          <div className="p-6 border-b border-slate-200">
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              InvestDash
            </h1>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                    activeScreen === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 lg:p-8 pb-24 lg:pb-8">
            {renderScreen()}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
        <div className="flex justify-around items-center px-2 py-2">
          {navigation.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                  activeScreen === item.id
                    ? 'text-blue-600'
                    : 'text-slate-500'
                }`}
              >
                <Icon className={`w-5 h-5 ${activeScreen === item.id ? 'scale-110' : ''}`} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
