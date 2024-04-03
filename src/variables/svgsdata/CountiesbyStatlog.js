// CountiesByStatlog.js

import React, { useEffect, useState } from 'react';

//const flagImages = importAll(require.context("assets/flags", false, /\.(png)$/));
const flagMappings = {
  'muranga county': 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Flag_of_Murang%27a_County.gif',
  'kilifi county': 'https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Kilifi_County.png',
  'mombasa county': 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Mombasa.png',
  'kwale county': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Kwale_County_Flag.svg/320px-Kwale_County_Flag.svg.png',
  'tanariver county': 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Tana_River_County.gif',
  'lamu county': 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Lamu_County_Flag.png',
  'taitataveta county': 'https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Taita_Taveta_County.png',
  'garissa county': 'https://upload.wikimedia.org/wikipedia/commons/9/95/Flag_of_Garissa_County.gif',
  'wajir county': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Wajir_County_Flag.svg/500px-Wajir_County_Flag.svg.png',
  'mandera county': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_Mandera_County%2C_Kenya.svg/512px-Flag_of_Mandera_County%2C_Kenya.svg.png',
  'marsabit county': 'https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Marsabit_County.png',
  'isiolo county': 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Flag_of_Isiolo_County.gif',
  'meru county': 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Meru_County.png',
  'tharakanithi county': 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Tharaka_Nithi_County.gif',
  'embu county': 'https://upload.wikimedia.org/wikipedia/commons/3/37/Flag_of_Embu_County.gif',
  'kitui county': 'https://upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Kitui_County.gif',
  'machakos county': 'https://upload.wikimedia.org/wikipedia/commons/1/10/Flag_of_Machakos_County.png',
  'makueni county': 'https://upload.wikimedia.org/wikipedia/commons/d/db/Flag_of_Makueni_County.gif',
  'nyandarua county': 'https://upload.wikimedia.org/wikipedia/commons/3/37/Flag_of_Nyandarua_County.png',
  'nyeri county': 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Flag_of_Nyeri_County.gif',
  'kirinyaga county': 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Flag_of_Kirinyaga_County.gif',
  'kiambu county': 'https://www.crwflags.com/fotw/images/k/ke-kiam1.gif',
  'turkana county': 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Turkana_County.gif',
  'westpokot county': 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Flag_of_West_Pokot_County.png',
  'samburu county': 'https://upload.wikimedia.org/wikipedia/commons/6/60/Flag_of_Samburu_County.png',
  'transzoia county': 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Flag_of_Trans_Nzoia_County.gif',
  'uasingishu county': 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Uasin_Gishu_County.gif',
  'elgeyomarakwet county': 'https://upload.wikimedia.org/wikipedia/commons/8/87/Elgeyo_Marakwet_Flag.png',
  'nandi county': 'https://upload.wikimedia.org/wikipedia/commons/1/15/Contea_di_Nandi_flag.gif',
  'baringo county': 'https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Baringo_County.png',
  'laikipia county': 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Laikipia_County.png',
  'nakuru county': 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Flag_of_Nakuru_County.gif',
  'narok county': 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Flag_of_Narok_County.gif',
  'kajiado county': 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Coat_of_Arms_of_Kajiado_County.png',
  'kericho county': 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Flag_of_Kericho_County.gif',
  'bomet county': 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Flag_of_Bomet_County.png',
  'kakamega county': 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Kakamega_County.gif',
  'vihiga county': 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Vihiga_County.gif',
  'bungoma county': 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Bungoma_County.gif',
  'busia county': 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Busia_County.png',
  'siaya county': 'https://upload.wikimedia.org/wikipedia/commons/8/86/Flag_of_Siaya_County.png',
  'kisumu county': 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Kisumu_County.png',
  'homabay county': 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Homa_Bay_County.png',
  'migori county': 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Flag_of_Migori_County.gif',
  'kisii county': 'https://upload.wikimedia.org/wikipedia/commons/5/58/Flag_of_Kisii_County.gif',
  'nyamira county': 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Flag_of_Nyamira_County.gif',
  'nairobi county': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Flag_of_Nairobi.png',
  

  // Add other counties and their flag URLs here
};

const CountiesByStatlog = ({ statlogs }) => {
  const [sortedCounties, setSortedCounties] = useState([]);

  useEffect(() => {
    // 1. Filter statlogs by presentcounty
    const filteredStatlogs = statlogs.filter(statlog => statlog.presentcounty);

    // 2. Count occurrences of each county
    const countyCounts = filteredStatlogs.reduce((counts, statlog) => {
      const { presentcounty } = statlog;
      counts[presentcounty] = (counts[presentcounty] || 0) + 1;
      return counts;
    }, {});

    // 3. Sort counties by occurrence in descending order
    const sortedCountiesArray = Object.keys(countyCounts).sort((a, b) => countyCounts[b] - countyCounts[a]);

    // 4. Count occurrences of each locality within a county
    const countyLocalityCounts = filteredStatlogs.reduce((counts, statlog) => {
      const { presentcounty, presentlocality } = statlog;
      counts[presentcounty] = counts[presentcounty] || {};
      counts[presentcounty][presentlocality] = (counts[presentcounty][presentlocality] || 0) + 1;
      return counts;
    }, {});

    // 5. Calculate percentage for each county based on the number of localities
    const totalLocalities = filteredStatlogs.length;

    const countiesWithPercentage = sortedCountiesArray.map(county => {
      const localitiesInCounty = countyLocalityCounts[county] ? Object.keys(countyLocalityCounts[county]).length : 0;
      const percentage = totalLocalities > 0 ? (localitiesInCounty / totalLocalities) * 100 : 0;

      return {
        county,
        localities: countyLocalityCounts[county] || {},
        percentage: percentage.toFixed(2), // Format percentage to two decimal places
      };
    });

    // 6. Update the state with the sorted counties and locality counts
    setSortedCounties(countiesWithPercentage);
  }, [statlogs]); // Re-run this effect whenever statlogs change

  return (
    <table className="table">
      <tbody>
        {sortedCounties.map((data, index) => (
          <tr key={index}>
            <td>
              <div className="flag">
                {/* Use the hardcoded flag URL */}
                {flagMappings[data.county.toLowerCase()] && (
                  <img alt="..." src={flagMappings[data.county.toLowerCase()]} style={{ width: '30px', height: 'auto' }}/>
                )}
              </div>
            </td>
            <td >{data.county}</td>
            
            <td >{`${data.percentage}%`}</td>
            <td>
              {/* List of projects in this county */}
              <ul>
                {statlogs
                  .filter(statlog => statlog.presentcounty === data.county)
                  .map((project, projectIndex) => (
                    <li key={projectIndex}>{project.project}</li>
                  ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CountiesByStatlog;
