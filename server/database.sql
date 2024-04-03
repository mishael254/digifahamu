CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    memberUuid UUID UNIQUE,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    gender VARCHAR(50),
    age VARCHAR(255),
    occupation VARCHAR(255),
    language INTEGER,
    category VARCHAR(255),
    latitude NUMERIC,
    longitude NUMERIC,
    location VARCHAR(255),
    project INTEGER,
    "group" INTEGER,
    county VARCHAR(255),
    locality VARCHAR(255)

);
CREATE TABLE deployments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    deployment INTEGER,
    deploymentDate TIMESTAMP WITH TIME ZONE,
    project INTEGER
);
CREATE TABLE statLogs (
    id SERIAL PRIMARY KEY,
    project VARCHAR(255),
    partner VARCHAR(255),
    Subcategory VARCHAR(255),
    levelThreeCategory VARCHAR(255),
    levelFourCategory VARCHAR(255),
    levelFiveCategory VARCHAR(255),
    levelSixCategory VARCHAR(255),
    Country VARCHAR(255),
    County VARCHAR(255),
    Zone VARCHAR(255),
    StartDate DATE,
    EndDate DATE,
    GroupNo INTEGER,
    Mode VARCHAR(255),
    channel VARCHAR(255),
    messageTitle VARCHAR(255),
    Topic VARCHAR(255),
    SubTopic VARCHAR(255),
    Length INTEGER,
    Type VARCHAR(255),
    language VARCHAR(255),
    dateuploaded TIMESTAMP WITH TIME ZONE,
    "group" VARCHAR(255),
    Gender VARCHAR(255),
    Age VARCHAR(255), 
    Occupation VARCHAR(255),
    Category VARCHAR(255),
    latitude NUMERIC, 
    longitude NUMERIC 
);
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    messageTitle VARCHAR(255),
    messageTopic VARCHAR(255),
    messageSubTopic VARCHAR(255),
    messageDescription TEXT,
    messageType VARCHAR(50),
    messagefile TEXT,
    dateuploaded TIMESTAMP WITH TIME ZONE,
    playlist INTEGER,
    language INTEGER
);
CREATE TABLE IF NOT EXISTS playlists (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    playlist INTEGER,
    deployment INTEGER
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    projectName VARCHAR(255) NOT NULL,
    levelThreeCategory VARCHAR(255),
    levelFourCategory VARCHAR(255),
    levelFiveCategory VARCHAR(255),
    levelSixCategory VARCHAR(255),
    zone VARCHAR(255) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    groupNo INTEGER,
    mode VARCHAR(50) NOT NULL,
    grouped BOOLEAN NOT NULL,
    anthem VARCHAR(255),
    theme VARCHAR(255),
    partner INTEGER NOT NULL,
    category INTEGER NOT NULL,
    subcategory INTEGER,
    countries INTEGER[],
    counties INTEGER[]
);
ALTER TABLE statlogs
ADD COLUMN presentcounty VARCHAR(255),
ADD COLUMN presentlocality VARCHAR(255);

ALTER TABLE members
ADD COLUMN county VARCHAR(255),
ADD COLUMN locality VARCHAR(255);
/**adding data manually*/
INSERT INTO members (id, firstname, lastname, email, phone, gender, age, occupation, category, latitude, longitude, location, project, group)
VALUES 
   
    (2, 'Hufuxurd', 'Kinoti', 'hufuxudKinoti@gmail.com', '+254712719156', 'Male', 18, 'Finance', 'Member', '0.7935', '36.8573', 'SRID=4326;POINT (36.8219 1.3921)', 2, 4);



    /** updaated api data */


/**deployments*/
CREATE TABLE deployments(id SERIAL PRIMARY KEY,title VARCHAR(255),deployment INTEGER, deploymentDate TIMESTAMP,project JSONB);

/**messages*/

CREATE TABLE messages (
    messageUuid UUID UNIQUE,
    id SERIAL PRIMARY KEY,
    messageTitle VARCHAR(255),
    messageTopic VARCHAR(255),
    messageSubTopic VARCHAR(255),
    messageDescription TEXT,
    messageType VARCHAR(255),
    language INTEGER,
    uploadMessage VARCHAR(255),
    messageFile VARCHAR(255),
    dateUploaded TIMESTAMP,
    playlist JSONB
);
/**Creating for playlists*/

CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    playlist INTEGER,
    deployment JSONB

);

CREATE TABLE statlogs (
    messageUuid VARCHAR(255),
    messageTitle VARCHAR(255),
    phone VARCHAR(255),
    firsttimeplayed TIMESTAMP,
    lasttimeplayed TIMESTAMP,
    numberoftimesplayed INTEGER,
    numberofsecondsplayed INTEGER
);
