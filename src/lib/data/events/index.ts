import elfPoster from "$lib/assets/events/elf.jpg";
import christmas from "$lib/assets/events/christmas.jpeg";

export type Event = {
  name: string;
  description: string;
  date: Date;
  photo: string;
  photoAlt: string;
};

const events: Event[] = [
  {
    name: "KHA Holiday Party",
    description: `Come join KHA and your neighbors for a family-friendly Holiday party at the park! Food and beverages will be provided, and there will be a holiday parade!`,
    date: new Date("2022-12-23T18:00:00"),
    photo: christmas,
    photoAlt: "A Christmas tree",
  },
  {
    name: "Movie Night",
    description: `Come join KHA and your neighbors for a family-friendly movie night, in which we will be showing Elf!`,
    date: new Date("2022-12-13T18:00:00"),
    photo: elfPoster,
    photoAlt: "The movie poster for Elf",
  },
];

export default events;
