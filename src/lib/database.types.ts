export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "13";
  };
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: number;
          museum_name: string;
          tagline: string;
          about_text: string;
          address: string;
          phone: string;
          email: string;
          facebook_url: string;
          instagram_url: string;
          youtube_url: string;
          hero_image_url: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["site_settings"]["Row"]> & { id: number };
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
        Relationships: [];
      };
      gallery_items: {
        Row: {
          id: string;
          title: string;
          description: string;
          image_url: string;
          category: string;
          era: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["gallery_items"]["Row"]> & { title: string };
        Update: Partial<Database["public"]["Tables"]["gallery_items"]["Row"]>;
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          event_date: string;
          location: string;
          image_url: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["events"]["Row"]> & {
          title: string;
          event_date: string;
        };
        Update: Partial<Database["public"]["Tables"]["events"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
