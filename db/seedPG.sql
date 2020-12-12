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

CREATE INDEX listings_user_id  ON falselia.listings(user_id);
CREATE INDEX listings_agent_id  ON falselia.listings(agent_id);
CREATE INDEX listings_address  ON falselia.listings(address);
CREATE INDEX listings_price  ON falselia.listings(price);
CREATE INDEX schools_listing_id  ON falselia.schools(listing_id);
CREATE INDEX searches_user_id  ON falselia.searches(user_id);
CREATE INDEX images_listing_id  ON falselia.images(listing_id);
CREATE INDEX paymentInfo_user_id  ON falselia.paymentInfo(user_id);
CREATE INDEX users_name  ON falselia.users(name);
CREATE INDEX users_email  ON falselia.users(email);
CREATE INDEX agents_name  ON falselia.agents(name);
CREATE INDEX agents_email  ON falselia.agents(email);

CREATE TABLE falselia.managing AS SELECT agents.agent_id, listings.listing_id FROM agents INNER JOIN listings ON listings.agent_id = agents.agent_id ORDER BY agent_id ASC;

CREATE TABLE falselia.favorites AS SELECT users.user_id, listings.listing_id FROM users INNER JOIN listings ON listings.user_id = users.user_id ORDER BY user_id ASC;

