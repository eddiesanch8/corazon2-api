import connectToDatabase from "./db.js";
const pool = await connectToDatabase();

export const initProductsTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category ENUM('Tops', 'Bottoms', 'Accessories'),
      location VARCHAR(50),
      item_condition ENUM('Thrifted','Gently Used', 'New', 'Unknown'),
      price DECIMAL(10,2) NOT NULL,
      image VARCHAR(255),
      description TEXT,
      alt_text VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )
  `;
  pool.query(query, (err) => {
    if (err) console.error("Error creating products table:", err);
    else console.log("Product table ready ready");
  });
};

export const seedProducts = () => {
  const seedProducts = [
    [
      "The Churse",
      "Accessories",
      "Charlotte, NC",
      "New",
      29.99,
      "/churse.png",
      "Famously dubbed 'The Churse', this plucky purse will turn heads everywhere you go. You can't go wrong with this statement piece. Did you know? Corazon was founded from the Churse concept alone back in 2024.",
      "A quirky chicken purse",
    ],
    [
      "Tapestry Puff",
      "Tops",
      "New York, NY",
      "Unknown",
      35.49,
      "/puffer-m.jpg",
      "This handmade puffer jacket is your go-to look for whenever you need to make a splash. It's comfy, cozy, and couture. Handmade stitches line this puffer jacket and the details are woven throughout the entire product. The tapestry design is absolutely iconic and pairs with literally everything in your closet.",
      "Tapestry Puffer Jacket",
    ],
    [
      "Twin Moons",
      "Accessories",
      "Greensboro, NC",
      "Thrifted",
      10.99,
      "/moon-earings.jpg",
      "This set of earrings will keep your friends starry-eyed. Want to look as beautiful as a night sky? Looking stunning never felt so easy. Just pop both on or leave only one in. Perfect for whatever 'phase' you're going through. It's not just a lunar cycle, mom!",
      "Golden Moon earings against a blue background",
    ],
    [
      "Fairy Top",
      "Tops",
      "Los Angeles, CA",
      "Unknown",
      39.99,
      "/fairy-top.png",
      "✨She was a fairy✨ This magical top is sure to bring a sparkle to your eyes and defeat any dragons in your path. Wear it to the office as the one and only office siren or rock it on a night out so you can enchant all those who cross your path.",
      "Intricate Fairy Outfit",
    ],
    [
      "Pink Punk Fur",
      "Tops",
      "Charlotte, NC",
      "Gently Used",
      25.99,
      "/faux-fur.png",
      "Kitschy cute faux fur fox coat. Say that three times fast. We dare you. Give them attitude while putting your paws up and slaying the runway. This pink dream is perfect for adding some texture and personality to any fit. Warning: may cause excessive compliments and main character energy.",
      "Black and Pink fur coat",
    ],
    [
      "Robin Blue Top",
      "Tops",
      "Wilmington, NC",
      "New",
      34.99,
      "/cropped-blue.png",
      "This pixie blue top was handmade by one of our community partners. Support local businesses and look chic while doing it. You can't go wrong with this 100% cotton top that's accented with intricate lacework. The robin's egg blue shade is giving coastal grandmother meets fairy core, and we're obsessed.",
      "A baby blue top with lace",
    ],
    [
      "Star-crossed Jeans",
      "Bottoms",
      "Los Angeles, CA",
      "Thrifted",
      29.99,
      "/star-jeans.webp",
      "Make a wish! If you asked for big savings and cute couture jeans, you came to the right place. These baggy jeans are a mixture of just the right amount of whimsy with a dash of edge. You can't go wrong when you wish upon a star.",
      "Star-outlined blue jeans",
    ],
    [
      "Acid Jeans",
      "Bottoms",
      "New York, NY",
      "Thrifted",
      19.99,
      "/acid-jeans.jpg",
      "What's the best way to avoid being basic? Raise your pH levels with these custom acid-washed jeans. Nothing says 'I'm here to break down barriers' like some corrosive style.",
      "Acid washed black jeans",
    ],
    [
      "Cherri Earrings",
      "Accessories",
      "Los Angeles, CA",
      "New",
      12.59,
      "/cherry-earings.webp",
      "Cherry earrings to sparkle and sweeten every outfit. The perfect pop of color and playfulness for literally any vibe. These cuties are lightweight, and give summer vibes all the way. Be as sweet or as sour as you want to be, we won't tell anyone.",
      "Cherry earings against a pink backdrop",
    ],
    [
      "Heart Locket",
      "Accessories",
      "Charlotte, NC",
      "New",
      15.99,
      "/locket-heart2.png",
      "You know what they say: wear your heart on your shoulder. Or something like that. Who came up with that saying anyways? E-m-b-arassing!!",
      "Gold heart shaped locket",
    ],
    [
      "Belly Chain",
      "Accessories",
      "Los Angeles, CA",
      "New",
      14.99,
      "/belly-chain.png",
      "Wrap your mind around this: a sparkly chain that goes around the waist, allowing for maximum slay with minimum effort. Beach day? Festival season? Random Tuesday? Yes, yes, and yes.",
      "Belly chain with crosses",
    ],
    [
      "Labubu Chain",
      "Accessories",
      "New York, NY",
      "Gently Used",
      69.99,
      "/labubu-chain.png",
      "Labubu, labubu! Now your necklace can literally match your outfit. 'You are the proud owner of the world's first 14 karat Labubu!' Just kidding, it's sterling silver. This is a thrift shop not a pawn shop.",
      "Labubu chain with silver",
    ],
    [
      "Chunky Belt",
      "Accessories",
      "Charlotte, NC",
      "Thrifted",
      10.99,
      "/chunky-belt2.jpg",
      "A chunky belt that goes with any outfit. Sometimes the simplest pieces make the biggest statement. Cinch it, style it, slay it.",
      "Brown clunky belt",
    ],
  ];

  pool.query("SELECT COUNT(*) AS count FROM products", (err, results) => {
    if (err) return console.error(err);
    if (results[0].count === 0) {
      const insertQuery =
        "INSERT INTO products (name, category, location, item_condition, price, image, description, alt_text) VALUES ?";
      pool.query(insertQuery, [seedProducts], (err) => {
        if (err) console.error("Error seeding products:", err);
        else console.log("Products inserted");
      });
    }
  });
};

export const getProducts = (category) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM products";
    const params = [];
    if (category) {
      query += " WHERE category = ?";
      params.push(category);
    }
    pool.query(query, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};
