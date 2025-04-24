// components/Sidebar.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { useInstructorContext } from "@/context/InstructorContext.jsx";
import { useStudents } from "@/context/StudentContext.jsx";
import { useContext } from 'react';
import { AuthContext } from "@/context/AuthContext.jsx";

const Sidebar = ({
  currentUserId,
  chatRooms,
  activeRoom,
  isLoading,
  startPrivateChat,
  createGroupChat,
  joinRoom,
  getRecipientName,
  isMobile,
  closeMobileSidebar
}) => {
  const { instructors } = useInstructorContext();
  const { students } = useStudents();
  const { auth } = useContext(AuthContext);

  const [recipient, setRecipient] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleStartPrivateChat = () => {
    startPrivateChat(recipient);
    setRecipient("");
  };

  const handleCreateGroup = () => {
    createGroupChat(newGroupName, selectedMembers);
    setNewGroupName("");
    setSelectedMembers([]);
  };

  const handleMemberSelection = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedMembers(selectedOptions);
  };

  const sidebarVariants = {
    hidden: { 
      x: isMobile ? "-100%" : 0,
      opacity: isMobile ? 0 : 1,
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    exit: { 
      x: isMobile ? "-100%" : 0,
      opacity: isMobile ? 0 : 1,
      transition: { 
        duration: 0.2 
      }
    }
  };

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`
        ${isMobile ? 'fixed left-0 top-0 h-full z-40 bg-white shadow-lg' : 'relative'}
        w-full md:w-1/4 lg:w-1/4 p-4 space-y-4 overflow-y-auto border-r
      `}
    >
      {isMobile && (
        <div className="flex justify-end mb-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={closeMobileSidebar}
            className="rounded-full h-8 w-8"
          >
            <X size={18} />
          </Button>
        </div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Private Chat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {
              auth.user.role !== "instructor" ?
              <><select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full border rounded px-2 py-2 bg-white"
                  disabled={isLoading}
                >
                  <option value="">Select Instructor</option>
                  {instructors.map((i) => (
                    <option key={i._id} value={i._id}>
                      {i.userName}
                    </option>
                  ))}
                </select><Button
                  onClick={handleStartPrivateChat}
                  variant="secondary"
                  className="w-full"
                  disabled={!recipient || isLoading}
                >
                    Start Chat
                  </Button></>

              :

            
            <><select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full border rounded px-2 py-2 bg-white"
                  disabled={isLoading}
                >
                  <option value="">Select Student</option>
                  {students.map((i) => (
                    <option key={i._id} value={i._id}>
                      {i.userName}
                    </option>
                  ))}
                </select>
                <Button
                  onClick={handleStartPrivateChat}
                  variant="secondary"
                  className="w-full"
                  disabled={!recipient || isLoading}
                >
                    Start Chat
                  </Button>
                  </>
            }
          </CardContent>
        </Card>
      </motion.div>

      {auth.user.role === "instructor" && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">New Group</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Group Name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                disabled={isLoading}
              />
              <div className="text-xs text-gray-500 mb-1">
                Hold Ctrl/Cmd to select multiple
              </div>
              <select
                multiple
                value={selectedMembers}
                onChange={handleMemberSelection}
                className="w-full border rounded px-2 py-1 h-24 bg-white"
                disabled={isLoading}
              >
                {students.map((student) => (
                  <option key={student.studentId} value={student.studentId}>
                    {student.userName}
                  </option>
                ))}
              </select>
              <div className="text-xs text-gray-500">
                {selectedMembers.length} member
                {selectedMembers.length !== 1 ? "s" : ""} selected
              </div>
              <Button
                onClick={handleCreateGroup}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!newGroupName || selectedMembers.length === 0 || isLoading}
              >
                {isLoading ? "Creating..." : "Create Group"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <h3 className="font-medium text-gray-700 ml-1">Your Chats</h3>
        {isLoading && !chatRooms.length && (
          <p className="text-sm text-gray-500 ml-1">Loading chats...</p>
        )}
        {!isLoading && !chatRooms.length && (
          <p className="text-sm text-gray-500 ml-1">No chats yet</p>
        )}

        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {chatRooms.map((room, index) => (
            <motion.div
              key={room._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                onClick={() => {
                  joinRoom(room);
                  if (isMobile) closeMobileSidebar();
                }}
                className={`
                  cursor-pointer transition-all duration-200 hover:shadow-md
                  ${activeRoom?._id === room._id ? "border-blue-500 border-2 bg-blue-50" : "border"}
                `}
              >
                <CardContent className="py-3">
                  <div className="font-medium">{getRecipientName(room)}</div>
                  {room.isGroup && (
                    <div className="text-xs text-gray-500">
                      {room.members?.length || 0} members
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;