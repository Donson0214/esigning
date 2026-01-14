declare global {
  namespace Express {
    interface Request {
      requestId?: string;
      correlationId?: string;
      user?: {
        id: string;
        email: string;
        role: string;
      };
      signer?: {
        id: string;
        email: string;
        documentId: string;
      };
    }
  }
}

export {};
