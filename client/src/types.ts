export type Package = {
  id: string,
  senderName: string,
  recipientName: string,
  trackingNumber: string,
  currentStatus: string,
  packageCreatedAt: string
};

export type CreatePackageRequest = {
  SenderName: string;
  SenderAddress: string;
  SenderPhone: string;
  RecipientName: string;
  RecipientAddress: string;
  RecipientPhone: string;
};

export type PackageContextType = {
   packages: Package[]; 
   fetchPackages?: () => void; 
   addPackage: (newPackage: CreatePackageRequest) => Promise<{ error: string } | { success: string }>;
};

export type PackageContextReducerActions = 
{ type: 'setPackage', data: Package[] } |
{ type: 'addPackage', newPackage: Package };

export type PackageStatus =
| "Created"  | "Sent"   | "Returned"  
| "Accepted" | "Cancelled";

export type ChildrenElementProp = { children: React.ReactElement };