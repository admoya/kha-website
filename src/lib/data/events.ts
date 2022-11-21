import homeAlonePoster from "$lib/assets/events/home-alone.jpeg";
import christmas from "$lib/assets/events/christmas.jpeg";

export type Event = {
  name: string;
  description: string;
  date: Date;
  location: string;
  photo: string;
  photoAlt: string;
};

const events: Event[] = [
  {
    name: "First Annual Holiday Golf Cart Event",
    description: `Join your neighbors for this family friendly event.  If you have a golf cart and want to join in the parade, be at Kendale Park at 6:30 p.m. with your decorated golf cart. Parade route will be announced week of event and all are welcomed to cheer them on throughout the route.`,
    date: new Date("2022-12-23T18:45:00"),
    location: "Kendale Park",
    photo: christmas,
    photoAlt: "A Christmas tree",
  },
  {
    name: "Movie Night",
    description: `Join us for a movie night at the park! The movie is Home Alone. Popcorn, cookies and glow  necklaces will be provided`,
    date: new Date("2022-12-10T19:00:00"),
    location: "Kendale Park",
    photo: homeAlonePoster,
    photoAlt: "The movie poster for Elf",
  },
];

export default events;
