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
      address: '48 Le Thi Tu Minh, Phuong 4, Quan Tan Binh',
      lat: 10.802029,
      long: 106.649307,
      paperMaker: {
        create: {
          totalCases: 10,
          rating: 2.8,
          pastSuccessfulCases: 5,
          aboutMe:
            'I have always stood by one basic principle regarding my work: providing the best and quickest paperwork service for couples to tie the wedding knot.',
          offeredServices: {
            create: {
              duration: 10,
              price: 100,
              serviceId: '1',
              description:
                'A marriage certificate is an official statement that two people are married. In most jurisdictions, a marriage certificate is issued by a government official only after the civil registration of the marriage.',
              documents: 'National ID card/Passport',
              estimate: 'Within 15 working days.',
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
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1000_thumb.jpg',
      address: 'Phuong 4, Quan Tan Binh',
      lat: 10.802029,
      long: 106.649307,
      paperMaker: {
        create: {
          totalCases: 1000,
          rating: 4.8,
          pastSuccessfulCases: 1000,
          aboutMe:
            'Applying for work permits in Vietnam can be complicated if you do not have adequate local knowledge or experience as the procedure requires different steps and documents which may be subject to the change of legal regulation. I will update you with the latest regulations on Vietnam work permits; minimize your documents to be submitted for work permit application; and instruct you how to prepare and where to get all the necessary documents; Contact me at 0123456789.',
          offeredServices: {
            create: {
              duration: 20,
              price: 50,
              serviceId: '2',
              description:
                'Vietnam work permit is an official certificate issued by the Department of Labor, Invalid and Social Affairs to allow its holder to work in Vietnam legally. It cannot be applied directly by the workers/foreigners, but with the assistance of their employers or a service center in Vietnam. And Vietnam work permit is an important paper to apply for a temporary residence card or a working visa for Vietnam.',
              documents:
                '- Copy of Business Registration.<br/>- Registration letter for recruitment needs.<br/>- Letter of introduction/power of attorney.',
              estimate: '10 working days',
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
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1001_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '48 Le Thi Tu Minh, Phuong 4, Quan Tan Binh',
      lat: 10.802029,
      long: 106.649307,
      paperMaker: {
        create: {
          totalCases: 500,
          rating: 4.2,
          pastSuccessfulCases: 250,
          aboutMe:
            'Receive feedbacks, answer questions from people about citizen identity card coming into operation.',
          offeredServices: {
            create: {
              duration: 10,
              price: 300,
              serviceId: '3',
              description:
                "Citizen identification means basic information about a citizen's background and identity in accordance with this Law. Thus, the citizen identification card is simply understood as the main identification document of a Vietnamese citizen, which must clearly and fully contain the citizen's personal information.",
              documents:
                '- Registration book (original and 2 photocopies) <br/>- Old ID card (if any)',
              estimate: '7 working days.',
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
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1002_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '48 Le Thi Tu Minh, Phuong 4, Quan Tan Binh',
      lat: 10.802029,
      long: 106.649307,
      paperMaker: {
        create: {
          totalCases: 1000,
          rating: 4.8,
          pastSuccessfulCases: 1000,
          aboutMe:
            'Applying for work permits in Vietnam can be complicated if you do not have adequate local knowledge or experience as the procedure requires different steps and documents which may be subject to the change of legal regulation. I will update you with the latest regulations on Vietnam work permits; minimize your documents to be submitted for work permit application; and instruct you how to prepare and where to get all the necessary documents; Contact me at 0123456789.',
          offeredServices: {
            create: {
              duration: 5,
              price: 300,
              serviceId: '2',
              description:
                'Vietnam work permit is an official certificate issued by the Department of Labor, Invalid and Social Affairs to allow its holder to work in Vietnam legally. It cannot be applied directly by the workers/foreigners, but with the assistance of their employers or a service center in Vietnam. And Vietnam work permit is an important paper to apply for a temporary residence card or a working visa for Vietnam.',
              documents:
                '- Copy of Business Registration.<br/>- Registration letter for recruitment needs.<br/>- Letter of introduction/power of attorney.',
              estimate: '10 working days',
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
      username: 'papermaker5@gmail.com',
      name: 'Vu Duc Trung',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1003_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '48 Le Thi Tu Minh, Phuong 4, Quan Tan Binh',
      lat: 10.802029,
      long: 106.649307,
      paperMaker: {
        create: {
          totalCases: 21,
          rating: 2.9,
          pastSuccessfulCases: 20,
          aboutMe:
            'I have always stood by one basic principle regarding my work: providing the best and quickest paperwork service for couples to tie the wedding knot.',
          offeredServices: {
            create: {
              duration: 14,
              price: 50,
              serviceId: '1',
              description:
                'A marriage certificate is an official statement that two people are married. In most jurisdictions, a marriage certificate is issued by a government official only after the civil registration of the marriage.',
              documents: 'National ID card/Passport',
              estimate: 'Within 15 working days.',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '0935123456',
      id: '16',
      username: 'giovanniastika@gmail.com',
      name: 'Giovanni Astika',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1004_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '200 Nguyen Thi Thap, District 7, HCM',
      lat: 10.73839,
      long: 106.71724,
      paperMaker: {
        create: {
          totalCases: 500,
          rating: 3.8,
          pastSuccessfulCases: 400,
          aboutMe:
            'I have always stood by one basic principle regarding my work: providing the best and quickest paperwork service for couples to tie the wedding knot.',
          offeredServices: {
            create: {
              duration: 10,
              price: 30,
              serviceId: '1',
              description:
                'A marriage certificate is an official statement that two people are married. In most jurisdictions, a marriage certificate is issued by a government official only after the civil registration of the marriage.',
              documents: 'National ID card/Passport',
              estimate: 'Within 15 working days.',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '0935123456',
      id: '17',
      username: 'hienhoangovu@gmail.com',
      name: 'Ngo Vu Hien Hoa',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1005_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '200 Nam Ky Khoi Nghia, District 3, HCM',
      lat: 10.790064953643636,
      long: 106.68415921309577,
      paperMaker: {
        create: {
          totalCases: 600,
          rating: 4.8,
          pastSuccessfulCases: 550,
          aboutMe:
            'Receive feedbacks, answer questions from people about citizen identity card coming into operation.',
          offeredServices: {
            create: {
              duration: 15,
              price: 40,
              serviceId: '3',
              description:
                "Citizen identification means basic information about a citizen's background and identity in accordance with this Law. Thus, the citizen identification card is simply understood as the main identification document of a Vietnamese citizen, which must clearly and fully contain the citizen's personal information.",
              documents:
                '- Registration book (original and 2 photocopies) <br/>- Old ID card (if any)',
              estimate: '7 working days.',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '0935312345',
      id: '18',
      username: 'hungmanhnguyen@gmail.com',
      name: 'Nguyen Hung Manh ',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-2686_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '290 Hoang Sa, District 3, HCM',
      lat: 10.784204522008878,
      long: 106.71724,
      paperMaker: {
        create: {
          totalCases: 200,
          rating: 4.5,
          pastSuccessfulCases: 199,
          aboutMe:
            'As real estate consultancy attorneys, we find that land is a great value and is the most important property, of each person, while the procedures of changing the name of the owner of Red Book, the procedures of land registration is very complicated and take so much time. To help customers save time and quickly get the Red Book, Pink Book, we have prestigious lawyers in Ho Chi Minh City who will provide the best service of getting Red Book.',
          offeredServices: {
            create: {
              duration: 10,
              price: 35,
              serviceId: '4',
              description:
                'Land Use Certificate is the land use certificate to be issued by the Authority which shall confer to the Company the exclusive granted land use right in respect of the Site in accordance with the terms and conditions set forth therein.',
              documents:
                '- Authenticated household registration book of the buyer and seller.<br/>- Identity card or passport authenticated by the buyer or seller.<br/>- The sale and purchase contract certified by the notary office.',
              estimate: 'Within 30 working days',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '0935123456',
      id: '19',
      username: 'giahandao@gmail.com',
      name: 'Han Dao',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1617_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '290 Cao Dat, District 5, HCM',
      lat: 10.754156019671198,
      long: 106.68089061124546,
      paperMaker: {
        create: {
          totalCases: 100,
          rating: 5.0,
          pastSuccessfulCases: 100,
          aboutMe:
            'I have always stood by one basic principle regarding my work: providing the best and quickest paperwork service for couples to tie the wedding knot.',
          offeredServices: {
            create: {
              duration: 12,
              price: 35,
              serviceId: '1',
              description:
                'A marriage certificate is an official statement that two people are married. In most jurisdictions, a marriage certificate is issued by a government official only after the civil registration of the marriage.',
              documents: 'National ID card/Passport',
              estimate: 'Within 15 working days.',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '0935123321',
      id: '20',
      username: 'michalepanjatan@gmail.com',
      name: 'Michale Panjatan',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1100_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '21 Nguyen Hue, District 1, HCM',
      lat: 10.77202420841216,
      long: 106.70558405542431,
      paperMaker: {
        create: {
          totalCases: 700,
          rating: 3.5,
          pastSuccessfulCases: 500,
          aboutMe:
            'Applying for work permits in Vietnam can be complicated if you do not have adequate local knowledge or experience as the procedure requires different steps and documents which may be subject to the change of legal regulation. I will update you with the latest regulations on Vietnam work permits; minimize your documents to be submitted for work permit application; and instruct you how to prepare and where to get all the necessary documents; Contact me at 0123456789.',
          offeredServices: {
            create: {
              duration: 15,
              price: 35,
              serviceId: '2',
              description:
                'Vietnam work permit is an official certificate issued by the Department of Labor, Invalid and Social Affairs to allow its holder to work in Vietnam legally. It cannot be applied directly by the workers/foreigners, but with the assistance of their employers or a service center in Vietnam. And Vietnam work permit is an important paper to apply for a temporary residence card or a working visa for Vietnam.',
              documents:
                '- Copy of Business Registration.<br/>- Registration letter for recruitment needs.<br/>- Letter of introduction/power of attorney.',
              estimate: '10 working days',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '0935123322',
      id: '21',
      username: 'antran@gmail.com',
      name: 'An Tran',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-3311_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '23 Nguyễn Thị Minh Khai, Quận 1, Thành phố Hồ Chí Minh',
      lat: 10.784201700728243,
      long: 106.69970597076711,
      paperMaker: {
        create: {
          totalCases: 700,
          rating: 3.5,
          pastSuccessfulCases: 500,
          aboutMe:
            'Applying for work permits in Vietnam can be complicated if you do not have adequate local knowledge or experience as the procedure requires different steps and documents which may be subject to the change of legal regulation. I will update you with the latest regulations on Vietnam work permits; minimize your documents to be submitted for work permit application; and instruct you how to prepare and where to get all the necessary documents; Contact me at 0123456789.',
          offeredServices: {
            create: {
              duration: 20,
              price: 30,
              serviceId: '2',
              description:
                'Vietnam work permit is an official certificate issued by the Department of Labor, Invalid and Social Affairs to allow its holder to work in Vietnam legally. It cannot be applied directly by the workers/foreigners, but with the assistance of their employers or a service center in Vietnam. And Vietnam work permit is an important paper to apply for a temporary residence card or a working visa for Vietnam.',
              documents:
                '- Copy of Business Registration.<br/>- Registration letter for recruitment needs.<br/>- Letter of introduction/power of attorney.',
              estimate: '10 working days',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '0935123323',
      id: '22',
      username: 'PhuongTran@gmail.com',
      name: 'Phuong Tran',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-5052_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '235 Nguyễn Văn Cừ, Quận 5, Thành phố Hồ Chí Minh',
      lat: 10.76201675485627,
      long: 106.68326526706699,
      paperMaker: {
        create: {
          totalCases: 200,
          rating: 4.5,
          pastSuccessfulCases: 180,
          aboutMe:
            'Receive feedbacks, answer questions from people about citizen identity card coming into operation.',
          offeredServices: {
            create: {
              duration: 10,
              price: 40,
              serviceId: '3',
              description:
                "Citizen identification means basic information about a citizen's background and identity in accordance with this Law. Thus, the citizen identification card is simply understood as the main identification document of a Vietnamese citizen, which must clearly and fully contain the citizen's personal information.",
              documents:
                '- Registration book (original and 2 photocopies) <br/>- Old ID card (if any)',
              estimate: '7 working days.',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '0935123325',
      id: '23',
      username: 'diemdo@gmail.com',
      name: 'Diem Do',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-5625_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '155 Bến Vân Đồn, Phường 6, Quận 4, Thành phố Hồ Chí Minh',
      lat: 10.762355833648538,
      long: 106.6989938535741,
      paperMaker: {
        create: {
          totalCases: 200,
          rating: 5.0,
          pastSuccessfulCases: 200,
          aboutMe:
            'Receive feedbacks, answer questions from people about citizen identity card coming into operation.',
          offeredServices: {
            create: {
              duration: 10,
              price: 35,
              serviceId: '3',
              description:
                "Citizen identification means basic information about a citizen's background and identity in accordance with this Law. Thus, the citizen identification card is simply understood as the main identification document of a Vietnamese citizen, which must clearly and fully contain the citizen's personal information.",
              documents:
                '- Registration book (original and 2 photocopies) <br/>- Old ID card (if any)',
              estimate: '7 working days.',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '0935123421',
      id: '24',
      username: 'phucnguyen@gmail.com',
      name: 'Phuc Nguyen',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-5194_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '231 Lê Hồng Phong, Phường 4, Quận 5, Thành phố Hồ Chí Minh',
      lat: 10.759883735644246,
      long: 106.6772342265885,
      paperMaker: {
        create: {
          totalCases: 300,
          rating: 5.0,
          pastSuccessfulCases: 300,
          aboutMe:
            'Receive feedbacks, answer questions from people about citizen identity card coming into operation.',
          offeredServices: {
            create: {
              duration: 10,
              price: 50,
              serviceId: '3',
              description:
                "Citizen identification means basic information about a citizen's background and identity in accordance with this Law. Thus, the citizen identification card is simply understood as the main identification document of a Vietnamese citizen, which must clearly and fully contain the citizen's personal information.",
              documents:
                '- Registration book (original and 2 photocopies) <br/>- Old ID card (if any)',
              estimate: '7 working days.',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '0934423321',
      id: '25',
      username: 'ThaoDo@gmail.com',
      name: 'Thao Do',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-3157_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '456 Sư Vạn Hạnh, Phường 9, Quận 10, Thành phố Hồ Chí Minh',
      lat: 10.766379931847815,
      long: 106.67201072658852,
      paperMaker: {
        create: {
          totalCases: 100,
          rating: 4.0,
          pastSuccessfulCases: 80,
          aboutMe:
            'I have always stood by one basic principle regarding my work: providing the best and quickest paperwork service for couples to tie the wedding knot.',
          offeredServices: {
            create: {
              duration: 20,
              price: 30,
              serviceId: '1',
              description:
                'A marriage certificate is an official statement that two people are married. In most jurisdictions, a marriage certificate is issued by a government official only after the civil registration of the marriage.',
              documents: 'National ID card/Passport',
              estimate: 'Within 15 working days.',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '345',
      id: '26',
      username: 'papermaker6@gmail.com',
      name: 'Nguyen Le Huy',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1111_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '702 Nguyen Van Linh, Phuong Tan Phong, Quan 7',
      lat: 10.802029,
      long: 106.649307,
      paperMaker: {
        create: {
          totalCases: 700,
          rating: 4.2,
          pastSuccessfulCases: 600,
          aboutMe:
            'Receive feedbacks, answer questions from people about citizen identity card coming into operation.',
          offeredServices: {
            create: {
              duration: 12,
              price: 75,
              serviceId: '3',
              description:
                "Citizen identification means basic information about a citizen's background and identity in accordance with this Law. Thus, the citizen identification card is simply understood as the main identification document of a Vietnamese citizen, which must clearly and fully contain the citizen's personal information.",
              documents:
                '- Registration book (original and 2 photocopies) <br/>- Old ID card (if any)',
              estimate: '7 working days.',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '456',
      id: '27',
      username: 'papermaker7@gmail.com',
      name: 'Phan Boi Chau',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1112_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '702 Nguyen Van Linh, Phuong Tan Phong, Quan 7',
      lat: 10.802029,
      long: 106.649307,
      paperMaker: {
        create: {
          totalCases: 48,
          rating: 4.2,
          pastSuccessfulCases: 20,
          aboutMe:
            'I have always stood by one basic principle regarding my work: providing the best and quickest paperwork service for couples to tie the wedding knot.',
          offeredServices: {
            create: {
              duration: 4,
              price: 70,
              serviceId: '1',
              description:
                'A marriage certificate is an official statement that two people are married. In most jurisdictions, a marriage certificate is issued by a government official only after the civil registration of the marriage.',
              documents: 'National ID card/Passport',
              estimate: 'Within 15 working days.',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '789',
      id: '28',
      username: 'papermaker8@gmail.com',
      name: 'Nguyen Tat Thanh',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1113_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '702 Nguyen Van Linh, Phuong Tan Phong, Quan 7',
      lat: 10.802029,
      long: 106.649307,
      paperMaker: {
        create: {
          totalCases: 977,
          rating: 3.0,
          pastSuccessfulCases: 800,
          aboutMe:
            'Applying for work permits in Vietnam can be complicated if you do not have adequate local knowledge or experience as the procedure requires different steps and documents which may be subject to the change of legal regulation. I will update you with the latest regulations on Vietnam work permits; minimize your documents to be submitted for work permit application; and instruct you how to prepare and where to get all the necessary documents; Contact me at 0123456789.',
          offeredServices: {
            create: {
              duration: 11,
              price: 48,
              serviceId: '2',
              description:
                'Vietnam work permit is an official certificate issued by the Department of Labor, Invalid and Social Affairs to allow its holder to work in Vietnam legally. It cannot be applied directly by the workers/foreigners, but with the assistance of their employers or a service center in Vietnam. And Vietnam work permit is an important paper to apply for a temporary residence card or a working visa for Vietnam.',
              documents:
                '- Copy of Business Registration.<br/>- Registration letter for recruitment needs.<br/>- Letter of introduction/power of attorney.',
              estimate: '10 working days',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '678',
      id: '29',
      username: 'papermaker9@gmail.com',
      name: 'Phan Boi Chau',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1114_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '462 Nguyen Thi Minh Khai, Phuong 2, Quan 3',
      lat: 10.802029,
      long: 106.649307,
      paperMaker: {
        create: {
          totalCases: 113,
          rating: 4.7,
          pastSuccessfulCases: 112,
          aboutMe:
            'As real estate consultancy attorneys, we find that land is a great value and is the most important property, of each person, while the procedures of changing the name of the owner of Red Book, the procedures of land registration is very complicated and take so much time. To help customers save time and quickly get the Red Book, Pink Book, we have prestigious lawyers in Ho Chi Minh City who will provide the best service of getting Red Book.',
          offeredServices: {
            create: {
              duration: 7,
              price: 30,
              serviceId: '4',
              description:
                'Land Use Certificate is the land use certificate to be issued by the Authority which shall confer to the Company the exclusive granted land use right in respect of the Site in accordance with the terms and conditions set forth therein.',
              documents:
                '- Authenticated household registration book of the buyer and seller.<br/>- Identity card or passport authenticated by the buyer or seller.<br/>- The sale and purchase contract certified by the notary office.',
              estimate: 'Within 30 working days',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '456',
      id: '30',
      username: 'papermaker10@gmail.com',
      name: 'Huynh Minh Hung',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1115_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '771 Tran Hung Dao, Phuong 1, Quan 5',
      lat: 10.802029,
      long: 106.649307,
      paperMaker: {
        create: {
          totalCases: 333,
          rating: 3.0,
          pastSuccessfulCases: 200,
          aboutMe:
            'As real estate consultancy attorneys, we find that land is a great value and is the most important property, of each person, while the procedures of changing the name of the owner of Red Book, the procedures of land registration is very complicated and take so much time. To help customers save time and quickly get the Red Book, Pink Book, we have prestigious lawyers in Ho Chi Minh City who will provide the best service of getting Red Book.',
          offeredServices: {
            create: {
              duration: 7,
              price: 10,
              serviceId: '4',
              description:
                'Land Use Certificate is the land use certificate to be issued by the Authority which shall confer to the Company the exclusive granted land use right in respect of the Site in accordance with the terms and conditions set forth therein.',
              documents:
                '- Authenticated household registration book of the buyer and seller.<br/>- Identity card or passport authenticated by the buyer or seller.<br/>- The sale and purchase contract certified by the notary office.',
              estimate: 'Within 30 working days',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '456',
      id: '31',
      username: 'papermaker11@gmail.com',
      name: 'Nguyen Dang Lam Phuong',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1116_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '75 Nguyen Thai Hoc, Phuong Cau Ong Lanh, Quan 1',
      lat: 10.802029,
      long: 106.649307,
      paperMaker: {
        create: {
          totalCases: 100,
          rating: 1.3,
          pastSuccessfulCases: 20,
          aboutMe:
            'Applying for work permits in Vietnam can be complicated if you do not have adequate local knowledge or experience as the procedure requires different steps and documents which may be subject to the change of legal regulation. Contact me at 0123456789.',
          offeredServices: {
            create: {
              duration: 9,
              price: 67,
              serviceId: '2',
              description:
                'Vietnam work permit is an official certificate issued by the Department of Labor, Invalid and Social Affairs to allow its holder to work in Vietnam legally. It cannot be applied directly by the workers/foreigners, but with the assistance of their employers or a service center in Vietnam. And Vietnam work permit is an important paper to apply for a temporary residence card or a working visa for Vietnam.',
              documents:
                '- Copy of Business Registration.<br/>- Registration letter for recruitment needs.<br/>- Letter of introduction/power of attorney.',
              estimate: '10 working days',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '456',
      id: '32',
      username: 'papermaker12@gmail.com',
      name: 'Nguyen Tan Dung',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1117_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '128 Nguyen Gia Tri, Phuong 25, Quan Binh Thanh',
      lat: 10.802029,
      long: 106.649307,
      paperMaker: {
        create: {
          totalCases: 2222,
          rating: 3.7,
          pastSuccessfulCases: 1753,
          aboutMe:
            'As real estate consultancy attorneys, we find that land is a great value and is the most important property, of each person, while the procedures of changing the name of the owner of Red Book, the procedures of land registration is very complicated and take so much time. To help customers save time and quickly get the Red Book, Pink Book, we have prestigious lawyers in Ho Chi Minh City who will provide the best service of getting Red Book.',
          offeredServices: {
            create: {
              duration: 13,
              price: 130,
              serviceId: '4',
              description:
                'Land Use Certificate is the land use certificate to be issued by the Authority which shall confer to the Company the exclusive granted land use right in respect of the Site in accordance with the terms and conditions set forth therein.',
              documents:
                '- Authenticated household registration book of the buyer and seller.<br/>- Identity card or passport authenticated by the buyer or seller.<br/>- The sale and purchase contract certified by the notary office.',
              estimate: 'Within 30 working days',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '456',
      id: '33',
      username: 'papermaker13@gmail.com',
      name: 'Le Cong Vinh',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1118_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '65 Nguyen Trai, Phuong 2, Quan 5',
      lat: 10.802029,
      long: 106.649307,
      paperMaker: {
        create: {
          totalCases: 666,
          rating: 4.3,
          pastSuccessfulCases: 522,
          aboutMe:
            'As real estate consultancy attorneys, we find that land is a great value and is the most important property, of each person, while the procedures of changing the name of the owner of Red Book, the procedures of land registration is very complicated and take so much time. To help customers save time and quickly get the Red Book, Pink Book, we have prestigious lawyers in Ho Chi Minh City who will provide the best service of getting Red Book.',
          offeredServices: {
            create: {
              duration: 20,
              price: 200,
              serviceId: '4',
              description:
                'Land Use Certificate is the land use certificate to be issued by the Authority which shall confer to the Company the exclusive granted land use right in respect of the Site in accordance with the terms and conditions set forth therein.',
              documents:
                '- Authenticated household registration book of the buyer and seller.<br/>- Identity card or passport authenticated by the buyer or seller.<br/>- The sale and purchase contract certified by the notary office.',
              estimate: 'Within 30 working days',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '456',
      id: '34',
      username: 'papermaker14@gmail.com',
      name: 'Mai Hong Ngoc',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1119_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '153 Nguyen Chi Thanh, Phuong 9, Quan 5',
      lat: 10.802029,
      long: 106.649307,
      paperMaker: {
        create: {
          totalCases: 750,
          rating: 4.6,
          pastSuccessfulCases: 705,
          aboutMe:
            'Applying for work permits in Vietnam can be complicated if you do not have adequate local knowledge or experience as the procedure requires different steps and documents which may be subject to the change of legal regulation. I will update you with the latest regulations on Vietnam work permits; minimize your documents to be submitted for work permit application; and instruct you how to prepare and where to get all the necessary documents; Contact me at 0123456789.',
          offeredServices: {
            create: {
              duration: 5,
              price: 30,
              serviceId: '2',
              description:
                'Vietnam work permit is an official certificate issued by the Department of Labor, Invalid and Social Affairs to allow its holder to work in Vietnam legally. It cannot be applied directly by the workers/foreigners, but with the assistance of their employers or a service center in Vietnam. And Vietnam work permit is an important paper to apply for a temporary residence card or a working visa for Vietnam.',
              documents:
                '- Copy of Business Registration.<br/>- Registration letter for recruitment needs.<br/>- Letter of introduction/power of attorney.',
              estimate: '10 working days',
            },
          },
        },
      },
    },
  });
  await client.user.create({
    data: {
      phoneNumber: '456',
      id: '35',
      username: 'papermaker15@gmail.com',
      name: 'Nguyen Kieu Cam Tho',
      picture: 'https://faces-img.xcdn.link/thumb-lorem-face-1232_thumb.jpg',
      password,
      role: 'paperMaker',
      address: '217 Hong Bang, Phuong 11, Quan 5',
      lat: 10.802029,
      long: 106.649307,
      paperMaker: {
        create: {
          totalCases: 480,
          rating: 3.5,
          pastSuccessfulCases: 235,
          aboutMe:
            'Receive feedbacks, answer questions from people about citizen identity card coming into operation.',
          offeredServices: {
            create: {
              duration: 17,
              price: 120,
              serviceId: '3',
              description:
                "Citizen identification means basic information about a citizen's background and identity in accordance with this Law. Thus, the citizen identification card is simply understood as the main identification document of a Vietnamese citizen, which must clearly and fully contain the citizen's personal information.",
              documents:
                '- Registration book (original and 2 photocopies) <br/>- Old ID card (if any)',
              estimate: '7 working days.',
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
