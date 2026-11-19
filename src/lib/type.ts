export type Booking = {
  _id: string;
  serviceTitle: string;
  serviceImage: string;
  technicianName: string;
  preferredDate: string;
  basePrice: number;
  finalAmount: number;
  status: string;
  paymentStatus: string;
};

export type Service = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  basePrice: number;
  estimatedDuration: string;
  serviceMode: string;
  serviceArea: string;
  approvalStatus: "pending" | "approved" | "rejected";
  isAvailable: boolean;
   technicianName: string;
  technicianEmail: string;
};


export type Technician = {
  name: string;
  email: string;
  image?: string;
  area?: string;
  bio?: string;
};