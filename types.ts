
export interface Memory {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
  rotation: number;
}

export interface PoemResult {
  title: string;
  content: string;
}

export interface DateIdea {
  title: string;
  description: string;
  vibe: string;
}

export interface ECardResult {
  cardThemeTitle: string;
  songTitle: string;
  songArtist: string;
}
