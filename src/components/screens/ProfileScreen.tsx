import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { User, Mail, Users, Camera, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { ShimmerCard } from '../shared/ShimmerCard';
import { mockUser } from '../shared/mockData';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: mockUser.username,
    email: mockUser.email,
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = async () => {
    if (!formData.username.trim()) {
      toast.error('Username is required');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }

    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSaving(false);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleAvatarClick = () => {
    toast.info('Avatar upload feature would open here');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <ShimmerCard />
        <ShimmerCard />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-slate-900">My Profile</h2>

      {/* Hero Section */}
      <Card className="p-8 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white">Profile Information</h3>
          {!editing && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>

        <div className="flex items-center gap-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="relative cursor-pointer group"
                  onClick={handleAvatarClick}
                >
                  <Avatar className="w-24 h-24 border-4 border-white">
                    <AvatarImage src={mockUser.avatar} />
                    <AvatarFallback className="text-2xl">
                      {mockUser.firstName[0]}{mockUser.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to change avatar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex-1">
            <h2 className="text-white mb-2">
              {mockUser.firstName} {mockUser.lastName}
            </h2>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                @{mockUser.username}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                Member since {new Date(mockUser.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Profile Form */}
      <Card className="p-6">
        <h3 className="mb-6">Account Details</h3>
        <div className="space-y-6">
          {/* Username */}
          <div>
            <Label htmlFor="username">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-slate-500" />
                <span>Username</span>
              </div>
            </Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              disabled={!editing}
              placeholder="Enter username"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>Email</span>
              </div>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!editing}
              placeholder="Enter email"
            />
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                disabled={!editing}
                placeholder="First name"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                disabled={!editing}
                placeholder="Last name"
                className="mt-2"
              />
            </div>
          </div>

          {/* Upline (Read-only) */}
          <div>
            <Label htmlFor="upline">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-slate-500" />
                <span>Upline / Referrer</span>
              </div>
            </Label>
            <Input
              id="upline"
              value={mockUser.upline}
              disabled
              className="bg-slate-50"
            />
            <p className="text-sm text-slate-500 mt-2">
              This is your sponsor and cannot be changed
            </p>
          </div>

          {/* Save Buttons */}
          {editing && (
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    username: mockUser.username,
                    email: mockUser.email,
                    firstName: mockUser.firstName,
                    lastName: mockUser.lastName,
                  });
                }}
                disabled={saving}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Account Stats */}
      <Card className="p-6">
        <h3 className="mb-4">Account Statistics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-slate-600">Referral Code</p>
            <p className="text-slate-900 mt-1">{mockUser.referralCode}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-slate-600">Member Since</p>
            <p className="text-slate-900 mt-1">
              {new Date(mockUser.joinedDate).toLocaleDateString()}
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-slate-600">Account Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-slate-900">Active</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Security Info */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-900">
          🔒 Your account is secured. For password changes or security settings, 
          please contact support.
        </p>
      </Card>
    </div>
  );
}
