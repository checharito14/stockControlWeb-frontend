import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function DataTables() {
  const tableHeaders = [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ]

  const tableRows = Array.from({ length: 2 }).map(() => ["", "", "", ""])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Table 1 */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold"></h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {tableHeaders[0].map((header, index) => (
                    <th key={index} className="text-left py-2 font-medium text-gray-600">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-3">
                        {cellIndex === 3 ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-700"></Badge>
                        ) : (
                          <span className="text-gray-900">{cell}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Table 2 */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold"></h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {tableHeaders[1].map((header, index) => (
                    <th key={index} className="text-left py-2 font-medium text-gray-600">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
                    <td className="py-3"></td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <span></span>
                      </div>
                    </td>
                    <td className="py-3"></td>
                    <td className="py-3">
                      <Badge variant="outline"></Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Table 3 */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold"></h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {tableHeaders[2].map((header, index) => (
                    <th key={index} className="text-left py-2 font-medium text-gray-600">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
                    <td className="py-3"></td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <span></span>
                      </div>
                    </td>
                    <td className="py-3"></td>
                    <td className="py-3">
                      <Badge
                        variant="outline"
                        className={rowIndex === 0 ? "border-green-500 text-green-700" : "border-red-500 text-red-700"}
                      ></Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
