import homeAlonePoster from "$lib/assets/events/home-alone.jpeg";
import golfCartParade from "$lib/assets/events/golf-cart-parade.jpg";
import springFestival from "$lib/assets/events/spring_festival.png";
import faithandfitness from "$lib/assets/events/faithandfitnessfull.png";

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
    name: "Movie Night",
    description: `Join us for a movie night at the park! The movie is Home Alone. Popcorn, cookies and glow  necklaces will be provided`,
    date: new Date("2022-12-10T19:00:00"),
    location: "Kendale Park",
    photo: homeAlonePoster,
    photoAlt: "The movie poster for Elf",
  },
  {
    name: "First Annual Holiday Golf Cart Event",
    description: `Join your neighbors for this family friendly event.  If you have a golf cart and want to join in the parade, be at Kendale Park at 6:30 p.m. with your decorated golf cart. Parade route will be announced week of event and all are welcomed to cheer them on throughout the route.`,
    date: new Date("2022-12-23T18:45:00"),
    location: "Kendale Park",
    photo: golfCartParade,
    photoAlt: "A Christmas tree",
  },
  {
    name: "Spring Festival",
    description: `Join your neighbors and friends  for this community fun event. Festivities start at 2 pm at Kendale Park. Access bracelets to rides and food with your paid dues. Hope to see you there!`,
    date: new Date("2023-04-01T14:00:00"),
    location: "Kendale Park",
    photo: springFestival,
    photoAlt: "The flyer for the Spring Festival",
  },
  {
    name: "Faith and Fitness Event",
    description: `Enjoy a quick fitness event to start your weekend off right! Please bring a mat and water bottle.`,
    date: new Date("2023-05-06T07:30:00"),
    location: "Kendale Park",
    photo: faithandfitness,
    photoAlt: "The flyer for the Faith and Fitness event",
  },
];

export default events;
