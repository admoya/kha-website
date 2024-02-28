type VideoData = {
  slug: string;
  /** Link to a Youtube video */
  youtubeId: string;
  title: string;
  description?: string;
};

const videos: VideoData[] = [
  {
    youtubeId: "cMtg5SveNDo",
    slug: "2023-year-in-review",
    title: "2023 Year in Review",
  },
];

export default videos;
