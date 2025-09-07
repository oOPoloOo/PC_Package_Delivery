export type Package = {
  id: string,
  senderName: string,
  recipientName: string,
  trackingNumber: string,
  currentStatus: string,
  packageCreatedAt: string
};

export type PackageContextType = {
   packages: Package[]; 
   fetchPackages?: () => void; 
   addPackage: (newPackage: Omit<Package, "id">) => Promise<{ error: string } | { success: string }>;
};

export type PackageContextReducerActions = 
{ type: 'setPackage', data: Package[] } |
{ type: 'addPackage', newPackage: Package };

export type ChildrenElementProp = { children: React.ReactElement };