export type ZodiacSign = {
  name: string
  symbol: string
  dates: string
  element: "Fire" | "Earth" | "Air" | "Water"
}

export const zodiacSigns: ZodiacSign[] = [
  { name: "Aries", symbol: "♈", dates: "Mar 21 – Apr 19", element: "Fire" },
  { name: "Taurus", symbol: "♉", dates: "Apr 20 – May 20", element: "Earth" },
  { name: "Gemini", symbol: "♊", dates: "May 21 – Jun 20", element: "Air" },
  { name: "Cancer", symbol: "♋", dates: "Jun 21 – Jul 22", element: "Water" },
  { name: "Leo", symbol: "♌", dates: "Jul 23 – Aug 22", element: "Fire" },
  { name: "Virgo", symbol: "♍", dates: "Aug 23 – Sep 22", element: "Earth" },
  { name: "Libra", symbol: "♎", dates: "Sep 23 – Oct 22", element: "Air" },
  { name: "Scorpio", symbol: "♏", dates: "Oct 23 – Nov 21", element: "Water" },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 – Dec 21", element: "Fire" },
  { name: "Capricorn", symbol: "♑", dates: "Dec 22 – Jan 19", element: "Earth" },
  { name: "Aquarius", symbol: "♒", dates: "Jan 20 – Feb 18", element: "Air" },
  { name: "Pisces", symbol: "♓", dates: "Feb 19 – Mar 20", element: "Water" },
]

export function getZodiac(month: number, day: number): ZodiacSign {
  // month is 1-12
  const ranges: [number, number, string][] = [
    [1, 19, "Capricorn"],
    [2, 18, "Aquarius"],
    [3, 20, "Pisces"],
    [4, 19, "Aries"],
    [5, 20, "Taurus"],
    [6, 20, "Gemini"],
    [7, 22, "Cancer"],
    [8, 22, "Leo"],
    [9, 22, "Virgo"],
    [10, 22, "Libra"],
    [11, 21, "Scorpio"],
    [12, 21, "Sagittarius"],
  ]
  const [, maxDay, sign] = ranges[month - 1]
  const name = day <= maxDay ? sign : ranges[month % 12][2]
  return zodiacSigns.find((z) => z.name === name) ?? zodiacSigns[10]
}

export const mbtiGroups: { label: string; types: string[]; color: string }[] = [
  { label: "Analysts", types: ["INTJ", "INTP", "ENTJ", "ENTP"], color: "var(--chart-4)" },
  { label: "Diplomats", types: ["INFJ", "INFP", "ENFJ", "ENFP"], color: "var(--chart-1)" },
  { label: "Sentinels", types: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"], color: "var(--chart-2)" },
  { label: "Explorers", types: ["ISTP", "ISFP", "ESTP", "ESFP"], color: "var(--chart-3)" },
]

export type MbtiInfo = {
  type: string
  title: string
  traits: string[]
  description: string
  strengths: string[]
  weaknesses: string[]
  communication: string
}

export const mbtiData: Record<string, MbtiInfo> = {
  INTJ: {
    type: "INTJ",
    title: "The Architect",
    traits: ["Strategic", "Independent", "Curious"],
    description:
      "Imaginative and decisive, you see patterns where others see noise. You build long arcs of intention and follow them with quiet resolve.",
    strengths: ["Visionary thinking", "Self-motivated", "Decisive under pressure"],
    weaknesses: ["Overly critical", "Dismissive of emotion", "Perfectionistic"],
    communication: "Direct, idea-driven, and economical. You value depth over small talk.",
  },
  INFJ: {
    type: "INFJ",
    title: "The Advocate",
    traits: ["Insightful", "Idealistic", "Warm"],
    description:
      "Quietly intense, you read between every line. You seek meaning and connection, and you protect the people you let in.",
    strengths: ["Deep empathy", "Visionary", "Principled"],
    weaknesses: ["Burns out easily", "Avoids conflict", "Overthinks"],
    communication: "Gentle but profound. You connect through meaning and one-on-one depth.",
  },
  ENFP: {
    type: "ENFP",
    title: "The Campaigner",
    traits: ["Enthusiastic", "Creative", "Sociable"],
    description:
      "A spark of possibility, you light up rooms and ideas alike. You chase inspiration and bring people along for the ride.",
    strengths: ["Infectious energy", "Curious", "Emotionally intelligent"],
    weaknesses: ["Easily distracted", "Overcommits", "Restless"],
    communication: "Expressive and playful. You think out loud and connect fast.",
  },
  ENTP: {
    type: "ENTP",
    title: "The Debater",
    traits: ["Inventive", "Witty", "Bold"],
    description:
      "You love a good idea and an even better argument. Curiosity is your compass and nothing is off the table.",
    strengths: ["Quick thinking", "Adaptable", "Charismatic"],
    weaknesses: ["Argumentative", "Loses interest", "Insensitive"],
    communication: "Fast, clever, and provocative. You sharpen ideas through debate.",
  },
  ISFP: {
    type: "ISFP",
    title: "The Adventurer",
    traits: ["Artistic", "Gentle", "Spontaneous"],
    description:
      "Quietly expressive, you live through the senses and feel the world in color. You value freedom and authenticity above all.",
    strengths: ["Aesthetic sense", "Warm", "Present"],
    weaknesses: ["Conflict-averse", "Unpredictable", "Private"],
    communication: "Soft-spoken and sincere. You show care through action, not words.",
  },
  INFP: {
    type: "INFP",
    title: "The Mediator",
    traits: ["Idealistic", "Empathetic", "Imaginative"],
    description:
      "A dreamer with a moral core, you seek harmony and meaning. Your inner world is vast and quietly luminous.",
    strengths: ["Deeply caring", "Creative", "Loyal"],
    weaknesses: ["Self-isolating", "Impractical", "Takes things personally"],
    communication: "Reflective and heartfelt. You open up slowly but completely.",
  },
}

export function getMbti(type: string): MbtiInfo {
  return (
    mbtiData[type] ?? {
      type,
      title: "The Seeker",
      traits: ["Thoughtful", "Curious", "Genuine"],
      description:
        "A unique blend of intuition and intention. You bring your own gravity to every connection.",
      strengths: ["Authentic", "Open-minded", "Reflective"],
      weaknesses: ["Reserved", "Self-questioning", "Idealistic"],
      communication: "Considered and sincere. You value real conversation over noise.",
    }
  )
}

export type MbtiQuestion = {
  id: number
  dimension: "EI" | "SN" | "TF" | "JP"
  prompt: string
  a: { text: string; value: "E" | "S" | "T" | "J" }
  b: { text: string; value: "I" | "N" | "F" | "P" }
}

export const mbtiQuestions: MbtiQuestion[] = [
  { id: 1, dimension: "EI", prompt: "At a party, you usually...", a: { text: "Talk to many different people", value: "E" }, b: { text: "Stay close to a small group", value: "I" } },
  { id: 2, dimension: "EI", prompt: "After a long week, you recharge by...", a: { text: "Going out with friends", value: "E" }, b: { text: "Spending time alone", value: "I" } },
  { id: 3, dimension: "EI", prompt: "In a group conversation, you tend to...", a: { text: "Think out loud", value: "E" }, b: { text: "Reflect before speaking", value: "I" } },
  { id: 4, dimension: "EI", prompt: "You feel most energized when...", a: { text: "Surrounded by people", value: "E" }, b: { text: "In quiet, focused solitude", value: "I" } },
  { id: 5, dimension: "EI", prompt: "Meeting new people feels...", a: { text: "Exciting and natural", value: "E" }, b: { text: "Draining unless one-on-one", value: "I" } },
  { id: 6, dimension: "SN", prompt: "You're more drawn to...", a: { text: "Concrete facts and details", value: "S" }, b: { text: "Patterns and possibilities", value: "N" } },
  { id: 7, dimension: "SN", prompt: "When learning something new, you focus on...", a: { text: "Practical applications", value: "S" }, b: { text: "The big-picture theory", value: "N" } },
  { id: 8, dimension: "SN", prompt: "You trust...", a: { text: "Direct experience", value: "S" }, b: { text: "Intuition and hunches", value: "N" } },
  { id: 9, dimension: "SN", prompt: "You'd rather be described as...", a: { text: "Grounded and realistic", value: "S" }, b: { text: "Imaginative and visionary", value: "N" } },
  { id: 10, dimension: "SN", prompt: "Conversations about the future feel...", a: { text: "Speculative and abstract", value: "S" }, b: { text: "Thrilling and full of potential", value: "N" } },
  { id: 11, dimension: "TF", prompt: "When making decisions, you prioritize...", a: { text: "Logic and consistency", value: "T" }, b: { text: "Harmony and people's feelings", value: "F" } },
  { id: 12, dimension: "TF", prompt: "Others would describe you as more...", a: { text: "Reasonable", value: "T" }, b: { text: "Compassionate", value: "F" } },
  { id: 13, dimension: "TF", prompt: "In an argument, you focus on...", a: { text: "What's true", value: "T" }, b: { text: "What keeps the peace", value: "F" } },
  { id: 14, dimension: "TF", prompt: "Criticism is best when it's...", a: { text: "Honest and direct", value: "T" }, b: { text: "Tactful and kind", value: "F" } },
  { id: 15, dimension: "TF", prompt: "You're more convinced by...", a: { text: "A solid argument", value: "T" }, b: { text: "A heartfelt appeal", value: "F" } },
  { id: 16, dimension: "JP", prompt: "Your ideal day is...", a: { text: "Planned out in advance", value: "J" }, b: { text: "Open and spontaneous", value: "P" } },
  { id: 17, dimension: "JP", prompt: "You feel better when things are...", a: { text: "Decided and settled", value: "J" }, b: { text: "Flexible and open-ended", value: "P" } },
  { id: 18, dimension: "JP", prompt: "Deadlines make you...", a: { text: "Plan early and steadily", value: "J" }, b: { text: "Rush in a final burst", value: "P" } },
  { id: 19, dimension: "JP", prompt: "Your space tends to be...", a: { text: "Organized and tidy", value: "J" }, b: { text: "Creatively cluttered", value: "P" } },
  { id: 20, dimension: "JP", prompt: "You prefer plans that are...", a: { text: "Locked in", value: "J" }, b: { text: "Easy to change", value: "P" } },
]

export function scoreMbti(answers: ("a" | "b")[]): string {
  const tally: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  answers.forEach((ans, i) => {
    const q = mbtiQuestions[i]
    if (!q) return
    const choice = ans === "a" ? q.a.value : q.b.value
    tally[choice] += 1
  })
  return (
    (tally.E >= tally.I ? "E" : "I") +
    (tally.S >= tally.N ? "S" : "N") +
    (tally.T >= tally.F ? "T" : "F") +
    (tally.J >= tally.P ? "J" : "P")
  )
}

export const interestCategories: { category: string; items: string[] }[] = [
  { category: "Sound", items: ["Indie Music", "Vinyl Records", "Singing", "Guitar", "Podcasts"] },
  { category: "Screen", items: ["Film & Cinema", "Anime", "Film Making", "Gaming"] },
  { category: "Mind", items: ["Psychology", "Books", "Writing", "Science", "Languages"] },
  { category: "Body", items: ["Fitness", "Hiking", "Dancing", "Meditation"] },
  { category: "Craft", items: ["Photography", "Art & Design", "Cooking", "Fashion", "Plants"] },
  { category: "World", items: ["Travel", "Astronomy", "Stargazing", "Coffee", "Volunteering", "Board Games"] },
]

export const interestOptions: string[] = interestCategories.flatMap((c) => c.items)

const usernameAdjectives = [
  "Silent", "Cosmic", "Lunar", "Velvet", "Quiet", "Distant", "Amber", "Hollow",
  "Drifting", "Stellar", "Pale", "Wandering", "Midnight", "Soft", "Echoing",
]
const usernameNouns = [
  "Nebula", "Reader", "Echo", "Comet", "Tide", "Ember", "Orbit", "Aurora",
  "Cipher", "Meadow", "Signal", "Halo", "Vector", "Dusk", "Nova",
]

export function generateUsername(): string {
  const adj = usernameAdjectives[Math.floor(Math.random() * usernameAdjectives.length)]
  const noun = usernameNouns[Math.floor(Math.random() * usernameNouns.length)]
  const num = Math.floor(Math.random() * 99)
  return `${adj}${noun}${num}`
}

export type MockUser = {
  id: string
  username: string
  age: number
  mbti: string
  zodiac: string
  zodiacSymbol: string
  interests: string[]
  bio: string
  compatibility: number
  breakdown: { interest: number; mbti: number; zodiac: number }
  online: boolean
  hue: number
}

function hueAvatar(hue: number) {
  return hue
}

export const mockUsers: MockUser[] = [
  {
    id: "u1", username: "SilentNebula42", age: 24, mbti: "INFJ", zodiac: "Pisces", zodiacSymbol: "♓",
    interests: ["Photography", "Indie Music", "Books", "Stargazing"],
    bio: "Collecting quiet moments and film photos. Looking for people who romanticize ordinary days.",
    compatibility: 92, breakdown: { interest: 95, mbti: 90, zodiac: 88 }, online: true, hue: hueAvatar(162),
  },
  {
    id: "u2", username: "CosmicReader7", age: 27, mbti: "INTP", zodiac: "Aquarius", zodiacSymbol: "♒",
    interests: ["Science", "Writing", "Coffee", "Psychology"],
    bio: "Perpetually mid-book. I will absolutely send you a 2am theory about the universe.",
    compatibility: 87, breakdown: { interest: 88, mbti: 92, zodiac: 78 }, online: false, hue: 35,
  },
  {
    id: "u3", username: "LunarEcho91", age: 22, mbti: "ENFP", zodiac: "Leo", zodiacSymbol: "♌",
    interests: ["Dancing", "Travel", "Art & Design", "Indie Music"],
    bio: "Yes to spontaneous road trips. Soft spot for sunsets and people who feel deeply.",
    compatibility: 84, breakdown: { interest: 90, mbti: 80, zodiac: 80 }, online: true, hue: 12,
  },
  {
    id: "u4", username: "DriftingComet8", age: 29, mbti: "ISFP", zodiac: "Taurus", zodiacSymbol: "♉",
    interests: ["Cooking", "Plants", "Vinyl Records", "Hiking"],
    bio: "Slow living advocate. My apartment is mostly plants now and I'm okay with it.",
    compatibility: 81, breakdown: { interest: 84, mbti: 82, zodiac: 76 }, online: false, hue: 195,
  },
  {
    id: "u5", username: "VelvetOrbit3", age: 25, mbti: "ENTP", zodiac: "Gemini", zodiacSymbol: "♊",
    interests: ["Gaming", "Film & Cinema", "Technology", "Board Games"],
    bio: "I will debate anything in good faith. Currently ranking every A24 film, fight me.",
    compatibility: 78, breakdown: { interest: 80, mbti: 76, zodiac: 78 }, online: true, hue: 230,
  },
  {
    id: "u6", username: "PaleMeadow19", age: 23, mbti: "INFP", zodiac: "Cancer", zodiacSymbol: "♋",
    interests: ["Writing", "Meditation", "Books", "Coffee"],
    bio: "Soft human. Journaling my way through my twenties one latte at a time.",
    compatibility: 89, breakdown: { interest: 86, mbti: 94, zodiac: 86 }, online: false, hue: 330,
  },
]

export type FeedPost = {
  id: string
  universe: string
  author: string
  mbti: string
  zodiac: string
  zodiacSymbol: string
  time: string
  title: string
  body: string
  likes: number
  comments: number
  hue: number
}

export const questionOfTheDay = {
  title: "Question of the Day",
  date: "6/13/2026",
  prompt: "What song describes your life right now, and why that one?",
  likes: 645,
  comments: 412,
}

export const feedPosts: FeedPost[] = [
  {
    id: "p1", universe: "#photography", author: "SilentNebula42", mbti: "INFJ", zodiac: "Pisces", zodiacSymbol: "♓",
    time: "2h", title: "Golden hour on 35mm never misses",
    body: "Spent the evening shooting a roll of expired film. Something about not seeing the results instantly makes it feel like magic again. Anyone else still shoot analog?",
    likes: 128, comments: 34, hue: 162,
  },
  {
    id: "p2", universe: "#psychology", author: "CosmicReader7", mbti: "INTP", zodiac: "Aquarius", zodiacSymbol: "♒",
    time: "5h", title: "Do you think personality actually changes?",
    body: "Been reading about trait stability over a lifetime. Curious whether people here feel like their MBTI has shifted as they've grown, or if it's stayed consistent.",
    likes: 96, comments: 51, hue: 35,
  },
  {
    id: "p3", universe: "#music", author: "LunarEcho91", mbti: "ENFP", zodiac: "Leo", zodiacSymbol: "♌",
    time: "8h", title: "Recommend me one song that wrecks you emotionally",
    body: "Building the ultimate cry-in-the-car playlist. Hit me with the one track that gets you every single time. I'll start: Holocene by Bon Iver.",
    likes: 203, comments: 88, hue: 12,
  },
]

export type Conversation = {
  id: string
  username: string
  mbti: string
  zodiacSymbol: string
  online: boolean
  hue: number
  preview: string
  unread: number
  messagesExchanged: number
  messages: { id: string; fromMe: boolean; text: string; time: string }[]
}

export const conversations: Conversation[] = [
  {
    id: "c1", username: "SilentNebula42", mbti: "INFJ", zodiacSymbol: "♓", online: true, hue: 162,
    preview: "that's such a Pisces thing to say lol", unread: 2, messagesExchanged: 14,
    messages: [
      { id: "m1", fromMe: false, text: "okay your taste in film photography is unreal", time: "10:02" },
      { id: "m2", fromMe: true, text: "stop you're going to make me blush through the anonymity", time: "10:03" },
      { id: "m3", fromMe: false, text: "do you develop your own rolls or send them out?", time: "10:05" },
      { id: "m4", fromMe: true, text: "send them out for now, but I want to learn", time: "10:06" },
      { id: "m5", fromMe: false, text: "that's such a Pisces thing to say lol", time: "10:07" },
    ],
  },
  {
    id: "c2", username: "PaleMeadow19", mbti: "INFP", zodiacSymbol: "♋", online: false, hue: 330,
    preview: "I journaled about our conversation haha", unread: 0, messagesExchanged: 22,
    messages: [
      { id: "m1", fromMe: false, text: "I journaled about our conversation haha", time: "Yesterday" },
      { id: "m2", fromMe: true, text: "that might be the sweetest thing anyone's said to me here", time: "Yesterday" },
    ],
  },
  {
    id: "c3", username: "VelvetOrbit3", mbti: "ENTP", zodiacSymbol: "♊", online: true, hue: 230,
    preview: "no because ranking Midsommar that low is a CRIME", unread: 0, messagesExchanged: 6,
    messages: [
      { id: "m1", fromMe: true, text: "Hereditary > Midsommar and it's not close", time: "1h" },
      { id: "m2", fromMe: false, text: "no because ranking Midsommar that low is a CRIME", time: "1h" },
    ],
  },
]

export const universes: { tag: string; souls: string }[] = [
  { tag: "#music", souls: "21M" },
  { tag: "#film", souls: "15M" },
  { tag: "#photography", souls: "11M" },
  { tag: "#gaming", souls: "9.7M" },
  { tag: "#anime", souls: "7M" },
  { tag: "#books", souls: "4.8M" },
  { tag: "#psychology", souls: "4.5M" },
  { tag: "#art", souls: "4.4M" },
  { tag: "#travel", souls: "4.2M" },
  { tag: "#science", souls: "3.5M" },
  { tag: "#fitness", souls: "3.2M" },
  { tag: "#writing", souls: "3M" },
]
