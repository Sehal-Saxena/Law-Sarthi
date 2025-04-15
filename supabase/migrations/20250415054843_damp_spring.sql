/*
  # Update reports table to properly handle anonymous reports

  1. Changes
    - Drop existing foreign key constraint
    - Add new foreign key constraint with ON DELETE SET NULL
    - Update RLS policies to allow anonymous reports
    
  2. Security
    - Maintains data integrity
    - Allows anonymous reporting
    - Preserves existing RLS policies
*/

-- Drop the existing foreign key constraint
ALTER TABLE reports 
DROP CONSTRAINT IF EXISTS reports_user_id_fkey;

-- Add the new foreign key constraint that allows null values
ALTER TABLE reports
ADD CONSTRAINT reports_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id)
ON DELETE SET NULL;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON reports;
DROP POLICY IF EXISTS "Enable insert access for all users" ON reports;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON reports;

-- Create new policies that better handle anonymous reports
CREATE POLICY "Anyone can read reports"
  ON reports FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create reports"
  ON reports FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update their own reports"
  ON reports FOR UPDATE
  TO public
  USING (
    CASE 
      WHEN auth.uid() IS NULL THEN false
      ELSE auth.uid() = user_id
    END
  );