import { Express,Request } from "express";
export {};

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
    export interface Response{
      userId?:string;
    }
  }
}
// This is a declaration file for Express Request and Response objects. It adds a userId property to both Request and Response objects. This is a global declaration file, so it can be used anywhere in the project