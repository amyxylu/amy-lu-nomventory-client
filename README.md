# Nomventory

**Nomventory** is a recipe-finding web application that helps users discover meals they can cook using ingredients they already have at home.

With food waste being a growing issue, **Nomventory aims to reduce waste** by inspiring users to make the most of their available ingredients. The app is designed as an **interactive experience** with a nostalgic **pixel-art cooking game aesthetic**, featuring engaging visuals and music that transport users back to their childhood.

### Features:

- **Ingredient-Based Recipe Matching** – Find recipes based on what you have at home.
- **Ingredient Exclusion** – Remove ingredients you dislike or are allergic to.
- **Pixel Art & Nostalgic Design** – Enjoy a fun, game-like cooking experience.

### Future Enhancements:

- **User Authentication** – Save preferences and favorite recipes.
- **Smarter Ingredient Filtering** – Improve recipe suggestions based on user behavior.
- **Gamification** – Challenges, rewards, and achievements to enhance engagement.

## Set-up Instructions

### Server Side

1. Open folder using VS Code
2. Open Terminal and run `npm install`
3. Create a **.env** file and copy the text over from .env.sample. Update with your Database info if necessary.
4. Using mySQL, create a database called **Nomventory**
5. Using terminal, run `npx knex migrate:latest` to create the tables in the database
6. Using terminal, run `npx knex seed:run` to seed the data into the tables
7. Using terminal, run `node --watch server.js` to start the server

### Client Side

1. Open folder using VS Code
2. Open Terminal and run `npm install`
3. Create a **.env** file and copy the text over from .env.sample. Update the base url if necessary, to match your server side port set up.
4. Using terminal, run `npm run dev`
5. Open browser link and enjoy the experience!
