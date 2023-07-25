const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

const emptyValidation = (req, res, next) => {
  const propsInRequestBody = Object.keys(req.body);
  const {
    firstName,
    lastName,
    email,
    roomType,
    numberOfGuest,
    arrivalDate,
    arrivalTime,
    departureDate,
    departureTime,
    feedingOption,
  } = req.body;

  if (propsInRequestBody.includes("firstName")) {
    if (!firstName || firstName.trim().length === 0) {
      return res.status(400).send("firstName cannot be empty");
    }
  }
  if (propsInRequestBody.includes("lastName")) {
    if (!lastName || lastName.trim().length === 0) {
      return res.status(400).send("lastName cannot be empty");
    }
  }
  if (propsInRequestBody.includes("email")) {
    if (!email || email.trim().length === 0) {
      return res.status(400).send("email cannot be empty");
    }
    if (propsInRequestBody.includes("roomType")) {
      if (!roomType || roomType.trim().length === 0) {
        return res.status(400).send("roomType cannot be empty");
      }
    }
  }
  if (propsInRequestBody.includes("numberOfGuest")) {
    if (numberOfGuest <= 0) {
      return res.status(400).send("number Of Guest cannot be Zero");
    }
  }
  if (propsInRequestBody.includes("arrivalDate")) {
    if (!arrivalDate || arrivalDate.trim().length === 0) {
      return res.status(400).send("arrivalDate cannot be empty");
    }
  }
  if (propsInRequestBody.includes("arrivalTime")) {
    if (!arrivalTime || arrivalTime.trim().length === 0) {
      return res.status(400).send("arrivalTime cannot be empty");
    }
  }
  if (propsInRequestBody.includes("departureDate")) {
    if (!departureDate || departureDate.trim().length === 0) {
      return res.status(400).send("departure date cannot be empty");
    }
  }
  if (propsInRequestBody.includes("departureTime")) {
    if (!departureTime || departureTime.trim().length === 0) {
      return res.status(400).send("departure Time cannot be empty");
    }
  }
  if (propsInRequestBody.includes("feedingOption")) {
    if (!feedingOption) {
      return res.status(400).send("feeding option cannot be empty");
    }
  }

  next();
};

const validateDate = (req, res, next) => {
  const propsInRequestBody = Object.keys(req.body);
  const { arrivalDate, departureDate } = req.body;
  let date1 = Math.floor(new Date().getTime() / 1000);
  let date2 = Math.floor(new Date(arrivalDate).getTime() / 1000);
  let date3 = Math.floor(new Date(departureDate).getTime() / 1000);

  if (propsInRequestBody.includes("arrivalDate")) {
    if (date2 < date1) {
      return res.status(400).send("arrival date cannot be in the past");
    }
  }
  if (propsInRequestBody.includes("departureDate")) {
    if (date3 < date2) {
      return res
        .status(400)
        .send("departure date cannot be behind arrival date");
    }
  }

  next();
};

let reservations = [
  {
    id: 1,
    firstname: "david",
    lastname: "prosper",
    email: "royallight24@gmail.com",
    roomType: "gold",
    numberOfGuest: 2,
    arrivalDate: "22-8-2023",
    arrivalTime: "11pm",
    departureDate: "30-8-2023",
    departureTime: "9am",
    feedingOption: ["breakfast", "lunch", "dinner"],
  },
  {
    id: 2,
    firstname: "uchenna",
    lastname: "odega",
    email: "odega2007@gmail.com",
    roomType: "silver",
    numberOfGuest: 2,
    arrivalDate: "22-8-2023",
    arrivalTime: "11pm",
    departureDate: "30-8-2023",
    departureTime: "9am",
    feedingOption: ["breakfast", "dinner"],
  },
];

app.get("/reservations", (req, res) => {
  res.send(reservations);
});

app.get("/reservations/:id", (req, res) => {
  const reservationID = req.params.id;
  const filteredReservations = reservations.filter(
    (reservation) => reservationID == reservation.id
  );

  reservations = filteredReservations;

  res.send(filteredReservations);
});

app.post("/reservations", emptyValidation, validateDate, (req, res) => {
  const {
    firstName,
    lastName,
    email,
    roomType,
    numberOfGuest,
    arrivalDate,
    arrivalTime,
    departureDate,
    departureTime,
    feedingOption,
  } = req.body;

  const newData = {
    id: crypto.randomUUID(),
    firstName: firstName,
    lastName: lastName,
    email: email,
    roomType: roomType,
    NumberOfGuest: numberOfGuest,
    ArrivalDate: arrivalDate,
    ArrivalTime: arrivalTime,
    DepartureDate: departureDate,
    DepartureTime: departureTime,
    feedingOption: feedingOption,
  };

  reservations.push(newData);
  res.send(reservations);
});

app.delete("/reservations/:id", (req, res) => {
  const reservationId = req.params.id;
  const filteredReservations = reservations.filter(
    (reservation) => reservationId != reservation.id
  );

  reservations = filteredReservations;
  res.send(filteredReservations);
});

app.listen("3000", () => {
  console.log("server started at port 3000");
});
