import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const clean = async () => {
  await client.authProvider.deleteMany();
  await client.offeredService.deleteMany();
  await client.paperMaker.deleteMany();
  await client.user.deleteMany();
  await client.service.deleteMany();
  await client.booking.deleteMany();
  await client.deal.deleteMany();
};

clean()
  .then(() => console.log('OK'))
  .catch((err) => console.log(err));
