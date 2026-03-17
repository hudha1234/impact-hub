export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  requiredFunds: number;
  collectedFunds: number;
  status: "active" | "completed";
}

export interface Donation {
  id: string;
  donorName: string;
  email: string;
  phone: string;
  projectId: string;
  amount: number;
  txnId: string;
  status: "pending" | "verified" | "rejected";
  createdAt: string;
}

export const projects: Project[] = [
  {
    id: "proj-001",
    title: "Education for Rural Children",
    description: "50 children in the Dharwad district require learning kits and digital tablets to access modern education resources.",
    location: "Dharwad, Karnataka",
    requiredFunds: 50000,
    collectedFunds: 20000,
    status: "active",
  },
  {
    id: "proj-002",
    title: "Medical Aid for Poor Families",
    description: "Providing essential medical supplies and health checkups for 200 families in underserved communities.",
    location: "Belgaum, Karnataka",
    requiredFunds: 75000,
    collectedFunds: 35000,
    status: "active",
  },
  {
    id: "proj-003",
    title: "Clean Water Initiative",
    description: "Installing water purification systems in 5 villages to provide safe drinking water to 1,000+ residents.",
    location: "Hubli, Karnataka",
    requiredFunds: 60000,
    collectedFunds: 25000,
    status: "active",
  },
  {
    id: "proj-004",
    title: "Women's Skill Development",
    description: "Training 100 women in tailoring, handicrafts, and digital literacy for financial independence.",
    location: "Mysore, Karnataka",
    requiredFunds: 40000,
    collectedFunds: 38000,
    status: "active",
  },
];

export const donations: Donation[] = [
  { id: "don-001", donorName: "Rahul Sharma", email: "rahul@email.com", phone: "9876543210", projectId: "proj-001", amount: 5000, txnId: "UPI123456789012", status: "verified", createdAt: "2026-03-10" },
  { id: "don-002", donorName: "Priya Patel", email: "priya@email.com", phone: "9876543211", projectId: "proj-002", amount: 10000, txnId: "UPI987654321098", status: "pending", createdAt: "2026-03-14" },
  { id: "don-003", donorName: "Amit Kumar", email: "amit@email.com", phone: "9876543212", projectId: "proj-003", amount: 2500, txnId: "UPI456789012345", status: "verified", createdAt: "2026-03-15" },
  { id: "don-004", donorName: "Sneha Reddy", email: "sneha@email.com", phone: "9876543213", projectId: "proj-001", amount: 15000, txnId: "UPI321098765432", status: "pending", createdAt: "2026-03-16" },
];

export const stats = {
  totalDonations: 130000,
  totalDonors: 42,
  activeProjects: 4,
  fundsCollected: 118000,
};
