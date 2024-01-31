"use client";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

const SidebarExample = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-10 right-0 w-[360px] bg-white transition-transform transform text-left ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar content goes here */}
        <Sidebar />
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={handleToggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-gray-800 text-white p-4">
          {/* Menu Icon */}
          <div className="cursor-pointer" onClick={handleToggleSidebar}>
            ☰
          </div>
        </div>

        {/* Main Content goes here */}
        <div className="flex-1 p-4 overflow-y-auto">
          <p>Main Content</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarExample;
