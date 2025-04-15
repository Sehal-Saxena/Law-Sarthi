/*
  # Fix RLS policies for reports table

  1. Changes
    - Update the RLS policy for inserting reports to allow public access
    - This allows anonymous users to create reports without authentication
  
  2. Security
    - Maintains read access for everyone
    - Allows anyone to create reports (anonymous reporting)
    - Maintains user-specific update permissions
*/

-- Drop the existing insert policy that requires authentication
DROP POLICY IF EXISTS "Users can create reports" ON reports;

-- Create a new policy that allows public inserts
CREATE POLICY "Anyone can create reports"
  ON reports
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Ensure the reports table has RLS enabled
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;