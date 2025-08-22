import type { Express } from 'express';
import { createServer, type Server } from 'http';
import { storage } from './storage';
import {
  insertUserSchema,
  loginSchema,
  insertOrderSchema,
  insertQuestionnaireSchema,
  insertCompanySchema,
  createAccessTokenSchema,
  validateAccessTokenSchema,
  AVAILABLE_MODULES,
  type User,
  type CreateAccessToken,
  type ValidateAccessToken,
} from '@shared/schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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
  app.post('/api/auth/register', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);

      // Check if user already exists
      const existingUser =
        (await storage.getUserByUsername(userData.username)) ||
        (await storage.getUserByEmail(userData.email));

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const user = await storage.createUser(userData);
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      res.status(400).json({ message: 'Invalid input data' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const credentials = loginSchema.parse(req.body);
      console.log('Login attempt for username:', credentials.username);

      const user = await storage.getUserByUsername(credentials.username);
      console.log('User found:', user ? 'Yes' : 'No');

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(credentials.password, user.password);
      console.log('Password match:', passwordMatch);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(400).json({ message: 'Invalid input data' });
    }
  });

  // Google OAuth authentication
  app.post('/api/auth/google', async (req, res) => {
    try {
      const { googleToken, userData, selectedTier } = req.body;

      if (!googleToken || !userData) {
        return res.status(400).json({ message: 'Google token and user data required' });
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
          permissions:
            selectedTier === 'tier1'
              ? { all: true }
              : selectedTier === 'tier2'
                ? { organization: true, employees: true, services: true }
                : { basic: true, limited: true },
          status: 'active',
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
          tier: user.tier,
        },
        token,
        isNewUser: !user.lastLoginAt,
      });
    } catch (error) {
      console.error('Google auth error:', error);
      res.status(500).json({ message: 'Google authentication failed' });
    }
  });

  // Apple OAuth authentication
  app.post('/api/auth/apple', async (req, res) => {
    try {
      const { appleToken, userData, selectedTier } = req.body;

      if (!appleToken || !userData) {
        return res.status(400).json({ message: 'Apple token and user data required' });
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
          permissions:
            selectedTier === 'tier1'
              ? { all: true }
              : selectedTier === 'tier2'
                ? { organization: true, employees: true, services: true }
                : { basic: true, limited: true },
          status: 'active',
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
          tier: user.tier,
        },
        token,
        isNewUser: !user.lastLoginAt,
      });
    } catch (error) {
      console.error('Apple auth error:', error);
      res.status(500).json({ message: 'Apple authentication failed' });
    }
  });

  // Get current user
  app.get('/api/auth/me', authenticateToken, (req: any, res) => {
    res.json({
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        fullName: req.user.fullName,
        role: req.user.role,
      }
    });
  });

  // Debug endpoint to check users (remove in production)
  app.get('/api/debug/users', async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json({ users: users.map((u: User) => ({ username: u.username, role: u.role })) });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get users' });
    }
  });

  // Service packages routes
  app.get('/api/packages', async (req, res) => {
    try {
      const packages = await storage.getAllServicePackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch service packages' });
    }
  });

  app.get('/api/packages/:id', async (req, res) => {
    try {
      const pkg = await storage.getServicePackage(req.params.id);
      if (!pkg) {
        return res.status(404).json({ message: 'Package not found' });
      }
      res.json(pkg);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch package' });
    }
  });

  // Orders routes
  app.get('/api/orders', authenticateToken, async (req: any, res) => {
    try {
      let orders;
      if (req.user.role === 'admin') {
        orders = await storage.getOrders();
        // Include user and package details for admin
        const ordersWithDetails = await Promise.all(
          orders.map(async order => {
            const user = await storage.getUser(order.userId);
            const pkg = await storage.getServicePackage(order.packageId);
            return {
              ...order,
              user: user ? { id: user.id, fullName: user.fullName, email: user.email } : null,
              package: pkg ? { id: pkg.id, name: pkg.name } : null,
            };
          })
        );
        res.json(ordersWithDetails);
      } else {
        orders = await storage.getOrdersByUser(req.user.id);
        // Include package details for customer
        const ordersWithDetails = await Promise.all(
          orders.map(async order => {
            const pkg = await storage.getServicePackage(order.packageId);
            return {
              ...order,
              package: pkg ? { id: pkg.id, name: pkg.name, setupTime: pkg.setupTime } : null,
            };
          })
        );
        res.json(ordersWithDetails);
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  });

  app.post('/api/orders', authenticateToken, async (req: any, res) => {
    try {
      const orderData = insertOrderSchema.parse({
        ...req.body,
        userId: req.user.id,
      });

      // Verify package exists
      const pkg = await storage.getServicePackage(orderData.packageId);
      if (!pkg) {
        return res.status(404).json({ message: 'Package not found' });
      }

      const order = await storage.createOrder({
        ...orderData,
        amount: pkg.price,
      });

      res.json(order);
    } catch (error) {
      res.status(400).json({ message: 'Invalid order data' });
    }
  });

  app.patch('/api/orders/:id/status', authenticateToken, requireAdmin, async (req, res) => {
    try {
      const { status, notes } = req.body;
      const order = await storage.updateOrderStatus(req.params.id, status, notes);

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update order status' });
    }
  });

  // Questionnaire routes
  app.post('/api/questionnaire', authenticateToken, async (req: any, res) => {
    try {
      const questionnaireData = insertQuestionnaireSchema.parse({
        ...req.body,
        userId: req.user.id,
      });

      const questionnaire = await storage.createQuestionnaire(questionnaireData);
      res.json(questionnaire);
    } catch (error) {
      res.status(400).json({ message: 'Invalid questionnaire data' });
    }
  });

  app.get('/api/questionnaire', authenticateToken, async (req: any, res) => {
    try {
      const questionnaires = await storage.getQuestionnairesByUser(req.user.id);
      res.json(questionnaires);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch questionnaires' });
    }
  });

  // Admin stats
  app.get('/api/admin/stats', authenticateToken, requireAdmin, async (req, res) => {
    try {
      const orders = await storage.getOrders();
      const totalOrders = orders.length;
      const pendingOrders = orders.filter(
        o => o.status === 'pending' || o.status === 'processing'
      ).length;
      const completedOrders = orders.filter(o => o.status === 'completed').length;

      // Calculate monthly revenue (current month)
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyOrders = orders.filter(o => {
        const orderDate = new Date(o.createdAt!);
        return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
      });
      const monthlyRevenue = monthlyOrders.reduce(
        (sum, order) => sum + parseFloat(order.amount),
        0
      );

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
      res.status(500).json({ message: 'Failed to fetch admin stats' });
    }
  });

  // Companies routes
  app.get('/api/companies', authenticateToken, async (req: any, res) => {
    try {
      if (req.user.role === 'admin') {
        const companies = await storage.getCompanies();
        return res.json(companies);
      }
      const companies = await storage.getCompaniesByOwner(req.user.id);
      return res.json(companies);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch companies' });
    }
  });

  app.post('/api/companies', authenticateToken, async (req: any, res) => {
    try {
      const data = insertCompanySchema.parse({
        ...req.body,
        ownerId: req.user.id,
      });
      const company = await storage.createCompany(data);
      res.json(company);
    } catch (error) {
      res.status(400).json({ message: 'Invalid company data' });
    }
  });

  // Document upload routes
  app.post('/api/documents/upload', authenticateToken, async (req: any, res) => {
    try {
      // For now, we'll simulate file upload
      // In production, you'd use multer or similar middleware
      const { fileName, fileSize, category, metadata } = req.body;

      const document = {
        id: Math.random().toString(36).substr(2, 9),
        name: fileName,
        type: 'application/pdf', // Default type
        size: fileSize || 1024 * 1024, // 1MB default
        uploadedAt: new Date().toISOString(),
        status: 'pending' as const,
        category: category || 'general',
        url: `/documents/${fileName}`,
        metadata: metadata || {},
      };

      // In production, save to database
      // await storage.createDocument({ ...document, userId: req.user.id });

      res.json({ success: true, document });
    } catch (error) {
      res.status(500).json({ message: 'Failed to upload document' });
    }
  });

  app.get('/api/documents', authenticateToken, async (req: any, res) => {
    try {
      const { category } = req.query;

      // Mock documents for now
      const mockDocuments = [
        {
          id: '1',
          name: 'Certificate of Incorporation',
          type: 'application/pdf',
          size: 2457600,
          uploadedAt: '2024-01-10T10:30:00Z',
          status: 'verified',
          category: 'incorporation',
          url: '/documents/incorporation-certificate.pdf',
        },
        {
          id: '2',
          name: 'GST Certificate',
          type: 'application/pdf',
          size: 1843200,
          uploadedAt: '2024-01-12T14:20:00Z',
          status: 'verified',
          category: 'gst',
          url: '/documents/gst-certificate.pdf',
        },
        {
          id: '3',
          name: 'Bank Account Details',
          type: 'application/pdf',
          size: 1228800,
          uploadedAt: '2024-01-15T09:15:00Z',
          status: 'pending',
          category: 'banking',
          url: '/documents/bank-account.pdf',
        }
      ];

      let documents = mockDocuments;
      if (category) {
        documents = mockDocuments.filter(doc => doc.category === category);
      }

      res.json({ documents });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch documents' });
    }
  });

  app.get('/api/documents/:id/download', authenticateToken, async (req: any, res) => {
    try {
      const { id } = req.params;

      // Mock download - in production, serve actual file
      const mockDocument = {
        id,
        name: 'document.pdf',
        type: 'application/pdf',
      };

      // Create a mock PDF blob
      const mockPdfContent =
        '%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n>>\nendobj\n4 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 12 Tf\n72 720 Td\n(Hello World) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000204 00000 n \ntrailer\n<<\n/Size 5\n/Root 1 0 R\n>>\nstartxref\n297\n%%EOF';

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${mockDocument.name}"`);
      res.send(Buffer.from(mockPdfContent, 'utf8'));
    } catch (error) {
      res.status(500).json({ message: 'Failed to download document' });
    }
  });

  app.delete('/api/documents/:id', authenticateToken, async (req: any, res) => {
    try {
      const { id } = req.params;

      // In production, delete from database
      // await storage.deleteDocument(id, req.user.id);

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete document' });
    }
  });

  app.post('/api/documents/:id/verify', authenticateToken, async (req: any, res) => {
    try {
      const { id } = req.params;

      // In production, update document status in database
      // await storage.verifyDocument(id, req.user.id);

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: 'Failed to verify document' });
    }
  });

  app.get('/api/documents/categories', authenticateToken, async (req: any, res) => {
    try {
      const categories = [
        {
          id: 'incorporation',
          name: 'Incorporation Documents',
          description: 'Business registration and incorporation documents',
          required: true,
          acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
          maxSize: 10,
        },
        {
          id: 'gst',
          name: 'GST Documents',
          description: 'GST registration and compliance documents',
          required: true,
          acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
          maxSize: 10,
        },
        {
          id: 'banking',
          name: 'Banking Documents',
          description: 'Bank account and financial documents',
          required: true,
          acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
          maxSize: 5,
        },
        {
          id: 'compliance',
          name: 'Compliance Documents',
          description: 'Regulatory compliance and legal documents',
          required: false,
          acceptedTypes: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
          maxSize: 15,
        },
        {
          id: 'tax',
          name: 'Tax Documents',
          description: 'Tax filing and payment documents',
          required: false,
          acceptedTypes: ['.pdf', '.xlsx', '.xls', '.jpg', '.jpeg', '.png'],
          maxSize: 10,
        }
      ];

      res.json({ categories });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch document categories' });
    }
  });

  app.get('/api/documents/compliance-status', authenticateToken, async (req: any, res) => {
    try {
      // Mock compliance status
      const status = {
        overallProgress: 75,
        completedSteps: 3,
        totalSteps: 4,
        missingDocuments: ['Bank Account Details'],
      };

      res.json(status);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch compliance status' });
    }
  });

  // Access Token Management Routes
  app.post('/api/access-tokens', authenticateToken, async (req: any, res) => {
    try {
      // Only tier1 and tier2 users can create access tokens
      if (req.user.tier !== 'tier1' && req.user.tier !== 'tier2') {
        return res.status(403).json({ message: 'Insufficient permissions to create access tokens' });
      }

      const tokenData = createAccessTokenSchema.parse(req.body);

      // Validate modules
      const invalidModules = tokenData.modules.filter(module => !AVAILABLE_MODULES.includes(module as any));
      if (invalidModules.length > 0) {
        return res.status(400).json({
          message: `Invalid modules: ${invalidModules.join(', ')}`,
          availableModules: AVAILABLE_MODULES
        });
      }

      // Generate unique token
      const token = `at_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const accessToken = await storage.createAccessToken({
        ...tokenData,
        token,
        grantedBy: req.user.id,
      });

      res.json({
        success: true,
        accessToken: {
          id: accessToken.id,
          token: accessToken.token,
          modules: accessToken.modules,
          expiresAt: accessToken.expiresAt,
          maxUsage: accessToken.maxUsage,
          description: accessToken.description,
        }
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Failed to create access token' });
    }
  });

  app.post('/api/access-tokens/validate', async (req, res) => {
    try {
      const { token, module } = validateAccessTokenSchema.parse(req.body);

      const accessToken = await storage.validateAccessToken(token, module);

      if (!accessToken) {
        return res.status(403).json({ message: 'Invalid or expired access token' });
      }

      res.json({
        success: true,
        accessToken: {
          id: accessToken.id,
          modules: accessToken.modules,
          permissions: accessToken.permissions,
          expiresAt: accessToken.expiresAt,
          usageCount: accessToken.usageCount,
          maxUsage: accessToken.maxUsage,
        }
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Failed to validate access token' });
    }
  });

  app.get('/api/access-tokens', authenticateToken, async (req: any, res) => {
    try {
      // Only tier1 and tier2 users can view access tokens
      if (req.user.tier !== 'tier1' && req.user.tier !== 'tier2') {
        return res.status(403).json({ message: 'Insufficient permissions to view access tokens' });
      }

      const tokens = await storage.getAccessTokens(req.user.id);
      res.json({ tokens });
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Failed to fetch access tokens' });
    }
  });

  app.delete('/api/access-tokens/:id', authenticateToken, async (req: any, res) => {
    try {
      const { id } = req.params;

      // Only tier1 and tier2 users can delete access tokens
      if (req.user.tier !== 'tier1' && req.user.tier !== 'tier2') {
        return res.status(403).json({ message: 'Insufficient permissions to delete access tokens' });
      }

      await storage.deactivateAccessToken(id, req.user.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Failed to deactivate access token' });
    }
  });

  app.get('/api/modules', authenticateToken, async (req: any, res) => {
    try {
      res.json({
        modules: AVAILABLE_MODULES,
        userTier: req.user.tier
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Failed to fetch modules' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
