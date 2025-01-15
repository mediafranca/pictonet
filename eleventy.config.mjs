// eleventy.config.mjs
import { EleventyI18nPlugin } from "@11ty/eleventy";
import fs from "fs";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "es",
    localesDirectory: "src/_data/i18n"
  });

  // Cargar manualmente las traducciones
  const esData = JSON.parse(fs.readFileSync("src/_data/i18n/es.json", "utf-8"));
  const enData = JSON.parse(fs.readFileSync("src/_data/i18n/en.json", "utf-8"));

  // Definir un filtro 'i18n' personalizado
  eleventyConfig.addFilter("i18n", (key, lang = "es") => {
    let data = lang === "en" ? enData : esData;
    return data[key] || key;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "docs"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
