import "@aileron/icon";
import { html } from "lit-html";
import Story from "./icon.mdx";

const actionIconManifest = {
  name: "action",
  icons: [
    {
      name: "close",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "plus",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "subtract",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "show",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "hide",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "select-empty",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "select-checked",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "loader",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    }
  ]
};

const aadvantageIconManifest = {
  name: "aadvantage",
  icons: [
    {
      name: "instant-status-pass",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "promotions",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
  ]
};

const ammenitiesIconManifest = {
  name: "ammenities",
  icons: [
    {
      name: "beverage-alcohol",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "beverage-coffee",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "beverage-tea",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "beverage",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "food-purchase",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "food",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "gaming",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "snack",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "stroller",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "wheelchair",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
  ]
};

const transportationIconManifest = {
  name: "transportation",
  icons: [
    {
      name: "bus-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "bus",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "car-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "car",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "cruise-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "cruise",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-add",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-angled-left-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-angled-left",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-angled-right-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-angled-right",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-cancel",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-change",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-confirm",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-down-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-down",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-information",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-land-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-land-down-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-land-down",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-land",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-left-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-left",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-right-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-right",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-search",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-status",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-subtract",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-take-off-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-take-off-up-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-take-off-up",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-take-off",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-up",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-up-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "flight-up",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "home",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "hotel-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "hotel",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "taxi-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "taxi",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "trip-insurance",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "vacation-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "vacation",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    }
  ]
};

const signalIconManifest = {
  name: "signal",
  icons: [
    {
      name: "checkmark",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "warning",
      sizes: [16, 24, 32, 64],
      variants: ["outlined", "filled"]
    },
    {
      name: "error",
      sizes: [16, 24, 32, 64],
      variants: ["outlined", "filled"]
    },
    {
      name: "information",
      sizes: [16, 24, 32, 64],
      variants: ["outlined", "filled"]
    },
    {
      name: "help",
      sizes: [16, 24, 32, 64],
      variants: ["outlined", "filled"]
    },
    {
      name: "not-available",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "stop-alert",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "stop",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
  ]
};

const operationIconManifest = {
  name: "operation",
  icons: [
    {
      name: "notification",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "alerts",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "calendar-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "calendar",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "chat-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "chat",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "copy",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "delete",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "dislike-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "dislike",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "edit-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "edit",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "feedback-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "feedback",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "filter-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "filter",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "like-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "like",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "list",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "lock-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "lock",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "menu",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "menu-more-horizontal",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "menu-more-vertical",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "language",
      sizes: [16, 24, 32, 64],
      variants: ["default", "filled"]
    },
    {
      name: "account",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "join",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "paste",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "search-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "search",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "settings",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "unlock-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "unlock",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    }
  ]
};

const airportIconManifest = {
  name: "airport",
  icons: [
    {
      name: "bag-insurance",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-add",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-alert",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-backpack",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-carry-on",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-confirm",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-eight",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-express-tag",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-five",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-four",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-information",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-lost",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-nine",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-one",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-personal-item",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-pet-carrier",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-removal",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-roller-double",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-roller-triple",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-roller",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-seven",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-six",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-subtract",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-suitcase",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-three",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-trolly",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "baggage-two",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "battery-car",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "battery-lithium-ion",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "boarding-pass",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "bus",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "counter-book",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "counter-checkin",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "customs",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "escalator-down",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "escalator-up-down",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "escalator-up",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "escalator",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "face-covering",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "figure-woman-man",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "hearing",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "one-day-pass",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "privacy",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "coverage",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "insurance",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "military-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "military",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "people-attendant",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "people-pilot",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "pet-cat",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "pet-dog-cat",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "pet-dog",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "seat-child-safety",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "seat",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "seats",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "service-animal-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "service-animal",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "shopping-cart",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "stairs",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "tools",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "upgrade-list",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "upgrade",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "visual",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "waitlist",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "wallet",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    }
  ]
};

const paymentIconManifest = {
  name: "payment",
  icons: [
    {
      name: "credit-card",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "cash",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "payment",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "credit-card-swipe",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "credit-card-stripe",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
  ]
};

const numericalIconManifest = {
  name: "numerical",
  icons: [
    {
      name: "one",
      sizes: [16, 24, 32, 64],
      variants: ["outlined", "filled"]
    },
    {
      name: "two",
      sizes: [16, 24, 32, 64],
      variants: ["outlined", "filled"]
    },
    {
      name: "three",
      sizes: [16, 24, 32, 64],
      variants: ["outlined", "filled"]
    },
    {
      name: "four",
      sizes: [16, 24, 32, 64],
      variants: ["outlined", "filled"]
    },
    {
      name: "five",
      sizes: [16, 24, 32, 64],
      variants: ["outlined", "filled"]
    },
    {
      name: "six",
      sizes: [16, 24, 32, 64],
      variants: ["outlined", "filled"]
    },
    {
      name: "seven",
      sizes: [16, 24, 32, 64],
      variants: ["outlined", "filled"]
    },
    {
      name: "eight",
      sizes: [16, 24, 32, 64],
      variants: ["outlined", "filled"]
    },
    {
      name: "nine",
      sizes: [16, 24, 32, 64],
      variants: ["outlined", "filled"]
    }
  ]
};

const technologyIconManifest = {
  name: "technology",
  icons: [
    {
      name: "camera-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "camera",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "compass",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "computer",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "entertainment",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "gps-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "gps",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "kiosk",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "laptop",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "location-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "location",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "mail-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "mail-open",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "mail-read",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "mail",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "map-location-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "map-location",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "mobile",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "mobile-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "mobile-camera-scan",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "mobile-nfc-sensor",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "no-mobile",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "phone-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "phone",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "printer",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "tablet-horizontal",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "tablet-vertical",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "website",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "printer",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "wifi",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "entertainment",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "tv",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "live-tv",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    }
  ]
};

const navigationIconManifest = {
  name: "navigation",
  icons: [
    {
      name: "arrow-single-up",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "arrow-single-right",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "arrow-single-down",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "arrow-single-left",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "arrow-double-vertical",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "arrow-double-horizontal",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "arrow-multidirectional",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "chevron-up",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "chevron-right",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "chevron-down",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "chevron-left",
      sizes: [16, 24, 32, 64],
      variants: ["default", "outlined", "filled"]
    },
    {
      name: "caret-up",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "caret-right",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "caret-down",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "caret-left",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "new-window",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    },
    {
      name: "new-window-alt",
      sizes: [16, 24, 32, 64],
      variants: ["default"]
    }
  ]
};

export default {
  title: "Components/Icon",
  component: "adc-icon",
  parameters: {
    docs: {
      page: Story
    }
  }
};

interface Icon {
  name: string;
  sizes: number[];
  variants: string[];
}
interface Manifest {
  name: string;
  icons: Icon[];
}

const Template = (iconManifest: Manifest) => {
  const { name }: { name: string } = iconManifest;
  const iconGroup = document.createElement("div");
  const iconGroupTitle = document.createElement("h2");
  iconGroup.classList.add("icon-group");
  iconGroupTitle.innerText = name;
  iconGroupTitle.classList.add("icon-group-title");
  iconGroup.appendChild(iconGroupTitle.cloneNode(true));

  function iconLoop(manifest: Manifest) {
    const iconContainerGroup = document.createElement("div");
    iconContainerGroup.classList.add("icon-container-group");

    manifest.icons.forEach((icon) => {
      const iconName = `${name}:${icon.name}`;

      icon.variants.forEach((variant) => {
        icon.sizes.forEach((size) => {
          const container = document.createElement("div");
          container.classList.add("icon-container");
          const el = document.createElement("adc-icon");
          const pName = document.createElement("h3");
          const pSize = document.createElement("p");
          const pVariant = document.createElement("p");
          const code = document.createElement("code");
          if (variant !== "default") {
            el.setAttribute(variant, "");
          }

          el.setAttribute("icon", iconName);
          el.setAttribute("size", size.toString());
          pName.innerText = `${iconName}`;
          pVariant.innerText = `type: ${variant}`;
          pSize.innerText = `size: ${size}`;
          code.innerText = `<adc-icon icon="${iconName}" size="${size}"${
            variant !== "default" ? ` ${variant}` : ""
          }></adc-icon>`;
          container.appendChild(el.cloneNode(true));
          container.appendChild(pName.cloneNode(true));
          if (variant !== "default") container.appendChild(pVariant.cloneNode(true));
          container.appendChild(pSize.cloneNode(true));
          container.appendChild(code.cloneNode(true));
          iconContainerGroup.appendChild(container.cloneNode(true));
        });
      });
    });

    iconGroup.appendChild(iconContainerGroup.cloneNode(true));

    return iconGroup;
  }

  return html`${iconLoop(iconManifest)}`;
};

export const Aadvantage = () => Template(aadvantageIconManifest);
export const Action = () => Template(actionIconManifest);
Action.parameters = {
  jest: "icon.test.ts"
};
export const Airport = () => Template(airportIconManifest);
export const Ammenities= () => Template(ammenitiesIconManifest);
export const Navigation = () => Template(navigationIconManifest);
export const Numerical = () => Template(numericalIconManifest);
Numerical.parameters = {
  jest: "icon.test.ts"
};
export const Operation = () => Template(operationIconManifest);
Operation.parameters = {
  jest: "icon.test.ts"
};
export const Payment = () => Template(paymentIconManifest);
export const Signal = () => Template(signalIconManifest);
export const Technology = () => Template(technologyIconManifest);
export const Transportation = () => Template(transportationIconManifest);
