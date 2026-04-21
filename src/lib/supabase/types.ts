export type ProjectStatus = "draft" | "published";

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          short_description: string;
          full_description: string;
          techs: string[];
          github_url: string | null;
          live_url: string | null;
          cover_image: string | null;
          images: string[];
          featured: boolean;
          status: ProjectStatus;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          short_description: string;
          full_description: string;
          techs?: string[];
          github_url?: string | null;
          live_url?: string | null;
          cover_image?: string | null;
          images?: string[];
          featured?: boolean;
          status?: ProjectStatus;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          short_description?: string;
          full_description?: string;
          techs?: string[];
          github_url?: string | null;
          live_url?: string | null;
          cover_image?: string | null;
          images?: string[];
          featured?: boolean;
          status?: ProjectStatus;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

export type Project = Database["public"]["Tables"]["projects"]["Row"];
