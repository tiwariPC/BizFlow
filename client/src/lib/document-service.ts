export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  status: 'pending' | 'verified' | 'rejected';
  category: string;
  url?: string;
  metadata?: Record<string, any>;
}

export interface UploadResponse {
  success: boolean;
  document?: Document;
  error?: string;
}

export interface DocumentCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  acceptedTypes: string[];
  maxSize: number; // in MB
}

export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
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
  },
];

class DocumentService {
  private baseUrl = '/api/documents';

  async uploadDocument(
    file: File,
    category: string,
    metadata?: Record<string, any>,
  ): Promise<UploadResponse> {
    try {
      // For now, simulate upload since we don't have actual file upload middleware
      // In production, you'd use FormData with multer on the backend
      const document: Document = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        status: 'pending',
        category,
        url: `/documents/${file.name}`,
        metadata: metadata || {},
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      return { success: true, document };
    } catch (error) {
      console.error('Document upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  async getDocuments(category?: string): Promise<Document[]> {
    try {
      const url = category
        ? `${this.baseUrl}?category=${encodeURIComponent(category)}`
        : this.baseUrl;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch documents: ${response.statusText}`);
      }

      const result = await response.json();
      return result.documents || [];
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  }

  async downloadDocument(documentId: string): Promise<Blob | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${documentId}/download`);

      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Document download error:', error);
      return null;
    }
  }

  async deleteDocument(documentId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${documentId}`, {
        method: 'DELETE',
      });

      return response.ok;
    } catch (error) {
      console.error('Document deletion error:', error);
      return false;
    }
  }

  async verifyDocument(documentId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${documentId}/verify`, {
        method: 'POST',
      });

      return response.ok;
    } catch (error) {
      console.error('Document verification error:', error);
      return false;
    }
  }

  async getDocumentCategories(): Promise<DocumentCategory[]> {
    try {
      const response = await fetch(`${this.baseUrl}/categories`);

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const result = await response.json();
      return result.categories || DOCUMENT_CATEGORIES;
    } catch (error) {
      console.error('Error fetching document categories:', error);
      return DOCUMENT_CATEGORIES; // Fallback to default categories
    }
  }

  async getComplianceStatus(): Promise<{
    overallProgress: number;
    completedSteps: number;
    totalSteps: number;
    missingDocuments: string[];
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/compliance-status`);

      if (!response.ok) {
        throw new Error(`Failed to fetch compliance status: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching compliance status:', error);
      return {
        overallProgress: 0,
        completedSteps: 0,
        totalSteps: 0,
        missingDocuments: [],
      };
    }
  }

  // Utility methods
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFileIcon(fileType: string): string {
    if (fileType.startsWith('image/')) {
      return '🖼️';
    }
    if (fileType.includes('pdf')) {
      return '📄';
    }
    if (fileType.includes('word') || fileType.includes('document')) {
      return '📝';
    }
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
      return '📊';
    }
    return '📁';
  }

  validateFile(file: File, category: DocumentCategory): string | null {
    // Check file size
    if (file.size > category.maxSize * 1024 * 1024) {
      return `File size must be less than ${category.maxSize}MB`;
    }

    // Check file type
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    const isAccepted = category.acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return fileExtension === type;
      }
      return file.type.match(new RegExp(type.replace('*', '.*')));
    });

    if (!isAccepted) {
      return `File type not supported. Accepted types: ${category.acceptedTypes.join(', ')}`;
    }

    return null;
  }

  // Mock data for development/testing
  getMockDocuments(): Document[] {
    return [
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
      },
      {
        id: '4',
        name: 'PAN Card',
        type: 'image/jpeg',
        size: 512000,
        uploadedAt: '2024-01-08T16:45:00Z',
        status: 'verified',
        category: 'incorporation',
        url: '/documents/pan-card.jpg',
      },
    ];
  }
}

export const documentService = new DocumentService();
