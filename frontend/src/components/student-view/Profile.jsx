
import { useContext, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AuthContext } from '@/context/AuthContext';

const Profile = () => {

  const {auth}=useContext(AuthContext)
  console.log(auth.user)
console.log(auth.user)
  const [avatar, setAvatar] = useState(
    'https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff&size=128'
  );

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card className="rounded-2xl shadow-xl border border-gray-200 p-4">
          <CardContent className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative group mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <i className="fas fa-camera text-white text-xl"></i>
                </div>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleAvatarChange}
                  accept="image/*"
                />
              </div>
            </div>

            {/* Name */}
            <h2 className="text-2xl font-bold text-foreground">
              {auth?.user?.userName}
            </h2>
            <Badge className="mt-1 mb-2" variant="secondary">
              Premium {auth?.user?.role}
            </Badge>

            <Separator className="my-6 w-full" />

            {/* Contact Info */}
            <div className="space-y-4 w-full text-left">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <i className="fas fa-envelope text-blue-600"></i>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{auth?.user?.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <i className="fas fa-phone text-blue-600"></i>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{auth?.user?.phoneNumber}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;

