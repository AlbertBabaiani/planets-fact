type Data = {
  content: string;
  source: string;
};

export type Planet = {
  name: string;
  overview: Data;
  structure: Data;
  geology: Data;
  rotation: string;
  revolution: string;
  radius: string;
  temperature: string;
};
