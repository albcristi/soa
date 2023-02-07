//Here we mock our data

const loremIpsum = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."

const products = [
    {
        productId: 1,
        title: "GEMINI LUFTHANSA A320NEO",
        description: "This die-cast metal airplane model comes in 1/400 scale with landing gear no stand. Model is approximately 3 5/8 inches long with 3 1/4 inch wingspan.",
        imageSource: "https://www.airplaneshop.com/media/catalog/product/cache/efcfbff9dbb0012617cb8430eed1e834/g/j/gj1968.jpg",
        price: "46.95 USD"
    },
    {
        productId: 2,
        title: "HERPA AMERICAN 737MAX8 1/500",
        description: "Produced to the highest standards, Herpa diecast metal models are developed in collaboration with aircraft manufacturers and the airlines and are recognized by discerning model airplane collectors worldwide for their unparalleled, accurate realism, attention to detail and exceptional quality. True-to-scale, this 1/500 scale American Airlines Boeing 737 MAX 8 manufactured by Herpa measures approximately 3-inches long with a 2-13/16-inch wingspan. A Display Stand is not included and is sold separately - Herpa HE521024. Having initiated service in 2017 as the fourth generation of the Boeing 737, the Boeing 737 MAX is a twin engine, narrow body airliner that was designed to replace the prior Boeing 737 Next Generation series and goes up against the Airbus A320neo family. The Boeing 737 MAX has several significant advantages over earlier 737 variants which include having been outfitted with more efficient engines, added fly-by wire systems and beneficial cockpit enhancements along with aerodynamic improvements and a greater flying range. The 737 MAX 8 can be configured to seat up to 200 passengers and directly replaces the third generation Boeing 737-800.",
        imageSource: "https://www.airplaneshop.com/media/catalog/product/cache/efcfbff9dbb0012617cb8430eed1e834/h/e/he535199.jpg",
        price: "48.95 USD"
    },
    {
        productId: 3,
        title: "PHOENIX SOUTH AFRICAN A340-600",
        description: "Star Alliance livery Airbus A340-600 model",
        imageSource: "https://www.airplaneshop.com/media/catalog/product/cache/efcfbff9dbb0012617cb8430eed1e834/p/h/ph2272.jpg",
        price: "83.95 USD"
    },
    {
        productId: 4,
        title: "HERPA THAI A350-900",
        description: "This die-cast metal airplane model comes in 1/500 scale with landing gear no stand. Model is approximately 4 1/2 inches long with 4 1/4 inch wingspan.",
        imageSource: "https://www.airplaneshop.com/media/catalog/product/cache/efcfbff9dbb0012617cb8430eed1e834/h/e/he529693-001.jpg",
        price: "39.95 USD"
    },
    {
        productId: 5,
        title: "GEMINI200 EMIRATES A380",
        description: "This Die-cast metal airplane model comes in 1/200 scale with landing gear and stand. Model is approximately 14 1/4 inches long with 15 ¾ inch wingspan.",
        imageSource: "https://www.airplaneshop.com/media/catalog/product/cache/efcfbff9dbb0012617cb8430eed1e834/g/2/g2uae758_8.jpg",
        price: "144.95 USD"
    },
    {
        productId: 6,
        title: "GEMINI200 BRITISH 747-400",
        description: "This Die-cast metal airplane model comes in 1/200 scale with landing gear and stand. Model is approximately 14 inches long with 11 3/4 inch wingspan.",
        imageSource: "https://www.airplaneshop.com/media/catalog/product/cache/efcfbff9dbb0012617cb8430eed1e834/g/2/g2baw834.jpg",
        price: "144.95 USD"
    },
    {
        productId: 7,
        title: "SKYMARKS THAI 777-300",
        description: "Comprising superior quality, solid, substantial injection molded plastic components with a simple snap-fit design that allows for easy assembly without the need for glue, this SkyMarks 1/200 scale Thai Airways Boeing 777-300ER, with Registration HS-TKM, measures approximately 14-3/8-inches long with a 12-3/4-inch wingspan and comes complete with Landing Gear and a Display Stand. An accurate, true-to-scale reproduction of the actual aircraft, the model is great for collectors and features authentic, highly detailed graphics and markings.",
        imageSource: "https://www.airplaneshop.com/media/catalog/product/cache/efcfbff9dbb0012617cb8430eed1e834/s/k/skr944.jpg",
        price: "44.95 USD"
    },
    {
        productId: 8,
        title: "HERPA QANTAS 787-9",
        description: "This plastic airplane model comes in 1/200 scale with landing gear, no stand. Model is approximately 12 ¼ inches long with 12 inch wingspan",
        imageSource: "https://www.airplaneshop.com/media/catalog/product/cache/efcfbff9dbb0012617cb8430eed1e834/h/e/he558778.jpg",
        price: "59.95 USD"
    },
    {
        productId: 9,
        title: "HERPA LOT E195",
        description: "This die-cast metal airplane model comes in 1/500 scale with landing gear no stand. Model is approximately 2 ¾ inches long with 2 ¼ inch wingspan.\n",
        imageSource: "https://www.airplaneshop.com/media/catalog/product/cache/efcfbff9dbb0012617cb8430eed1e834/h/e/he536325.jpg",
        price: "48.95 USD"
    },
    {
        productId: 10,
        title: "HERPA SWISS A220-300 ",
        description: "This Die-cast metal airplane model comes in 1/200 scale with landing gear and plastic stand. Model is approximately 7 1/2 inches long with 6 3/4 inch wingspan.",
        imageSource: "https://www.airplaneshop.com/media/catalog/product/cache/efcfbff9dbb0012617cb8430eed1e834/h/e/he559935_1.jpg",
        price: "55.95 USD"
    },
]

module.exports = products;
