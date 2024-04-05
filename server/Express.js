// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const pgp = require('pg-promise')();

const app = express();
const port = 3002;


app.use(bodyParser.json());

const postgresConfig = {
  user: 'mishael',
  host: 'localhost',
  database: 'digifahamu',
  password: 'mishael2019.',
  port: 5432,
};

const db = pgp(postgresConfig);

// Fetch and save data for each entity
app.get('/api/getMembers', async (req, res) => {
  try {
    // Attempt to fetch data from the external API
    const apiEndpoint = 'http://tathmini.live/api/member-details/';
    const response = await axios.get(apiEndpoint);
    //create table if there is none 
    await createTableIfNotExists('members', response.data);
    // Save data to the database if API is reachable
    await saveDataToDatabase('members', response.data);
    //wait to update the table members
    await updateMembersTableWithAddress();
  } catch (error) {
    console.error('Error fetching members from API:', error);

    // If API is not reachable, log the error but continue
  }

  try {
    // Fetch data from the database (either the newly updated data or the existing data)
    const dbData = await db.any('SELECT * FROM members');
    res.status(200).json(dbData);
  } catch (dbError) {
    console.error('Error fetching members from database:', dbError);
    res.status(500).send('Internal Server Error');
  }
});

//feedbacks

app.get('/api/getFeedbacks', async (req, res) => {
  try {
    // Attempt to fetch data from the external API
    const apiEndpoint = 'http://tathmini.live/api/feedback/';
    const response = await axios.get(apiEndpoint);
    //create table if there is none 
    await createTableIfNotExists('feedbacks', response.data);
    // Save data to the database if API is reachable
    await saveDataToDatabase('feedbacks', response.data);
    //wait to update the table members
    await updateMembersTableWithAddress();
  } catch (error) {
    console.error('Error fetching feedbacks from API:', error);

    // If API is not reachable, log the error but continue
  }

  try {
    // Fetch data from the database (either the newly updated data or the existing data)
    const dbData = await db.any('SELECT * FROM feedbacks');
    res.status(200).json(dbData);
  } catch (dbError) {
    console.error('Error fetching feedbacks from database:', dbError);
    res.status(500).send('Internal Server Error');
  }
});


//deployments


app.get('/api/getDeployments', async (req, res) => {
  try {
    // Attempt to fetch data from the external API
    const apiEndpoint = 'http://tathmini.live/api/deployments/';
    const response = await axios.get(apiEndpoint);
    //create table if there is none 
    await createTableIfNotExists('deployments', response.data);
    // Save data to the database if API is reachable
    await saveDataToDatabase('deployments', response.data);
  } catch (error) {
    console.error('Error fetching deployments from API:', error);

    // If API is not reachable, log the error but continue
  }

  try {
    // Fetch data from the database (either the newly updated data or the existing data)
    const dbData = await db.any('SELECT * FROM deployments');
    res.status(200).json(dbData);
  } catch (dbError) {
    console.error('Error fetching deployments from database:', dbError);
    res.status(500).send('Internal Server Error');
  }
  });

  //statlogs


app.get('/api/getStatlog', async (req, res) => {
  try {
    // Attempt to fetch data from the external API
    const apiEndpoint = 'http://tathmini.live/api/statlog/';
    const response = await axios.get(apiEndpoint);
    //create table if there is none 
    await createTableIfNotExists('statlogs', response.data);
    // Save data to the database if API is reachable
    await saveDataToDatabase('statlogs', response.data);
    // Update statlogs table with presentcounty and presentlocality
    await updateStatlogsTableWithAddress();
  } catch (error) {
    console.error('Error fetching statlogs from API:', error);

    // If API is not reachable, log the error but continue
  }

  try {
    // Fetch data from the database (either the newly updated data or the existing data)
    const dbData = await db.any('SELECT * FROM statlogs');
    res.status(200).json(dbData);
  } catch (dbError) {
    console.error('Error fetching statlogs from database:', dbError);
    res.status(500).send('Internal Server Error');
  }
  });


  //messages


app.get('/api/getMessages', async (req, res) => {
  try {
    // Attempt to fetch data from the external API
    const apiEndpoint = 'http://tathmini.live/api/messages/';
    const response = await axios.get(apiEndpoint);
    //create table if there is none 
    await createTableIfNotExists('messages', response.data);
    // Save data to the database if API is reachable
    await saveDataToDatabase('messages', response.data);
  } catch (error) {
    console.error('Error fetching messages from API:', error);

    // If API is not reachable, log the error but continue
  }

  try {
    // Fetch data from the database (either the newly updated data or the existing data)
    const dbData = await db.any('SELECT * FROM messages');
    res.status(200).json(dbData);
  } catch (dbError) {
    console.error('Error fetching messages from database:', dbError);
    res.status(500).send('Internal Server Error');
  }
  });

  //playlists

app.get('/api/getPlaylist', async (req, res) => {
  try {
    // Attempt to fetch data from the external API
    const apiEndpoint = 'http://tathmini.live/api/playlists/';
    const response = await axios.get(apiEndpoint);
    //create table if there is none 
    await createTableIfNotExists('playlists', response.data);
    // Save data to the database if API is reachable
    await saveDataToDatabase('playlists', response.data);
  } catch (error) {
    console.error('Error fetching playlists from API:', error);

    // If API is not reachable, log the error but continue
  }

  try {
    // Fetch data from the database (either the newly updated data or the existing data)
    const dbData = await db.any('SELECT * FROM playlists');
    res.status(200).json(dbData);
  } catch (dbError) {
    console.error('Error fetching playlists from database:', dbError);
    res.status(500).send('Internal Server Error');
  }
  });
  
  //projects

  app.get('/api/getProjects', async (req, res) => {
    try {
      // Attempt to fetch data from the external API
      const apiEndpoint = 'http://tathmini.live/api/projects/';
      const response = await axios.get(apiEndpoint);
      //create table if there is none 
      await createTableIfNotExists('projects', response.data);
      // Save data to the database if API is reachable
      
      await saveDataToDatabase('projects', response.data);
    } catch (error) {
      console.error('Error fetching projects from API:', error);
  
      // If API is not reachable, log the error but continue
    }
  
    try {
      // Fetch data from the database (either the newly updated data or the existing data)
      const dbData = await db.any('SELECT * FROM projects');
      res.status(200).json(dbData);
    } catch (dbError) {
      console.error('Error fetching projects from database:', dbError);
      res.status(500).send('Internal Server Error');
    }
    });



  async function createTableIfNotExists(tableName, data) {
      try {
          // Check if the table exists
          const tableExistsQuery = `SELECT to_regclass('${tableName}')`;
          const tableExistsResult = await db.oneOrNone(tableExistsQuery);
  
          if (!tableExistsResult.to_regclass) {
              // Generate basic column definitions with inferred data types
              const basicColumns = generateColumnDefinitions(data);
  
              // Create the table with basic columns
              let columnDefinitions = [...basicColumns];
  
              // Add additional columns only for specific tables
              if (tableName === 'members') {
                  const additionalColumns = [
                      '"county" VARCHAR(255)',
                      '"locality" VARCHAR(255)',
                      '"memberuuid" UUID UNIQUE',
                      
                  ];
                  columnDefinitions = [...columnDefinitions, ...additionalColumns];
              } else if (tableName === 'statlogs') {
                  const additionalColumns = [',presentcounty VARCHAR(255)', ',presentlocality VARCHAR(255)'];
                  columnDefinitions = [...columnDefinitions, ...additionalColumns];
                  //table name to include special columns for messages
              } else if (tableName === 'messages') {
                const additionalColumns = [',"messageuuid" UUID UNIQUE'];
                columnDefinitions = [...columnDefinitions, ...additionalColumns];
              }
  
              // Format and join column definitions
              const formattedColumnDefinitions = columnDefinitions.join('');
  
              const createTableQuery = `
                  CREATE TABLE IF NOT EXISTS ${tableName} (
                      ${formattedColumnDefinitions}
                  );
              `;
  
              await db.none(createTableQuery);
              console.log(`Table "${tableName}" created if it didn't exist.`);
          }
      } catch (error) {
          console.error(`Error checking or creating table "${tableName}":`, error);
      }
   }

   function generateColumnDefinitions(data) {
    const columns = Object.keys(data[0] || {});
    const basicColumns = [];

    // Check if 'id' column is already present in the API data structure
    const idColumnExists = columns.includes('id');

    if (!idColumnExists) {
        // Add 'id' column as SERIAL PRIMARY KEY if not present
        basicColumns.push('id SERIAL PRIMARY KEY');
    }

    // Format and determine data type for each column
    const columnDefinitions = columns.map(column => {
      if (column === 'id') {
        return null;
      }

        let formattedColumnName;
        if (column === 'group') {
            formattedColumnName = '"group"'; // Enclose 'group' in double quotes
        } else {
            formattedColumnName = `"${column}"`;
        }
        const exampleValue = data.find(row => row[column]);
        const dataType = inferDataType(exampleValue[column]);
        return `${formattedColumnName} ${dataType}`;
    });

    return columnDefinitions.join(', '); // Join the column definitions with commas and a space
}
  
function inferDataType(value) {
      if (typeof value === 'number') {
        return 'NUMERIC';
      } else if (typeof value === 'boolean') {
        return 'BOOLEAN';
      } else if (value instanceof Date) {
        return 'TIMESTAMP';
      } else {
        return 'VARCHAR(255)';
      }
}
    
function sanitizeNumericField(value) {
  return value === "" || value === null ? null : Number(value);
}

async function saveDataToDatabase(tableName, data) {
  try {
    //check if the table exists, and create it if it doesn't
    await createTableIfNotExists(tableName, data);

    const columns = Object.keys(data[0]);
    const columnsList = columns.map(column => column === 'group' ? `"group"` : column).join(', ');
    const valuesPlaceholders = columns.map((_, index) => `$${index + 1}`).join(', ');

    const insertQuery = `INSERT INTO ${tableName} (${columnsList}) VALUES (${valuesPlaceholders}) ON CONFLICT (id) DO NOTHING;`;

    for (const item of data) {

      // Handle empty strings in the LastTimePlayed field
      if (item.LastTimePlayed === "") {
        item.LastTimePlayed = null; // Convert empty string to NULL
      }
      // Handle empty strings in the FirstTimePlayed field
      if (item.FirstTimePlayed === ""){
        item.FirstTimePlayed = null; // Convert the empty string to NULL
      }
      //parse timestamp strings into Date objects 
      if (item.LastTimePlayed){
        item.LastTimePlayed = new Date(item.LastTimePlayed);
      }
      if (item.FirstTimePlayed){
        item.FirstTimePlayed = new Date (item.FirstTimePlayed);
      }

      const values = columns.map(column => {
        return ['latitude', 'longitude', 'GroupNo', 'Age'].includes(column)
          ? sanitizeNumericField(item[column])
          : item[column];
      });

      await db.none(insertQuery, values);
    }
    console.log(`Data saved to ${tableName} successfully.`);
  } catch (error) {
    console.error(`Error saving data to table "${tableName}":`, error);
  }
}
// Function to extract a specific address component from Geocoding API results
function extractAddressComponent(addressComponents, type) {
  for (const component of addressComponents) {
    if (component.types.includes(type)) {
      return component.long_name;
    }
  }
  return null;
}

// Function to get county and locality from Google Geocoding API
async function getAddressFromGeocodingAPI(latitude, longitude) {
  try {
    const apiKey = 'AIzaSyBWEwmfSFoTODvAO8ywUPdXgqHxHPevPd4'; // Replace with your actual API key
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    const response = await axios.get(apiUrl);

    // Check if there is a response, results, and address components
    if (response.data && response.data.results && response.data.results.length > 0) {
      const addressComponents = response.data.results[0].address_components;

      // Check if address components are available
      if (addressComponents) {
        const county = extractAddressComponent(addressComponents, 'administrative_area_level_1');
        const locality = extractAddressComponent(addressComponents, 'locality');

        return { county, locality };
      }
    }

    return { county: null, locality: null };
  } catch (error) {
    console.error('Error getting address from Geocoding API:', error);
    return { county: null, locality: null };
  }
}

// Function to update members table with county and locality
async function updateMembersTableWithAddress() {
  try {
    // Fetch members data from the database
    const membersData = await db.any('SELECT * FROM members');

    // Loop through each member and update county and locality
    for (const member of membersData) {
      const { latitude, longitude } = member;
      
      // Skip if latitude or longitude is missing
      if (!latitude || !longitude) {
        continue;
      }

      // Get county and locality from Geocoding API
      const { county, locality } = await getAddressFromGeocodingAPI(latitude, longitude);

      // Check if county and locality are available
      if (county !== null && locality !== null) {
        // Update members table with county and locality
        const updateQuery = `
          UPDATE members
          SET county = $1, locality = $2
          WHERE id = $3;
        `;

        await db.none(updateQuery, [county, locality, member.id]);
      }
    }

    console.log('Members table updated with county and locality.');
  } catch (error) {
    console.error('Error updating members table with address:', error);
  }
}

// Function to update statlogs table with presencounty and presentlocality
async function updateStatlogsTableWithAddress() {
  try {
    // Fetch statlogs data from the database
    const statlogsData = await db.any('SELECT * FROM statlogs');

    // Loop through each statlog and update presencounty and presentlocality
    for (const statlog of statlogsData) {
      const { latitude, longitude } = statlog;

      // Skip if latitude or longitude is missing
      if (!latitude || !longitude) {
        continue;
      }

      // Get presencounty and presentlocality from Geocoding API
      const { county, locality } = await getAddressFromGeocodingAPI(latitude, longitude);
      // Check if county and locality are available
      if (county !== null && locality !== null) {
        // Update statlogs table with presencounty and presentlocality
        const updateQuery = `
          UPDATE statlogs
          SET presentcounty = $1, presentlocality = $2
          WHERE id = $3;
        `;

        await db.none(updateQuery, [county, locality, statlog.id]);
      }
    }
    console.log('Statlogs table updated with presentcounty and presentlocality.');
  } catch (error) {
    console.error('Error updating statlogs table with address:', error);
  }
}



function generateColumnDefinitions(data) {
  const columns = ['id SERIAL PRIMARY KEY', ...Object.keys(data[0] || {}).map(column => `${column} VARCHAR(255)`)];
  
  return columns.join(',');
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
