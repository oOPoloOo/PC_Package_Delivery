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
};