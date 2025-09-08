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
   fetchPackages?: (filters?: { tracking?: string; status?: PackageStatus }) => void; 
   addPackage: (newPackage: CreatePackageRequest) => Promise<{ error: string } | { success: string }>;
};

export type PackageContextReducerActions = 
{ type: 'setPackage', data: Package[] } |
{ type: 'addPackage', newPackage: Package };

export type PackageStatus =
| "Created"  | "Sent"   | "Returned"  
| "Accepted" | "Cancelled";

export const PACKAGE_STATUSES: PackageStatus[] = [
  "Created",
  "Sent",
  "Returned",
  "Accepted",
  "Cancelled"
];

export type ChangeStatusRequest = {
  NewStatus: PackageStatus;
};

export type ChangeStatusResponse =
  | { error: string; message: string }
  | PackageDetail;

export type PackageDetail = {
  id: string;
  trackingNumber: string;
  sender: PersonInfo;
  recipient: PersonInfo;
  currentStatus: PackageStatus;
  packageCreatedAt: string;
  history: StatusChange[];
};

export type PersonInfo = {
  name: string;
  address: string;
  phone: string;
};

export type StatusChange = {
  status: PackageStatus;
  changedAt: string;
};

export type ChildrenElementProp = { children: React.ReactElement };