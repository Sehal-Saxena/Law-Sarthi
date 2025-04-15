/*
  # Create reports table and storage setup

  1. New Tables
    - `reports`
      - `id` (uuid, primary key)
      - `category` (text)
      - `description` (text)
      - `location` (text)
      - `date` (date)
      - `status` (text)
      - `upvotes` (integer)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
      - `image_url` (text, nullable)

  2. Security
    - Enable RLS on `reports` table
    - Add policies for:
      - Anyone can read reports
      - Authenticated users can create reports
      - Users can update their own reports
*/

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  date date NOT NULL,
  status text NOT NULL DEFAULT 'Under Review',
  upvotes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users,
  image_url text
);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Reports are viewable by everyone"
  ON reports
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create reports"
  ON reports
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own reports"
  ON reports
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users
);

-- Enable RLS for comments
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Comment policies
CREATE POLICY "Comments are viewable by everyone"
  ON comments
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create upvotes table to track user upvotes
CREATE TABLE IF NOT EXISTS upvotes (
  report_id uuid REFERENCES reports ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (report_id, user_id)
);

-- Enable RLS for upvotes
ALTER TABLE upvotes ENABLE ROW LEVEL SECURITY;

-- Upvote policies
CREATE POLICY "Upvotes are viewable by everyone"
  ON upvotes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can manage their upvotes"
  ON upvotes
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);