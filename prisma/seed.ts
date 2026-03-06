import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';
import { makeUserCreateInput } from './factories/user.factory';

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is missing');
  }

  const parsedUrl = new URL(connectionString);
  const schema = parsedUrl.searchParams.get('schema') ?? 'public';
  parsedUrl.searchParams.delete('schema');

  const pool = new Pool({
    connectionString: parsedUrl.toString(),
    options: `-c search_path=${schema}`,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

const prisma = createPrismaClient();

function getBcryptRounds(): number {
  const raw = process.env.BCRYPT_ROUNDS;
  const rounds = raw ? Number(raw) : 10;
  return Number.isFinite(rounds) && rounds >= 8 && rounds <= 15 ? rounds : 10;
}

async function seedUsers(): Promise<void> {
  const rounds = getBcryptRounds();

  const adminEmail = 'admin@sunumarket.sn';
  const adminPassword = 'Admin123!'; // à changer après 1ère connexion
  const adminPasswordHash = await bcrypt.hash(adminPassword, rounds);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin SunuMarket',
      password: adminPasswordHash,
      role: Role.admin,
      isActive: true,
    },
  });

  const sampleUsers = Array.from({ length: 10 }).map(() =>
    makeUserCreateInput(),
  );

  const usersToCreate = await Promise.all(
    sampleUsers.map(async (u) => ({
      ...u,
      password: await bcrypt.hash(u.password, rounds),
    })),
  );

  await prisma.user.createMany({
    data: usersToCreate,
    skipDuplicates: true,
  });
}

async function main(): Promise<void> {
  await seedUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect();
    // eslint-disable-next-line no-console
    console.log('✅ Seed terminé');
  })
  .catch(async (e: unknown) => {
    // eslint-disable-next-line no-console
    console.error('❌ Seed échoué:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

