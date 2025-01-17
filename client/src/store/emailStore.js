import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useEmailStore = create((set, get) => ({
  categories: [],
  emails: [],
  isLoading: false,

  // Fetch all categories
  getCategories: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/mail/categories", {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json, text/plain, */*", 
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Fixed the token key
        },
      });
      set({ categories: res.data });
    } catch (error) {
      toast.error("Failed to fetch categories.");
    } finally { 
      set({ isLoading: false });
    }
  },
  

  // Fetch emails for a specific category
  getEmails: async (categoryId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/mail/categories/${categoryId}/emails`,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text/plain, */*", 
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Fixed the token key
          },
        }
      );
      set({ emails: res.data });
    } catch (error) {
      toast.error("Failed to fetch emails.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Add a new category
  addCategory: async (category) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/mail/categories/add", {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json, text/plain, */*", 
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Fixed the token key
        },
      },{category});
      set((state) => ({ categories: [...state.categories, res.data] }));
      toast.success("Category added successfully.");
    } catch (error) {
      toast.error("Failed to add category.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Remove a category
  removeCategory: async (categoryId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/mail/categories/${categoryId}/remove`,{
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json, text/plain, */*", 
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Fixed the token key
        },
      });
      set((state) => ({
        categories: state.categories.filter((category) => category.category !== categoryId),
      }));
      toast.success("Category removed successfully.");
    } catch (error) {
      toast.error("Failed to remove category.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Add an email to a specific category
  addEmail: async (categoryId, emailData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(
        `/mail/categories/${categoryId}/emails/add`,{
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text/plain, */*", 
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Fixed the token key
          },
        },{emailData}
      );
      set((state) => ({ emails: [...state.emails, res.data] }));
      toast.success("Email added successfully.");
    } catch (error) {
      toast.error("Failed to add email.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Remove an email
  removeEmail: async (categoryId, emailId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(
        `/mail/categories/${categoryId}/emails/${emailId}/remove`,{
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text/plain, */*", 
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Fixed the token key
          },
        }
      );
      set((state) => ({
        emails: state.emails.filter((email) => email._id !== emailId),
      }));
      toast.success("Email removed successfully.");
    } catch (error) {
      toast.error("Failed to remove email.");
    } finally {
      set({ isLoading: false });
    }
  },
}));
 