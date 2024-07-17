'use client';

import { Button } from '@/components/ui/button';
import { columns, Member } from './column';
import { DataTable } from './data-table';
import axios from 'axios';
import React from 'react';

async function getData(): Promise<Member[]> {
  try {
    const response = await axios.get('http://localhost:3000/api/members');
    const formattedData = response.data.map((member: Member) => ({
      ...member,
      dateOfBirth: new Date(member.dateOfBirth).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }));

    return formattedData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw new Error('Failed to fetch data');
  }
}

export default function DemoPage() {
  const [data, setData] = React.useState<Member[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const members = await getData();
        setData(members);
      } catch (error) {
        // Handle error
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4">
        <a href="/members/add">
          <Button>Add data</Button>
        </a>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
