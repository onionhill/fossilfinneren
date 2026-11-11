import { config } from "../config";
import type { AimCode } from "../curriculum";

export interface Fossil {
  id: string;
  name: string;
  age: string;
  facts: string;
  image: string;
  /** Empty means the image has no text alternative yet (UU-avvik 1.1.1). */
  imageAlt: string;
  video?: string;
  location: { place: string; lat: number; lng: number };
}

export interface Mission {
  id: string;
  title: string;
  text: string;
  aims: AimCode[];
}

const image = (file: string) => `${config.contentUrl}/fossiler/${file}`;
const video = (file: string) => `${config.videoUrl}/hls/${file}/index.m3u8`;

export const FOSSILS: Fossil[] = [
  {
    id: "trilobitt",
    name: "Trilobitt",
    age: "Ca. 500 millioner år",
    facts: "Trilobitter levde i havet og hadde et hardt skall delt i tre deler. De døde ut for 252 millioner år siden.",
    image: image("trilobitt.webp"),
    imageAlt: "En grå trilobitt i skifer, med tre tydelige lengdedeler.",
    video: video("trilobitt"),
    location: { place: "Slemmestad", lat: 59.78, lng: 10.49 },
  },
  {
    id: "ortoceratitt",
    name: "Ortoceratitt",
    age: "Ca. 460 millioner år",
    facts: "Ortoceratitter var blekksprutlignende dyr med et langt, rett skall. De er vanlige i kalkstein rundt Oslofjorden.",
    image: image("ortoceratitt.webp"),
    imageAlt: "",
    location: { place: "Bygdøy", lat: 59.9, lng: 10.68 },
  },
  {
    id: "plesiosaur",
    name: "Plesiosaur fra Svalbard",
    age: "Ca. 150 millioner år",
    facts: "Plesiosaurer var store havøgler med lang hals og fire luffer. Mange er funnet på Spitsbergen.",
    image: image("plesiosaur.webp"),
    imageAlt: "Tegning av en plesiosaur som svømmer, med lang hals og fire luffer.",
    video: video("plesiosaur"),
    location: { place: "Janusfjellet, Svalbard", lat: 78.25, lng: 15.5 },
  },
  {
    id: "mammut",
    name: "Mammut",
    age: "Ca. 30 000 år",
    facts: "Ullhårsmammuten levde i istiden. Det er funnet mammutjeksler i Norge, blant annet på Østlandet.",
    image: image("mammut.webp"),
    imageAlt: "",
    location: { place: "Hamar", lat: 60.79, lng: 11.07 },
  },
];

export const MISSIONS: Mission[] = [
  {
    id: "tre-fra-havet",
    title: "Finn tre fossiler fra havet",
    text: "Bruk fossilkartet og finn tre fossiler av dyr som levde i havet. Skriv i feltdagboken hvor du fant dem.",
    aims: ["KM13825"],
  },
  {
    id: "naermiljoet",
    title: "Fossiljakt i nærmiljøet",
    text: "Gå ut og let etter steiner med spor av liv. Ta bilde av det du finner, og legg det i feltdagboken.",
    aims: ["KM13810"],
  },
  {
    id: "hvorfor-dor-arter-ut",
    title: "Hvorfor døde mammuten ut?",
    text: "Les fossilkortet om mammuten. Skriv to grunner til at arter kan dø ut.",
    aims: ["KM13825", "KM13811"],
  },
];
