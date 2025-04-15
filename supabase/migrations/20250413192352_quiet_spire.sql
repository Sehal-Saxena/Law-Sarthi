/*
  # Fix reports table policies

  1. Changes
    - Drop existing policies
    - Create new policies with proper permissions
    - Ensure anonymous reporting works
    - Fix report visibility

  2. Security
    - Allow public read access
    - Allow public insert access
    - Allow authenticated users to update their own reports
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Reports are viewable by everyone" ON reports;
DROP POLICY IF EXISTS "Users can create reports" ON reports;
DROP POLICY IF EXISTS "Users can update their own reports" ON reports;
DROP POLICY IF EXISTS "Anyone can create reports" ON reports;

-- Create new policies
CREATE POLICY "Enable read access for all users"
  ON reports FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable insert access for all users"
  ON reports FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable update for users based on user_id"
  ON reports FOR UPDATE
  TO public
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Ensure RLS is enabled
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;