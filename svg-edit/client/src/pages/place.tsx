import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Settings, Palette, Book, Plus } from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n-simple";
import LanguageSelector from "@/components/language-selector";
import SvgEditor from "./svg-editor";

function PlaceContent() {
  const [match, params] = useRoute("/place/:slug");
  const [activeTab, setActiveTab] = useState("editor");
  const [placeData, setPlaceData] = useState<any>(null);
  const { t } = useI18n();

  const slug = params?.slug || "";

  useEffect(() => {
    // Load place data based on slug
    // This would normally fetch from database
    const mockPlaceData = {
      aotearoa: {
        name: "Aotearoa",
        description: "Pictogramas de Nueva Zelanda y en Te Reo Māori",
        defaultStyles: {
          "white-outline-black": {
            fill: "#ffffff",
            stroke: "#000000",
            strokeLinejoin: "square"
          },
          "black-outline-white": {
            fill: "#000000", 
            stroke: "#ffffff",
            strokeLinejoin: "square"
          }
        },
        vocabulary: [
          { word: "bed", translation: "moenga", pictogramId: 1 },
          { word: "person", translation: "tangata", pictogramId: 2 },
          { word: "house", translation: "whare", pictogramId: 3 },
          { word: "family", translation: "whānau", pictogramId: 4 }
        ]
      },
      "tea-chile": {
        name: "TEA Chile",
        description: "CAA para autistas",
        defaultStyles: {
          "high-contrast": {
            fill: "#000000",
            stroke: "#ffffff",
            "stroke-width": "3"
          },
          "soft-colors": {
            fill: "#e3f2fd", 
            stroke: "#1976d2",
            "stroke-linejoin": "round"
          }
        },
        vocabulary: [
          { word: "happy", translation: "feliz", pictogramId: 1 },
          { word: "sad", translation: "triste", pictogramId: 2 },
          { word: "eat", translation: "comer", pictogramId: 3 },
          { word: "play", translation: "jugar", pictogramId: 4 }
        ]
      },
      lectogram: {
        name: "Lectogram",
        description: "Actividades de la vida diaria",
        defaultStyles: {
          "daily-activity": {
            fill: "#f8f9fa",
            stroke: "#495057",
            "stroke-linejoin": "square"
          },
          "important-action": {
            fill: "#fff3cd", 
            stroke: "#856404",
            "stroke-width": "2"
          }
        },
        vocabulary: [
          { word: "brush teeth", translation: "cepillarse los dientes", pictogramId: 1 },
          { word: "take shower", translation: "ducharse", pictogramId: 2 },
          { word: "cook breakfast", translation: "preparar desayuno", pictogramId: 3 },
          { word: "go to work", translation: "ir al trabajo", pictogramId: 4 }
        ]
      }
    };

    setPlaceData(mockPlaceData[slug as keyof typeof mockPlaceData] || null);
  }, [slug]);

  if (!placeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Instancia no encontrada
          </h2>
          <p className="text-gray-600 mb-4">
            La instancia "{slug}" no existe o no está disponible.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Optimized header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                aria-label={t('nav.back')}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">PictoNet</span>
              </Link>
              <div className="hidden sm:block w-px h-5 bg-gray-300" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900">
                  {placeData.name}
                </h1>
                <p className="text-xs text-gray-600">
                  {placeData.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Mobile title */}
              <div className="block sm:hidden">
                <h1 className="text-lg font-semibold text-gray-900">
                  {placeData.name}
                </h1>
              </div>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-transparent border-b-0 h-auto p-0">
              <TabsTrigger 
                value="editor" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
              >
                {t('place.editor')}
              </TabsTrigger>
              <TabsTrigger 
                value="styles"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
              >
                <Palette className="w-4 h-4 mr-2" />
                {t('place.styles')}
              </TabsTrigger>
              <TabsTrigger 
                value="vocabulary"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
              >
                <Book className="w-4 h-4 mr-2" />
                {t('place.vocabulary')}
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
              >
                <Settings className="w-4 h-4 mr-2" />
                {t('place.settings')}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="editor" className="m-0">
            <SvgEditor />
          </TabsContent>

          <TabsContent value="styles" className="m-0">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Estilos de la instancia
                  </h2>
                  <p className="text-gray-600">
                    Gestiona las clases CSS personalizadas para esta instancia
                  </p>
                </div>

                <div className="grid gap-4">
                  {Object.entries(placeData.defaultStyles).map(([className, styles]) => (
                    <Card key={className}>
                      <CardHeader>
                        <CardTitle className="text-lg">{className}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Propiedades CSS:</h4>
                            <div className="space-y-1 text-sm">
                              {Object.entries(styles as Record<string, string>).map(([prop, value]) => (
                                <div key={prop} className="flex justify-between">
                                  <span className="text-gray-600">{prop}:</span>
                                  <span className="font-mono">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Vista previa:</h4>
                            <div 
                              className="w-16 h-16 border-2 rounded"
                              style={styles as React.CSSProperties}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button className="mt-6">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar nuevo estilo
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vocabulary" className="m-0">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Vocabulario de la instancia
                  </h2>
                  <p className="text-gray-600">
                    Gestiona las traducciones y asociaciones con pictogramas
                  </p>
                </div>

                <div className="space-y-2">
                  {placeData.vocabulary.map((entry: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                              <span className="text-xs text-gray-500">SVG</span>
                            </div>
                            <div>
                              <div className="font-medium">{entry.word}</div>
                              <div className="text-sm text-gray-600">{entry.translation}</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button className="mt-6">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar traducción
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="m-0">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-2xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de la instancia</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre de la instancia
                      </label>
                      <input 
                        type="text" 
                        defaultValue={placeData.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                      </label>
                      <textarea 
                        defaultValue={placeData.description}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={3}
                      />
                    </div>
                    <Button>
                      Guardar configuración
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function Place() {
  return (
    <I18nProvider>
      <PlaceContent />
    </I18nProvider>
  );
}