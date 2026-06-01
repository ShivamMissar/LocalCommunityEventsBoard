CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()  
);

CREATE TABLE events(
    id SERIAL PRIMARY KEY, 
    title VARCHAR(100),
    description VARCHAR(200), 
    category VARCHAR(100), 
    location VARCHAR(100), 
    date TIMESTAMP NOT NULL, 
    image_url VARCHAR(500), 
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(), 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE rsvps (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);