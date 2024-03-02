-- Hackathon Table
INSERT INTO Hackathon (name, theme, registration_start_date, registration_end_date, event_date, max_team_size, max_num_teams)
VALUES
('InnovateX', 'Sustainability', '2023-04-01', '2023-04-20', '2023-05-05', 5, 50),
('CodeFest 2023', 'Healthcare Innovation', '2023-06-10', '2023-07-01', '2023-07-20', 4, 40),
('Data Sprint', 'AI for Good', '2023-09-15', '2023-10-05', '2023-11-01', 6, 30);


-- Competitor Table
INSERT INTO Competitor (competitor_id, name, email, mobile, title)
VALUES
(1, 'Jane Doe', 'jane.doe@example.com', '555-0101', 'Data Scientist'),
(2, 'John Smith', 'john.smith@example.com', '555-0102', 'Software Developer'),
(3, 'Alex Johnson', 'alex.johnson@example.com', '555-0103', 'Product Manager');

-- Team Table
INSERT INTO Team (team_name, hackathon_id)
VALUES
('Innovators', 1),
('Health Gurus', 2),
('AI Mavericks', 3);


-- Competitor_Team Table
INSERT INTO Competitor_Team (competitor_id, team_id)
VALUES
(1, 1),
(2, 2),
(3, 3);


-- Challenge Table
INSERT INTO Challenge (title)
VALUES
('Clean Tech Solutions'),
('Remote Healthcare'),
('AI Ethics');


-- Hackathon_Challenge Table
INSERT INTO Hackathon_Challenge (hackathon_id, challenge_id)
VALUES
(1, 1),
(2, 2),
(3, 3);


-- User Table
INSERT INTO User (username, password, role)
VALUES
('admin', 'adminpassword', 'Admin'),
('user1', 'password1', 'Normal'),
('user2', 'password2', 'Normal');