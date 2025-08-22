# BizFlow - Business Solutions Platform

A comprehensive business solutions platform that serves as a one-stop hub for entrepreneurs, providing business incorporation, compliance management, financial tools, and growth solutions.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BizFlow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - **Local Development**: http://localhost:3000
   - **Production**: Configure your deployment platform

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Database (Optional - uses in-memory storage by default)
DATABASE_URL=postgresql://username:password@localhost:5432/bizhub

# Email Configuration (for production)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### OAuth Configuration (Optional)

To enable Google and Apple Sign-In, create a `.env` file in the `client/` directory:

```env
# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
VITE_GOOGLE_REDIRECT_URI=http://localhost:3002/auth/google/callback

# Apple OAuth Configuration
VITE_APPLE_CLIENT_ID=your-apple-client-id-here
VITE_APPLE_REDIRECT_URI=http://localhost:3002/auth/apple/callback
```

**To get Google OAuth credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API and Google Identity Services
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set Application Type to "Web application"
6. Add authorized origins: `http://localhost:3002`
7. Add authorized redirect URIs: `http://localhost:3002/auth/google/callback`
8. Copy the Client ID to your `client/.env` file

**To get Apple OAuth credentials:**
1. Go to [Apple Developer Console](https://developer.apple.com/)
2. Create a new App ID or select existing one
3. Enable "Sign In with Apple" capability
4. Go to Certificates, Identifiers & Profiles → Identifiers
5. Create a new Services ID for web authentication
6. Add Domains and Subdomains: `localhost`
7. Add Return URLs: `http://localhost:3002/auth/apple/callback`
8. Copy the Services ID to your `client/.env` file as `VITE_APPLE_CLIENT_ID`

## 👤 Demo Credentials

### Platform Administrator (Tier 1)
- **Username**: `admin`
- **Password**: `admin123`
- **Access**: Full platform control, user management, organization management, system settings
- **Role**: Platform Administrator

### Organization (Tier 2)
- **Username**: `techcorp`
- **Password**: `techcorp123`
- **Access**: Business organization management, employee management, services
- **Role**: Organization

### Employee (Tier 3)
- **Username**: `employee`
- **Password**: `employee123`
- **Access**: Individual employee workspace, assigned modules, personal tasks
- **Role**: Employee

## 📁 Project Structure

```
BizFlow/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and services
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express server
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Data storage layer
│   └── vite.ts           # Vite development setup
├── shared/                # Shared schemas and types
└── dist/                  # Production build output
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run check        # TypeScript type checking

# Database (if using PostgreSQL)
npm run db:push      # Push schema changes to database

# Setup
npm run setup        # Run setup script (chmod +x setup.sh && ./setup.sh)
```

## ✨ Platform Features

### 🏢 **Business Solutions & Services**

#### **Business Incorporation**
- **Sole Proprietorship**: Individual business setup
- **Partnership Firm**: Multi-partner business structure
- **Limited Liability Partnership (LLP)**: Hybrid business structure
- **One Person Company (OPC)**: Single-person corporate entity
- **Private Limited Company**: Corporate business structure
- **Public Limited Company**: Publicly traded company setup

#### **Compliance & Legal Services**
- **GST Registration**: Goods and Services Tax compliance
- **PAN & TAN Registration**: Tax identification numbers
- **PF & ESI Registration**: Employee benefit compliance
- **ROC Filings**: Registrar of Companies compliance
- **Labour Law Compliance**: Employment regulation adherence
- **Trademark Registration**: Intellectual property protection
- **License Management**: Business permit management
- **Document Management**: Upload, organize, and track compliance documents
- **Compliance Calendar**: Automated reminders and deadline tracking
- **Compliance Reports**: Generate and export compliance status reports

#### **Business Management Tools**
- **CRM System**: Customer relationship management
- **HRMS**: Human resource management system
- **Accounting Software**: Financial management tools
- **Inventory Management**: Stock and supply tracking
- **Project Management**: Task and workflow management

#### **Banking & Finance**
- **Current Account Setup**: Business banking solutions
- **UPI Integration**: Digital payment systems
- **Loan Management**: Business financing options
- **Investor Connect**: Funding and investment opportunities
- **Financial Planning**: Business financial strategy
- **Invoice Management**: Create, manage, and track professional invoices
- **Advanced Invoice Designer**: Customizable invoice templates with branding
- **Multi-Format Export**: PDF and Excel export options
- **Expense Tracking**: Categorize and monitor business expenses
- **Financial Reports**: Comprehensive financial analytics and reporting
- **Bank Account Integration**: Connect and manage multiple bank accounts
- **Tax Management**: Tax calculation and filing assistance

#### **Growth & Marketing**
- **Website Builder**: Drag-and-drop website creation
- **SEO Tools**: Search engine optimization
- **E-commerce Setup**: Online store configuration
- **Social Media Marketing**: Social platform management
- **Email Marketing**: Campaign and automation tools

### 👥 **User Management System**

#### **Three-Tier User Architecture**
- **Tier 1 (Platform Admin)**: Full platform control and management
- **Tier 2 (Organizations)**: Business organization management
- **Tier 3 (Employees)**: Individual employee access and tools

#### **Role-Based Access Control**
- **Admin Dashboard**: Platform overview, user management, analytics
- **Organization Dashboard**: Business tools, employee management
- **Employee Dashboard**: Task management, personal workspace

#### **Authentication & Security**
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt encryption for user passwords
- **Session Management**: Secure user session handling
- **Permission System**: Granular access control

### 🎨 **User Interface & Experience**

#### **Modern Design System**
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Responsive Design**: Mobile-first responsive layout
- **Dark/Light Themes**: Customizable visual themes

#### **Component Library**
- **Reusable UI Components**: Button, Card, Input, Modal, etc.
- **Form Components**: Validation, error handling, submission
- **Navigation Components**: Sidebar, header, breadcrumbs
- **Data Display**: Tables, charts, progress indicators

#### **Dashboard Features**
- **Customizable Layouts**: Tier-specific dashboard views
- **Real-time Updates**: Live data synchronization
- **Interactive Elements**: Hover effects, animations
- **Mobile Optimization**: Touch-friendly interface

### 📊 **Business Intelligence & Analytics**

#### **Dashboard Analytics**
- **Business Metrics**: Revenue, growth, performance tracking
- **Compliance Calendar**: Deadline tracking and reminders
- **Financial Overview**: Income, expenses, profit analysis
- **Employee Performance**: Productivity and efficiency metrics

#### **Reporting System**
- **Custom Reports**: Configurable business reports
- **Data Export**: CSV, PDF export capabilities
- **Visual Charts**: Interactive data visualization
- **Trend Analysis**: Historical data analysis

### 🔔 **Communication & Notifications**

#### **Notification System**
- **In-App Notifications**: Real-time platform alerts
- **Email Notifications**: Automated email communications
- **Push Notifications**: Browser push notification support
- **SMS Alerts**: Text message notifications (future)

#### **Communication Tools**
- **Internal Messaging**: Team communication platform
- **File Sharing**: Document and resource sharing
- **Comment System**: Collaborative feedback and discussion
- **Announcement Board**: Company-wide communications

### 🛍️ **Service Marketplace**

#### **Service Discovery**
- **Service Categories**: Organized business service listings
- **Provider Directory**: Verified service provider profiles
- **Review System**: User ratings and feedback
- **Pricing Comparison**: Service cost analysis

#### **Service Management**
- **Service Activation**: Enable/disable business modules
- **Customization**: Tailored service configurations
- **Integration**: Third-party service connections
- **Support**: Service-specific help and guidance

### 📚 **Knowledge & Learning**

#### **Knowledge Hub**
- **Business Guides**: Step-by-step business setup guides
- **Compliance Manuals**: Regulatory requirement documentation
- **Best Practices**: Industry-standard business practices
- **Video Tutorials**: Interactive learning content

#### **Community Features**
- **Discussion Forums**: Business community discussions
- **Expert Q&A**: Professional advice and consultation
- **Success Stories**: Entrepreneur case studies
- **Networking**: Business connection opportunities

### 🔧 **Technical Features**

#### **Development & Deployment**
- **TypeScript**: Type-safe development environment
- **React 18**: Modern React with hooks and context
- **Vite**: Fast build tool and development server
- **Express.js**: Robust backend API framework

#### **Data Management**
- **In-Memory Storage**: Fast local development storage
- **PostgreSQL Support**: Production-ready database
- **Data Validation**: Zod schema validation
- **API Management**: RESTful API endpoints
- **Local Storage Integration**: Persistent data storage for invoices and documents
- **File Upload System**: Secure document and image upload capabilities
- **Search & Filter**: Advanced search functionality across all data
- **Data Export**: Multiple format export (PDF, Excel, JSON)

#### **Security Features**
- **Input Validation**: Comprehensive data sanitization
- **CORS Protection**: Cross-origin request security
- **Rate Limiting**: API abuse prevention
- **Error Handling**: Graceful error management

### 🚀 **Future Roadmap**

#### **AI & Automation**
- **AI Business Assistant**: Intelligent business guidance
- **Automated Compliance**: AI-powered compliance management
- **Smart Recommendations**: Personalized service suggestions
- **Predictive Analytics**: Business trend forecasting

#### **Advanced Integrations**
- **Payment Gateways**: Razorpay, Stripe integration
- **Banking APIs**: Direct bank account integration
- **Government Portals**: Official compliance portal integration
- **Third-party Services**: CRM, accounting software connections

#### **Mobile Applications**
- **iOS App**: Native iOS application
- **Android App**: Native Android application
- **PWA Support**: Progressive web app capabilities
- **Offline Functionality**: Offline data access

### 📱 **Platform Coverage**

#### **Business Lifecycle Support**
- **Startup Phase**: Business registration and setup
- **Growth Phase**: Scaling and expansion tools
- **Mature Phase**: Optimization and compliance management
- **Exit Phase**: Business transition and succession planning

#### **Industry Support**
- **Technology**: Software and IT services
- **Manufacturing**: Production and operations
- **Retail**: Sales and customer management
- **Services**: Professional and consulting services
- **Healthcare**: Medical and wellness businesses
- **Education**: Training and educational institutions

## 🌐 Application Features

> 📖 **For a complete list of all features, see [FEATURES.md](./FEATURES.md)**

### 🆕 **Recently Added Features**

#### **Advanced Invoice Designer (Tier 1 & 2 Users)**
- **Custom Branding**: Upload company logos and custom images
- **Header & Footer Customization**: Custom text, colors, and images
- **Template System**: Modern, Classic, and Minimal invoice templates
- **Real-time Preview**: Live preview of all customizations
- **Professional Export**: High-quality PDF and Excel output

#### **Enhanced Document Management**
- **Drag & Drop Upload**: Intuitive file upload interface
- **Document Categories**: Organized document organization
- **Compliance Tracking**: Automated compliance status monitoring
- **Search & Filter**: Advanced document search capabilities
- **Bulk Operations**: Multiple document management

#### **Financial Management System**
- **Invoice Creation**: Professional invoice generation
- **Expense Tracking**: Categorized expense management
- **Bank Integration**: Multiple bank account management
- **Financial Reports**: Comprehensive financial analytics
- **Multi-Format Export**: PDF, Excel, and JSON export options

#### **Advanced Search & Storage**
- **Real-time Search**: Instant search across all data
- **Persistent Storage**: Local storage for data persistence
- **Smart Filtering**: Intelligent data filtering and organization
- **Export Capabilities**: Bulk export and individual export options

### Authentication & Security
- **Multi-tier User System**: Platform Admin, Organization, Employee roles
- **Google OAuth Integration**: One-click signup with Google accounts
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for each user tier
- **Secure Password Handling**: bcrypt hashing for password security

### Public Pages
- **Home** (`/`) - Landing page with hero banner and service overview
- **Services** (`/services`) - Complete service catalog
- **Contact** (`/contact`) - Contact form and company information
- **Documentation** (`/docs`) - API docs and guides
- **Status** (`/status`) - System status and uptime
- **Legal Pages** - Privacy Policy, Terms of Service, Cookie Policy

### User Dashboard (Post-Login)
- **Dashboard** (`/dashboard`) - Overview with quick stats and actions
- **Business Setup & Compliance** (`/compliance`) - Setup checklist and document management
- **Finance & Accounting** (`/finance`) - Invoice management and expense tracking
- **Branding & Identity** (`/branding`) - Logo generator and brand kit
- **Marketing & Sales** (`/marketing`) - Campaigns and CRM
- **Graphic & Content Services** (`/graphic-services`) - Design tools and content creation
- **HR & Team** (`/tools`) - Employee management and payroll
- **Knowledge Hub** (`/knowledge-hub`) - Articles, guides, and tutorials
- **Community** (`/community`) - Forum and expert connections
- **Marketplace** (`/marketplace`) - Service providers and add-ons

### User Journey Pages
- **Setup** (`/setup`) - Initial module selection
- **Store** (`/store`) - Browse and activate additional modules
- **Workflow** (`/workflow`) - Guided step-by-step process

### Service-Specific Pages
- **Company Registration** (`/company-registration`)
- **GST Registration** (`/gst-registration`)
- **Tax Filing** (`/tax-filing`)
- **Business Incorporation** (`/incorporation`)

### Admin Panel
- **Admin** (`/admin`) - User management, order tracking, system stats

## 🔌 API Endpoints

### Authentication
```bash
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/auth/me          # Get current user
```

### Service Packages
```bash
GET /api/packages          # List all service packages
GET /api/packages/:id      # Get specific package
```

### Orders
```bash
GET    /api/orders         # List user orders
POST   /api/orders         # Create new order
PATCH  /api/orders/:id/status  # Update order status (admin only)
```

### Companies
```bash
GET  /api/companies        # List user companies
POST /api/companies        # Create new company
```

### Questionnaires
```bash
GET  /api/questionnaire    # Get user questionnaire
POST /api/questionnaire    # Submit questionnaire
```

### Admin (Admin only)
```bash
GET /api/admin/stats       # System statistics
```

### Documents & Compliance
```bash
GET    /api/documents              # List user documents
POST   /api/documents/upload       # Upload new document
GET    /api/documents/:id          # Get specific document
GET    /api/documents/:id/download # Download document
DELETE /api/documents/:id          # Delete document
POST   /api/documents/:id/verify   # Verify document
GET    /api/documents/categories   # Get document categories
GET    /api/documents/compliance-status # Get compliance status
```

### Finance & Invoices
```bash
GET    /api/invoices               # List user invoices
POST   /api/invoices               # Create new invoice
GET    /api/invoices/:id           # Get specific invoice
PATCH  /api/invoices/:id/status    # Update invoice status
DELETE /api/invoices/:id           # Delete invoice
POST   /api/invoices/:id/export    # Export invoice (PDF/Excel)
```

### Debug (Development)
```bash
GET /api/debug/users       # List all users (remove in production)
```

## 🚀 Deployment Checklist

### ✅ Pre-Deployment
- [x] All routes are functional and tested
- [x] Authentication system working
- [x] Database schema defined
- [x] Environment variables configured
- [x] Error handling implemented
- [x] Security measures in place
- [x] All pages have proper layouts
- [x] Footer links working
- [x] Legal pages created
- [x] Contact and support pages ready

### 🔧 Production Setup
- [ ] Set `NODE_ENV=production`
- [ ] Configure production database
- [ ] Set secure `JWT_SECRET`
- [ ] Configure email services
- [ ] Set up SSL/HTTPS
- [ ] Configure CDN for static assets
- [ ] Set up monitoring and logging
- [ ] Configure backup systems

### 🛡️ Security Checklist
- [x] JWT authentication implemented
- [x] Password hashing with bcrypt
- [x] Input validation with Zod schemas
- [x] CORS configuration
- [x] Rate limiting (to be implemented)
- [x] SQL injection protection
- [x] XSS protection
- [ ] CSRF protection (to be implemented)

### 📱 Performance Optimization
- [x] React components optimized
- [x] Lazy loading for routes
- [x] Image optimization
- [ ] Code splitting (to be implemented)
- [ ] Caching strategies (to be implemented)
- [ ] Database query optimization

## 🐛 Troubleshooting

### Port Conflicts
If you encounter port conflicts (especially on macOS with port 5000):
```bash
# Use a different port
PORT=3001 npm run dev
```

### Login Issues
If login doesn't work:
1. Check server logs for initialization messages
2. Verify users exist: `curl http://localhost:3002/api/debug/users`
3. Test login API directly: `curl -X POST http://localhost:3002/api/auth/login -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}'`

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run check
```

## 📞 Support

- **Email**: support@bizhub.com
- **Phone**: +91 9876543210
- **Documentation**: `/docs`
- **Status Page**: `/status`

## 📄 License

This project is proprietary software. All rights reserved.

---

**BizHub** - Your trusted partner for business incorporation and compliance solutions.
