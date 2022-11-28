declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: "mongodb+srv://app:DU84LXE88iNKbhhv@snac.cry4ako.mongodb.net/?retryWrites=true&w=majority";
      PORT: "3001";
      JWT_SECRET: "938ntmnet489wnne#@$Bftm8347nulwp@#$p8fmturln%$";
    }
  }
}
export {};
