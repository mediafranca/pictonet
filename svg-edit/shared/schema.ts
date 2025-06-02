import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Instance-based tables
export const instances = pgTable("instances", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(), // e.g., "maori", "english", "spanish"
  name: text("name").notNull(), // e.g., "Māori", "English", "Spanish"
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pictograms = pgTable("pictograms", {
  id: serial("id").primaryKey(),
  instanceId: integer("instance_id").references(() => instances.id).notNull(),
  name: text("name").notNull(),
  svgCode: text("svg_code").notNull(),
  structure: jsonb("structure").notNull(), // SvgElement tree
  description: text("description"),
  tags: text("tags").array().default([]),
  prompt: text("prompt"), // Original AI prompt used to generate
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const cssStyles = pgTable("css_styles", {
  id: serial("id").primaryKey(),
  instanceId: integer("instance_id").references(() => instances.id).notNull(),
  className: text("class_name").notNull(),
  styles: jsonb("styles").notNull(), // CSS properties as JSON
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const dictionary = pgTable("dictionary", {
  id: serial("id").primaryKey(),
  instanceId: integer("instance_id").references(() => instances.id).notNull(),
  word: text("word").notNull(),
  translation: text("translation").notNull(),
  pictogramId: integer("pictogram_id").references(() => pictograms.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertInstanceSchema = createInsertSchema(instances).omit({
  id: true,
  createdAt: true,
});

export const insertPictogramSchema = createInsertSchema(pictograms).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCssStyleSchema = createInsertSchema(cssStyles).omit({
  id: true,
  createdAt: true,
});

export const insertDictionarySchema = createInsertSchema(dictionary).omit({
  id: true,
  createdAt: true,
});

// Types
export type Instance = typeof instances.$inferSelect;
export type InsertInstance = z.infer<typeof insertInstanceSchema>;
export type Pictogram = typeof pictograms.$inferSelect;
export type InsertPictogram = z.infer<typeof insertPictogramSchema>;
export type CssStyle = typeof cssStyles.$inferSelect;
export type InsertCssStyle = z.infer<typeof insertCssStyleSchema>;
export type DictionaryEntry = typeof dictionary.$inferSelect;
export type InsertDictionaryEntry = z.infer<typeof insertDictionarySchema>;

// SVG Element types
export interface SvgElement {
  id: string;
  type: 'svg' | 'g' | 'circle' | 'rect' | 'path' | 'line' | 'polygon' | 'ellipse' | 'text' | 'defs' | 'style';
  attributes: Record<string, string>;
  children: SvgElement[];
  content?: string; // for text elements or style content
}

export interface SvgStructure {
  root: SvgElement;
  selectedElementId: string | null;
}
