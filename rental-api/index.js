const express = require("express");
const data = require("./data.json");
const app = express();

const PORT = process.env.PORT ?? 5050;

app.get("/apartments", (req, res) => {
  const apartments = data.apartments;

  const {
    sort,
    minPrice,
    maxPrice,
    minRooms,
    maxRooms,
    minArea,
    maxArea,
    has_elevator,
    type,
  } = req.query;

  let filteredApartments = apartments.filter((apartment) => {
    if (minPrice && apartment.price < parseInt(minPrice)) return false;
    if (maxPrice && apartment.price > parseInt(maxPrice)) return false;
    if (minRooms && apartment.rooms < parseInt(minRooms)) return false;
    if (maxRooms && apartment.rooms > parseInt(maxRooms)) return false;
    if (minArea && apartment.area < parseInt(minArea)) return false;
    if (maxArea && apartment.area > parseInt(maxArea)) return false;

    if (type && apartment.type !== type) return false;

    if (has_elevator && apartment.has_elevator !== (has_elevator === "true")) {
      return false;
    }

    return true;
  });

  if (sort === "price-asc") {
    filteredApartments.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filteredApartments.sort((a, b) => b.price - a.price);
  }

  res.json(filteredApartments);
});

app.get("/apartments/:id", (req, res) => {
  const apartment = data.apartments.find((a) => a.id === req.params.id);

  if (apartment === undefined) {
    return res.status(404).send();
  }

  res.json(apartment);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
