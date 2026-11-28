export const wedding = {
  groom: {
    name: "Deepansh",
    relation: "Son of",
    father: "Mr. Neeraj Singhal",
    mother: "Mrs. Neetu Singhal",
  },
  bride: {
    name: "Astha",
    relation: "Daughter of",
    father: "Mr. Mukesh Gupta",
    mother: "Mrs. Nootan Gupta",
  },
  dateLabel: "16 – 18 January 2027",
  venue: "Rudra Imperial Resort",
  city: "Sitapur, Uttar Pradesh, India",
  mapUrl: "https://maps.app.goo.gl/F7yuMimjP5LRhhec9?g_st=ac",
  // Set the correct public URL after deployment.
  siteUrl: import.meta.env.VITE_SITE_URL || window.location.origin,
};

export const families = {
  groom: {
    title: "The Groom's Family",
    members: [
      { role: "Grandparents", names: "Late Satish Chand Singhal & Late Vijay Laxmi Singhal" },
      { role: "Parents", names: "Mr. Neeraj Singhal & Mrs. Neetu Singhal" },
      { role: "Family", names: "Pankaj - Vineeta, Gaurav - Sonal, Abhishek - Akansha, Aman - Aishwarya, Shubham - Aarushi, Rishabh - Ruchi, Umang, Jatin" },
      { role: "Presenting the invitation", names: "Alka - Ashok, Jyoti, Aastha - Rohit, Shivani - Vaibhav" },
      { role: "Our Little Stars", names: "Shaarvi, Aashvi, Viraj, Ekansh" },
    ],
  }
};

export type Ceremony = {
  id: string;
  name: string;
  date: string;
  time: string;
  start: string;
  description: string;
  mood: string;
  symbol: string;
};

export const ceremonies: Ceremony[] = [
  {
  id: "godbharai-tilak",
  name: "Godhbharai and Tilak",
  date: "Saturday, 16 January 2027",
  time: "4:00 PM",
  start: "2027-01-16T16:00:00+05:30",
  description: "A beautiful celebration of family traditions, blessings, and the beginning of the wedding festivities.",
  mood: "marigold",
  symbol: "✿"
},
{
  id: "engagement-sangeet",
  name: "Engagement and The Rhythm Affair (Sangeet)",
  date: "Saturday, 16 January 2027",
  time: "7:00 PM",
  start: "2027-01-16T19:00:00+05:30",
  description: "An enchanting evening of music, dance, celebration, and unforgettable memories.",
  mood: "plum",
  symbol: "♫"
},

  {
    id: "haldi", name: "Haldi", date: "Sunday, 17 January 2027", time: "10:00 AM",
    start: "2027-01-17T10:00:00+05:30",
    description: "Let the celebrations begin with colours, laughter, blessings, and the warmth of our loved ones.",
    mood: "marigold", symbol: "✿"
  },
  {
  id: "phoolo-ki-haldi",
  name: "Phoolo Ki Haldi",
  date: "Sunday, 17 January 2027",
  time: "11:00 AM",
  start: "2027-01-17T11:00:00+05:30",
  description: "A beautiful celebration of flowers, blessings and joyful Haldi traditions, dressed in shades of green.",
  mood: "green",
  symbol: "🌿"
},
  {
    id: "mehndi", name: "Mehndi", date: "Sunday, 17 January 2027", time: "11:00 AM",
    start: "2027-01-17T11:00:00+05:30",
    description: "A beautiful morning filled with intricate henna, joyful moments, and the colours of tradition.",
    mood: "mehndi", symbol: "❋"
  },
  {
  id: "chaak-mandha",
  name: "Chaak and Mandha",
  date: "Sunday, 17 January 2027",
  time: "12:00 PM",
  start: "2027-01-17T12:00:00+05:30",
  description: "A beautiful traditional family ritual filled with blessings and customs as we prepare for the wedding celebrations.",
  mood: "marigold",
  symbol: "✿"
},
{
  id: "bhaat",
  name: "Bhaat",
  date: "Sunday, 17 January 2027",
  time: "6:00 PM",
  start: "2027-01-17T18:00:00+05:30",
  description: "A cherished family tradition celebrating love, blessings, and the bond between families.",
  mood: "saffron",
  symbol: "✧"
},
  {
    id: "ghudchadi", name: "Ghudchadi", date: "Monday, 18 January 2027", time: "11:00 PM",
    start: "2027-01-18T11:00:00+05:30",
    description: "The groom's grand traditional procession as the wedding celebrations reach their most exciting moment.",
    mood: "saffron", symbol: "✧"
  },
  {
    id: "phere", name: "Phere", date: "Monday, 18 January 2027", time: "3:00 PM",
    start: "2027-01-18T15:00:00+05:30",
    description: "Witness the sacred vows and the beginning of a beautiful journey together.",
    mood: "ruby", symbol: "ॐ"
  },
  {
    id: "reception", name: "Reception", date: "Monday, 18 January 2027", time: "8:00 PM",
    start: "2027-01-18T20:00:00+05:30",
    description: "Join us for an evening of love, celebration, blessings, and unforgettable memories.",
    mood: "champagne", symbol: "✦"
  },
];