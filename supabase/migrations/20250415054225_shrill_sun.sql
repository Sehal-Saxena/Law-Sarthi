/*
  # Create users table

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - The unique identifier for each user
      - `created_at` (timestamptz) - When the user was created

  2. Security
    - Enable RLS on `users` table
    - Add policy for authenticated users to read their own data
    - Add policy for authenticated users to update their own data
*/

-- Create the users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Grant necessary permissions
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.users TO service_role;