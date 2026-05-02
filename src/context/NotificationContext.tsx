"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchPaymentReceipts, markReceiptAsViewed, getViewedReceipts } from '@/lib/paymentReceiptService';

const ADMIN_USER_ID = 'admin_user'; // Fixed ID for admin user

interface NotificationContextType {
  viewedRequests: Set<string>;
  markAsViewed: (requestId: string) => Promise<void>;
  pendingCount: number;
  refreshPendingCount: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [viewedRequests, setViewedRequests] = useState<Set<string>>(new Set());
  const [pendingCount, setPendingCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshPendingCount = async (
    providedViewedRequests?: Set<string>,
  ) => {
    try {
      const pendingReceipts = await fetchPaymentReceipts('pending', 200);
      const viewedSet = providedViewedRequests ?? viewedRequests;
      const unreadCount = pendingReceipts.filter(
        (receipt) => !viewedSet.has(receipt.id),
      ).length;

      setPendingCount(unreadCount);
    } catch (error) {
      console.error('Error refreshing pending count:', error);
    }
  };

  const markAsViewed = async (requestId: string) => {
    if (!requestId || viewedRequests.has(requestId)) {
      return;
    }

    // IMMEDIATELY update local state for instant UI feedback
    setViewedRequests((prev) => {
      const next = new Set(prev);
      next.add(requestId);
      return next;
    });
    setPendingCount((prev) => Math.max(prev - 1, 0));

    // Then save to Supabase database in background
    try {
      await markReceiptAsViewed(requestId, ADMIN_USER_ID);
    } catch (error) {
      console.error('Error marking receipt as viewed in database:', error);
    }
  };

  // Load viewed receipts from Supabase database on mount
  useEffect(() => {
    const loadViewedReceipts = async () => {
      try {
        const viewed = await getViewedReceipts(ADMIN_USER_ID);
        setViewedRequests(viewed);
        setIsLoaded(true);
        await refreshPendingCount(viewed);
      } catch (error) {
        console.error('Error loading viewed receipts from database:', error);
        setIsLoaded(true);
      }
    };

    loadViewedReceipts();
  }, []);

  // Refresh pending count every 15 seconds
  useEffect(() => {
    if (!isLoaded) return;
    
    refreshPendingCount();
    const interval = setInterval(() => {
      refreshPendingCount();
    }, 15000);
    return () => clearInterval(interval);
  }, [isLoaded]);

  return (
    <NotificationContext.Provider value={{
      viewedRequests,
      markAsViewed,
      pendingCount,
      refreshPendingCount
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
