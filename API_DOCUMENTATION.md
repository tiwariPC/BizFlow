# BizHub API Documentation

## Overview

The BizHub API provides a comprehensive set of endpoints for business management, compliance tracking, financial management, and user administration. The API follows RESTful principles and uses JWT authentication for security.

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://your-domain.com`

## Authentication

All API endpoints (except public ones) require authentication using JWT tokens.

### Headers
```http
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

### Getting a Token
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "your-username",
  "password": "your-password"
}
```

## API Endpoints

### Authentication

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "fullName": "string",
  "role": "admin|tier2|tier3"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "fullName": "string",
    "role": "string"
  },
  "token": "string"
}
```

#### POST /api/auth/login
Authenticate user and get access token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "fullName": "string",
    "role": "string"
  },
  "token": "string"
}
```

#### GET /api/auth/me
Get current user information.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "fullName": "string",
  "role": "string"
}
```

### Service Packages

#### GET /api/packages
Get all available service packages.

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "features": ["string"],
    "setupTime": "string"
  }
]
```

#### GET /api/packages/:id
Get specific service package details.

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "features": ["string"],
  "setupTime": "string",
  "requirements": ["string"]
}
```

### Orders

#### GET /api/orders
Get user orders (requires authentication).

**Headers:**
```http
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "string",
    "packageId": "string",
    "status": "pending|processing|completed|cancelled",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

#### POST /api/orders
Create new order (requires authentication).

**Request Body:**
```json
{
  "packageId": "string",
  "requirements": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "packageId": "string",
  "status": "pending",
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### PATCH /api/orders/:id/status
Update order status (admin only).

**Request Body:**
```json
{
  "status": "pending|processing|completed|cancelled"
}
```

### Documents & Compliance

#### GET /api/documents
Get user documents (requires authentication).

**Headers:**
```http
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "category": "string",
    "status": "pending|verified|rejected",
    "uploadedAt": "string",
    "size": "number",
    "type": "string"
  }
]
```

#### POST /api/documents/upload
Upload new document (requires authentication).

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: Document file
- `category`: Document category
- `description`: Document description

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "category": "string",
  "status": "pending",
  "uploadedAt": "string",
  "size": "number",
  "type": "string"
}
```

#### GET /api/documents/:id
Get specific document details.

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "category": "string",
  "status": "pending|verified|rejected",
  "uploadedAt": "string",
  "size": "number",
  "type": "string",
  "description": "string"
}
```

#### GET /api/documents/:id/download
Download document file.

**Response:** File download

#### DELETE /api/documents/:id
Delete document (requires authentication).

**Response:**
```json
{
  "message": "Document deleted successfully"
}
```

#### POST /api/documents/:id/verify
Verify document (admin only).

**Request Body:**
```json
{
  "status": "verified|rejected",
  "notes": "string"
}
```

#### GET /api/documents/categories
Get available document categories.

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "required": "boolean"
  }
]
```

#### GET /api/documents/compliance-status
Get user compliance status.

**Response:**
```json
{
  "overallProgress": "number",
  "completedSteps": "number",
  "totalSteps": "number",
  "missingDocuments": ["string"],
  "nextDeadlines": ["string"]
}
```

### Finance & Invoices

#### GET /api/invoices
Get user invoices (requires authentication).

**Headers:**
```http
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "string",
    "client": "string",
    "amount": "number",
    "status": "pending|paid|overdue",
    "dueDate": "string",
    "issueDate": "string",
    "description": "string",
    "items": [
      {
        "description": "string",
        "quantity": "number",
        "rate": "number",
        "amount": "number"
      }
    ]
  }
]
```

#### POST /api/invoices
Create new invoice (requires authentication).

**Request Body:**
```json
{
  "client": "string",
  "amount": "number",
  "dueDate": "string",
  "description": "string",
  "items": [
    {
      "description": "string",
      "quantity": "number",
      "rate": "number"
    }
  ]
}
```

**Response:**
```json
{
  "id": "string",
  "client": "string",
  "amount": "number",
  "status": "pending",
  "dueDate": "string",
  "issueDate": "string",
  "description": "string",
  "items": [
    {
      "description": "string",
      "quantity": "number",
      "rate": "number",
      "amount": "number"
    }
  ]
}
```

#### GET /api/invoices/:id
Get specific invoice details.

**Response:**
```json
{
  "id": "string",
  "client": "string",
  "amount": "number",
  "status": "pending|paid|overdue",
  "dueDate": "string",
  "issueDate": "string",
  "description": "string",
  "items": [
    {
      "description": "string",
      "quantity": "number",
      "rate": "number",
      "amount": "number"
    }
  ]
}
```

#### PATCH /api/invoices/:id/status
Update invoice status.

**Request Body:**
```json
{
  "status": "pending|paid|overdue"
}
```

#### DELETE /api/invoices/:id
Delete invoice (requires authentication).

**Response:**
```json
{
  "message": "Invoice deleted successfully"
}
```

#### POST /api/invoices/:id/export
Export invoice in specified format.

**Request Body:**
```json
{
  "format": "pdf|excel"
}
```

**Response:** File download

### Admin Endpoints

#### GET /api/admin/stats
Get system statistics (admin only).

**Response:**
```json
{
  "totalUsers": "number",
  "totalOrders": "number",
  "totalRevenue": "number",
  "activeUsers": "number",
  "systemStatus": "healthy|warning|error"
}
```

#### GET /api/admin/users
Get all users (admin only).

**Response:**
```json
[
  {
    "id": "string",
    "username": "string",
    "email": "string",
    "fullName": "string",
    "role": "string",
    "createdAt": "string",
    "lastLogin": "string"
  }
]
```

#### PATCH /api/admin/users/:id
Update user role (admin only).

**Request Body:**
```json
{
  "role": "admin|tier2|tier3"
}
```

### System Endpoints

#### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "string",
  "version": "string"
}
```

#### GET /api/status
System status information.

**Response:**
```json
{
  "status": "operational|degraded|down",
  "uptime": "string",
  "version": "string",
  "lastUpdate": "string"
}
```

## Error Handling

The API uses standard HTTP status codes and returns error messages in JSON format.

### Error Response Format
```json
{
  "error": "string",
  "message": "string",
  "statusCode": "number"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### Example Error Response
```json
{
  "error": "ValidationError",
  "message": "Invalid input data",
  "statusCode": 400,
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- **Authentication endpoints**: 5 requests per minute
- **General endpoints**: 100 requests per minute
- **File upload endpoints**: 10 requests per minute

## File Upload Limits

- **Maximum file size**: 10MB
- **Allowed file types**: PDF, DOC, DOCX, JPG, PNG, GIF
- **Maximum files per request**: 5

## Pagination

List endpoints support pagination using query parameters:

```
GET /api/invoices?page=1&limit=10&sort=createdAt&order=desc
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `sort`: Sort field (default: createdAt)
- `order`: Sort order (asc|desc, default: desc)

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Filtering and Search

Many endpoints support filtering and search:

```
GET /api/invoices?status=pending&client=techcorp&search=web
```

**Common Filter Parameters:**
- `status`: Filter by status
- `category`: Filter by category
- `dateFrom`: Filter from date
- `dateTo`: Filter to date
- `search`: Search in text fields

## Webhooks

The API supports webhooks for real-time notifications:

### Webhook Configuration
```json
{
  "url": "https://your-domain.com/webhook",
  "events": ["invoice.created", "document.verified"],
  "secret": "webhook-secret-key"
}
```

### Webhook Payload
```json
{
  "event": "invoice.created",
  "timestamp": "string",
  "data": {
    "invoiceId": "string",
    "client": "string",
    "amount": "number"
  },
  "signature": "string"
}
```

## SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install @bizhub/api-client
```

```typescript
import { BizHubClient } from '@bizhub/api-client';

const client = new BizHubClient({
  baseUrl: 'https://api.bizhub.com',
  apiKey: 'your-api-key'
});

const invoices = await client.invoices.list();
```

### Python
```bash
pip install bizhub-python
```

```python
from bizhub import BizHubClient

client = BizHubClient(
    base_url="https://api.bizhub.com",
    api_key="your-api-key"
)

invoices = client.invoices.list()
```

## Support

For API support and questions:
- **Email**: api-support@bizhub.com
- **Documentation**: https://docs.bizhub.com/api
- **Status Page**: https://status.bizhub.com
- **Community**: https://community.bizhub.com

---

*This API documentation is maintained by the BizHub development team and updated with each release.*

