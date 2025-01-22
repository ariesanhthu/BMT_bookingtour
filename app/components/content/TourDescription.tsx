import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Location {
  name: string;
  description: string;
  imageUrl: string;
}

interface TourSection {
  title: string;
  locations: Location[];
}

interface TourDescriptionProps {
  sections: TourSection[];
}

export function TourDescription({ sections }: TourDescriptionProps) {
  return (
    <div className="space-y-8">
      {sections.map((section, sectionIndex) => (
        <Card key={sectionIndex}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.locations.map((location, locationIndex) => (
                <div key={locationIndex} className="space-y-4">
                  <Image
                    src={location.imageUrl}
                    alt={location.name}
                    width={400}
                    height={300}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                  <h3 className="text-xl font-semibold">{location.name}</h3>
                  <p className="text-gray-600">{location.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
