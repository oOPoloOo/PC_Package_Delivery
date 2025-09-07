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
};

export type PackageContextReducerActions = 
{ type: 'setPackage', data: Package[] };

export type ChildrenElementProp = { children: React.ReactElement };