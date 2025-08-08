// # INTEGRATE: This data would come from a 'clients' table in your database.
export const MOCK_CLIENTS = [
  {
    id: 1,
    name: "InnovateAI",
    address: "123 Tech Way, San Francisco, CA",
    notes: "High priority client, focus on AI/ML roles. Fast-paced environment.",
    satisfaction: 95,
    avgTimeToFill: 28,
    contacts: [
      { contactId: 10, personId: 501, position: "Director of Engineering", email: "betsy.c@innovate.ai" },
      { contactId: 11, personId: 502, position: "Lead SRE", email: "jc@innovate.ai" },
    ],
  },
  {
    id: 2,
    name: "DesignHub",
    address: "456 Creative Ave, Boston, MA",
    notes: "Looking for top-tier design talent. Portfolio is key.",
    satisfaction: 92,
    avgTimeToFill: 45,
    contacts: [
        { contactId: 20, personId: 503, position: "Creative Director", email: "peter.jones@designhub.com"},
    ]
  },
  {
    id: 3,
    name: "GoSystems",
    address: "789 Server St, Austin, TX",
    notes: "New client, focus on backend Go developers.",
    satisfaction: 90,
    avgTimeToFill: 32,
    contacts: [
        { contactId: 30, personId: 504, position: "Distinguished Engineer", email: "rob.pike@gosystems.com"},
        { contactId: 31, personId: 501, position: "VP of Technology", email: "b.crabtree@gosystems.com"},
    ]
  },
];