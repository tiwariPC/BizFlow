import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, loginSchema, insertOrderSchema, insertQuestionnaireSchema } from "@shared/schema";
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
      const user = await storage.getUserByUsername(credentials.username);
      
      if (!user || !await bcrypt.compare(credentials.password, user.password)) {
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
      res.status(400).json({ message: "Invalid input data" });
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

  const httpServer = createServer(app);
  return httpServer;
}
