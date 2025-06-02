import { svgProjects, type SvgProject, type InsertSvgProject } from "@shared/schema";

export interface IStorage {
  getSvgProject(id: number): Promise<SvgProject | undefined>;
  getSvgProjectByName(name: string): Promise<SvgProject | undefined>;
  createSvgProject(project: InsertSvgProject): Promise<SvgProject>;
  updateSvgProject(id: number, updates: Partial<InsertSvgProject>): Promise<SvgProject>;
  deleteSvgProject(id: number): Promise<boolean>;
  listSvgProjects(): Promise<SvgProject[]>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, SvgProject>;
  private currentId: number;

  constructor() {
    this.projects = new Map();
    this.currentId = 1;
  }

  async getSvgProject(id: number): Promise<SvgProject | undefined> {
    return this.projects.get(id);
  }

  async getSvgProjectByName(name: string): Promise<SvgProject | undefined> {
    return Array.from(this.projects.values()).find(
      (project) => project.name === name,
    );
  }

  async createSvgProject(insertProject: InsertSvgProject): Promise<SvgProject> {
    const id = this.currentId++;
    const project: SvgProject = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async updateSvgProject(id: number, updates: Partial<InsertSvgProject>): Promise<SvgProject> {
    const existing = this.projects.get(id);
    if (!existing) {
      throw new Error(`Project with id ${id} not found`);
    }
    
    const updated: SvgProject = { ...existing, ...updates };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteSvgProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  async listSvgProjects(): Promise<SvgProject[]> {
    return Array.from(this.projects.values());
  }
}

export const storage = new MemStorage();
