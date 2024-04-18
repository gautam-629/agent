import { create } from "zustand";
import { devtools } from 'zustand/middleware';

interface IAdminInfo {
    account: string;
    attempts: number;
    balance: number;
    child_count: number;
    id: number;
    last_login_at: string;
    parent_id: number;
    roleInfo: {
      id: number;
      pid: number;
      role_name: string;
      created_at: string;
      // Add other properties if available in roleInfo
    };
    role_id: number;
    status: number;
    time_zone: number;
    updated_at: string;
  }
  
interface AdminState{
    adminInfo:null|IAdminInfo
    setAdminInfo:(setAdminInfo:IAdminInfo)=>void;

}

export const useAdminInfoStore = create<AdminState>()(
    devtools((set) => ({
        adminInfo: null,
        setAdminInfo: (adminInfo) => set({ adminInfo:adminInfo }),
    }))
);
