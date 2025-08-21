import { type User, type InsertUser, type ServicePackage, type InsertServicePackage, type Order, type InsertOrder, type Questionnaire, type InsertQuestionnaire, type Company, type InsertCompany, type Organization, type InsertOrganization } from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  getUsersByTier(tier: string): Promise<User[]>;
  getUsersByOrganization(organizationId: string): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Organizations
  getOrganization(id: string): Promise<Organization | undefined>;
  getOrganizations(): Promise<Organization[]>;
  getOrganizationsByOwner(ownerId: string): Promise<Organization[]>;
  createOrganization(organization: InsertOrganization): Promise<Organization>;
  updateOrganization(id: string, updates: Partial<Organization>): Promise<Organization | undefined>;

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

  // Companies (Legacy)
  getCompany(id: string): Promise<Company | undefined>;
  getCompanies(): Promise<Company[]>;
  getCompaniesByOwner(ownerId: string): Promise<Company[]>;
  createCompany(company: InsertCompany): Promise<Company>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private servicePackages: Map<string, ServicePackage>;
  private orders: Map<string, Order>;
  private questionnaires: Map<string, Questionnaire>;
  private companies: Map<string, Company>;
  private organizations: Map<string, Organization>;
  private initialized: boolean = false;

  constructor() {
    this.users = new Map();
    this.servicePackages = new Map();
    this.orders = new Map();
    this.questionnaires = new Map();
    this.companies = new Map();
    this.organizations = new Map();
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      await this.initializeData();
      this.initialized = true;
    }
  }

  private async initializeData() {
    // Create Tier 1 (Main/Admin) user
    const adminId = randomUUID();
    const adminUser: User = {
      id: adminId,
      username: "admin",
      email: "admin@bizhub.com",
      password: await bcrypt.hash("admin123", 10),
      fullName: "Admin User",
      role: "tier1",
      tier: "tier1",
      organizationId: null,
      parentUserId: null,
      permissions: { all: true },
      status: "active",
      createdAt: new Date(),
      lastLoginAt: null,
    };
    this.users.set(adminId, adminUser);

    // Create Tier 2 (Organization) user
    const orgId = randomUUID();
    const orgUser: User = {
      id: orgId,
      username: "techcorp",
      email: "admin@techcorp.com",
      password: await bcrypt.hash("techcorp123", 10),
      fullName: "TechCorp Solutions",
      role: "tier2",
      tier: "tier2",
      organizationId: null,
      parentUserId: null,
      permissions: { organization: true, employees: true, services: true },
      status: "active",
      createdAt: new Date(),
      lastLoginAt: null,
    };
    this.users.set(orgId, orgUser);

    // Create Tier 3 (Employee) user
    const employeeId = randomUUID();
    const employeeUser: User = {
      id: employeeId,
      username: "employee",
      email: "employee@techcorp.com",
      password: await bcrypt.hash("employee123", 10),
      fullName: "John Employee",
      role: "tier3",
      tier: "tier3",
      organizationId: orgId,
      parentUserId: orgId,
      permissions: { basic: true, limited: true },
      status: "active",
      createdAt: new Date(),
      lastLoginAt: null,
    };
    this.users.set(employeeId, employeeUser);
    console.log("Tier 1 (Admin) user created:", adminUser.username);
    console.log("Tier 2 (Organization) user created:", orgUser.username);
    console.log("Tier 3 (Employee) user created:", employeeUser.username);

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
    await this.ensureInitialized();
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    await this.ensureInitialized();
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    await this.ensureInitialized();
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    await this.ensureInitialized();
    const id = randomUUID();
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const user: User = {
      ...insertUser,
              role: insertUser.role || "tier3",
      id,
      password: hashedPassword,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    await this.ensureInitialized();
    return Array.from(this.users.values());
  }

  async getUsersByTier(tier: string): Promise<User[]> {
    await this.ensureInitialized();
    return Array.from(this.users.values()).filter(user => user.role === tier);
  }

  async getUsersByOrganization(organizationId: string): Promise<User[]> {
    await this.ensureInitialized();
    return Array.from(this.users.values()).filter(user => user.organizationId === organizationId);
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    await this.ensureInitialized();
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser: User = {
      ...user,
      ...updates,
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Organizations
  async getOrganization(id: string): Promise<Organization | undefined> {
    await this.ensureInitialized();
    return this.organizations.get(id);
  }

  async getOrganizations(): Promise<Organization[]> {
    await this.ensureInitialized();
    return Array.from(this.organizations.values()).sort((a, b) =>
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getOrganizationsByOwner(ownerId: string): Promise<Organization[]> {
    await this.ensureInitialized();
    return Array.from(this.organizations.values())
      .filter(o => o.ownerId === ownerId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createOrganization(organization: InsertOrganization): Promise<Organization> {
    await this.ensureInitialized();
    const id = randomUUID();
    const org: Organization = {
      ...organization,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.organizations.set(id, org);
    return org;
  }

  async updateOrganization(id: string, updates: Partial<Organization>): Promise<Organization | undefined> {
    await this.ensureInitialized();
    const org = this.organizations.get(id);
    if (!org) return undefined;

    const updatedOrg: Organization = {
      ...org,
      ...updates,
      updatedAt: new Date(),
    };
    this.organizations.set(id, updatedOrg);
    return updatedOrg;
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

  // Companies (Legacy)
  async getCompany(id: string): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values()).sort((a, b) =>
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getCompaniesByOwner(ownerId: string): Promise<Company[]> {
    return Array.from(this.companies.values())
      .filter(c => c.ownerId === ownerId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = randomUUID();
    const company: Company = {
      ...insertCompany,
      id,
      createdAt: new Date(),
    } as Company;
    this.companies.set(id, company);
    return company;
  }
}

export const storage = new MemStorage();
