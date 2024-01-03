#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Brand = require("../models/brand");
const Category = require("../models/category");
const Contact = require("../models/contact");
const Part = require("../models/part");

const brands = [];
const categories = [];
const contacts = [];
const parts = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB,{
    dbName:"inventory"
  });
  console.log("Debug: Should be connected?");
  await createBrands();
  await createCategories();
  await createContacts();
  await createParts();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.

async function brandCreate(
  index,
  name,
  description,
  co_founder,
  official_website
) {
  const brandData = {
    name,
    description,
    co_founder,
  };
  if (official_website != false) {
    brandData.official_website = official_website;
  }
  const brand = new Brand(brandData);
  await brand.save();
  brands[index] = brand;
  console.log(`Added brand: ${name}, ${co_founder}`);
}

async function categoryCreate(index, name, description) {
  const categoryData = {
    name,
    description,
  };
  const category = new Category(categoryData);
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function contactCreate(index, name, type, value) {
  const contactData = {
    name,
    type,
    value,
  };
  const contact = new Contact(contactData);
  await contact.save();
  contacts[index] = contact;
  console.log(`Added contact: ${name}, ${type}, ${value}`);
}


async function partCreate(
  index,
  name,
  description,
  brand,
  category,
  amount_in_stock,
  price,
) {
  const partDetails = {
    name,
    description,
    brand,
    category,
    amount_in_stock,
    price,
  };
  const part = new Part(partDetails);
  await part.save();
  parts[index] = part;
  console.log(`Added part: ${name}, ${price}`);
}
async function createBrands() {
  console.log("Adding brands");
  await Promise.all([
    brandCreate(
      0,
      "Wilwood",
      "Wilwood Engineering is a leading manufacturer of high-performance brake systems and components, catering to a wide range of automotive applications. With a rich history dating back to the late 1970s, Wilwood has established itself as a pioneer in the aftermarket braking industry.",
      "Michael Gerard",
      "https://www.wilwood.com/"
    ),
    brandCreate(
      1,
      "Bosch",
      "Bosch is a pioneer in automotive technology, specializing in a wide range of car parts and components. From spark plugs to fuel injection systems, Bosch products are synonymous with efficiency and precision. With a focus on cutting-edge engineering, Bosch has been a driving force in advancing automotive technology, ensuring vehicles operate at peak performance levels.",
      "Dr. Volkmar Denner",
      "https://www.bosch.com/"
    ),
    brandCreate(
      2,
      "NGK",
      "NGK is a leading brand in spark plugs and ignition components. Renowned for its commitment to quality and innovation, NGK provides spark plugs that deliver optimal combustion efficiency, enhancing engine performance and fuel efficiency. Trusted by automotive enthusiasts and professionals alike, NGK is a reliable choice for ignition solutions.",
      "Masao Sumida",
      "https://www.ngkntk.com/"
    ),
    brandCreate(
      3,
      "ACDelco",
      "ACDelco is a well-established brand known for a comprehensive range of automotive parts, including batteries, filters, and electrical components. As the original equipment manufacturer (OEM) for General Motors, ACDelco products are designed to meet the highest industry standards, ensuring reliability and longevity for a wide variety of vehicles.",
      "Mary Barra",
      "https://www.gmparts.com/"
    ),
    brandCreate(
      4,
      "Goodyear",
      "Goodyear is a household name in the world of tires and rubber products. Renowned for its tire innovations, Goodyear offers a diverse range of products catering to different driving needs. Whether it's all-season, performance, or off-road tires, Goodyear's commitment to safety, durability, and innovation makes it a top choice for drivers worldwide.",
      "Frank Seiberling",
      "RIchard J. Kramer"
    ),
    brandCreate(
      5,
      "Mobil 1",
      "Mobil 1 is a leading brand in automotive lubricants, known for its advanced synthetic oils. With a focus on engine protection and performance, Mobil 1 oils are designed to withstand extreme conditions, providing optimal lubrication for modern engines. Trusted by enthusiasts and professionals, Mobil 1 is synonymous with high-performance lubrication.",
      "Darren W. Woods",
      "https://www.mobil.com"
    ),
    brandCreate(
      6,
      "Sealed Power",
      "Sealed Power stands at the forefront of automotive excellence, embodying a commitment to precision engineering and unparalleled power in every heartbeat of your engine. With a legacy rooted in reliability, our brand is synonymous with quality performance that automotive enthusiasts and professionals trust.",
      "Robert D. Tuttle",
    ),
    brandCreate(
      7,
      "Mahle",
      "Mahle Original is synonymous with precision engineering and reliability in the realm of engine components. The Mahle Original Piston Set exemplifies the brand's commitment to excellence. Crafted with meticulous attention to detail and using high-quality materials, these pistons are designed to meet or exceed OEM standards.",
      "Arnd Franz",
      "https://www.mahle.com/",
    )
  ]);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(
      0,
      "engine components",
      "pistons, engine bearings, chains, crankshafts"
    ),
    categoryCreate(
      1,
      "brake system",
      "brake rotors, brake pads, brake calipers, brake lines"
    ),
    categoryCreate(
      2,
      "filters",
      "oil filters, air filters, fuel filters, cabin air filters"
    ),
  ]);
}

async function createContacts(){
  console.log("Adding contacts")
  await Promise.all([
    contactCreate(0, "executive chef", "phone", "+0000000000"),
    contactCreate(1, "executive chef", "mail", "example@mail.com"),
    contactCreate(2, "manager", "mail", "second@example.mail"),
    contactCreate(3, "manager", "phone", "+111111111"),
    contactCreate(4, "subchef ", "mail", "third@example.mail"),
  ])
}
async function createParts(){
  console.log("Adding parts")
  await Promise.all([
    partCreate(
      0,
      "Mahle Original Piston",
      "Mahle Original is known for producing high-quality engine components, and their piston sets are no exception. Crafted with precision and using top-notch materials, Mahle pistons ensure optimal combustion efficiency and engine performance. These pistons are designed for durability and are a reliable choice for engine rebuilds.",
      brands[7],
      categories[0],
      123000,
      118.37,
      ),
      partCreate(
        1,
        "Sealed Power Hypereutectic Piston",
        "Sealed Power's Hypereutectic Pistons are engineered for strength and performance. Made from a special alloy that enhances durability, these pistons offer reduced wear and improved resistance to heat. The hypereutectic design provides excellent thermal stability, making them a popular choice for enthusiasts looking to enhance their engine's power and longevity.",
        brands[6],
        categories[0],
        134056,
        118.37,
        
      ),
      partCreate(
        2,
        "Sealed Power Hypereutectic Piston",
        "Sealed Power's Hypereutectic Pistons are engineered for strength and performance. Made from a special alloy that enhances durability, these pistons offer reduced wear and improved resistance to heat. The hypereutectic design provides excellent thermal stability, making them a popular choice for enthusiasts looking to enhance their engine's power and longevity.",
        brands[6],
        categories[0],
        134056,
        118.37,
        
      ),
      partCreate(
        3,
        "CP-Carrillo Forged Piston",
        "CP-Carrillo is renowned for its high-performance forged pistons. These pistons are meticulously crafted from premium materials through a forging process that enhances strength and durability. With a focus on precision engineering, CP-Carrillo forged pistons are favored by racing professionals and enthusiasts seeking maximum power and reliability.",
        brands[6],
        categories[0],
        321556,
        289.53,
        
      ),
      partCreate(
        4,
        "Wiseco Performance Piston",
        "Wiseco is a well-known name in the performance industry, and their performance pistons are designed for those who demand the best. Crafted from forged aluminum, Wiseco pistons are lightweight and durable, ensuring efficient heat dissipation and reduced friction. These pistons are a popular choice for high-performance applications.",
        brands[6],
        categories[0],
        99093,
        300.98,
        
      ),
      partCreate(
        5,
        "Wilwood Forged Superlite Caliper and BP-10 Brake Pads",
        "Wilwood's Forged Superlite Caliper, paired with BP-10 Brake Pads, is a high-performance braking solution. The forged caliper provides strength and reduced weight, enhancing overall braking efficiency. The BP-10 Brake Pads feature a high-friction compound for improved stopping power and are suitable for both street and light track use, making them a favorite among performance enthusiasts.",
        brands[0],
        categories[1],
        300000,
        29.99,
      ),
      partCreate(
        6,
        "Premium Disc Brake Rotors",
        "An Innovative brake rotors using high quality materials which provide consistent, safe and long lasting performance",
        brands[1],
        categories[1],
        200999,
        150.99
      ),
      partCreate(
        7,
        "Euroline Brake Pads",
        "This line provides the best performance for the most popular European vehicles on the road.",
        brands[1],
        categories[1],
        312987,
        120.99,
      ),
      partCreate(
        8,
        "Hydro Boost Power Brake Assembly",
        "OE expertise and innovation applied to new brake booster products for the aftermarket",
        brands[1],
        categories[1],
        12563,
        679.99
      ),
      partCreate(
        9,
        "Brake fluid ESI",
        "ESI6 is the next generation brake fluid designed for today's modern braking systems. Designed by the industry'sleader in braking technology for vehicles using DOT 3, DOT 4 and DOT 5.1 brake fluid.",
        brands[1],
        categories[1],
        1005757,
        19.99
      ),
      partCreate(
        10,
        "Cabin filter",
        "MAHLE adheres to the highest standards when developing its filter media. By eliminating odors from the environment, CareMetix® delivers maximum comfort in the cabin. PM2.5 filter media from MAHLE achieve ultrahigh retention efficiencies over the element’s entire service interval.",
        brands[7],
        categories[2],
        321378,
        37.99
      ),
      partCreate(
        11,
        "Spark Plug & Air Oil AC Cabin Filter Tune Up Kit NGK",
        "Our comprehensive kit ensures peak performance, improved fuel efficiency, and a breath of fresh air on every journey. Upgrade your engine's spark with precision-engineered spark plugs, optimize air quality with premium air, oil, and cabin filters. It's not just a tune-up; it's a rejuvenation for your car's heart and lungs. Unleash the full potential of your ride – because every drive deserves to be extraordinary!",
        brands[2],
        categories[2],
        967331,
        180.99,
      )
  ])
}