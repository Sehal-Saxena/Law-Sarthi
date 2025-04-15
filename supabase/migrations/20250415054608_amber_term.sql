/*
  # Update reports table constraints

  1. Changes
    - Modify the user_id foreign key constraint to allow null values
    - This enables anonymous reporting while maintaining referential integrity
    
  2. Security
    - Maintains existing RLS policies
    - Allows reports without user association
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