import khaLogo from "$lib/assets/logo-no-text.svg";
import crimeWatchFlyer from "$lib/assets/events/ccw_flyer.png";
import khaSpringFestivalPlanningFlyer from "$lib/assets/events/kha_spring_festival_planning_flyer.jpeg";
import yogaMeditationFlyer from "$lib/assets/events/kha_yoga_flyer_202403.jpeg";
import springFestival2024 from "$lib/assets/events/spring-festival-2024.jpeg";
import yogaMeditationMay24 from "$lib/assets/events/yoga-meditation-may-24.png";
import communityHangout from "$lib/assets/events/community-hangout.jpg";
import bikeRideFlyer from "$lib/assets/events/bike-ride-flyer.jpeg";
import fullMoonYoga from "$lib/assets/events/full-moon-yoga.jpeg";
import golfCartParade2024 from "$lib/assets/events/golf-cart-parade-2024.jpeg";
import costumeContest2024 from "$lib/assets/events/costume-contest-2024.png";
import communityBikeRide2024 from "$lib/assets/events/community-bike-ride-2024.jpeg";
import holidayToyDrive2024 from "$lib/assets/events/holiday-toy-drive-2024.jpeg";
import holidayGolfCartParade2024 from "$lib/assets/events/holiday-golf-cart-parade-2024.jpeg";
import holidayGolfCartParadeRoute2024 from "$lib/assets/events/holiday-golf-cart-parade-route-2024.jpeg";
import bikeRide202501 from "$lib/assets/events/bike-ride-2025-01.png";

export type Event = {
  name: string;
  description: string;
  date: Date;
  location: string;
  photo: string;
  photoAlt: string;
  customId?: string;
};

const events: Event[] = [
  {
    name: "Citizens Crimewatch Meeting",
    description: `The Kendale Homeowners Association has organized a Community Citizens Crimewatch Meeting. We urge residents from all 3 communities to come out, gather important program information and voice your concerns to the officers present. Be sure to bring a lawn chair!`,
    date: new Date("2024-01-23T19:00"),
    location: "Kendale Park - 10300 SW 93 Street",
    photo: crimeWatchFlyer,
    photoAlt: "A flyer for the Crimewatch meeting",
  },
  {
    name: "Spring Festival Planning Meeting",
    description: `Calling all KHA residents! We need your help to plan our biggest event of the year, our Spring Festival. The festival is scheduled to take place on April 13th. The Spring Festival is a fun-filled event that is free for all active residents. Come out and volunteer to help with the planning. Together we can make it the best festival yet.`,
    date: new Date("2024-02-13T19:30"),
    location: "Regis HR Room - 10625 N. Kendall Dr.",
    photo: khaSpringFestivalPlanningFlyer,
    photoAlt: "A flyer for the Spring Festival Planning meeting",
  },
  {
    name: "Yoga and Meditation",
    description: `Join us for a great evening of yoga at the park. Remember to bring your mat and water bottle!`,
    date: new Date("2024-03-14T18:30"),
    location: "Kendale Park - 10300 SW 93 Street",
    photo: yogaMeditationFlyer,
    photoAlt: "A flyer for the Yoga and Meditation event",
  },
  {
    name: "Spring Festival",
    description: `Mark your calendars  for this wonderful  community event! Join your neighbors and friends for an afternoon of music, food and rides! Sponsorship opportunities are available to not only support this wonderful community event but also promote your business/services. <a href="/stay-connected">Contact us</a> for more information.`,
    date: new Date("2024-04-13T14:00"),
    location: "Kendale Park - 10300 SW 93 Street",
    photo: springFestival2024,
    photoAlt: "A flyer for the Spring Festival",
  },
  {
    name: "Citizens Advisory Committee (CAC) Meeting",
    description: `At the meeting, representatives from various communities will attend and voice their concerns. Officers will review crime trends, criminal cases, and meet our “rookie officer.” Join us to make sure your voice is heard!`,
    date: new Date("2024-05-29T19:00"),
    location: "Kendall District Conference Room - Kendall District Police - 7701 SW 117 Avenue",
    photo: khaLogo,
    photoAlt: "The KHA Logo",
  },
  {
    name: "Yoga and Meditation",
    description: `Join us for a great evening of yoga at the park. All fitness levels are welcome. Remember to bring your mat and water bottle!`,
    date: new Date("2024-05-30T18:30"),
    location: "Kendale Park - 10300 SW 93 Street",
    photo: yogaMeditationMay24,
    photoAlt: "A flyer for the Yoga and Meditation event",
  },
  {
    name: "Community Hangout",
    description: `Kick off your Summer with a community hangout at the park! We will have free popsicles and glow sticks while supplies last. Please bring your own seating and any games you would like to play. Bring your family and friends for a fun day out with your neighbors!`,
    date: new Date("2024-06-30T18:00"),
    location: "Kendale Park - 10300 SW 93 Street",
    photo: communityHangout,
    photoAlt: "A flyer for the Community Hangout event",
  },
  {
    name: "Community Bike Ride and Park Hangout",
    description: `We’re excited to invite you to a Community Bike Ride and Hangout at Kendale Park on <strong>Sunday, October 6th, 2024, from 5:00 to 7:00 PM</strong>!
<br><br>Bring your bikes and helmets to join in on the ride, or simply come by to relax and enjoy great conversations at the park.
It's a fantastic opportunity to meet new neighbors and reconnect with familiar faces. Let’s make the most of this beautiful fall evening together!
<br><br>We can’t wait to see you there!`,
    date: new Date("2024-10-06T17:00"),
    location: "Kendale Park - 10300 SW 93 Street",
    photo: bikeRideFlyer,
    photoAlt: "A flyer for the Community Bike Ride event",
  },
  {
    name: "Full Moon Yoga",
    description: `Enjoy a FREE Yoga Class taught by instructor Gloria Navarro from Gin Yogi. It will be an amazing outdoor experience under the full moon. Please bring your own mat and water bottle.`,
    date: new Date("2024-10-17T18:30"),
    location: "Kendale Park - 10300 SW 93 Street",
    photo: fullMoonYoga,
    photoAlt: "A flyer for the Full Moon Yoga event",
  },
  {
    name: "Halloween Golf Cart Parade",
    description: `Join us for our third annual Holiday Golf Cart Parade!<br><br>To join the parade, decorate your golf carts and line up at Kendale Park by 6:30.<br><br>To cheer on the parade, line <a href="https://communications.kendalehoa.org/uploads/golf-cart-parade-route.jpeg" target="_blank">the route</a> and enjoy the festive carts as they pass by!`,
    date: new Date("2024-10-27T18:30"),
    location: "Kendale Park - 10300 SW 93 Street",
    photo: golfCartParade2024,
    photoAlt: "A flyer for the holiday golf cart parade",
  },
  {
    name: "Halloween Costume Contest",
    description: `Come with your best Halloween costume and win a prize! Be sure to be bring your treat  bag as we will have music, candy and fun!`,
    date: new Date("2024-10-27T17:00"),
    location: "Kendale Park - 10300 SW 93 Street",
    photo: costumeContest2024,
    photoAlt: "A flyer for the Costume Contest",
  },
  {
    name: "Community Bike Ride",
    description: `Let’s ride! Join us on Sunday for a wonderful ride around The Village community. Bring your bikes, scooters or skates! All are welcome!`,
    date: new Date("2024-11-03T17:15"),
    location: "Kendale Park - 10300 SW 93 Street",
    photo: communityBikeRide2024,
    photoAlt: "A flyer for the Community Bike Ride",
  },
  {
    name: "Holiday Toy Drive",
    description: `Please join in spreading joy this holiday season! We will be collecting new, unwrapped toys for boys and girls ages 6 & 7 y/o at Riverside Elementary School. <br/>Drop off dates are:
<br/>Sunday, Nov 17   3-5 pm
<br/>Sunday, Nov 24  3-5 pm
<br/>Sunday, Dec 01   3-5 pm
<br/><br/>Donation Drop Off Location:
<br/>D’Arce Home
<br/>10251 SW 91 Street`,
    date: new Date("2024-12-01T17:00"),
    location: "D’Arce Home - 10251 SW 91 Street",
    photo: holidayToyDrive2024,
    photoAlt: "A flyer for the Holiday Toy Drive",
  },
  {
    name: "General Meeting and Elections",
    description: `Join us for our General Meeting and Elections of the 2025 Board. 
    <br/>Important issues affecting our community and upcoming 2025 plans/events will be discussed.
    <br/><br/>Board positions are open. Email us at <a href="mailto:kha@kendalehoa.org">kha@kendalehoa.org</a> if you would like to be nominated.
    <br/><br/>Get involved! We want to hear from you!`,
    date: new Date("2024-12-03T19:00"),
    location: "Ron Ehmann Park - 10995 SW 97 Avenue",
    photo: khaLogo,
    photoAlt: "The KHA Logo",
  },
  {
    name: "Holiday Golf Cart Parade",
    description: `Join us on Sunday, Dec 22 for our 3rd Annual Holiday Golf Cart Parade. Join in the parade with your decorated golf cart or line up along the route and cheer them on! <br/>To see the route, <a href=${holidayGolfCartParadeRoute2024} target="_blank">click here.</a>`,
    date: new Date("2024-12-22T18:30"),
    location: "Kendale Park - 10300 SW 93 Street",
    photo: holidayGolfCartParade2024,
    photoAlt: "A flyer for the holiday golf cart parade",
  },
  {
    name: "Community Bike Ride",
    description: "Join us on Sunday, January 5th for our first Community Bike Ride of 2025!",
    date: new Date("2025-01-05T17:00"),
    location: "Kendale Park - 10300 SW 93 Street",
    photo: bikeRide202501,
    photoAlt: "A flyer for the Community Bike Ride",
  },
];

export default events;
