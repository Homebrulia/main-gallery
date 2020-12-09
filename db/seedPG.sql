COPY falselia.users
FROM '/home/rolo/Documents/SEI-hrsf131/Main-Gallery/db/data/SQLusers.csv'
DELIMITER '^'
CSV HEADER;

COPY falselia.agents
FROM '/home/rolo/Documents/SEI-hrsf131/Main-Gallery/db/data/SQLagents.csv'
DELIMITER '^'
CSV HEADER;

COPY falselia.searches
FROM '/home/rolo/Documents/SEI-hrsf131/Main-Gallery/db/data/SQLsearchs.csv'
DELIMITER '^'
CSV HEADER;

COPY falselia.images
FROM '/home/rolo/Documents/SEI-hrsf131/Main-Gallery/db/data/SQLimages.csv'
DELIMITER '^'
CSV HEADER;

COPY falselia.schools
FROM '/home/rolo/Documents/SEI-hrsf131/Main-Gallery/db/data/SQLschools.csv'
DELIMITER '^'
CSV HEADER;

COPY falselia.paymentInfo
FROM '/home/rolo/Documents/SEI-hrsf131/Main-Gallery/db/data/SQLpaymentInfos.csv'
DELIMITER '^'
CSV HEADER;

COPY falselia.listings
FROM '/home/rolo/Documents/SEI-hrsf131/Main-Gallery/db/data/SQLlistings.csv'
DELIMITER '^'
CSV HEADER;

