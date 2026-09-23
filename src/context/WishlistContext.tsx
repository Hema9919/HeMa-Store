"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  addToWishlist,
  getLoggedUserWishlist,
  removeFromWishlist,
} from "@/api/services/wishlistApi";
import { ProductType } from "@/api/types/productTypes";

interface WishlistContextType {
  wishlistIds: string[];
  wishlistItems: ProductType[];
  wishlistCount: number;
  isLoading: boolean;
  isInWishlist: (productId: string) => boolean;
  toggleWishlistAction: (productId: string) => Promise<boolean>;
  removeFromWishlistAction: (productId: string) => Promise<boolean>;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [wishlistItems, setWishlistItems] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const token = session?.accessToken;

  const refreshWishlist = useCallback(async () => {
    if (!token) {
      setWishlistIds([]);
      setWishlistItems([]);
      return;
    }

    try {
      setIsLoading(true);
      const res = await getLoggedUserWishlist(token);
      if (res && res.data) {
        if (Array.isArray(res.data)) {
          // If items are products
          if (res.data.length > 0 && typeof res.data[0] === "object") {
            const products = res.data as ProductType[];
            setWishlistItems(products);
            setWishlistIds(products.map((p) => p._id || p.id));
          } else {
            // Array of strings (ids)
            setWishlistIds(res.data as string[]);
          }
        }
      }
    } catch {
      setWishlistIds([]);
      setWishlistItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (status === "authenticated" && token) {
      refreshWishlist();
    } else if (status === "unauthenticated") {
      setWishlistIds([]);
      setWishlistItems([]);
    }
  }, [status, token, refreshWishlist]);

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlistIds.includes(productId);
    },
    [wishlistIds]
  );

  const toggleWishlistAction = async (productId: string): Promise<boolean> => {
    if (!token) {
      toast.error("Please login to manage your wishlist");
      router.push("/login");
      return false;
    }

    const currentlyIn = isInWishlist(productId);

    try {
      if (currentlyIn) {
        // Remove
        setWishlistIds((prev) => prev.filter((id) => id !== productId));
        setWishlistItems((prev) =>
          prev.filter((item) => (item._id || item.id) !== productId)
        );
        const res = await removeFromWishlist(productId, token);
        toast.success(res.message || "Removed from wishlist");
      } else {
        // Add
        setWishlistIds((prev) => [...prev, productId]);
        const res = await addToWishlist(productId, token);
        toast.success(res.message || "Added to wishlist");
        await refreshWishlist();
      }
      return true;
    } catch (err: any) {
      // Revert on failure
      await refreshWishlist();
      toast.error(err.message || "Something went wrong");
      return false;
    }
  };

  const removeFromWishlistAction = async (
    productId: string
  ): Promise<boolean> => {
    if (!token) return false;

    try {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      setWishlistItems((prev) =>
        prev.filter((item) => (item._id || item.id) !== productId)
      );
      const res = await removeFromWishlist(productId, token);
      toast.success(res.message || "Removed from wishlist");
      return true;
    } catch (err: any) {
      await refreshWishlist();
      toast.error(err.message || "Failed to remove item");
      return false;
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistItems,
        wishlistCount: wishlistIds.length,
        isLoading,
        isInWishlist,
        toggleWishlistAction,
        removeFromWishlistAction,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
