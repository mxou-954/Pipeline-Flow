export const stepPipelines = [
  { id: "545016", name: "A qualifier" },
  { id: "45996", name: "Tous Prospects" },
  { id: "267810", name: "Top prospects" },
  { id: "267808", name: "TOP ULTRA CHAUDS" },
  { id: "650988", name: "Webinar" },
  { id: "268215", name: "Ex Clients" },
  { id: "460220", name: "Perdus" },
] as const;

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000";