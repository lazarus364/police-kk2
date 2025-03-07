import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, MapPin, Clock, FileText } from "lucide-react"

export default function PoliceInfoPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Police Information" text="Access important police information and resources" />

      <Tabs defaultValue="contacts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>Important contact information for police services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-0.5">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Emergency Services</h3>
                    <p className="text-sm text-muted-foreground mt-1">For immediate emergency assistance</p>
                    <p className="text-lg font-bold mt-2">999</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-0.5">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Non-Emergency Police Line</h3>
                    <p className="text-sm text-muted-foreground mt-1">For non-urgent police matters</p>
                    <p className="text-lg font-bold mt-2">+254700254254</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-0.5">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Anonymous Tip Line</h3>
                    <p className="text-sm text-muted-foreground mt-1">Report information anonymously</p>
                    <p className="text-lg font-bold mt-2">+254700254254</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-0.5">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Victim Support Services</h3>
                    <p className="text-sm text-muted-foreground mt-1">Support for crime victims</p>
                    <p className="text-lg font-bold mt-2">+254700254254</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <Card>
            <CardHeader>
              <CardTitle>Police Stations</CardTitle>
              <CardDescription>Locations and information about local police stations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">Main Police Headquarters</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        1 Uganda Road, Eldoret, Uasin Gishu
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="mr-1 h-4 w-4" />
                        +254700254254
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        Open 24/7
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="h-24 w-full md:h-32 md:w-48 bg-muted rounded-md flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">North District Station</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        1234, Eldoret, Uasin Gishu
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="mr-1 h-4 w-4" />
                        +254700254254
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        Open 24/7
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="h-24 w-full md:h-32 md:w-48 bg-muted rounded-md flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">Main District Station</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        1234 Uganda Road, Eldoret, Uasin Gishu
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="mr-1 h-4 w-4" />
                        +254700254254
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        Open 24/7
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="h-24 w-full md:h-32 md:w-48 bg-muted rounded-md flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Police Resources</CardTitle>
              <CardDescription>Helpful resources and documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 rounded-lg border p-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">Community Safety Guide</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      A comprehensive guide to staying safe in your community
                    </p>
                    <button className="text-sm font-medium text-primary mt-2">Download PDF</button>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rounded-lg border p-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">Crime Prevention Tips</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Practical advice to help prevent crime in your neighborhood
                    </p>
                    <button className="text-sm font-medium text-primary mt-2">Download PDF</button>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rounded-lg border p-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">Emergency Preparedness</h3>
                    <p className="text-sm text-muted-foreground mt-1">How to prepare for and respond to emergencies</p>
                    <button className="text-sm font-medium text-primary mt-2">Download PDF</button>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rounded-lg border p-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">Victim's Rights Handbook</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Information about rights and resources for crime victims
                    </p>
                    <button className="text-sm font-medium text-primary mt-2">Download PDF</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about police services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">How do I file a police report?</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    You can file a police report in person at any police station, by phone for non-emergency incidents,
                    or online through this portal by clicking on "Report Incident" in your dashboard.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">How long does it take to process a police report?</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Processing times vary depending on the nature and complexity of the incident. Most reports are
                    reviewed within 24-48 hours, and you will receive updates on your dashboard.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">How can I get a copy of a police report?</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    You can request a copy of a police report by visiting any police station with valid ID, or through
                    this portal by viewing your report details and clicking "Request Copy."
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">What should I do in an emergency?</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    In case of an emergency, always call 911 immediately. This portal is not monitored for emergency
                    situations and should only be used for non-emergency reporting and information.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">How can I join a neighborhood watch program?</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Contact your local police station or community liaison officer for information about neighborhood
                    watch programs in your area. You can find contact information in the Contacts tab.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

