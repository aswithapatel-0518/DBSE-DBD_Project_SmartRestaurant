// ============================================================
// CATEGORY IMAGE LIBRARY
// ============================================================

const categoryImages = {
  Tiffins: "/food/idli.jpg",
  Starters: "/food/starter.jpg",
  "Main Course": "/food/main-course.jpg",
  Biryani: "/food/biryani.jpg",
  Chinese: "/food/chinese.jpg",
  Sides: "/food/sides.jpg",
  Desserts: "/food/dessert.jpg",
  Refreshments: "/food/drinks.jpg",
};


// ============================================================
// FOOD DATA
// ============================================================

const foodData = [

  // ==========================================================
  // TIFFINS
  // ==========================================================

  {
    id: 1,
    name: "Idli",
    category: "Tiffins",
    price: 60,
    rating: 4.7,
    description:
      "Soft steamed South Indian rice cakes served with sambar and chutney.",
    popular: true,
    vegetarian: true,
    emoji: "🥞",
  },

  {
    id: 2,
    name: "Masala Dosa",
    category: "Tiffins",
    price: 90,
    rating: 4.8,
    description:
      "Crispy dosa filled with spiced potato masala and served with chutney.",
    popular: true,
    vegetarian: true,
    emoji: "🥞",
  },

  {
    id: 3,
    name: "Plain Dosa",
    category: "Tiffins",
    price: 70,
    rating: 4.6,
    description:
      "Thin and crispy South Indian dosa served with sambar and chutney.",
    popular: false,
    vegetarian: true,
    emoji: "🥞",
  },

  {
    id: 4,
    name: "Vada",
    category: "Tiffins",
    price: 60,
    rating: 4.7,
    description:
      "Crispy golden South Indian vada served with coconut chutney.",
    popular: true,
    vegetarian: true,
    emoji: "🍩",
  },

  {
    id: 5,
    name: "Rava Idli",
    category: "Tiffins",
    price: 75,
    rating: 4.5,
    description:
      "Soft steamed semolina idli served with chutney and sambar.",
    popular: false,
    vegetarian: true,
    emoji: "🥞",
  },

  {
    id: 6,
    name: "Uttapam",
    category: "Tiffins",
    price: 85,
    rating: 4.6,
    description:
      "Thick South Indian pancake topped with vegetables and herbs.",
    popular: false,
    vegetarian: true,
    emoji: "🥞",
  },

  {
    id: 7,
    name: "Poori",
    category: "Tiffins",
    price: 80,
    rating: 4.6,
    description:
      "Fluffy deep-fried Indian bread served with potato curry.",
    popular: true,
    vegetarian: true,
    emoji: "🫓",
  },

  {
    id: 8,
    name: "Upma",
    category: "Tiffins",
    price: 65,
    rating: 4.4,
    description:
      "Savory South Indian semolina breakfast prepared with vegetables and spices.",
    popular: false,
    vegetarian: true,
    emoji: "🍲",
  },


  // ==========================================================
  // STARTERS
  // ==========================================================

  {
    id: 9,
    name: "Samosa",
    category: "Starters",
    price: 50,
    rating: 4.7,
    description:
      "Crispy pastry filled with spiced potato and peas.",
    popular: true,
    vegetarian: true,
    emoji: "🥟",
  },

  {
    id: 10,
    name: "Paneer Tikka",
    category: "Starters",
    price: 180,
    rating: 4.8,
    description:
      "Grilled paneer cubes marinated with Indian spices and vegetables.",
    popular: true,
    vegetarian: true,
    emoji: "🧀",
  },

  {
    id: 11,
    name: "Chicken 65",
    category: "Starters",
    price: 190,
    rating: 4.8,
    description:
      "Spicy crispy fried chicken pieces seasoned with aromatic spices.",
    popular: true,
    vegetarian: false,
    emoji: "🍗",
  },

  {
    id: 12,
    name: "Gobi 65",
    category: "Starters",
    price: 140,
    rating: 4.5,
    description:
      "Crispy cauliflower tossed in a spicy Indian masala.",
    popular: false,
    vegetarian: true,
    emoji: "🥦",
  },

  {
    id: 13,
    name: "Spring Rolls",
    category: "Starters",
    price: 130,
    rating: 4.4,
    description:
      "Crispy rolls filled with seasoned vegetables.",
    popular: false,
    vegetarian: true,
    emoji: "🥢",
  },

  {
    id: 14,
    name: "Chicken Tikka",
    category: "Starters",
    price: 220,
    rating: 4.8,
    description:
      "Tender chicken pieces marinated in spices and grilled until smoky.",
    popular: true,
    vegetarian: false,
    emoji: "🍗",
  },

  {
    id: 15,
    name: "Crispy Corn",
    category: "Starters",
    price: 150,
    rating: 4.6,
    description:
      "Crispy golden corn tossed with herbs and mild spices.",
    popular: true,
    vegetarian: true,
    emoji: "🌽",
  },


  // ==========================================================
  // MAIN COURSE
  // ==========================================================

  {
    id: 16,
    name: "Paneer Butter Masala",
    category: "Main Course",
    price: 220,
    rating: 4.8,
    description:
      "Soft paneer cooked in a rich creamy tomato and butter gravy.",
    popular: true,
    vegetarian: true,
    emoji: "🍛",
  },

  {
    id: 17,
    name: "Butter Chicken",
    category: "Main Course",
    price: 260,
    rating: 4.8,
    description:
      "Tender chicken cooked in a creamy tomato-based butter gravy.",
    popular: true,
    vegetarian: false,
    emoji: "🍗",
  },

  {
    id: 18,
    name: "Kadai Paneer",
    category: "Main Course",
    price: 230,
    rating: 4.7,
    description:
      "Paneer cooked with bell peppers, onions and aromatic kadai spices.",
    popular: true,
    vegetarian: true,
    emoji: "🍛",
  },

  {
    id: 19,
    name: "Palak Paneer",
    category: "Main Course",
    price: 210,
    rating: 4.7,
    description:
      "Soft paneer cooked in a creamy spinach and Indian spice gravy.",
    popular: false,
    vegetarian: true,
    emoji: "🍛",
  },

  {
    id: 20,
    name: "Dal Tadka",
    category: "Main Course",
    price: 140,
    rating: 4.5,
    description:
      "Yellow lentils tempered with spices, garlic and aromatic herbs.",
    popular: false,
    vegetarian: true,
    emoji: "🍲",
  },

  {
    id: 21,
    name: "Chana Masala",
    category: "Main Course",
    price: 160,
    rating: 4.5,
    description:
      "Chickpeas cooked in a flavorful onion, tomato and spice gravy.",
    popular: false,
    vegetarian: true,
    emoji: "🍛",
  },

  {
    id: 22,
    name: "Chicken Curry",
    category: "Main Course",
    price: 240,
    rating: 4.7,
    description:
      "Tender chicken cooked in a traditional aromatic Indian curry.",
    popular: true,
    vegetarian: false,
    emoji: "🍗",
  },

  {
    id: 23,
    name: "Mutton Curry",
    category: "Main Course",
    price: 280,
    rating: 4.8,
    description:
      "Tender mutton slow-cooked in a rich and flavorful Indian gravy.",
    popular: true,
    vegetarian: false,
    emoji: "🍖",
  },

  {
    id: 24,
    name: "Veg Thali",
    category: "Main Course",
    price: 220,
    rating: 4.7,
    description:
      "Complete Indian meal served with rice, breads, curries, dal and sides.",
    popular: true,
    vegetarian: true,
    emoji: "🍱",
  },

  {
    id: 25,
    name: "Veg Kolhapuri",
    category: "Main Course",
    price: 190,
    rating: 4.5,
    description:
      "Mixed vegetables cooked in a spicy and aromatic Kolhapuri gravy.",
    popular: false,
    vegetarian: true,
    emoji: "🥘",
  },


  // ==========================================================
  // BIRYANI
  // ==========================================================

  {
    id: 26,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 249,
    rating: 4.9,
    description:
      "Fragrant basmati rice cooked with tender chicken and aromatic spices.",
    popular: true,
    vegetarian: false,
    emoji: "🍚",
  },

  {
    id: 27,
    name: "Hyderabadi Chicken Biryani",
    category: "Biryani",
    price: 279,
    rating: 4.9,
    description:
      "Aromatic Hyderabadi-style biryani prepared with chicken and fragrant spices.",
    popular: true,
    vegetarian: false,
    emoji: "🍚",
  },

  {
    id: 28,
    name: "Mutton Biryani",
    category: "Biryani",
    price: 299,
    rating: 4.8,
    description:
      "Fragrant basmati rice layered with tender mutton and aromatic spices.",
    popular: true,
    vegetarian: false,
    emoji: "🍚",
  },

  {
    id: 29,
    name: "Veg Biryani",
    category: "Biryani",
    price: 199,
    rating: 4.6,
    description:
      "Aromatic basmati rice cooked with vegetables and traditional biryani spices.",
    popular: false,
    vegetarian: true,
    emoji: "🍚",
  },

  {
    id: 30,
    name: "Egg Biryani",
    category: "Biryani",
    price: 210,
    rating: 4.6,
    description:
      "Fragrant basmati rice layered with boiled eggs and aromatic spices.",
    popular: true,
    vegetarian: false,
    emoji: "🍚",
  },

  {
    id: 31,
    name: "Paneer Biryani",
    category: "Biryani",
    price: 220,
    rating: 4.6,
    description:
      "Aromatic basmati rice cooked with marinated paneer and biryani spices.",
    popular: false,
    vegetarian: true,
    emoji: "🍚",
  },

  {
    id: 32,
    name: "Mushroom Biryani",
    category: "Biryani",
    price: 210,
    rating: 4.5,
    description:
      "Fragrant rice cooked with mushrooms, herbs and traditional spices.",
    popular: false,
    vegetarian: true,
    emoji: "🍚",
  },

  {
    id: 33,
    name: "Chicken Tikka Biryani",
    category: "Biryani",
    price: 289,
    rating: 4.8,
    description:
      "Basmati rice combined with smoky chicken tikka and aromatic spices.",
    popular: true,
    vegetarian: false,
    emoji: "🍚",
  },


  // ==========================================================
  // CHINESE
  // ==========================================================

  {
    id: 34,
    name: "Veg Fried Rice",
    category: "Chinese",
    price: 160,
    rating: 4.5,
    description:
      "Fragrant fried rice tossed with fresh vegetables and Chinese seasonings.",
    popular: true,
    vegetarian: true,
    emoji: "🍚",
  },

  {
    id: 35,
    name: "Egg Fried Rice",
    category: "Chinese",
    price: 180,
    rating: 4.6,
    description:
      "Fried rice tossed with egg, vegetables and aromatic sauces.",
    popular: true,
    vegetarian: false,
    emoji: "🍚",
  },

  {
    id: 36,
    name: "Chicken Fried Rice",
    category: "Chinese",
    price: 210,
    rating: 4.7,
    description:
      "Fried rice tossed with chicken, vegetables, egg and Chinese seasonings.",
    popular: true,
    vegetarian: false,
    emoji: "🍚",
  },

  {
    id: 37,
    name: "Veg Noodles",
    category: "Chinese",
    price: 150,
    rating: 4.5,
    description:
      "Stir-fried noodles tossed with fresh vegetables and Chinese sauces.",
    popular: true,
    vegetarian: true,
    emoji: "🍜",
  },

  {
    id: 38,
    name: "Chicken Noodles",
    category: "Chinese",
    price: 190,
    rating: 4.7,
    description:
      "Stir-fried noodles tossed with chicken, vegetables and savory sauces.",
    popular: true,
    vegetarian: false,
    emoji: "🍜",
  },

  {
    id: 39,
    name: "Schezwan Noodles",
    category: "Chinese",
    price: 180,
    rating: 4.6,
    description:
      "Spicy noodles tossed with vegetables and bold Schezwan sauce.",
    popular: true,
    vegetarian: true,
    emoji: "🍜",
  },

  {
    id: 40,
    name: "Schezwan Fried Rice",
    category: "Chinese",
    price: 190,
    rating: 4.6,
    description:
      "Spicy fried rice prepared with vegetables and Schezwan sauce.",
    popular: false,
    vegetarian: true,
    emoji: "🍚",
  },

  {
    id: 41,
    name: "Veg Manchurian",
    category: "Chinese",
    price: 170,
    rating: 4.6,
    description:
      "Crispy vegetable balls tossed in a flavorful Indo-Chinese sauce.",
    popular: true,
    vegetarian: true,
    emoji: "🥢",
  },

  {
    id: 42,
    name: "Chicken Manchurian",
    category: "Chinese",
    price: 220,
    rating: 4.7,
    description:
      "Juicy chicken pieces tossed in a rich and spicy Manchurian sauce.",
    popular: true,
    vegetarian: false,
    emoji: "🍗",
  },

  {
    id: 43,
    name: "Chilli Paneer",
    category: "Chinese",
    price: 190,
    rating: 4.6,
    description:
      "Crispy paneer tossed with peppers, onions and spicy Indo-Chinese sauce.",
    popular: true,
    vegetarian: true,
    emoji: "🧀",
  },


  // ==========================================================
  // PIZZA & BURGERS
  // ==========================================================

  {
    id: 44,
    name: "Margherita Pizza",
    category: "Pizza & Burgers",
    price: 229,
    rating: 4.7,
    description:
      "Classic pizza topped with tomato sauce, mozzarella and herbs.",
    popular: true,
    vegetarian: true,
    emoji: "🍕",
  },

  {
    id: 45,
    name: "Farmhouse Pizza",
    category: "Pizza & Burgers",
    price: 269,
    rating: 4.7,
    description:
      "Loaded pizza topped with onion, capsicum, tomato and mushrooms.",
    popular: true,
    vegetarian: true,
    emoji: "🍕",
  },

  {
    id: 46,
    name: "Paneer Tikka Pizza",
    category: "Pizza & Burgers",
    price: 289,
    rating: 4.8,
    description:
      "Cheesy pizza topped with spicy paneer tikka and fresh vegetables.",
    popular: true,
    vegetarian: true,
    emoji: "🍕",
  },

  {
    id: 47,
    name: "Chicken Tikka Pizza",
    category: "Pizza & Burgers",
    price: 319,
    rating: 4.8,
    description:
      "Loaded pizza topped with smoky chicken tikka and melted cheese.",
    popular: true,
    vegetarian: false,
    emoji: "🍕",
  },

  {
    id: 48,
    name: "Veg Burger",
    category: "Pizza & Burgers",
    price: 179,
    rating: 4.5,
    description:
      "Crispy vegetable patty layered with lettuce, tomato and creamy sauce.",
    popular: false,
    vegetarian: true,
    emoji: "🍔",
  },

  {
    id: 49,
    name: "Cheese Burger",
    category: "Pizza & Burgers",
    price: 199,
    rating: 4.7,
    description:
      "Juicy burger layered with cheese, lettuce, tomato and special sauce.",
    popular: true,
    vegetarian: false,
    emoji: "🍔",
  },

  {
    id: 50,
    name: "Chicken Burger",
    category: "Pizza & Burgers",
    price: 219,
    rating: 4.8,
    description:
      "Juicy chicken patty with lettuce, cheese and creamy sauce.",
    popular: true,
    vegetarian: false,
    emoji: "🍔",
  },

  {
    id: 51,
    name: "Paneer Burger",
    category: "Pizza & Burgers",
    price: 189,
    rating: 4.6,
    description:
      "Crispy paneer patty served with lettuce, vegetables and creamy sauce.",
    popular: false,
    vegetarian: true,
    emoji: "🍔",
  },

  {
    id: 52,
    name: "Double Chicken Burger",
    category: "Pizza & Burgers",
    price: 279,
    rating: 4.8,
    description:
      "Double chicken patties layered with cheese, lettuce and signature sauce.",
    popular: true,
    vegetarian: false,
    emoji: "🍔",
  },


  // ==========================================================
  // SIDES
  // ==========================================================

  {
    id: 53,
    name: "French Fries",
    category: "Sides",
    price: 119,
    rating: 4.5,
    description:
      "Crispy golden potato fries served with a dipping sauce.",
    popular: true,
    vegetarian: true,
    emoji: "🍟",
  },

  {
    id: 54,
    name: "Peri Peri Fries",
    category: "Sides",
    price: 139,
    rating: 4.6,
    description:
      "Crispy fries tossed in spicy peri peri seasoning.",
    popular: true,
    vegetarian: true,
    emoji: "🍟",
  },

  {
    id: 55,
    name: "Cheese Fries",
    category: "Sides",
    price: 159,
    rating: 4.7,
    description:
      "Golden fries topped with creamy melted cheese.",
    popular: true,
    vegetarian: true,
    emoji: "🍟",
  },

  {
    id: 56,
    name: "Garlic Bread",
    category: "Sides",
    price: 139,
    rating: 4.6,
    description:
      "Toasted bread topped with garlic, butter and herbs.",
    popular: false,
    vegetarian: true,
    emoji: "🥖",
  },

  {
    id: 57,
    name: "Cheese Balls",
    category: "Sides",
    price: 149,
    rating: 4.5,
    description:
      "Crispy golden cheese-filled bites served with dipping sauce.",
    popular: false,
    vegetarian: true,
    emoji: "🧀",
  },

  {
    id: 58,
    name: "Potato Wedges",
    category: "Sides",
    price: 139,
    rating: 4.5,
    description:
      "Crispy seasoned potato wedges served with a creamy dip.",
    popular: false,
    vegetarian: true,
    emoji: "🥔",
  },

  {
    id: 59,
    name: "Mozzarella Sticks",
    category: "Sides",
    price: 179,
    rating: 4.7,
    description:
      "Crispy coated mozzarella sticks served with tomato dip.",
    popular: true,
    vegetarian: true,
    emoji: "🧀",
  },

  {
    id: 60,
    name: "Masala Papad",
    category: "Sides",
    price: 80,
    rating: 4.4,
    description:
      "Crispy papad topped with onion, tomato, coriander and spices.",
    popular: false,
    vegetarian: true,
    emoji: "🥗",
  },


  // ==========================================================
  // DESSERTS
  // ==========================================================

  {
    id: 61,
    name: "Gulab Jamun",
    category: "Desserts",
    price: 99,
    rating: 4.8,
    description:
      "Soft milk dumplings soaked in fragrant sugar syrup.",
    popular: true,
    vegetarian: true,
    emoji: "🍮",
  },

  {
    id: 62,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 149,
    rating: 4.9,
    description:
      "Rich chocolate cake finished with creamy chocolate frosting.",
    popular: true,
    vegetarian: true,
    emoji: "🍰",
  },

  {
    id: 63,
    name: "Brownie",
    category: "Desserts",
    price: 129,
    rating: 4.7,
    description:
      "Soft and rich chocolate brownie served warm.",
    popular: false,
    vegetarian: true,
    emoji: "🍫",
  },

  {
    id: 64,
    name: "Rasmalai",
    category: "Desserts",
    price: 120,
    rating: 4.7,
    description:
      "Soft cottage-cheese dumplings served in chilled saffron milk.",
    popular: false,
    vegetarian: true,
    emoji: "🍮",
  },

  {
    id: 65,
    name: "Ice Cream",
    category: "Desserts",
    price: 109,
    rating: 4.6,
    description:
      "Creamy chilled ice cream served with your choice of flavor.",
    popular: true,
    vegetarian: true,
    emoji: "🍨",
  },

  {
    id: 66,
    name: "Fruit Custard",
    category: "Desserts",
    price: 119,
    rating: 4.5,
    description:
      "Creamy custard served chilled with fresh seasonal fruits.",
    popular: false,
    vegetarian: true,
    emoji: "🍮",
  },


  // ==========================================================
  // REFRESHMENTS
  // ==========================================================

  {
    id: 67,
    name: "Fresh Lime Soda",
    category: "Refreshments",
    price: 89,
    rating: 4.5,
    description:
      "Refreshing lime drink served chilled with soda and ice.",
    popular: true,
    vegetarian: true,
    emoji: "🥤",
  },

  {
    id: 68,
    name: "Filter Coffee",
    category: "Refreshments",
    price: 70,
    rating: 4.7,
    description:
      "Traditional South Indian filter coffee with rich aroma and flavor.",
    popular: true,
    vegetarian: true,
    emoji: "☕",
  },

  {
    id: 69,
    name: "Mango Lassi",
    category: "Refreshments",
    price: 110,
    rating: 4.8,
    description:
      "Creamy yogurt drink blended with sweet ripe mangoes.",
    popular: true,
    vegetarian: true,
    emoji: "🥭",
  },

  {
    id: 70,
    name: "Sweet Lassi",
    category: "Refreshments",
    price: 90,
    rating: 4.6,
    description:
      "Chilled creamy yogurt drink lightly sweetened and refreshing.",
    popular: true,
    vegetarian: true,
    emoji: "🥛",
  },

  {
    id: 71,
    name: "Salted Lassi",
    category: "Refreshments",
    price: 90,
    rating: 4.5,
    description:
      "Refreshing chilled yogurt drink seasoned with salt and spices.",
    popular: false,
    vegetarian: true,
    emoji: "🥛",
  },

  {
    id: 72,
    name: "Cold Coffee",
    category: "Refreshments",
    price: 130,
    rating: 4.7,
    description:
      "Chilled creamy coffee blended with milk and ice.",
    popular: true,
    vegetarian: true,
    emoji: "☕",
  },

  {
    id: 73,
    name: "Chocolate Milkshake",
    category: "Refreshments",
    price: 150,
    rating: 4.8,
    description:
      "Rich creamy chocolate milkshake served chilled.",
    popular: true,
    vegetarian: true,
    emoji: "🥤",
  },

  {
    id: 74,
    name: "Mango Shake",
    category: "Refreshments",
    price: 140,
    rating: 4.7,
    description:
      "Thick chilled mango shake made with sweet ripe mangoes.",
    popular: true,
    vegetarian: true,
    emoji: "🥭",
  },

  {
    id: 75,
    name: "Masala Chai",
    category: "Refreshments",
    price: 60,
    rating: 4.6,
    description:
      "Traditional Indian tea brewed with milk and aromatic spices.",
    popular: true,
    vegetarian: true,
    emoji: "☕",
  },
];


// ============================================================
// IMAGE FALLBACK
// ============================================================

const getFallbackImage = (food) => {
  // Pizza fallback
  if (
    food.category === "Pizza & Burgers" &&
    food.name.toLowerCase().includes("pizza")
  ) {
    return "/food/pizza.jpg";
  }

  // Burger fallback
  if (
    food.category === "Pizza & Burgers" &&
    food.name.toLowerCase().includes("burger")
  ) {
    return "/food/burger.jpg";
  }

  // Category fallback
  return categoryImages[food.category] || null;
};


// ============================================================
// SPECIFIC FOOD IMAGE URLS
// ============================================================

const foodImageUrls = {

  // ================= TIFFINS =================

  "Idli":
    "https://melam.com/wp-content/uploads/2022/11/idli.jpg",

  "Masala Dosa":
    "https://img.magnific.com/premium-photo/masala-dosa-with-potato-filling-white-background-dosa-fast-food-picture-photography_1020697-116936.jpg",

  "Plain Dosa":
    "https://montsia.es/images/recipes/masala-dosa-1.jpg",

  "Vada":
    "https://media.istockphoto.com/id/666714356/photo/medu-vada-vadai-south-indian-snack-india.jpg?s=170667a&w=0&k=20&c=K19zhvRSxb365kYA11fpWwv82h9zhX28280rbQPeKv8=",

  "Rava Idli":
    "https://simpleindianmeals.com/wp-content/uploads/2023/10/Instant-Suji-idli-720x720.jpg",

  "Uttapam":
  "https://revi.b-cdn.net/wp-content/uploads/2015/05/onion-uttapam-vert.jpg",

  "Poori":
    "https://static.vecteezy.com/system/resources/previews/079/202/684/large_2x/fluffy-puri-deep-fried-puffed-bread-with-spicy-aloo-bhaji-on-a-steel-plate-free-photo.jpg",

  "Upma":
    "https://rakskitchen.net/wp-content/uploads/2013/02/upma-recipe-feat.jpg",


  // ================= STARTERS =================

  "Samosa":
    "https://th.bing.com/th/id/R.5e9d914158f20abde43751bc56170aff?rik=IVjPf86fA0ExdQ&riu=http%3a%2f%2fwww.zedamagazine.com%2fwp-content%2fuploads%2f2018%2f06%2fIndian-Food-Samosa-Dish-HD-Wallpapers.jpg&ehk=CIZsxVe5CLA%2fpZXkiCdJuoTdrhucm2fgYqo%2fkXVfHls%3d&risl=&pid=ImgRaw&r=0",

  "Paneer Tikka":
    "https://www.indianveggiedelight.com/wp-content/uploads/2021/08/air-fryer-paneer-tikka-featured.jpg",

  "Chicken 65":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken%2065.jpg",

  "Gobi 65":
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Gobi%2065%20%28cauliflower%20fry%29.jpg",


  "Spring Rolls":
    "https://d1mxd7n691o8sz.cloudfront.net/static/recipe/recipe/2023-12/Vegetable-Spring-Rolls-2-1-906001560ca545c8bc72baf473f230b4_thumbnail_170.jpeg",

  "Chicken Tikka":
   "https://rouxtinerecipes.com/PakistaniChickenTikka.jpg",

  "Crispy Corn":
  "https://www.kuchpakrahahai.in/wp-content/uploads/2021/09/Crispy-Corn-Recipe-360x360.jpg",



  // ================= MAIN COURSE =================

  "Paneer Butter Masala":
    "https://tse4.mm.bing.net/th/id/OIP.LRorO9eoX__28SlTrMuizAHaHZ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",

  "Butter Chicken":
    "https://saltedmint.com/wp-content/uploads/2024/01/Indian-Butter-Chicken-recipe-with-rice.jpg",

  "Kadai Paneer":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Kadai%20Paneer.JPG",

  "Palak Paneer":
    "https://img.magnific.com/premium-photo/closeup-palak-paneer-traditional-punjabi-spinach-cottage-cheese-curry-concept-indian-cuisine-vegetarian-dish-palak-paneer-recipe-punjabi-food_864588-180694.jpg?w=2000",

  "Dal Tadka":
    "https://static.vecteezy.com/system/resources/previews/038/972/483/large_2x/ai-generated-dal-tadka-is-a-popular-indian-dish-where-cooked-spiced-lentils-are-finished-with-a-tempering-made-of-ghee-or-oil-and-spices-photo.jpg",

  "Chana Masala":
    "https://indianhealthyrecipe.com/wp-content/uploads/2024/01/chana-masala-recipe-featured-1.jpg",

  "Chicken Curry":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken%20Curry.JPG",

  "Mutton Curry":
    "https://recipetruck.com/wp-content/uploads/2024/08/mutton-curry.jpg",

  "Veg Thali":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Jaipur%20Thali.jpg",

  "Veg Kolhapuri":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Veg%20Kolhapuri.jpg",


  // ================= BIRYANI =================

  "Chicken Biryani":
    "https://img.magnific.com/premium-photo/traditional-chicken-biryani-aromatic-indian-cuisine-food_1124848-123286.jpg?w=2000",

  "Hyderabadi Chicken Biryani":
    "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg",

  "Mutton Biryani":
    "https://vismaifood.com/storage/app/uploads/public/980/eb9/ed6/thumb__1200_0_0_0_auto.jpg",

  "Veg Biryani":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Vegetable-biryani.jpg",

  "Egg Biryani":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Egg%20biryani.JPG",
"Paneer Biryani":
  "https://ministryofcurry.com/wp-content/uploads/2023/10/paneer-biryani_.jpg",

 "Mushroom Biryani":
  "https://www.indianveggiedelight.com/wp-content/uploads/2019/09/mushroom-biryani-featured.jpg",
  "Chicken Tikka Biryani":
    "https://cookingfever.us/wp-content/uploads/Chicken-Tikka-Biryani-2.jpg",


  // ================= CHINESE =================

  "Veg Fried Rice":
    "https://www.scrumptiously.com/wp-content/uploads/2023/02/VegetableFriedRice.webp",

  "Egg Fried Rice":
    "https://tse3.mm.bing.net/th/id/OIP.lX-Bm6nBQAxVeGhQ79Z5SgHaJQ?r=0&w=960&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3",

  "Chicken Fried Rice":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken%20fried%20rice.jpg",

  "Veg Noodles":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Veg%20noodles.jpg",

  "Chicken Noodles":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken%20noodles.jpg",

  "Schezwan Noodles":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Schezwan%20noodles.jpg",

  "Schezwan Fried Rice":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Schezwan%20fried%20rice.jpg",

  "Veg Manchurian":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Veg%20Manchuria.jpg",

  "Chicken Manchurian":
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken%20Manchurian%20%28Hyderabad%20Style%29%20%2811960049916%29.jpg",

  "Chilli Paneer":
  "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/chilli-paneer-recipe.jpg",


  // ================= PIZZA & BURGERS =================

  "Margherita Pizza":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Margherita%20Pizza.jpg",

  "Farmhouse Pizza":
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Farmhouse%20Pizza-Domino%27s-Ahmedabad-Gujarat-202013-1.jpg",


  "Paneer Tikka Pizza":
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Paneer%20Tikka%20Pizza-Home-AndhraPradesh-020.jpg",

  "Chicken Tikka Pizza":
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken%20pizza%20-%20the%20bake%20factory%2C%20NCB%20Enclave%2C%20Gachibowli%20-%20Hyderabad-%20DSC%200016.webp",
  
  "Veg Burger":
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Veg.%20Burger.JPG",

  "Cheese Burger":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cheeseburger.jpg",

  "Chicken Burger":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Close-up%20burger%20and%20fries.jpg",

 "Paneer Burger":
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Paneer%20Burger.jpg",
  "Double Chicken Burger":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken%20burger.jpg",


  // ================= SIDES =================

  "French Fries":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/French%20fries%204.jpg",

  "Peri Peri Fries":
  "https://cookingwithparita.com/wp-content/uploads/2022/10/image-of-baked-crispy-peri-peri-fries-recipe-2.jpg",

  "Cheese Fries":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cheese%20fries.jpg",

  "Garlic Bread":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Garlic%20bread.jpg",

  "Cheese Balls":
    "https://www.indianhealthyrecipes.com/wp-content/uploads/2018/10/cheese-balls.jpg",

  "Potato Wedges":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Potato%20wedges.jpg",

  "Mozzarella Sticks":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mozzarella%20sticks.jpg",

  "Masala Papad":
    "https://i.pinimg.com/originals/97/4c/44/974c44960417d671582cb1b0edf95754.jpg",


  // ================= DESSERTS =================

  "Gulab Jamun":
    "https://recipes.net/wp-content/uploads/2023/05/gulab-jamun-recipe_9fb159dc2674f395436a64666227c988-768x768.jpeg",

  "Chocolate Cake":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Chocolate%20cake.jpg",

  "Brownie":
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Brownie%20on%20plate.jpg",


  "Rasmalai":
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Rasmalai.jpg",

  "Ice Cream":
    "https://cdn.loveandlemons.com/wp-content/uploads/2025/05/chocolate-ice-cream.jpg",

  "Fruit Custard":
    "https://tse1.explicit.bing.net/th/id/OIP.33XQqYxmad8uERiZrfGINwHaGB?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",


  // ================= REFRESHMENTS =================

  "Fresh Lime Soda":
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Italian%20Lemon%20Soda.jpg",

  "Filter Coffee":
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Filter-Coffee.jpg",

  "Mango Lassi":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mango%20Lassi.jpg",

  "Sweet Lassi":
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sweet_Lassi.JPG",

  "Salted Lassi":
    "https://tse4.mm.bing.net/th/id/OIP.mKOo2LB9QXsfZ-gb7fLvWwHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",

  "Cold Coffee":
    "https://cdn.pixabay.com/photo/2024/06/26/06/58/ai-generated-8854172_1280.jpg",

  "Chocolate Milkshake":
  "https://i.pinimg.com/originals/ce/e1/37/cee137957d9100610eb8325ba6b1a0f4.jpg",

  "Mango Shake":
  "https://tse2.mm.bing.net/th/id/OIP.zAGwvh7Zo2hm2ZQYbIonYwHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",

  "Masala Chai":
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Masala%20Chai.jpg",
};


// ============================================================
// FINAL FOOD DATA
// ============================================================

const updatedFoodData = foodData.map((food) => ({
  ...food,

  // First: specific online food photograph
  image: foodImageUrls[food.name] || null,

  // Second: local JPG fallback
  fallbackImage: getFallbackImage(food),
}));


// ============================================================
// EXPORT
// ============================================================

export default updatedFoodData;