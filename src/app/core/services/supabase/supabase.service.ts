import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private clientInstance: SupabaseClient;

  constructor() {
    this.clientInstance = createClient(
      environment.supabase.url,
      environment.supabase.anonKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      }
    );
  }

  getClient(): SupabaseClient {
    return this.clientInstance;
  }
}
