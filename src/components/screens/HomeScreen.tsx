import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { ArrowDownToLine, ArrowUpFromLine, Wallet, TrendingUp, Users, DollarSign, Copy, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { CopyField } from '../shared/CopyField';
import { StatCard } from '../shared/StatCard';
import { ShimmerCard, ShimmerStats } from '../shared/ShimmerCard';
import { mockUser, mockWalletData, mockNetworkStats, mockAnnouncements, mockDocuments, mockPartners } from '../shared/mockData';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [documentDialog, setDocumentDialog] = useState<any>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-advance announcements
    if (mockAnnouncements.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % mockAnnouncements.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  const handleCopyReferral = async () => {
    try {
      await navigator.clipboard.writeText(mockUser.referralLink);
      toast.success('Referral link copied!');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const handleDownloadDocument = (doc: any) => {
    setDocumentDialog(null);
    toast.success(`Downloading ${doc.name}...`);
    // Simulate download
    setTimeout(() => {
      toast.success('Download complete!');
    }, 2000);
  };

  const compositeTotal = mockWalletData.depositBalance + mockWalletData.earningsBalance;

  if (loading) {
    return (
      <div className="space-y-6">
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerStats count={4} />
        <ShimmerCard />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Greeting Banner */}
      <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-white">
            <AvatarImage src={mockUser.avatar} />
            <AvatarFallback>{mockUser.firstName[0]}{mockUser.lastName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-white/80">Welcome back,</p>
            <h2 className="text-white">{mockUser.firstName}!</h2>
          </div>
        </div>
      </Card>

      {/* Wallet Hero Card */}
      <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-700 text-white">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Wallet Balance</p>
              <h2 className="text-white mt-1">${compositeTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            </div>
            <Wallet className="w-8 h-8 text-white/50" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div>
              <p className="text-white/70 text-sm">Deposit</p>
              <p className="text-white">${mockWalletData.depositBalance.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-white/70 text-sm">Earned</p>
              <p className="text-white">${mockWalletData.totalEarned.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-white/70 text-sm">Tokens</p>
              <p className="text-white">{mockWalletData.tokens.toFixed(2)}</p>
              <p className="text-white/70 text-xs">@${mockWalletData.tokenRate}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Announcements Slider */}
      {mockAnnouncements.length > 0 && (
        <div className="relative">
          <Card className="overflow-hidden">
            <div className="relative h-48 sm:h-64">
              <img
                src={mockAnnouncements[currentSlide].image}
                alt={mockAnnouncements[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3>{mockAnnouncements[currentSlide].title}</h3>
                <p className="text-white/80 text-sm mt-1">{mockAnnouncements[currentSlide].date}</p>
              </div>
            </div>
          </Card>
          
          <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between pointer-events-none">
            <Button
              size="icon"
              variant="secondary"
              className="pointer-events-auto rounded-full"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + mockAnnouncements.length) % mockAnnouncements.length)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="pointer-events-auto rounded-full"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % mockAnnouncements.length)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {mockAnnouncements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Total Invested"
          value={`$${mockWalletData.totalInvested.toLocaleString()}`}
          icon={TrendingUp}
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Total Deposit"
          value={`$${mockWalletData.totalDeposit.toLocaleString()}`}
          icon={ArrowDownToLine}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Total Withdraw"
          value={`$${mockWalletData.totalWithdraw.toLocaleString()}`}
          icon={ArrowUpFromLine}
          gradient="from-purple-500 to-pink-500"
        />
        <StatCard
          title="Total Earned"
          value={`$${mockWalletData.totalEarned.toLocaleString()}`}
          icon={DollarSign}
          gradient="from-orange-500 to-red-500"
        />
      </div>

      {/* Network Stats */}
      <Card className="p-6">
        <h3 className="mb-4">Network Statistics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-slate-600 text-sm">Members</p>
            <p className="text-slate-900 mt-1">{mockNetworkStats.totalMembers.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-slate-600 text-sm">Total Invest</p>
            <p className="text-slate-900 mt-1">${(mockNetworkStats.totalInvest / 1000).toFixed(0)}k</p>
          </div>
          <div className="text-center">
            <p className="text-slate-600 text-sm">Total Income</p>
            <p className="text-slate-900 mt-1">${(mockNetworkStats.totalIncome / 1000).toFixed(0)}k</p>
          </div>
          <div className="text-center">
            <p className="text-slate-600 text-sm">Token Rate</p>
            <p className="text-slate-900 mt-1">${mockWalletData.tokenRate}</p>
          </div>
        </div>
      </Card>

      {/* Referral Link */}
      <Card className="p-6">
        <h3 className="mb-4">Your Referral Link</h3>
        <CopyField value={mockUser.referralLink} />
      </Card>

      {/* Documents */}
      {mockDocuments.length > 0 && (
        <Card className="p-6">
          <h3 className="mb-4">Documents</h3>
          <div className="space-y-2">
            {mockDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm">{doc.name}</p>
                    <p className="text-xs text-slate-500">{doc.size} • {doc.date}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDocumentDialog(doc)}
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Partners */}
      {mockPartners.length > 0 && (
        <Card className="p-6">
          <h3 className="mb-4">Our Partners</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {mockPartners.map((partner) => (
              <div
                key={partner.id}
                className="p-4 bg-slate-50 rounded-lg flex items-center justify-center"
              >
                <img src={partner.logo} alt={partner.name} className="max-w-full h-auto" />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          onClick={() => onNavigate('deposit')}
        >
          <ArrowDownToLine className="w-5 h-5 mr-2" />
          Deposit
        </Button>
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
          onClick={() => onNavigate('withdraw')}
        >
          <ArrowUpFromLine className="w-5 h-5 mr-2" />
          Withdraw
        </Button>
      </div>

      {/* Document Download Dialog */}
      <Dialog open={!!documentDialog} onOpenChange={() => setDocumentDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to download this document?
            </DialogDescription>
          </DialogHeader>
          {documentDialog && (
            <div className="py-4">
              <p><strong>File:</strong> {documentDialog.name}</p>
              <p className="text-sm text-slate-600">Size: {documentDialog.size}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDocumentDialog(null)}>
              Cancel
            </Button>
            <Button onClick={() => handleDownloadDocument(documentDialog)}>
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
