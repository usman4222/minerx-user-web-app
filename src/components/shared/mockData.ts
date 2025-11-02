export const mockUser = {
  id: '1',
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@example.com',
  username: 'sarahj',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  upline: 'john_doe',
  referralCode: 'SARAH2024',
  referralLink: 'https://investdash.com/ref/SARAH2024',
  joinedDate: '2024-01-15',
};

export const mockWalletData = {
  depositBalance: 5420.50,
  earningsBalance: 2340.75,
  totalEarned: 8650.25,
  totalDeposit: 10000.00,
  totalWithdraw: 3200.00,
  totalInvested: 4579.50,
  tokenRate: 0.85, // USD per token
  tokens: 6377.06, // depositBalance / tokenRate
};

export const mockNetworkStats = {
  totalMembers: 1247,
  totalInvest: 845620.50,
  totalIncome: 234890.75,
  activeMembers: 892,
};

export const mockAnnouncements = [
  {
    id: '1',
    title: 'New Investment Plans Available!',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    date: '2024-10-25',
  },
  {
    id: '2',
    title: 'October Star Salary Announcement',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop',
    date: '2024-10-20',
  },
  {
    id: '3',
    title: 'Platform Upgrade Complete',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=400&fit=crop',
    date: '2024-10-15',
  },
];

export const mockDocuments = [
  { id: '1', name: 'Investment Guide.pdf', size: '2.4 MB', date: '2024-10-01' },
  { id: '2', name: 'Terms & Conditions.pdf', size: '1.8 MB', date: '2024-09-15' },
  { id: '3', name: 'Compensation Plan.pdf', size: '3.2 MB', date: '2024-09-01' },
];

export const mockPartners = [
  { id: '1', name: 'TechCorp', logo: 'https://via.placeholder.com/100x50/3b82f6/ffffff?text=TechCorp' },
  { id: '2', name: 'FinanceHub', logo: 'https://via.placeholder.com/100x50/8b5cf6/ffffff?text=FinanceHub' },
  { id: '3', name: 'CryptoNet', logo: 'https://via.placeholder.com/100x50/06b6d4/ffffff?text=CryptoNet' },
  { id: '4', name: 'BlockChain+', logo: 'https://via.placeholder.com/100x50/10b981/ffffff?text=BlockChain%2B' },
];

export const mockDepositTransactions = [
  { id: '1', amount: 500, status: 'Approved', date: '2024-10-27 14:32', txHash: '0x7a3f...8d2e' },
  { id: '2', amount: 1000, status: 'Pending', date: '2024-10-28 09:15', txHash: '0x9b1c...3f4a' },
  { id: '3', amount: 250, status: 'Approved', date: '2024-10-25 11:20', txHash: '0x2c5d...7e8f' },
  { id: '4', amount: 750, status: 'Expired', date: '2024-10-20 16:45', txHash: '0x4f6e...1a2b' },
  { id: '5', amount: 2000, status: 'Approved', date: '2024-10-18 10:10', txHash: '0x8d3a...5c6d' },
];

export const mockWithdrawTransactions = [
  { id: '1', amount: 800, status: 'Completed', date: '2024-10-26 15:20', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb' },
  { id: '2', amount: 500, status: 'Processing', date: '2024-10-28 08:30', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb' },
  { id: '3', amount: 1200, status: 'Completed', date: '2024-10-22 12:45', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb' },
  { id: '4', amount: 300, status: 'Rejected', date: '2024-10-20 09:15', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', reason: 'Insufficient balance' },
  { id: '5', amount: 400, status: 'Canceled', date: '2024-10-19 14:00', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb' },
];

export const mockInvestmentPlans = [
  {
    id: '1',
    name: 'Starter Plan',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop',
    minInvest: 10,
    maxInvest: 500,
    roi: 12,
    duration: 30,
    description: 'Perfect for beginners',
  },
  {
    id: '2',
    name: 'Growth Plan',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    minInvest: 500,
    maxInvest: 2000,
    roi: 18,
    duration: 60,
    description: 'Accelerated growth potential',
  },
  {
    id: '3',
    name: 'Premium Plan',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=300&fit=crop',
    minInvest: 2000,
    maxInvest: 10000,
    roi: 25,
    duration: 90,
    description: 'Maximum returns for serious investors',
  },
];

export const mockPurchasedPlans = [
  {
    id: '1',
    planName: 'Growth Plan',
    amount: 1000,
    roi: 18,
    status: 'Active',
    purchaseDate: '2024-10-15',
    expiryDate: '2024-12-14',
    earned: 120,
    totalPayout: 1180,
  },
  {
    id: '2',
    planName: 'Starter Plan',
    amount: 250,
    roi: 12,
    status: 'Active',
    purchaseDate: '2024-10-20',
    expiryDate: '2024-11-19',
    earned: 15,
    totalPayout: 280,
  },
  {
    id: '3',
    planName: 'Premium Plan',
    amount: 5000,
    roi: 25,
    status: 'Expired',
    purchaseDate: '2024-07-15',
    expiryDate: '2024-10-13',
    earned: 1250,
    totalPayout: 6250,
  },
];

export const mockTransactions = [
  { id: '1', type: 'Daily Income', amount: 45.50, date: '2024-10-28 09:00', status: 'Completed', details: 'Growth Plan ROI' },
  { id: '2', type: 'Direct Income', amount: 120.00, date: '2024-10-27 14:30', status: 'Completed', details: 'Referral: user_123' },
  { id: '3', type: 'Deposit', amount: 1000.00, date: '2024-10-27 10:15', status: 'Approved', details: 'TxHash: 0x9b1c...3f4a' },
  { id: '4', type: 'Team Income', amount: 75.25, date: '2024-10-26 16:20', status: 'Completed', details: 'Level 2 earnings' },
  { id: '5', type: 'Withdraw', amount: 800.00, date: '2024-10-26 15:20', status: 'Completed', details: 'To: 0x742d...0bEb' },
  { id: '6', type: 'Plan Purchase', amount: -1000.00, date: '2024-10-25 11:00', status: 'Completed', details: 'Growth Plan' },
  { id: '7', type: 'Monthly Salary', amount: 500.00, date: '2024-10-01 00:00', status: 'Completed', details: 'September Star Salary' },
  { id: '8', type: 'Rank Income', amount: 250.00, date: '2024-09-28 12:00', status: 'Completed', details: 'Silver rank reward' },
];

export const mockRanks = [
  { id: '1', name: 'Bronze', requirement: 'Invest $100', reward: 50, status: 'Claimed', icon: '🥉' },
  { id: '2', name: 'Silver', requirement: 'Invest $500 + 5 direct referrals', reward: 250, status: 'Claimed', icon: '🥈' },
  { id: '3', name: 'Gold', requirement: 'Invest $2000 + 10 direct referrals', reward: 1000, status: 'Claimable', icon: '🥇' },
  { id: '4', name: 'Platinum', requirement: 'Invest $5000 + 20 direct referrals', reward: 2500, status: 'Locked', icon: '💎' },
  { id: '5', name: 'Diamond', requirement: 'Invest $10000 + 50 direct referrals', reward: 10000, status: 'Locked', icon: '💠' },
];

export const mockTeamLevels = [
  {
    id: '1',
    level: 1,
    status: 'Unlocked',
    members: 24,
    todayIncome: 145.50,
    totalIncome: 8450.25,
    users: [
      { id: '1', name: 'John Smith', email: 'john@example.com', joined: '2024-09-15', invested: 1200 },
      { id: '2', name: 'Emma Wilson', email: 'emma@example.com', joined: '2024-09-20', invested: 800 },
      { id: '3', name: 'Mike Brown', email: 'mike@example.com', joined: '2024-10-01', invested: 500 },
    ],
  },
  {
    id: '2',
    level: 2,
    status: 'Unlocked',
    members: 86,
    todayIncome: 89.75,
    totalIncome: 4320.80,
    users: [],
  },
  {
    id: '3',
    level: 3,
    status: 'Locked',
    members: 0,
    todayIncome: 0,
    totalIncome: 0,
    users: [],
  },
];

export const mockLuckyDrawWinners = [
  { id: '1', name: 'Alice Johnson', amount: 1000, date: '2024-10-27', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Bob Williams', amount: 500, date: '2024-10-26', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Carol Davis', amount: 2000, date: '2024-10-25', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'David Miller', amount: 750, date: '2024-10-24', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Eva Martinez', amount: 1500, date: '2024-10-23', avatar: 'https://i.pravatar.cc/150?img=5' },
];

export const mockMonthlySalary = {
  currentMonth: 'October 2024',
  mode: 'Preview', // 'Preview' or 'Snapshot'
  previewSalary: 1850.00,
  snapshotSalary: 0,
  currentStar: 'Silver Star',
  selfVolume: 1200,
  directVolume: 8500,
  indirectVolume: 24000,
  targets: {
    self: { current: 1200, required: 500, next: 800 },
    direct: { current: 8500, required: 5000, next: 10000 },
    indirect: { current: 24000, required: 15000, next: 30000 },
  },
};
