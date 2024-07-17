'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import axios from 'axios';

export type Member = {
  id: string;
  fullName: string;
  placeOfBirth: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  address: string;
  province: string;
  city: string;
  gender: 'male' | 'female';
  occupation: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
};

const columns: ColumnDef<Member>[] = [
  {
    accessorKey: 'fullName',
    header: 'Full Name',
  },
  {
    accessorKey: 'placeOfBirth',
    header: 'Place of Birth',
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Date of Birth',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'province',
    header: 'Province',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'occupation',
    header: 'Occupation',
  },
  {
    accessorKey: 'maritalStatus',
    header: 'Marital Status',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const member = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEdit(member)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(member)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function handleDelete(member: Member) {
  if (!window.confirm('Are you sure you want to delete this member?')) {
    return;
  }

  axios
    .delete(`http://localhost:3000/api/members/${member.id}`)
    .then((response) => {
      console.log('Member deleted successfully:', response.data);
      alert('Member deleted successfully');
      window.location.reload();
    })
    .catch((error) => {
      console.error('Failed to delete member:', error);
      alert('Failed to delete member');
    });
}

function handleEdit(member: Member) {
  console.log('Editing member:', member);
  window.location.href = `/members/edit/${member.id}`;
}

export { columns, handleEdit, handleDelete };
