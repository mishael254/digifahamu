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

const endpoints = [
  { path: '/api/getMembers', table: 'members', apiEndpoint: 'http://tathmini.live/api/member-details/' },
  { path: '/api/getFeedbacks', table: 'feedbacks', apiEndpoint: 'http://tathmini.live/api/feedback/' },
  { path: '/api/getDeployments', table: 'deployments', apiEndpoint: 'http://tathmini.live/api/deployments/' },
  { path: '/api/getStatlog', table: 'statlogs', apiEndpoint: 'http://tathmini.live/api/statlog/' },
  { path: '/api/getMessages', table: 'messages', apiEndpoint: 'http://tathmini.live/api/messages/' },
  { path: '/api/getPlaylist', table: 'playlists', apiEndpoint: 'http://tathmini.live/api/playlists/' },
  { path: '/api/getProjects', table: 'projects', apiEndpoint: 'http://tathmini.live/api/projects/' },
];

endpoints.forEach(endpoint => {
  app.get(endpoint.path, async (req, res) => {
    try {
      const response = await axios.get(endpoint.apiEndpoint);
      const data = response.data;

      await createTableIfNotExists(endpoint.table, data);
      await saveDataToDatabase(endpoint.table, data);

      if (endpoint.table === 'members') {
        await updateMembersTableWithAddress();
      } else if (endpoint.table === 'statlogs') {
        await updateStatlogsTableWithAddress();
      } else if (endpoint.table === 'feedbacks') {
        await updateFeedbacksUniqueIdentifier();
      }

      const dbData = await db.any(`SELECT * FROM ${endpoint.table}`);
      res.status(200).json(dbData);
    } catch (error) {
      console.error(`Error handling ${endpoint.path}:`, error);
      res.status(500).send('Internal Server Error');
    }
  });
});

async function createTableIfNotExists(tableName, data) {
  try {
    const tableExistsQuery = `SELECT to_regclass('public.${tableName}')`;
    const tableExistsResult = await db.oneOrNone(tableExistsQuery);

    if (!tableExistsResult.to_regclass) {
      const columns = generateColumnDefinitions(tableName, data);
      const createTableQuery = `CREATE TABLE ${tableName} (${columns});`;
      await db.none(createTableQuery);
      console.log(`Table "${tableName}" created.`);
    }
  } catch (error) {
    console.error(`Error checking or creating table "${tableName}":`, error);
  }
}

function generateColumnDefinitions(tableName, data) {
  const columnDefinitions = {
    members: `
      id SERIAL PRIMARY KEY,
      memberuuid UUID UNIQUE,
      project INTEGER,
      membergroup INTEGER,
      phone VARCHAR(255),
      county VARCHAR(255),
      locality VARCHAR(255)
    `,
    feedbacks: `
      id SERIAL PRIMARY KEY,
      messageuuid UUID,
      phone VARCHAR(255),
      feedback TEXT,
      message VARCHAR(255),
      feedbacktype VARCHAR(255),
      unique_identifier VARCHAR(255)
    `,
    deployments: `
      id SERIAL PRIMARY KEY,
      deployment INTEGER,
      deploymentdate TIMESTAMP,
      project JSONB,
      title VARCHAR(255),
      thumbnail VARCHAR(255)
    `,
    statlogs: `
      id SERIAL PRIMARY KEY,
      messageuuid UUID,
      messagetitle VARCHAR(255),
      phone VARCHAR(255),
      firsttimeplayed TIMESTAMP,
      lasttimeplayed TIMESTAMP,
      numberoftimesplayed INTEGER,
      numberofsecondsplayed INTEGER
    `,
    messages: `
      id SERIAL PRIMARY KEY,
      messageuuid UUID,
      language INTEGER,
      dateuploaded TIMESTAMP,
      playlist JSONB,
      messagedescription TEXT,
      messagetype VARCHAR(255),
      messagefile VARCHAR(255),
      uploadmessage VARCHAR(255),
      messagetitle VARCHAR(255),
      messagetopic VARCHAR(255),
      messagesubtopic VARCHAR(255)
    `,
    playlists: `
      id SERIAL PRIMARY KEY,
      playlist INTEGER,
      deployment JSONB,
      title VARCHAR(255)
    `,
    projects: `
      id SERIAL PRIMARY KEY,
      projectuuid UUID,
      projectname VARCHAR(255),
      anthem VARCHAR(255),
      theme VARCHAR(255),
      mode VARCHAR(255)
    `,
    phonefeedbackmapping: `
      id SERIAL PRIMARY KEY,
      phone VARCHAR(255),
      unique_identifier VARCHAR(255)
    `,
  };

  return columnDefinitions[tableName];
}

async function saveDataToDatabase(tableName, data) {
  try {
    const columns = Object.keys(data[0]);
    const columnList = columns.join(', ');
    const valuesPlaceholders = columns.map((_, index) => `$${index + 1}`).join(', ');
    const insertQuery = `INSERT INTO ${tableName} (${columnList}) VALUES (${valuesPlaceholders}) ON CONFLICT (id) DO NOTHING;`;

    for (const item of data) {
      const values = columns.map(column => transformValue(tableName, column, item[column]));
      await db.none(insertQuery, values);
    }
    console.log(`Data saved to ${tableName} successfully.`);
  } catch (error) {
    console.error(`Error saving data to table "${tableName}":`, error);
  }
}

function transformValue(tableName, column, value) {
  if (tableName === 'statlogs') {
    if (['lasttimeplayed', 'firsttimeplayed'].includes(column.toLowerCase()) && (value === '0' || value === '')) {
      return '1970-01-01 00:00:00';  // default fallback timestamp
    }
    if (column.toLowerCase() === 'numberoftimesplayed' && (value === null || value === '')) {
      return 0;
    }
  }
  if (column === 'latitude' || column === 'longitude') {
    return parseFloat(value);
  }
  if (column === 'deployment' && tableName === 'deployments') {
    return value;
  }
  return value;
}

async function updateFeedbacksUniqueIdentifier() {
  try {
    const updateQuery = `
      UPDATE feedbacks AS f
      SET unique_identifier = m.unique_identifier
      FROM phonefeedbackmapping AS m
      WHERE f.phone = m.phone;
    `;
    await db.none(updateQuery);
    console.log('Unique identifiers updated in the feedbacks table.');
  } catch (error) {
    console.error('Error updating unique identifiers in the feedbacks table:', error);
  }
}

async function getAddressFromGeocodingAPI(latitude, longitude) {
  try {
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    const response = await axios.get(apiUrl);

    if (response.data && response.data.results && response.data.results.length > 0) {
      const addressComponents = response.data.results[0].address_components;
      const county = extractAddressComponent(addressComponents, 'administrative_area_level_1');
      const locality = extractAddressComponent(addressComponents, 'locality');
      return { county, locality };
    }
    return { county: null, locality: null };
  } catch (error) {
    console.error('Error getting address from Geocoding API:', error);
    return { county: null, locality: null };
  }
}

function extractAddressComponent(addressComponents, type) {
  for (const component of addressComponents) {
    if (component.types.includes(type)) {
      return component.long_name;
    }
  }
  return null;
}

async function updateMembersTableWithAddress() {
  try {
    const membersData = await db.any('SELECT * FROM members');
    for (const member of membersData) {
      const { latitude, longitude } = member;
      if (!latitude || !longitude) continue;

      const { county, locality } = await getAddressFromGeocodingAPI(latitude, longitude);
      if (county !== null && locality !== null) {
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

async function updateStatlogsTableWithAddress() {
  try {
    const statlogsData = await db.any('SELECT * FROM statlogs');
    for (const statlog of statlogsData) {
      const { latitude, longitude } = statlog;
      if (!latitude || !longitude) continue;

      const { county, locality } = await getAddressFromGeocodingAPI(latitude, longitude);
      if (county !== null && locality !== null) {
        const updateQuery = `
          UPDATE statlogs
          SET presentcounty = $1, presentlocality = $2
          WHERE id = $3;
        `;
        await db.none(updateQuery, [county, locality, statlog.id]);
      }
    }
    console.log('Statlogs table updated with county and locality.');
  } catch (error) {
    console.error('Error updating statlogs table with address:', error);
  }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
