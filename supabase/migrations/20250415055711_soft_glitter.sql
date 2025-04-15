/*
  # Add likes and comments tables

  1. New Tables
    - `likes` table for storing user likes on reports
    - Update comments table with proper constraints
    
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated and anonymous users
*/

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
  report_id uuid REFERENCES reports(id) ON DELETE CASCADE,
  user_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (report_id, user_id)
);

-- Enable RLS for likes
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Create policies for likes
CREATE POLICY "Anyone can read likes"
  ON likes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create/delete likes"
  ON likes FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Update comments table
DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports(id) ON DELETE CASCADE,
  user_id text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for comments
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies for comments
CREATE POLICY "Anyone can read comments"
  ON comments FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create comments"
  ON comments FOR INSERT
  TO public
  WITH CHECK (true);