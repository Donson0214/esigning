declare global {
  namespace Express {
    interface Request {
      requestId?: string;
<<<<<<< HEAD
=======
      correlationId?: string;
>>>>>>> e054afa1 (Save 1)
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
