import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mais Rosso Co.",
    short_name: "Mais Rosso Co.",
    description: "Mais Rosso Ottofile varietà Albese coltivato nei campi ai piedi di Cherasco.",
    start_url: "/",
    display: "standalone",
    background_color: "#F1DFBF",
    theme_color: "#F5915E",
    lang: "it",
  };
}
