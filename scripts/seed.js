const { db } = require('@vercel/postgres');

async function createBaseDatabase(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    create table metadata (
      id text primary key,
      blob_url text
    );    
    `;

    console.log(`Created "metadata" table`);

    return { createTable };
  } catch (error) {
    console.error('Error creating metadata:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedMetadata(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
