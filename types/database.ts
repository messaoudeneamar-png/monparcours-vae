export type Profile = {
  id: string;
  email: string | null;
  nom: string | null;
  created_at: string;
};

export type Situation = {
  id: string;
  user_id: string;
  titre: string;
  structure: string | null;
  description: string | null;
  blocs: string[] | null;
  ai_result: string | null;
  created_at: string;
};

export type Ecrit = {
  id: string;
  user_id: string;
  type: string | null;
  input: string | null;
  output: string | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at"> & { created_at?: string };
        Update: Partial<Omit<Profile, "id">>;
      };
      situations: {
        Row: Situation;
        Insert: Omit<Situation, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<Omit<Situation, "id" | "user_id">>;
      };
      ecrits: {
        Row: Ecrit;
        Insert: Omit<Ecrit, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<Omit<Ecrit, "id" | "user_id">>;
      };
    };
  };
};
