import defaultPhoto from '../assets/avatars/avatar-placeholder.png';
export default [
  {
    name: "Joanna D.",
    testimony: `The Association is always there to help with any situation that occurs. We love this place!`,
    photo: defaultPhoto,
  },
  {
    name: "Daniel Echagüe",
    testimony: `The dedication and diligent efforts of KHA are evident, and have created a wonderful sense of community for all of us, residents.`,
    photo: await (await import('./assets/daniel-echague.jpg')).default,
  },
  {
    name: "Ossie and Harry Hanauer",
    testimony: `If you haven’t joined the Association, there’s no time like now!  It’s a minimal investment for a huge return!`,
    photo: defaultPhoto,
  },
  {
    name: "Christy V.",
    testimony: `The events that are put on by KHA to unite families and neighbors are like no other.`,
    photo: defaultPhoto,
  },
]