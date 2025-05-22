
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Edit2, Heart, Building, Key, Bell, Shield } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Profile = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      toast.error("Please sign in to access your profile");
      navigate("/signin");
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <div className="container max-w-5xl mx-auto pt-28 pb-16 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="space-y-8 sticky top-28">
            <div className="flex flex-col items-center space-y-4 p-6 bg-card rounded-lg border shadow-sm">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://i.pravatar.cc/150?img=68" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-muted-foreground">johndoe@example.com</p>
              </div>
              <Button variant="outline" className="w-full">
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>

            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Key className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="mr-2 h-4 w-4" />
                My Favorites
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Building className="mr-2 h-4 w-4" />
                My Properties
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Privacy & Security
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-destructive" 
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="personal">
            <TabsList className="w-full">
              <TabsTrigger value="personal" className="flex-1">Personal Info</TabsTrigger>
              <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
              <TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-6 pt-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input defaultValue="John Doe" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input defaultValue="johndoe" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input defaultValue="johndoe@example.com" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input defaultValue="+91 9876543210" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Aadhaar ID</label>
                  <Input defaultValue="123456789012" type="password" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-6 pt-4">
              <h3 className="text-lg font-medium">Recent Activity</h3>
              
              <Alert>
                <Bell className="h-4 w-4" />
                <AlertTitle>No recent activity</AlertTitle>
                <AlertDescription>
                  Your recent activities will appear here
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6 pt-4">
              <h3 className="text-lg font-medium">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Update Password</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
