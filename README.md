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
output/parade-schedule.json
output/parade-schedule.formatted.json

```json
{
  "2023-02-04T00:30:00.000Z": "Conde Cavaliers",
  "2023-02-04T20:00:00.000Z": "Bayport Parading Society",
  "2023-02-04T20:30:00.000Z": "Mystic DJ Riders",
  "2023-02-05T00:30:00.000Z": "Pharaohs' Mystic Society",
  "2023-02-05T01:00:00.000Z": "Conde Explorers",
  "2023-02-10T00:30:00.000Z": "Order of Polka Dots",
  "2023-02-11T00:30:00.000Z": "Order of Inca",
  "2023-02-11T20:00:00.000Z": "Mobile Mystics",
  "2023-02-11T20:30:00.000Z": "Mobile Mystical Revelers",
  "2023-02-11T21:00:00.000Z": "Mobile Mystical Friends",
  "2023-02-12T00:30:00.000Z": "Maids of Mirth (Route G)",
  "2023-02-12T01:00:00.000Z": "Order of Butterfly Maidens",
  "2023-02-12T01:30:00.000Z": "Krewe of Marry Mates",
  "2023-02-13T00:30:00.000Z": "Neptune’s Daughters",
  "2023-02-13T01:00:00.000Z": "Order of Isis",
  "2023-02-14T00:30:00.000Z": "Order of Venus",
  "2023-02-14T01:00:00.000Z": "Order of Many Faces",
  "2023-02-15T00:30:00.000Z": "Order of LaShe’s",
  "2023-02-15T01:00:00.000Z": "Order of Olympia",
  "2023-02-17T00:30:00.000Z": "Mystic Stripers Society",
  "2023-02-18T00:30:00.000Z": "Crewe of Columbus",
  "2023-02-18T01:00:00.000Z": "Krewe de Secondline",
  "2023-02-18T06:00:00.000Z": "King Felix III Parade",
  "2023-02-18T18:30:00.000Z": "Knights of Revelry",
  "2023-02-18T19:00:00.000Z": "King Felix III Parade",
  "2023-02-18T19:30:00.000Z": "Comic Cowboys",
  "2023-02-18T20:00:00.000Z": "MAMGA Mammoth (Route B)",
  "2023-02-18T23:45:00.000Z": "Mystics of Time (Route H)",
  "2023-02-18T20:30:00.000Z": "Joe Cain Marchers",
  "2023-02-18T21:00:00.000Z": "MLK Business & Civic Organization Parade (Route D)",
  "2023-02-18T23:00:00.000Z": "Le Krewe de Bienville",
  "2023-02-18T21:30:00.000Z": "MLK Monday Mystics (Route D)",
  "2023-02-18T22:00:00.000Z": "Northside Merchants (Route D)",
  "2023-02-19T01:00:00.000Z": "Infant Mystics (Route F)",
  "2023-02-19T01:30:00.000Z": "Order of Doves (Route F)",
  "2023-02-18T06:30:00.000Z": "Order of Athena",
  "2023-02-19T00:00:00.000Z": "Order of Myths (Route C)"
}
```

# Scripts

Tests, linting, formatting scripts are defined in package.json.
