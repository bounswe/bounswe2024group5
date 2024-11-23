export type ProfileRequest = {
  name?: string;
  email?: string;
  profilePicture?: string;
};

export type ProfileResponse = {
  username: string;
  email: string;
  name: string;
  profilePicture: string;
  score: number;
  englishProficiency: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  noCreatedQuizzes: number;
};
