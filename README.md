# Mobile Parade Scraper

A web scraper for the Mobile, Al Mardis Gras parade schedule posted on the
Mobile city website https://www.cityofmobile.org/mardi-gras/. Built in
TypeScript using https://cheerio.js.org/

# Setup

```bash
npm ci
npm run start
```

The parade schedule will be output to a json file containing a dictionary to
dist/parade-schedule.json
dist/parade-schedule.formatted.json

```json
{
  "Conde Cavaliers Parade": "2022-02-11T18:30:00.000Z",
  "Bayport Parading Society Parade & Mystic DJ Riders": "2022-02-12T19:00:00.000Z",
  "Pharaohs Parade": "2022-02-12T19:00:00.000Z",
  "Conde Explorers Parade": "2022-02-12T19:00:00.000Z",
  "Order of Polka Dots Parade": "2022-02-17T18:30:00.000Z",
  "Order of Inca Parade": "2022-02-18T18:30:00.000Z",
  "Mobile Mystics Parade": "2022-02-19T19:30:00.000Z",
  "Mobile Mystical Revelers Parade": "2022-02-19T19:30:00.000Z",
  "Maids of Mirth Parade (Route G)": "2022-02-19T19:30:00.000Z",
  "Order of Butterfly Maidens Parade": "2022-02-19T19:30:00.000Z",
  "Krewe of Marry Mates, Order of Hebe & Krewe de Secondline": "2022-02-19T19:30:00.000Z",
  "Neptune’s Daughters Parade": "2022-02-20T19:00:00.000Z",
  "Order of Isis Parade": "2022-02-20T19:00:00.000Z",
  "Order of Venus Parade": "2022-02-21T19:00:00.000Z",
  "Order of Many Faces Parade": "2022-02-21T19:00:00.000Z",
  "Order of LaShe’s Parade": "2022-02-22T18:30:00.000Z",
  "Mystic Stripers Society Parade": "2022-02-24T18:30:00.000Z",
  "Crewe of Columbus Parade": "2022-02-25T18:30:00.000Z",
  "Floral Parade": "2022-02-26T18:00:00.000Z",
  "Knights of Mobile Parade & Joy of Life Parade": "2022-02-26T18:00:00.000Z",
  "Mobile Mystical Ladies Parade": "2022-02-26T18:00:00.000Z",
  "Order of Angels Parade": "2022-02-26T18:00:00.000Z",
  "Mystics of Time Parade (Route H)": "2022-02-26T18:00:00.000Z",
  "King Elexis I Motorcade (Route E)": "2022-02-26T18:00:00.000Z",
  "Joe Cain Procession": "2022-02-26T18:00:00.000Z",
  "Le Krewe de Bienville Parade": "2022-02-26T18:00:00.000Z",
  "King Felix III Parade": "2022-02-26T18:00:00.000Z",
  "MLK Business & Civic Organization Parade (Route D)": "2022-02-26T18:00:00.000Z",
  "MLK Monday Mystics Parade (Route D)": "2022-02-26T18:00:00.000Z",
  "Northside Merchants Parade (Route D)": "2022-02-26T18:00:00.000Z",
  "Infant Mystics Parade (Route F)": "2022-02-26T18:00:00.000Z",
  "Order of Doves Parade (Route F)": "2022-02-26T18:00:00.000Z",
  "Order of Athena Parade": "2022-02-26T18:00:00.000Z",
  "Knights of Revelry Parade": "2022-02-26T18:00:00.000Z",
  "Comic Cowboys Parade": "2022-02-26T18:00:00.000Z",
  "MAMGA Mammoth Parade (Route B)": "2022-02-26T18:00:00.000Z",
  "Order of Myths Parade (Route C)": "2022-02-26T18:00:00.000Z"
}
```

# Scripts

Tests, linting, formatting scripts are defined in package.json.
