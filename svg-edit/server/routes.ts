import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPictogramSchema, insertInstanceSchema, insertCssStyleSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Get current instance (temporary - will be based on subdomain later)
  app.get("/api/instance", (req, res) => {
    res.json({ 
      id: 1, 
      slug: "default", 
      name: "Default Instance",
      description: "Default pictogram instance"
    });
  });

  // Get pictograms for current instance  
  app.get("/api/pictograms", (req, res) => {
    res.json([]); // Empty for now - will implement with database
  });

  // Get CSS styles for current instance
  app.get("/api/styles", (req, res) => {
    res.json([]); // Empty for now - will implement with database  
  });

  // SVG validation endpoint
  app.post("/api/validate-svg", async (req, res) => {
    try {
      const { svgContent } = req.body;
      if (!svgContent || typeof svgContent !== 'string') {
        return res.status(400).json({ error: "SVG content is required" });
      }

      const isValid = svgContent.includes('<svg') && svgContent.includes('</svg>');
      res.json({ valid: isValid, errors: isValid ? [] : ['Invalid SVG structure'] });
    } catch (error) {
      res.status(500).json({ error: "Failed to validate SVG" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
