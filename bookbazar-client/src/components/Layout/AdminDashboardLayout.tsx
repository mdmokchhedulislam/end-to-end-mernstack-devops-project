/* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   MdAddChart,
//   MdDashboard,
//   MdManageHistory,
//   MdOutlineProductionQuantityLimits,
// } from "react-icons/md";

// import { GiSplitCross } from "react-icons/gi";

// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

// import React, { useState } from "react";

// import { Button, Layout, Menu, theme } from "antd";
// import { NavLink, Outlet } from "react-router-dom";
// import { useAppSelector } from "../../redux/hooks";
// import { useCurrentUser } from "../../redux/features/auth/authSlice";
// import { FaJediOrder, FaUserCog } from "react-icons/fa";
// import { FaMoneyCheckDollar } from "react-icons/fa6";

// const { Header, Content, Sider } = Layout;

// const userRole = {
//   ADMIN: "admin",
//   USER: "user",
// };
// const AdminDashboardLayout: React.FC = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const user = useAppSelector(useCurrentUser);

//   // console.log({ user });

//   let sidebarItems;

//   switch (user!.role) {
//     case userRole.USER:
//       sidebarItems = [
//         {
//           key: "UserDashboard",
//           icon: <MdDashboard />,
//           label: <NavLink to={"/user/dashboard"}>Dashboard</NavLink>,
//         },
//         // {
//         //   key: "UserProfile",
//         //   icon: <MdDashboard />,
//         //   label: <NavLink to={"/user/profile"}>Profile</NavLink>,
//         // },

//         {
//           key: "UserProfile",
//           icon: <MdDashboard />,
//           label: <NavLink to={"/user/dashboard/profile"}>Profile</NavLink>,
//         },

//         {
//           key: "view-order-history",
//           icon: <FaMoneyCheckDollar />,
//           label: (
//             <NavLink to={"/user/dashboard/view-order-history"}>
//               View order history
//             </NavLink>
//           ),
//         },
//       ];
//       break;
//     case userRole.ADMIN:
//       sidebarItems = [
//         {
//           key: "AdminDashboard",
//           icon: <MdDashboard />,
//           label: <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>,
//         },
//          {
//           key: "UserProfile",
//           icon: <MdDashboard />,
//           label: <NavLink to={"/admin/dashboard/profile"}>Profile</NavLink>,
//         },
//         {
//           key: "ProductManagement",
//           icon: <MdOutlineProductionQuantityLimits />,
//           label: "Product Management",
//           children: [
//             {
//               key: "AddProduct",
//               icon: <MdAddChart />,
//               label: (
//                 <NavLink to={"/admin/dashboard/add-product"}>
//                   Add Product
//                 </NavLink>
//               ),
//             },
//             {
//               key: "ManageProduct",
//               icon: <MdManageHistory />,

//               label: (
//                 <NavLink to={"/admin/dashboard/manage-product"}>
//                   Manage Product
//                 </NavLink>
//               ),
//             },

//           ],
//         },
//         {
//           key: "OrderManagement",
//           icon: <FaUserCog />,
//           label: "Order Management",
//           children: [
//            {
//               key: "ManageOrders",
//               icon: <FaJediOrder />,
//               label: (
//                 <NavLink to={"/admin/dashboard/manage-orders"}>
//                   Manage Orders
//                 </NavLink>
//               ),
//             },
//           ],
//         },
//         {
//           key: "UserManagement",
//           icon: <FaUserCog />,
//           label: "User Management",
//           children: [
//             {
//               key: "DeactivatingAccounts",
//               icon: <GiSplitCross />,
//               label: (
//                 <NavLink to={"/admin/dashboard/manage-users"}>
//                   Manage Users
//                 </NavLink>
//               ),
//             },
//           ],
//         },
//       ];
//       break;

//     default:
//       break;
//   }
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <Layout>
//       <Sider
//         collapsed={collapsed}
//         breakpoint="lg"
//         collapsedWidth="0"
//         style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
//       >
//         <div className="demo-logo-vertical" />
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={["4"]}
//           items={sidebarItems}
//         />
//       </Sider>
//       <Layout>
//         <Header
//           style={{ padding: 0, position: "sticky", top: 0, zIndex: 1000 }}
//           className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] min-w-f"
//         >
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: "16px",
//               width: 64,
//               height: 64,
//               color: "white",
//             }}
//           />
//         </Header>
//         <Content>
//           <div
//             style={{
//               minHeight: 360,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             <Outlet />
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminDashboardLayout;

"use client";

import { MdAddChart, MdDashboard, MdManageHistory } from "react-icons/md";
import { GiSplitCross } from "react-icons/gi";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type React from "react";
import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useCurrentUser, logout } from "../../redux/features/auth/authSlice";
import { FaJediOrder, FaUserCog, FaHome, FaSignOutAlt } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const AdminDashboardLayout: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Auto-collapse sidebar on mobile and handle resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  let sidebarItems: any[];

  switch (user!.role) {
    case userRole.USER:
      sidebarItems = [
        {
          key: "UserDashboard",
          icon: <MdDashboard />,
          label: "Dashboard",
          path: "/user/dashboard",
        },
        
        {
          key: "view-order-history",
          icon: <FaMoneyCheckDollar />,
          label: "Order History",
          path: "/user/dashboard/view-order-history",
        },
        {
          key: "Approved-orders",
          icon: <FaMoneyCheckDollar />,
          label: "Approved Orders",
          path: "/user/dashboard/approved-orders",
        },
        {
          key: "UserProfile",
          icon: <FaUserCog />,
          label: "Profile",
          path: "/user/dashboard/profile",
        },
      ];
      break;
    case userRole.ADMIN:
      sidebarItems = [
        {
          key: "AdminDashboard",
          icon: <MdDashboard />,
          label: "Dashboard",
          path: "/admin/dashboard",
        },
        {
          key: "AddProduct",
          icon: <MdAddChart />,
          label: "Add Product",
          path: "/admin/dashboard/add-product",
        },
        {
          key: "ManageProduct",
          icon: <MdManageHistory />,
          label: "Manage Products",
          path: "/admin/dashboard/manage-product",
        },
        {
          key: "ManageOrders",
          icon: <FaJediOrder />,
          label: "Manage Orders",
          path: "/admin/dashboard/manage-orders",
        },
        {
          key: "ManageUsers",
          icon: <GiSplitCross />,
          label: "Manage Users",
          path: "/admin/dashboard/manage-users",
        },
        {
          key: "UserProfile",
          icon: <FaUserCog />,
          label: "Profile",
          path: "/admin/dashboard/profile",
        },
      ];
      break;

    default:
      sidebarItems = [];
      break;
  }

  const handleMobileToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleBackToHome = () => {
    navigate("/");
    closeMobileMenu();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    closeMobileMenu();
  };

  const renderMenuItem = (item: any) => {
    const isExactMatch = location.pathname === item.path;

    return (
      <NavLink
        key={item.key}
        to={item.path}
        onClick={closeMobileMenu}
        className={({ isActive }) =>
          `flex items-center space-x-3 px-4 py-3 mb-2 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200 rounded-lg group relative ${
            isActive && isExactMatch
              ? "bg-white/20 text-white border-r-4 border-blue-400"
              : ""
          }`
        }
        end
      >
        <span
          className={`text-lg ${
            collapsed && window.innerWidth >= 1024 ? "mx-auto" : ""
          }`}
        >
          {item.icon}
        </span>
        <span className="font-medium text-sm xl:text-base truncate">
          {item.label}
        </span>

        {/* Tooltip for collapsed state - only on desktop */}
        {collapsed && window.innerWidth >= 1024 && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {item.label}
          </div>
        )}
      </NavLink>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] shadow-2xl
          transition-all duration-300 ease-in-out
          
          /* Mobile Styles */
          fixed top-0 left-0 h-full z-[70] w-72
          transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          
          /* Desktop Styles */
          lg:sticky lg:translate-x-0 lg:z-auto
          ${collapsed ? "lg:w-16" : "lg:w-64 xl:w-72"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand Area */}
          <div className="p-4 border-b border-gray-600/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              {(window.innerWidth < 1024 || !collapsed) && (
                <div className="flex flex-col">
                  <span className="text-white font-bold text-lg">Admin</span>
                  <span className="text-gray-400 text-xs">Dashboard</span>
                </div>
              )}
            </div>
          </div>

      

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">{sidebarItems?.map(renderMenuItem)}</div>
          </nav>

          {/* Action Buttons */}
          <div className="p-3 border-t border-gray-600/50 space-y-2">
            {/* Back to Home Button */}
            <button
              onClick={handleBackToHome}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200 rounded-lg group"
              title="Back to Home"
            >
              <FaHome
                className={`text-lg ${
                  collapsed && window.innerWidth >= 1024 ? "mx-auto" : ""
                }`}
              />
              {(window.innerWidth < 1024 || !collapsed) && (
                <span className="font-medium text-sm">Back to Home</span>
              )}

              {/* Tooltip for collapsed state */}
              {collapsed && window.innerWidth >= 1024 && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Back to Home
                </div>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 rounded-lg group"
              title="Logout"
            >
              <FaSignOutAlt
                className={`text-lg ${
                  collapsed && window.innerWidth >= 1024 ? "mx-auto" : ""
                }`}
              />
              {(window.innerWidth < 1024 || !collapsed) && (
                <span className="font-medium text-sm">Logout</span>
              )}

              {/* Tooltip for collapsed state */}
              {collapsed && window.innerWidth >= 1024 && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Logout
                </div>
              )}
            </button>
          </div>

        
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-gradient-to-r from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] shadow-xl border-b">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center space-x-4">
              {/* Desktop Toggle */}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden lg:flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-105"
                title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {collapsed ? (
                  <MenuUnfoldOutlined className="text-lg" />
                ) : (
                  <MenuFoldOutlined className="text-lg" />
                )}
              </button>

              {/* Mobile Toggle */}
              <button
                onClick={handleMobileToggle}
                className="lg:hidden flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                title="Toggle Menu"
              >
                {mobileMenuOpen ? (
                  <MenuFoldOutlined className="text-lg" />
                ) : (
                  <MenuUnfoldOutlined className="text-lg" />
                )}
              </button>

             
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              {/* Quick Logout Button in Header */}
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all duration-200"
                title="Logout"
              >
                <FaSignOutAlt className="text-sm" />
                <span className="text-sm font-medium">Logout</span>
              </button>

              {/* User Avatar */}
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div>
            <div className="rounded-2xl shadow-sm min-h-[calc(100vh-12rem)]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
