// global.d.ts
declare global {
    // Extend the globalThis interface
    var mongoose: {
      conn: any;
      promise: Promise<any> | null;
    } | undefined;
  }
  
  export {};
  