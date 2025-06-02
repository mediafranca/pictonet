import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import SvgDomTree from "@/components/svg-dom-tree";
import SvgPreview from "@/components/svg-preview";
import ElementProperties from "@/components/element-properties";
import SvgCodeView from "@/components/svg-code-view";
import VertexEditor from "@/components/vertex-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSvgEditor } from "@/hooks/use-svg-editor";
import type { SvgElement } from "@shared/schema";
import { MousePointer, Edit3, Eraser, Download, Upload, Wand2, ChevronRight, Smile, Meh, Frown, Code, TreePine, Settings, GitBranch } from "lucide-react";

export default function SvgEditor() {
  const {
    svgStructure,
    svgCode,
    selectedElement,
    customStyles,
    hasUnsavedChanges,
    selectElement,
    selectElementById,
    updateElement,
    addElement,
    removeElement,
    updateStyleClass,
    removeStyleClass,
    saveChanges,
    exportSvg,
    importSvg,
    generateFromPrompt
  } = useSvgEditor();

  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("Make the bed");
  const [editMode, setEditMode] = useState<'select' | 'edit' | 'erase'>('select');
  const [svgDimensions, setSvgDimensions] = useState({ width: 100, height: 100 });
  const [feedback, setFeedback] = useState({ rating: 0, text: '' });
  const [leftPanelTab, setLeftPanelTab] = useState<'source' | 'tree' | 'element' | 'vertices'>('tree');

  // Handle element selection from both panels
  const handleElementSelect = (element: SvgElement | { id: string }) => {
    if ('id' in element) {
      // Selection from SVG preview - find element by ID
      selectElementById(element.id);
    } else {
      // Selection from DOM tree
      selectElement(element);
    }
    setLeftPanelTab('element');
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await generateFromPrompt("Make the bed");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = () => {
    exportSvg();
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.svg';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          importSvg(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleFeedbackRating = (rating: number) => {
    setFeedback(prev => ({ ...prev, rating }));
  };



  return (
    <div className="h-screen bg-cream-100 flex flex-col">
      {/* Compact Header with Prompt */}
      <header className="bg-white border-b border-cream-300 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe el pictograma que quieres generar..."
            className="flex-1 border-cream-400 focus:border-cream-500 bg-white"
          />
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            size="sm"
            className="bg-cream-500 hover:bg-cream-600 text-white font-medium"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            {isGenerating ? "Generando..." : "Generar"}
          </Button>
        </div>
      </header>
      {/* Main Layout - 2 Columns */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Tabbed Navigation */}
        <div className="w-1/2 bg-cream-200 border-r border-cream-300 flex flex-col">
          <Tabs value={leftPanelTab} onValueChange={(value) => setLeftPanelTab(value as 'source' | 'tree' | 'element' | 'vertices')} className="flex flex-col h-full">
            <TabsList className="grid w-full grid-cols-4 bg-cream-300 border-b border-cream-400">
              <TabsTrigger value="source" className="flex items-center gap-2 text-xs">
                <Code className="w-4 h-4" />
                Source
              </TabsTrigger>
              <TabsTrigger value="tree" className="flex items-center gap-2 text-xs">
                <TreePine className="w-4 h-4" />
                Tree
              </TabsTrigger>
              <TabsTrigger value="element" className="flex items-center gap-2 text-xs">
                <Settings className="w-4 h-4" />
                Element
              </TabsTrigger>
              <TabsTrigger value="vertices" className="flex items-center gap-2 text-xs">
                <GitBranch className="w-4 h-4" />
                Vértices
              </TabsTrigger>
            </TabsList>

            <TabsContent value="source" className="flex-1 mt-0">
              <SvgCodeView
                svgCode={svgCode}
                onCodeChange={(code) => {
                  // TODO: implement code editing
                  console.log('Code changed:', code);
                }}
              />
            </TabsContent>

            <TabsContent value="tree" className="flex-1 mt-0">
              <div className="flex-1 overflow-auto custom-scrollbar">
                <SvgDomTree
                  structure={svgStructure}
                  selectedElementId={selectedElement?.id || null}
                  onSelectElement={handleElementSelect}
                />
              </div>
            </TabsContent>

            <TabsContent value="element" className="flex-1 mt-0">
              {selectedElement ? (
                <ElementProperties
                  element={selectedElement}
                  onUpdateElement={updateElement}
                  onClose={() => selectElement(svgStructure.root)}
                />
              ) : (
                <div className="p-4 text-center text-cream-600">
                  <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Select an element to see its properties</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="vertices" className="flex-1 mt-0">
              <VertexEditor
                pathData={selectedElement?.type === 'path' ? selectedElement.attributes.d || '' : ''}
                onPathChange={(newPathData) => {
                  if (selectedElement?.type === 'path') {
                    updateElement(selectedElement.id, {
                      attributes: { ...selectedElement.attributes, d: newPathData }
                    });
                  }
                }}
                selectedElementId={selectedElement?.id || null}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: SVG Editor */}
        <div className="w-1/2 flex flex-col">
          {/* Editing Tools */}
          <div className="bg-cream-200 border-b border-cream-300 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-cream-600">Size:</span>
                  <Input
                    type="number"
                    value={svgDimensions.width}
                    onChange={(e) => setSvgDimensions(prev => ({ ...prev, width: parseInt(e.target.value) || 100 }))}
                    className="w-16 h-8 text-xs border-cream-400"
                  />
                  <span className="text-xs text-cream-600">×</span>
                  <Input
                    type="number"
                    value={svgDimensions.height}
                    onChange={(e) => setSvgDimensions(prev => ({ ...prev, height: parseInt(e.target.value) || 100 }))}
                    className="w-16 h-8 text-xs border-cream-400"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={editMode === 'select' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setEditMode('select')}
                  className={editMode === 'select' ? 'bg-cream-500 text-white' : 'border-cream-400 text-cream-700'}
                >
                  <MousePointer className="w-4 h-4" />
                </Button>
                <Button
                  variant={editMode === 'edit' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setEditMode('edit')}
                  className={editMode === 'edit' ? 'bg-cream-500 text-white' : 'border-cream-400 text-cream-700'}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={editMode === 'erase' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setEditMode('erase')}
                  className={editMode === 'erase' ? 'bg-cream-500 text-white' : 'border-cream-400 text-cream-700'}
                >
                  <Eraser className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* SVG Preview */}
          <div className="flex-1 bg-white">
            <SvgPreview
              svgCode={svgCode}
              selectedElementId={selectedElement?.id || null}
              editMode={editMode}
              onElementSelect={selectElementById}
            />
          </div>

          {/* Feedback Section */}
          <div className="border-t border-cream-300 p-4 bg-cream-100">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-cream-800">Rate this pictogram:</span>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3].map((rating) => {
                    const Icon = rating === 1 ? Frown : rating === 2 ? Meh : Smile;
                    return (
                      <Button
                        key={rating}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFeedbackRating(rating)}
                        className={`p-2 ${feedback.rating === rating ? 'bg-cream-300' : 'hover:bg-cream-200'}`}
                      >
                        <Icon className={`w-5 h-5 ${
                          rating === 1 ? 'text-red-500' : 
                          rating === 2 ? 'text-yellow-500' : 
                          'text-green-500'
                        }`} />
                      </Button>
                    );
                  })}
                </div>
              </div>
              
              <Textarea
                value={feedback.text}
                onChange={(e) => setFeedback(prev => ({ ...prev, text: e.target.value }))}
                placeholder="Share your feedback about this pictogram..."
                className="text-sm border-cream-400 focus:border-cream-500 bg-white"
                rows={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
