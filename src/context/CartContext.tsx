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
  addToCart,
  clearCart,
  getLoggedUserCart,
  removeCartItem,
  updateCartQuantity,
} from "@/api/services/cartApi";
import { CartData, CartItem } from "@/api/types/cartWishlistTypes";

interface CartContextType {
  cart: CartData | null;
  cartCount: number;
  totalCartPrice: number;
  isLoading: boolean;
  isActionLoading: boolean;
  addToCartAction: (productId: string) => Promise<boolean>;
  updateQuantityAction: (productId: string, count: number) => Promise<boolean>;
  removeItemAction: (productId: string) => Promise<boolean>;
  clearCartAction: () => Promise<boolean>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartData | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);
  const router = useRouter();

  const token = session?.accessToken;

  const refreshCart = useCallback(async () => {
    if (!token) {
      setCart(null);
      setCartCount(0);
      setTotalCartPrice(0);
      return;
    }

    try {
      setIsLoading(true);
      const response = await getLoggedUserCart(token);
      if (response && response.data) {
        setCart(response.data);
        setCartCount(response.numOfCartItems ?? response.data.products?.length ?? 0);
        setTotalCartPrice(response.data.totalCartPrice ?? 0);
      }
    } catch {
      // User might have an empty cart or newly created account
      setCart(null);
      setCartCount(0);
      setTotalCartPrice(0);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (status === "authenticated" && token) {
      refreshCart();
    } else if (status === "unauthenticated") {
      setCart(null);
      setCartCount(0);
      setTotalCartPrice(0);
    }
  }, [status, token, refreshCart]);

  const addToCartAction = async (productId: string): Promise<boolean> => {
    if (!token) {
      toast.error("Please login to add products to your cart");
      router.push("/login");
      return false;
    }

    try {
      setIsActionLoading(true);
      const res = await addToCart(productId, token);
      if (res && res.data) {
        setCart(res.data);
        setCartCount(res.numOfCartItems ?? res.data.products?.length ?? 0);
        setTotalCartPrice(res.data.totalCartPrice ?? 0);
      } else {
        await refreshCart();
      }
      toast.success(res.message || "Product added to cart!");
      return true;
    } catch (err: any) {
      toast.error(err.message || "Failed to add to cart");
      return false;
    } finally {
      setIsActionLoading(false);
    }
  };

  const updateQuantityAction = async (
    productId: string,
    count: number
  ): Promise<boolean> => {
    if (!token) return false;
    if (count < 1) {
      return removeItemAction(productId);
    }

    try {
      setIsActionLoading(true);
      const res = await updateCartQuantity(productId, count, token);
      if (res && res.data) {
        setCart(res.data);
        setCartCount(res.numOfCartItems ?? res.data.products?.length ?? 0);
        setTotalCartPrice(res.data.totalCartPrice ?? 0);
      } else {
        await refreshCart();
      }
      toast.success("Quantity updated");
      return true;
    } catch (err: any) {
      toast.error(err.message || "Failed to update quantity");
      return false;
    } finally {
      setIsActionLoading(false);
    }
  };

  const removeItemAction = async (productId: string): Promise<boolean> => {
    if (!token) return false;

    try {
      setIsActionLoading(true);
      const res = await removeCartItem(productId, token);
      if (res && res.data) {
        setCart(res.data);
        setCartCount(res.numOfCartItems ?? res.data.products?.length ?? 0);
        setTotalCartPrice(res.data.totalCartPrice ?? 0);
      } else {
        await refreshCart();
      }
      toast.success("Item removed from cart");
      return true;
    } catch (err: any) {
      toast.error(err.message || "Failed to remove item");
      return false;
    } finally {
      setIsActionLoading(false);
    }
  };

  const clearCartAction = async (): Promise<boolean> => {
    if (!token) return false;

    try {
      setIsActionLoading(true);
      await clearCart(token);
      setCart(null);
      setCartCount(0);
      setTotalCartPrice(0);
      toast.success("Cart cleared");
      return true;
    } catch (err: any) {
      toast.error(err.message || "Failed to clear cart");
      return false;
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        totalCartPrice,
        isLoading,
        isActionLoading,
        addToCartAction,
        updateQuantityAction,
        removeItemAction,
        clearCartAction,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
