import { Button } from '@/components/ui/button';
import { columns, Member } from './column';
import { DataTable } from './data-table';

async function getData(): Promise<Member[]> {
  // Fetch data from your API here.
  return [
    {
      id: '1',
      fullName: 'John Doe',
      placeOfBirth: 'Jakarta',
      dateOfBirth: '1990-01-01',
      phoneNumber: '+628123456789',
      email: 'test@gmail.com',
      address: 'Jakarta',
      province: 'Jakarta',
      city: 'Kembangan',
      gender: 'male',
      occupation: 'karyawan',
      maritalStatus: 'single',
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 ">
        <a href="/members/add">
          <Button>Add data</Button>
        </a>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
