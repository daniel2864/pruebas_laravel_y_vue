import { createClient } from '@supabase/supabase-js'

const supabaseUrl     = "https://syrbcxnkvrxoadjrxmck.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5cmJjeG5rdnJ4b2FkanJ4bWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0MTAyODksImV4cCI6MjAwMDk4NjI4OX0.mp2OW_MzhcSILClLYQEc5BXYhLlvwwQgSfhToeVoPzs"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
