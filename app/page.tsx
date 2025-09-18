
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" 
         style={{ backgroundImage: "url('10631434.jpg')" }}>
      
      <div className="relative z-10 w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Logo o título */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">StockControl</h1>
            <p className="text-gray-600 mt-2">Inicia sesión en tu cuenta</p>
          </div>
          
          {/* Aquí irá tu formulario de login */}
          <div className="space-y-6">
            {/* Placeholder para el formulario */}
            <div className="text-center text-gray-500 py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <p>Tu formulario de login irá aquí</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
