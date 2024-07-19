'use client';

import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  fullName: z.string().min(1, { message: 'Nama lengkap wajib diisi.' }),
  placeOfBirth: z.string().min(1, { message: 'Tempat lahir wajib diisi.' }),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Tanggal lahir wajib diisi.' }),
  phoneNumber: z.string().regex(/^\d+$/, { message: 'Nomor telepon wajib angka.' }),
  email: z.string().email({ message: 'Email harus format yang benar.' }),
  address: z.string().min(1, { message: 'Alamat wajib diisi.' }),
  province: z.string().min(1, { message: 'Provinsi wajib diisi.' }),
  city: z.string().min(1, { message: 'Kota wajib diisi.' }),
  gender: z.enum(['Male', 'Female'], { message: 'Jenis kelamin wajib dipilih.' }),
  occupation: z.string().min(1, { message: 'Pekerjaan wajib diisi.' }),
  maritalStatus: z.enum(['Single', 'Married'], { message: 'Status pernikahan wajib dipilih.' }),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      placeOfBirth: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      address: '',
      province: '',
      city: '',
      gender: 'Male',
      occupation: '',
      maritalStatus: 'Single',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formattedData = {
        ...values,
        dateOfBirth: new Date(values.dateOfBirth).toISOString(),
      };

      console.log('formattedData', formattedData);

      const response = await axios.post('http://localhost:3000/api/members', formattedData);
      alert('Data submitted successfully');
      window.location.href = '/members';
    } catch (error) {
      alert('Failed to submit data');
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Lengkap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="placeOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempat Lahir</FormLabel>
                  <FormControl>
                    <Input placeholder="Tempat Lahir" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input placeholder="Nomor Telepon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Alamat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provinsi</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Provinsi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DKI Jakarta">DKI Jakarta</SelectItem>
                        <SelectItem value="Jawa Barat">Jawa Barat</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kota</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kota" />
                      </SelectTrigger>
                      <SelectContent>
                        {form.watch('province') === 'DKI Jakarta' && (
                          <>
                            <SelectItem value="Jakarta Pusat">Jakarta Pusat</SelectItem>
                            <SelectItem value="Jakarta Selatan">Jakarta Selatan</SelectItem>
                            <SelectItem value="Jakarta Timur">Jakarta Timur</SelectItem>
                            <SelectItem value="Jakarta Barat">Jakarta Barat</SelectItem>
                            <SelectItem value="Jakarta Utara">Jakarta Utara</SelectItem>
                          </>
                        )}
                        {form.watch('province') === 'Jawa Barat' && (
                          <>
                            <SelectItem value="Bandung">Bandung</SelectItem>
                            <SelectItem value="Bogor">Bogor</SelectItem>
                            <SelectItem value="Depok">Depok</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <FormControl>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <Checkbox checked={field.value === 'Male'} onCheckedChange={() => field.onChange('Male')} />
                        <span>Male</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox checked={field.value === 'Female'} onCheckedChange={() => field.onChange('Female')} />
                        <span>Female</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pekerjaan</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Pekerjaan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engineer">Engineer</SelectItem>
                        <SelectItem value="Doctor">Doctor</SelectItem>
                        <SelectItem value="Teacher">Teacher</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Pernikahan</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
