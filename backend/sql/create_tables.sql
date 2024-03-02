-- Create Portal Database
CREATE DATABASE IF NOT EXISTS hackathon_registration_portal;

-- Select Portal Database
USE hackathon_registration_portal;

-- Create Hackathon Table
CREATE TABLE IF NOT EXISTS Hackathon (
    hackathon_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    theme VARCHAR(255),
    registration_start_date DATE,
    registration_end_date DATE,
    event_date DATE,
    max_team_size INT,
    max_num_teams INT
);

-- Create Competitor Table
CREATE TABLE IF NOT EXISTS Competitor (
    competitor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mobile VARCHAR(20),
    title VARCHAR(100)
);

-- Create Challenge Table
CREATE TABLE IF NOT EXISTS Challenge (
    challenge_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

-- Create Team Table
CREATE TABLE IF NOT EXISTS Team (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL,
    hackathon_id INT,
    challenge_id INT,
    FOREIGN KEY (hackathon_id) REFERENCES Hackathon(hackathon_id) ON DELETE SET NULL,
    FOREIGN KEY (challenge_id) REFERENCES Challenge(challenge_id) ON DELETE SET NULL
);

-- Create Competitor_Team Table
CREATE TABLE IF NOT EXISTS Competitor_Team (
    competitor_id INT,
    team_id INT,
    PRIMARY KEY (competitor_id, team_id),
    FOREIGN KEY (competitor_id) REFERENCES Competitor(competitor_id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES Team(team_id) ON DELETE CASCADE
);

-- Create Hackathon_Challenge Table
CREATE TABLE IF NOT EXISTS Hackathon_Challenge (
    hackathon_id INT,
    challenge_id INT,
    PRIMARY KEY (hackathon_id, challenge_id),
    FOREIGN KEY (hackathon_id) REFERENCES Hackathon(hackathon_id) ON DELETE CASCADE,
    FOREIGN KEY (challenge_id) REFERENCES Challenge(challenge_id) ON DELETE CASCADE
);

-- Create User Table
CREATE TABLE IF NOT EXISTS User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Normal') NOT NULL
);