export type Package = {
  id: string;
  trackingNumber: string;
  currentStatus: PackageStatus;
  packageCreatedAt: string;
  senderName?: string;
  recipientName?: string;
  sender?: PersonInfo;
  recipient?: PersonInfo;
  history?: StatusChange[];
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
   changeStatus: (id: string, newStatus: PackageStatus) => Promise<{ error: string } | { success: string }>;  
   fetchPackageById: (id: Package["id"]) => Promise<Package>;
};

export type PackageContextReducerActions = 
{ type: 'setPackage', data: Package[] } |
{ type: 'addPackage', newPackage: Package } |
{ type: "updatePackageStatus"; id: string; newStatus: PackageStatus } |
{ type: 'addPackageDetails'; packageDetail: Package };

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

export type BackAddPackageResponse =
  | { error: string; message: string }
  | { packageData: Package; acknowledged: boolean };

export type ChangeStatusRequest = {
  NewStatus: PackageStatus;
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

export type BackChangeStatusResponse =
  | { error: string; message: string }
  | Package;

export type BackGetPackageResponse =
| { error: string; message?: string }  
| { packageData: Package; acknowledged: boolean }; 

export type ChildrenElementProp = { children: React.ReactElement };