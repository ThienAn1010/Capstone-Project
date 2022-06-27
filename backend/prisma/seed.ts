import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const client = new PrismaClient();

// CREATE NEW USER
const seed = async () => {
  const password = await bcrypt.hash('123456', 12);
  await client.service.createMany({
    data: [
      {
        id: '1',
        name: 'Marriage Certificate',
        description: 'This deals with Marriage Certificate',
      },
      {
        id: '2',
        name: 'Work Permit',
        description: 'This deals with Work Permit',
      },
      {
        id: '3',
        name: 'ID Card',
        description: 'This deals with ID Card',
      },
      {
        id: '4',
        name: 'Certificates of land use right',
        description: 'This deals with land use',
      },
    ],
    skipDuplicates: true,
  });
  await client.user.create({
    data: {
      phoneNumber: '123',
      id: '1',
      username: 'papermaker1@gmail.com',
      name: 'Vu Minh Long',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhPZG1XjXzqUqxvmsVQfoBts1TfWUcTn1fnLn_e=s96-c',
      password,
      role: 'paperMaker',
      paperMaker: {
        create: {
          totalCases: 10,
          rating: 2.8,
          pastSuccessfulCases: 5,
          address: '48 Le Thi Tu Minh, Phuong 4, Quan Tan Binh',
          lat: 10.802029,
          long: 106.649307,
          offeredServices: {
            create: {
              duration: 10,
              price: 100,
              serviceId: '1',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '123',
      id: '2',
      username: 'papermaker2@gmail.com',
      name: 'Vu Minh Phuc',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhPZG1XjXzqUqxvmsVQfoBts1TfWUcTn1fnLn_e=s96-c',
      password,
      role: 'paperMaker',
      paperMaker: {
        create: {
          totalCases: 1000,
          rating: 4.8,
          pastSuccessfulCases: 1000,
          address: '48 Le Thi Tu Minh, Phuong 4, Quan Tan Binh',
          lat: 10.802029,
          long: 106.649307,
          offeredServices: {
            create: {
              duration: 20,
              price: 50,
              serviceId: '2',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '123',
      id: '3',
      username: 'papermaker3@gmail.com',
      name: 'Phuc Minh Hoa',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhPZG1XjXzqUqxvmsVQfoBts1TfWUcTn1fnLn_e=s96-c',
      password,
      role: 'paperMaker',
      paperMaker: {
        create: {
          totalCases: 500,
          rating: 4.2,
          pastSuccessfulCases: 250,
          address: '48 Le Thi Tu Minh, Phuong 4, Quan Tan Binh',
          lat: 10.802029,
          long: 106.649307,
          offeredServices: {
            create: {
              duration: 10,
              price: 300,
              serviceId: '3',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '123',
      id: '4',
      username: 'papermaker4@gmail.com',
      name: 'Minh Vu Phuc',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhPZG1XjXzqUqxvmsVQfoBts1TfWUcTn1fnLn_e=s96-c',
      password,
      role: 'paperMaker',
      paperMaker: {
        create: {
          totalCases: 1000,
          rating: 4.8,
          pastSuccessfulCases: 1000,
          address: '48 Le Thi Tu Minh, Phuong 4, Quan Tan Binh',
          lat: 10.802029,
          long: 106.649307,
          offeredServices: {
            create: {
              duration: 5,
              price: 300,
              serviceId: '2',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '123',
      id: '5',
      username: 'papermaker3@gmail.com',
      name: 'Vu Duc Trung',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhPZG1XjXzqUqxvmsVQfoBts1TfWUcTn1fnLn_e=s96-c',
      password,
      role: 'paperMaker',
      paperMaker: {
        create: {
          totalCases: 21,
          rating: 2.9,
          pastSuccessfulCases: 20,
          address: '48 Le Thi Tu Minh, Phuong 4, Quan Tan Binh',
          lat: 10.802029,
          long: 106.649307,
          offeredServices: {
            create: {
              duration: 14,
              price: 50,
              serviceId: '1',
            },
          },
        },
      },
    },
  });
};

seed()
  .then(() => console.log('OK'))
  .catch((err) => console.log(err));
