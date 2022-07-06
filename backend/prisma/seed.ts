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
  await client.user.create({
    data: {
      phoneNumber: '345',
      id: '6',
      username: 'papermaker6@gmail.com',
      name: 'Nguyen Le Huy',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhPZG1XjXzqUqxvmsVQfoBts1TfWUcTn1fnLn_e=s96-c',
      password,
      role: 'paperMaker',
      paperMaker: {
        create: {
          totalCases: 700,
          rating: 4.2,
          pastSuccessfulCases: 600,
          address: '702 Nguyen Van Linh, Phuong Tan Phong, Quan 7',
          lat: 10.802029,
          long: 106.649307,
          offeredServices: {
            create: {
              duration: 12,
              price: 75,
              serviceId: '3',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '456',
      id: '7',
      username: 'papermaker7@gmail.com',
      name: 'Phan Boi Chau',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhPZG1XjXzqUqxvmsVQfoBts1TfWUcTn1fnLn_e=s96-c',
      password,
      role: 'paperMaker',
      paperMaker: {
        create: {
          totalCases: 48,
          rating: 4.2,
          pastSuccessfulCases: 20,
          address: '702 Nguyen Van Linh, Phuong Tan Phong, Quan 7',
          lat: 10.802029,
          long: 106.649307,
          offeredServices: {
            create: {
              duration: 4,
              price: 70,
              serviceId: '1',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '789',
      id: '8',
      username: 'papermaker8@gmail.com',
      name: 'Nguyen Tat Thanh',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhPZG1XjXzqUqxvmsVQfoBts1TfWUcTn1fnLn_e=s96-c',
      password,
      role: 'paperMaker',
      paperMaker: {
        create: {
          totalCases: 977,
          rating: 3.0,
          pastSuccessfulCases: 800,
          address: '702 Nguyen Van Linh, Phuong Tan Phong, Quan 7',
          lat: 10.802029,
          long: 106.649307,
          offeredServices: {
            create: {
              duration: 11,
              price: 48,
              serviceId: '2',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '678',
      id: '9',
      username: 'papermaker9@gmail.com',
      name: 'Phan Boi Chau',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhPZG1XjXzqUqxvmsVQfoBts1TfWUcTn1fnLn_e=s96-c',
      password,
      role: 'paperMaker',
      paperMaker: {
        create: {
          totalCases: 113,
          rating: 4.7,
          pastSuccessfulCases: 112,
          address: '462 Nguyen Thi Minh Khai, Phuong 2, Quan 3',
          lat: 10.802029,
          long: 106.649307,
          offeredServices: {
            create: {
              duration: 7,
              price: 30,
              serviceId: '4',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '456',
      id: '10',
      username: 'papermaker10@gmail.com',
      name: 'Huynh Minh Hung',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhPZG1XjXzqUqxvmsVQfoBts1TfWUcTn1fnLn_e=s96-c',
      password,
      role: 'paperMaker',
      paperMaker: {
        create: {
          totalCases: 333,
          rating: 3.0,
          pastSuccessfulCases: 200,
          address: '771 Tran Hung Dao, Phuong 1, Quan 5',
          lat: 10.802029,
          long: 106.649307,
          offeredServices: {
            create: {
              duration: 7,
              price: 10,
              serviceId: '4',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '456',
      id: '11',
      username: 'papermaker11@gmail.com',
      name: 'Nguyen Dang Lam Phuong',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhPZG1XjXzqUqxvmsVQfoBts1TfWUcTn1fnLn_e=s96-c',
      password,
      role: 'paperMaker',
      paperMaker: {
        create: {
          totalCases: 100,
          rating: 1.3,
          pastSuccessfulCases: 20,
          address: '75 Nguyen Thai Hoc, Phuong Cau Ong Lanh, Quan 1',
          lat: 10.802029,
          long: 106.649307,
          offeredServices: {
            create: {
              duration: 9,
              price: 67,
              serviceId: '2',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '456',
      id: '12',
      username: 'papermaker12@gmail.com',
      name: 'Nguyen Tan Dung',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhPZG1XjXzqUqxvmsVQfoBts1TfWUcTn1fnLn_e=s96-c',
      password,
      role: 'paperMaker',
      paperMaker: {
        create: {
          totalCases: 2222,
          rating: 3.7,
          pastSuccessfulCases: 1753,
          address: '128 Nguyen Gia Tri, Phuong 25, Quan Binh Thanh',
          lat: 10.802029,
          long: 106.649307,
          offeredServices: {
            create: {
              duration: 13,
              price: 130,
              serviceId: '4',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '456',
      id: '13',
      username: 'papermaker13@gmail.com',
      name: 'Le Cong Vinh',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhPZG1XjXzqUqxvmsVQfoBts1TfWUcTn1fnLn_e=s96-c',
      password,
      role: 'paperMaker',
      paperMaker: {
        create: {
          totalCases: 666,
          rating: 4.3,
          pastSuccessfulCases: 522,
          address: '65 Nguyen Trai, Phuong 2, Quan 5',
          lat: 10.802029,
          long: 106.649307,
          offeredServices: {
            create: {
              duration: 20,
              price: 200,
              serviceId: '4',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '456',
      id: '14',
      username: 'papermaker14@gmail.com',
      name: 'Mai Hong Ngoc',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhPZG1XjXzqUqxvmsVQfoBts1TfWUcTn1fnLn_e=s96-c',
      password,
      role: 'paperMaker',
      paperMaker: {
        create: {
          totalCases: 750,
          rating: 4.6,
          pastSuccessfulCases: 705,
          address: '153 Nguyen Chi Thanh, Phuong 9, Quan 5',
          lat: 10.802029,
          long: 106.649307,
          offeredServices: {
            create: {
              duration: 5,
              price: 30,
              serviceId: '2',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '456',
      id: '15',
      username: 'papermaker15@gmail.com',
      name: 'Nguyen Kieu Cam Tho',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GhPZG1XjXzqUqxvmsVQfoBts1TfWUcTn1fnLn_e=s96-c',
      password,
      role: 'paperMaker',
      paperMaker: {
        create: {
          totalCases: 480,
          rating: 3.5,
          pastSuccessfulCases: 235,
          address: '217 Hong Bang, Phuong 11, Quan 5',
          lat: 10.802029,
          long: 106.649307,
          offeredServices: {
            create: {
              duration: 17,
              price: 120,
              serviceId: '3',
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
