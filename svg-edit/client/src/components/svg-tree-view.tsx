import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Code, Circle, Square, Layers, Edit, Trash2, Settings, Palette, Type } from "lucide-react";
import { SvgElement, SvgStructure } from "@shared/schema";

interface SvgTreeViewProps {
  structure: SvgStructure;
  selectedElementId: string | null;
  onSelectElement: (element: SvgElement) => void;
  onRemoveElement: (elementId: string) => void;
}

interface TreeNodeProps {
  element: SvgElement;
  level: number;
  isSelected: boolean;
  onSelect: (element: SvgElement) => void;
  onRemove: (elementId: string) => void;
  expandedNodes: Set<string>;
  onToggleExpanded: (elementId: string) => void;
}

const getElementIcon = (type: string) => {
  switch (type) {
    case 'svg':
      return <Code className="w-4 h-4 text-blue-500" />;
    case 'g':
      return <Layers className="w-4 h-4 text-orange-500" />;
    case 'circle':
      return <Circle className="w-4 h-4 text-red-500" />;
    case 'rect':
      return <Square className="w-4 h-4 text-blue-500" />;
    case 'path':
      return <Edit className="w-4 h-4 text-indigo-500" />;
    case 'defs':
      return <Settings className="w-4 h-4 text-purple-500" />;
    case 'style':
      return <Palette className="w-4 h-4 text-green-500" />;
    case 'text':
      return <Type className="w-4 h-4 text-gray-500" />;
    default:
      return <Code className="w-4 h-4 text-cream-600" />;
  }
};

const getElementDescription = (element: SvgElement) => {
  const attrs = element.attributes;
  switch (element.type) {
    case 'svg':
      return attrs.viewBox ? `viewBox="${attrs.viewBox}"` : '';
    case 'g':
      return attrs.id ? `id="${attrs.id}"` : '';
    case 'circle':
      return `cx="${attrs.cx || '0'}" cy="${attrs.cy || '0'}" r="${attrs.r || '0'}"`;
    case 'rect':
      return `x="${attrs.x || '0'}" y="${attrs.y || '0'}" w="${attrs.width || '0'}" h="${attrs.height || '0'}"`;
    case 'path':
      const d = attrs.d || '';
      return d.length > 20 ? `d="${d.substring(0, 20)}..."` : `d="${d}"`;
    case 'style':
      return 'CSS styles';
    default:
      return '';
  }
};

function TreeNode({ element, level, isSelected, onSelect, onRemove, expandedNodes, onToggleExpanded }: TreeNodeProps) {
  const hasChildren = element.children && element.children.length > 0;
  const isExpanded = expandedNodes.has(element.id);
  const paddingLeft = level * 24;

  return (
    <div className="mb-1">
      <div
        className={`flex items-center space-x-2 p-2 rounded cursor-pointer group tree-node ${
          isSelected ? 'bg-cream-300' : 'hover:bg-cream-300'
        }`}
        style={{ paddingLeft: `${paddingLeft + 8}px` }}
        onClick={() => onSelect(element)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpanded(element.id);
            }}
            className="w-3 h-3 flex items-center justify-center"
          >
            {isExpanded ? (
              <ChevronDown className="w-3 h-3 text-cream-500" />
            ) : (
              <ChevronRight className="w-3 h-3 text-cream-500" />
            )}
          </button>
        ) : (
          <div className="w-3 h-3" />
        )}
        
        {getElementIcon(element.type)}
        
        <span className="font-medium text-cream-800">{element.type}</span>
        
        {getElementDescription(element) && (
          <span className="text-xs text-cream-500 bg-cream-400 px-2 py-1 rounded">
            {getElementDescription(element)}
          </span>
        )}
        
        <div className="ml-auto opacity-0 group-hover:opacity-100 flex space-x-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 text-cream-500 hover:text-cream-700"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(element);
            }}
          >
            <Edit className="w-3 h-3" />
          </Button>
          {element.type !== 'svg' && (
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-cream-500 hover:text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(element.id);
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="border-l-2 border-cream-300" style={{ marginLeft: `${paddingLeft + 16}px` }}>
          {element.children.map((child) => (
            <TreeNode
              key={child.id}
              element={child}
              level={level + 1}
              isSelected={child.id === (isSelected ? element.id : '')}
              onSelect={onSelect}
              onRemove={onRemove}
              expandedNodes={expandedNodes}
              onToggleExpanded={onToggleExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SvgTreeView({ structure, selectedElementId, onSelectElement, onRemoveElement }: SvgTreeViewProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root', 'svg']));

  const handleToggleExpanded = (elementId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(elementId)) {
      newExpanded.delete(elementId);
    } else {
      newExpanded.add(elementId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleExpandAll = () => {
    const allIds = new Set<string>();
    const collectIds = (element: SvgElement) => {
      allIds.add(element.id);
      element.children?.forEach(collectIds);
    };
    collectIds(structure.root);
    setExpandedNodes(allIds);
  };

  const handleCollapseAll = () => {
    setExpandedNodes(new Set(['root']));
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-cream-800">Elements</h3>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCollapseAll}
            className="h-6 w-6 p-0 text-cream-600 hover:text-cream-800"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleExpandAll}
            className="h-6 w-6 p-0 text-cream-600 hover:text-cream-800"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <TreeNode
        element={structure.root}
        level={0}
        isSelected={structure.root.id === selectedElementId}
        onSelect={onSelectElement}
        onRemove={onRemoveElement}
        expandedNodes={expandedNodes}
        onToggleExpanded={handleToggleExpanded}
      />
    </div>
  );
}
