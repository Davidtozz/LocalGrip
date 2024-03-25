export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      menu: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string | null;
          restaurant_id: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string | null;
          restaurant_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string | null;
          restaurant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_menu_restaurant_id_fkey";
            columns: ["restaurant_id"];
            isOneToOne: false;
            referencedRelation: "restaurant";
            referencedColumns: ["id"];
          },
        ];
      };
      menu_category: {
        Row: {
          created_at: string;
          id: string;
          menu_id: string | null;
          menu_item_id: string | null;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          menu_id?: string | null;
          menu_item_id?: string | null;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          menu_id?: string | null;
          menu_item_id?: string | null;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_menu_category_menu_id_fkey";
            columns: ["menu_id"];
            isOneToOne: false;
            referencedRelation: "menu";
            referencedColumns: ["id"];
          },
        ];
      };
      menu_item: {
        Row: {
          category_id: string;
          created_at: string;
          description: string | null;
          display_order: number | null;
          id: string;
          image_url: string | null;
          menu_id: string;
          name: string | null;
          price: number | null;
          status: string;
        };
        Insert: {
          category_id: string;
          created_at?: string;
          description?: string | null;
          display_order?: number | null;
          id?: string;
          image_url?: string | null;
          menu_id: string;
          name?: string | null;
          price?: number | null;
          status: string;
        };
        Update: {
          category_id?: string;
          created_at?: string;
          description?: string | null;
          display_order?: number | null;
          id?: string;
          image_url?: string | null;
          menu_id?: string;
          name?: string | null;
          price?: number | null;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_menu_item_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "menu_category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_menu_item_menu_id_fkey";
            columns: ["menu_id"];
            isOneToOne: false;
            referencedRelation: "menu";
            referencedColumns: ["id"];
          },
        ];
      };
      order: {
        Row: {
          created_at: string;
          id: string;
          issued_by: string | null;
          menu_item_id: string | null;
          quantity: number | null;
          restaurant_id: string | null;
          status: string | null;
          total_price: number | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          issued_by?: string | null;
          menu_item_id?: string | null;
          quantity?: number | null;
          restaurant_id?: string | null;
          status?: string | null;
          total_price?: number | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          issued_by?: string | null;
          menu_item_id?: string | null;
          quantity?: number | null;
          restaurant_id?: string | null;
          status?: string | null;
          total_price?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_order_issued_by_fkey";
            columns: ["issued_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_order_menu_item_id_fkey";
            columns: ["menu_item_id"];
            isOneToOne: false;
            referencedRelation: "menu_item";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_order_restaurant_id_fkey";
            columns: ["restaurant_id"];
            isOneToOne: false;
            referencedRelation: "restaurant";
            referencedColumns: ["id"];
          },
        ];
      };
      promotions: {
        Row: {
          code: string | null;
          created_at: string;
          details: string | null;
          discount_percentage: number;
          expire_date: string | null;
          id: string;
          is_recurring: boolean;
          name: string | null;
          restaurant_id: string | null;
          start_date: string;
        };
        Insert: {
          code?: string | null;
          created_at?: string;
          details?: string | null;
          discount_percentage: number;
          expire_date?: string | null;
          id?: string;
          is_recurring?: boolean;
          name?: string | null;
          restaurant_id?: string | null;
          start_date: string;
        };
        Update: {
          code?: string | null;
          created_at?: string;
          details?: string | null;
          discount_percentage?: number;
          expire_date?: string | null;
          id?: string;
          is_recurring?: boolean;
          name?: string | null;
          restaurant_id?: string | null;
          start_date?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_promotions_restaurant_id_fkey";
            columns: ["restaurant_id"];
            isOneToOne: false;
            referencedRelation: "restaurant";
            referencedColumns: ["id"];
          },
        ];
      };
      restaurant: {
        Row: {
          address: string;
          created_at: string;
          cuisinez_type: string;
          id: string;
          name: string;
          opening_hours: Json | null;
          owner_id: string;
          phone: string;
          website_url: string | null;
        };
        Insert: {
          address: string;
          created_at?: string;
          cuisinez_type: string;
          id?: string;
          name: string;
          opening_hours?: Json | null;
          owner_id?: string;
          phone: string;
          website_url?: string | null;
        };
        Update: {
          address?: string;
          created_at?: string;
          cuisinez_type?: string;
          id?: string;
          name?: string;
          opening_hours?: Json | null;
          owner_id?: string;
          phone?: string;
          website_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_restaurant_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          owner_id: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
