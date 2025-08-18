import { type User, type InsertUser, type ServicePackage, type InsertServicePackage, type Order, type InsertOrder, type Questionnaire, type InsertQuestionnaire } from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Service Packages
  getAllServicePackages(): Promise<ServicePackage[]>;
  getServicePackage(id: string): Promise<ServicePackage | undefined>;
  createServicePackage(pkg: InsertServicePackage): Promise<ServicePackage>;
  
  // Orders
  getOrders(): Promise<Order[]>;
  getOrdersByUser(userId: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, status: string, notes?: string): Promise<Order | undefined>;
  
  // Questionnaires
  createQuestionnaire(questionnaire: InsertQuestionnaire): Promise<Questionnaire>;
  getQuestionnairesByUser(userId: string): Promise<Questionnaire[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private servicePackages: Map<string, ServicePackage>;
  private orders: Map<string, Order>;
  private questionnaires: Map<string, Questionnaire>;

  constructor() {
    this.users = new Map();
    this.servicePackages = new Map();
    this.orders = new Map();
    this.questionnaires = new Map();
    
    // Initialize with default admin user and service packages
    this.initializeData();
  }

  private async initializeData() {
    // Create admin user
    const adminId = randomUUID();
    const adminUser: User = {
      id: adminId,
      username: "admin",
      email: "admin@bizhub.com",
      password: await bcrypt.hash("admin123", 10),
      fullName: "Admin User",
      role: "admin",
      createdAt: new Date(),
    };
    this.users.set(adminId, adminUser);

    // Create default service packages
    const packages: ServicePackage[] = [
      {
        id: randomUUID(),
        name: "Sole Proprietorship",
        description: "Simple business structure for individual entrepreneurs",
        price: "2999",
        setupTime: "1-2 days",
        compliance: "Low",
        icon: "user",
        features: ["Easy setup", "Minimal compliance", "Direct tax benefits", "Full control"],
        popular: false,
      },
      {
        id: randomUUID(),
        name: "Partnership Firm",
        description: "Multiple partners sharing profits and responsibilities",
        price: "5999",
        setupTime: "3-5 days",
        compliance: "Medium",
        icon: "users",
        features: ["Shared responsibility", "Multiple skills", "Easy formation", "Tax benefits"],
        popular: false,
      },
      {
        id: randomUUID(),
        name: "Limited Liability Partnership",
        description: "Professional partnership with limited liability",
        price: "8999",
        setupTime: "7-10 days",
        compliance: "Medium",
        icon: "handshake",
        features: ["Limited liability", "Perpetual succession", "Professional management", "Tax advantages"],
        popular: false,
      },
      {
        id: randomUUID(),
        name: "One Person Company",
        description: "Corporate benefits for single entrepreneur",
        price: "12999",
        setupTime: "10-15 days",
        compliance: "High",
        icon: "user-tie",
        features: ["Limited liability", "Corporate benefits", "Perpetual succession", "Professional credibility"],
        popular: false,
      },
      {
        id: randomUUID(),
        name: "Private Limited Company",
        description: "Most preferred structure for startups and SMEs",
        price: "15999",
        setupTime: "12-20 days",
        compliance: "High",
        icon: "building",
        features: ["Limited liability", "Easy fundraising", "Professional credibility", "Tax benefits"],
        popular: true,
      },
      {
        id: randomUUID(),
        name: "Public Limited Company",
        description: "Large scale operations and public investment",
        price: "25999",
        setupTime: "20-30 days",
        compliance: "Very High",
        icon: "chart-line",
        features: ["Public investment", "Large scale operations", "High credibility", "Stock exchange listing"],
        popular: false,
      },
    ];

    packages.forEach(pkg => {
      this.servicePackages.set(pkg.id, pkg);
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const user: User = { 
      ...insertUser,
      role: insertUser.role || "customer",
      id, 
      password: hashedPassword,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Service Packages
  async getAllServicePackages(): Promise<ServicePackage[]> {
    return Array.from(this.servicePackages.values());
  }

  async getServicePackage(id: string): Promise<ServicePackage | undefined> {
    return this.servicePackages.get(id);
  }

  async createServicePackage(pkg: InsertServicePackage): Promise<ServicePackage> {
    const id = randomUUID();
    const servicePackage: ServicePackage = { 
      ...pkg, 
      id,
      popular: pkg.popular || false,
    };
    this.servicePackages.set(id, servicePackage);
    return servicePackage;
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(order => order.userId === userId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder,
      status: insertOrder.status || "pending",
      id, 
      createdAt: new Date(),
      completedAt: null,
      notes: insertOrder.notes || null,
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: string, status: string, notes?: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    const updatedOrder: Order = {
      ...order,
      status,
      notes: notes || order.notes,
      completedAt: status === 'completed' ? new Date() : order.completedAt,
    };
    
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Questionnaires
  async createQuestionnaire(insertQuestionnaire: InsertQuestionnaire): Promise<Questionnaire> {
    const id = randomUUID();
    const questionnaire: Questionnaire = { 
      ...insertQuestionnaire,
      userId: insertQuestionnaire.userId || null,
      recommendation: insertQuestionnaire.recommendation || null,
      id, 
      createdAt: new Date(),
    };
    this.questionnaires.set(id, questionnaire);
    return questionnaire;
  }

  async getQuestionnairesByUser(userId: string): Promise<Questionnaire[]> {
    return Array.from(this.questionnaires.values())
      .filter(q => q.userId === userId);
  }
}

export const storage = new MemStorage();
