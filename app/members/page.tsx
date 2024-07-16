
import { Button } from "@/components/ui/button"
import { columns, Payment } from "./column"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 "> 
        <a href="/members/add">
        <Button>Add data</Button>
        </a>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
