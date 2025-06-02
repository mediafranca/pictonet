import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Globe, Plus, Image } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PictoNet
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generador visual de pictogramas para comunicación aumentativa y alternativa
          </p>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Global SVG Dictionary */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Search className="w-6 h-6 text-blue-600" />
                Diccionario Global de SVGs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Busca en la base de datos completa de pictogramas generados
              </p>
              
              <div className="space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar pictogramas... ej: 'make the bed'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11"
                  />
                </div>
                
                <Link href="/dictionary">
                  <Button className="w-full h-11">
                    <Search className="w-4 h-4 mr-2" />
                    Explorar Diccionario
                  </Button>
                </Link>
              </div>

              {/* Preview of recent SVGs */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Pictogramas recientes:</p>
                <div className="flex gap-2 flex-wrap">
                  {['make-the-bed', 'cook-dinner', 'brush-teeth'].map((item) => (
                    <div key={item} className="w-8 h-8 bg-white rounded border flex items-center justify-center">
                      <Image className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Places Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-green-600" />
                Instancias de Edición
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Gestiona diferentes instancias con sus estilos y vocabularios únicos
              </p>

              {/* Existing Places */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-700">Instancias disponibles:</h4>
                
                <Link href="/place/aotearoa">
                  <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-base">Aotearoa</h5>
                          <p className="text-sm text-gray-500 mt-1">Pictogramas de Nueva Zelanda y en Te Reo Māori</p>
                        </div>
                        <div className="text-xs text-gray-400">
                          24 pictogramas
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/place/tea-chile">
                  <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-base">TEA Chile</h5>
                          <p className="text-sm text-gray-500 mt-1">CAA para autistas</p>
                        </div>
                        <div className="text-xs text-gray-400">
                          18 pictogramas
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/place/lectogram">
                  <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-base">Lectogram</h5>
                          <p className="text-sm text-gray-500 mt-1">Actividades de la vida diaria</p>
                        </div>
                        <div className="text-xs text-gray-400">
                          32 pictogramas
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              {/* Create New Place */}
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Crear Nueva Instancia
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">74</div>
            <div className="text-sm text-gray-600">Pictogramas totales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-gray-600">Instancias activas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">248</div>
            <div className="text-sm text-gray-600">Palabras en diccionario</div>
          </div>
        </div>
      </div>
    </div>
  );
}