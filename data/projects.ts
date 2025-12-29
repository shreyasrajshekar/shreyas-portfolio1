export type Project = {
  title: string;
  problem: string;
  tech: string[];
};

export const projects: Project[] = [
    {
    title: "Smart Transport System",
    problem: "Real-time tracking, attendance, and alerts for school transport.",
    tech: ["Node.js", "Supabase", "React Native"],
  },
  {
    title: "AttendRight",
    problem: "Smart system that allows students to bunk smart and stay eligible",
    tech: ["React Native(Expo)", "Supabase", "Tailwind"],
  },
  {
    title: "Pothole Detection App",
    problem: "Using phone sensors and AI to crowdsource road quality.",
    tech: ["Expo", "Gemini API", "Maps"],
  },
  {
    title: "Arduino PC Game Controller",
    problem: "Built a custom controller using Arduino to play PC games, replicating Xbox controller functionality.",
    tech: ["Arduino", "C++", "USB HID", "PC Game Input"]
}
];
