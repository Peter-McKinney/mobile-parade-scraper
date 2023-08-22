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
  "Sat, 04 Feb 2023 00:30:00 GMT": "Conde Cavaliers",
  "Sat, 04 Feb 2023 20:00:00 GMT": "Bayport Parading Society",
  "Sat, 04 Feb 2023 20:30:00 GMT": "Mystic DJ Riders",
  "Sun, 05 Feb 2023 00:30:00 GMT": "Pharaohs' Mystic Society",
  "Sun, 05 Feb 2023 01:00:00 GMT": "Conde Explorers",
  "Fri, 10 Feb 2023 00:30:00 GMT": "Order of Polka Dots",
  "Sat, 11 Feb 2023 00:30:00 GMT": "Order of Inca",
  "Sat, 11 Feb 2023 20:00:00 GMT": "Mobile Mystics",
  "Sat, 11 Feb 2023 20:30:00 GMT": "Mobile Mystical Revelers",
  "Sat, 11 Feb 2023 21:00:00 GMT": "Mobile Mystical Friends",
  "Sun, 12 Feb 2023 00:30:00 GMT": "Maids of Mirth (Route G)",
  "Sun, 12 Feb 2023 01:00:00 GMT": "Order of Butterfly Maidens",
  "Sun, 12 Feb 2023 01:30:00 GMT": "Krewe of Marry Mates",
  "Mon, 13 Feb 2023 00:30:00 GMT": "Neptune’s Daughters",
  "Mon, 13 Feb 2023 01:00:00 GMT": "Order of Isis",
  "Tue, 14 Feb 2023 00:30:00 GMT": "Order of Venus",
  "Tue, 14 Feb 2023 01:00:00 GMT": "Order of Many Faces",
  "Wed, 15 Feb 2023 00:30:00 GMT": "Order of LaShe’s",
  "Wed, 15 Feb 2023 01:00:00 GMT": "Order of Olympia",
  "Fri, 17 Feb 2023 00:30:00 GMT": "Mystic Stripers Society",
  "Sat, 18 Feb 2023 00:30:00 GMT": "Crewe of Columbus",
  "Sat, 18 Feb 2023 01:00:00 GMT": "Krewe de Secondline",
  "Sat, 18 Feb 2023 06:00:00 GMT": "King Felix III Parade",
  "Sat, 18 Feb 2023 18:30:00 GMT": "Knights of Revelry",
  "Sat, 18 Feb 2023 19:00:00 GMT": "King Felix III Parade",
  "Sat, 18 Feb 2023 19:30:00 GMT": "Comic Cowboys",
  "Sat, 18 Feb 2023 20:00:00 GMT": "MAMGA Mammoth (Route B)",
  "Sat, 18 Feb 2023 23:45:00 GMT": "Mystics of Time (Route H)",
  "Sat, 18 Feb 2023 20:30:00 GMT": "Joe Cain Marchers",
  "Sat, 18 Feb 2023 21:00:00 GMT": "MLK Business & Civic Organization Parade (Route D)",
  "Sat, 18 Feb 2023 23:00:00 GMT": "Le Krewe de Bienville",
  "Sat, 18 Feb 2023 21:30:00 GMT": "MLK Monday Mystics (Route D)",
  "Sat, 18 Feb 2023 22:00:00 GMT": "Northside Merchants (Route D)",
  "Sun, 19 Feb 2023 01:00:00 GMT": "Infant Mystics (Route F)",
  "Sun, 19 Feb 2023 01:30:00 GMT": "Order of Doves (Route F)",
  "Sat, 18 Feb 2023 06:30:00 GMT": "Order of Athena",
  "Sun, 19 Feb 2023 00:00:00 GMT": "Order of Myths (Route C)"
}
```

# Scripts

Tests, linting, formatting scripts are defined in package.json.
