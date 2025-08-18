# Dynamic Business Solutions Platform

## Overview

A comprehensive business solutions platform that serves as a one-stop hub for entrepreneurs and companies looking to incorporate their businesses. The platform provides guided package selection, order management, and administrative oversight for business registration services including company incorporation, GST registration, tax filing, and legal compliance services.

The application follows a modern full-stack architecture with a React TypeScript frontend, Express.js backend, and PostgreSQL database using Drizzle ORM for data management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Styling**: TailwindCSS with Radix UI components for consistent design system
- **State Management**: TanStack Query for server state and local React state for UI state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Authentication**: JWT-based authentication with bcrypt for password hashing
- **API Design**: RESTful API with role-based access control (customer/admin)
- **Error Handling**: Centralized error handling middleware
- **Logging**: Request/response logging with performance metrics

### Database Design
- **Database**: PostgreSQL with Drizzle ORM
- **Connection**: Neon Database serverless driver
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Data Models**: 
  - Users (customers and administrators)
  - Service packages (different business incorporation types)
  - Orders (linking users to selected packages)
  - Questionnaires (for personalized recommendations)

### Key Features
- **Service Package Management**: Pre-configured business incorporation packages with pricing and features
- **Interactive Questionnaire**: Guided recommendation system based on business requirements
- **Order Management**: Complete order lifecycle from placement to completion with status tracking
- **Role-Based Access**: Separate interfaces for customers and administrators
- **Responsive Design**: Mobile-first approach with progressive enhancement

### Development Tools
- **Package Management**: npm with package-lock.json for dependency consistency
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Build Process**: Separate build configurations for client and server with esbuild
- **Development Server**: Vite dev server with HMR and Express API proxy

## External Dependencies

### Database Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations and schema management
- **connect-pg-simple**: Session store for PostgreSQL

### Authentication & Security
- **bcrypt**: Password hashing and verification
- **jsonwebtoken**: JWT token generation and verification
- **Session Management**: Express sessions with secure cookie handling

### UI Component System
- **Radix UI**: Accessible, unstyled UI primitives for complex components
- **TailwindCSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Consistent icon library
- **class-variance-authority**: Type-safe CSS class variant management

### Development & Build Tools
- **Vite**: Frontend build tool with plugins for React and development enhancements
- **tsx**: TypeScript execution for Node.js development
- **esbuild**: Fast JavaScript bundler for production server builds
- **PostCSS**: CSS processing with Autoprefixer

### Data Management
- **TanStack Query**: Server state synchronization and caching
- **React Hook Form**: Form state management with validation
- **Zod**: Runtime type validation and schema definition
- **date-fns**: Date manipulation and formatting utilities