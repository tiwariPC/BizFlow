import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, loginSchema, insertOrderSchema, insertQuestionnaireSchema, insertCompanySchema, type User } from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware to verify JWT token
const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await storage.getUser(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Middleware to check admin role
const requireAdmin = (req: any, res: any, next: any) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);

      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username) ||
                          await storage.getUserByEmail(userData.email);

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await storage.createUser(userData);
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          role: user.role
        },
        token
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid input data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const credentials = loginSchema.parse(req.body);
      console.log("Login attempt for username:", credentials.username);

      const user = await storage.getUserByUsername(credentials.username);
      console.log("User found:", user ? "Yes" : "No");

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(credentials.password, user.password);
      console.log("Password match:", passwordMatch);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          role: user.role
        },
        token
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ message: "Invalid input data" });
    }
  });

    // Google OAuth authentication
  app.post("/api/auth/google", async (req, res) => {
    try {
      const { googleToken, userData, selectedTier } = req.body;

      if (!googleToken || !userData) {
        return res.status(400).json({ message: "Google token and user data required" });
      }

      // Check if user already exists by email
      let user = await storage.getUserByEmail(userData.email);

      if (user) {
        // User exists, update last login and return token
        await storage.updateUser(user.id, { lastLoginAt: new Date() });
      } else {
        // Create new user with Google data
        const newUserData = {
          username: userData.username,
          email: userData.email,
          password: await bcrypt.hash(googleToken + Date.now(), 10), // Generate secure password
          fullName: userData.fullName,
          role: selectedTier,
          tier: selectedTier,
          organizationId: null,
          parentUserId: null,
          permissions: selectedTier === "tier1" ? { all: true } :
                      selectedTier === "tier2" ? { organization: true, employees: true, services: true } :
                      { basic: true, limited: true },
          status: "active",
        };

        user = await storage.createUser(newUserData);
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          tier: user.tier
        },
        token,
        isNewUser: !user.lastLoginAt
      });
    } catch (error) {
      console.error("Google auth error:", error);
      res.status(500).json({ message: "Google authentication failed" });
    }
  });

  // Apple OAuth authentication
  app.post("/api/auth/apple", async (req, res) => {
    try {
      const { appleToken, userData, selectedTier } = req.body;

      if (!appleToken || !userData) {
        return res.status(400).json({ message: "Apple token and user data required" });
      }

      // Check if user already exists by email
      let user = await storage.getUserByEmail(userData.email);

      if (user) {
        // User exists, update last login and return token
        await storage.updateUser(user.id, { lastLoginAt: new Date() });
      } else {
        // Create new user with Apple data
        const newUserData = {
          username: userData.username,
          email: userData.email,
          password: await bcrypt.hash(appleToken + Date.now(), 10), // Generate secure password
          fullName: userData.fullName,
          role: selectedTier,
          tier: selectedTier,
          organizationId: null,
          parentUserId: null,
          permissions: selectedTier === "tier1" ? { all: true } :
                      selectedTier === "tier2" ? { organization: true, employees: true, services: true } :
                      { basic: true, limited: true },
          status: "active",
        };

        user = await storage.createUser(newUserData);
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          tier: user.tier
        },
        token,
        isNewUser: !user.lastLoginAt
      });
    } catch (error) {
      console.error("Apple auth error:", error);
      res.status(500).json({ message: "Apple authentication failed" });
    }
  });

  // Get current user
  app.get("/api/auth/me", authenticateToken, (req: any, res) => {
    res.json({
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        fullName: req.user.fullName,
        role: req.user.role
      }
    });
  });

  // Debug endpoint to check users (remove in production)
  app.get("/api/debug/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json({ users: users.map((u: User) => ({ username: u.username, role: u.role })) });
    } catch (error) {
      res.status(500).json({ error: "Failed to get users" });
    }
  });

  // Service packages routes
  app.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getAllServicePackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service packages" });
    }
  });

  app.get("/api/packages/:id", async (req, res) => {
    try {
      const pkg = await storage.getServicePackage(req.params.id);
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }
      res.json(pkg);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch package" });
    }
  });

  // Orders routes
  app.get("/api/orders", authenticateToken, async (req: any, res) => {
    try {
      let orders;
      if (req.user.role === 'admin') {
        orders = await storage.getOrders();
        // Include user and package details for admin
        const ordersWithDetails = await Promise.all(orders.map(async (order) => {
          const user = await storage.getUser(order.userId);
          const pkg = await storage.getServicePackage(order.packageId);
          return {
            ...order,
            user: user ? { id: user.id, fullName: user.fullName, email: user.email } : null,
            package: pkg ? { id: pkg.id, name: pkg.name } : null,
          };
        }));
        res.json(ordersWithDetails);
      } else {
        orders = await storage.getOrdersByUser(req.user.id);
        // Include package details for customer
        const ordersWithDetails = await Promise.all(orders.map(async (order) => {
          const pkg = await storage.getServicePackage(order.packageId);
          return {
            ...order,
            package: pkg ? { id: pkg.id, name: pkg.name, setupTime: pkg.setupTime } : null,
          };
        }));
        res.json(ordersWithDetails);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", authenticateToken, async (req: any, res) => {
    try {
      const orderData = insertOrderSchema.parse({
        ...req.body,
        userId: req.user.id,
      });

      // Verify package exists
      const pkg = await storage.getServicePackage(orderData.packageId);
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }

      const order = await storage.createOrder({
        ...orderData,
        amount: pkg.price,
      });

      res.json(order);
    } catch (error) {
      res.status(400).json({ message: "Invalid order data" });
    }
  });

  app.patch("/api/orders/:id/status", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const { status, notes } = req.body;
      const order = await storage.updateOrderStatus(req.params.id, status, notes);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  // Questionnaire routes
  app.post("/api/questionnaire", authenticateToken, async (req: any, res) => {
    try {
      const questionnaireData = insertQuestionnaireSchema.parse({
        ...req.body,
        userId: req.user.id,
      });

      const questionnaire = await storage.createQuestionnaire(questionnaireData);
      res.json(questionnaire);
    } catch (error) {
      res.status(400).json({ message: "Invalid questionnaire data" });
    }
  });

  app.get("/api/questionnaire", authenticateToken, async (req: any, res) => {
    try {
      const questionnaires = await storage.getQuestionnairesByUser(req.user.id);
      res.json(questionnaires);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questionnaires" });
    }
  });

  // Admin stats
  app.get("/api/admin/stats", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const orders = await storage.getOrders();
      const totalOrders = orders.length;
      const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
      const completedOrders = orders.filter(o => o.status === 'completed').length;

      // Calculate monthly revenue (current month)
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyOrders = orders.filter(o => {
        const orderDate = new Date(o.createdAt!);
        return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
      });
      const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + parseFloat(order.amount), 0);

      // Count active customers (users with orders)
      const activeCustomers = new Set(orders.map(o => o.userId)).size;

      res.json({
        totalOrders,
        pendingOrders,
        completedOrders,
        monthlyRevenue: Math.round(monthlyRevenue),
        activeCustomers,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch admin stats" });
    }
  });

  // Companies routes
  app.get("/api/companies", authenticateToken, async (req: any, res) => {
    try {
      if (req.user.role === 'admin') {
        const companies = await storage.getCompanies();
        return res.json(companies);
      }
      const companies = await storage.getCompaniesByOwner(req.user.id);
      return res.json(companies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch companies" });
    }
  });

  app.post("/api/companies", authenticateToken, async (req: any, res) => {
    try {
      const data = insertCompanySchema.parse({
        ...req.body,
        ownerId: req.user.id,
      });
      const company = await storage.createCompany(data);
      res.json(company);
    } catch (error) {
      res.status(400).json({ message: "Invalid company data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
