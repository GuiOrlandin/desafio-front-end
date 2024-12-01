import fs from "fs/promises";

const databasePath = "db.json";

export async function readData(entity: string) {
  const data = await fs.readFile(databasePath);
  const dataParse = JSON.parse(data.toString());

  if (!dataParse[entity]) {
    throw new Error("entity not found.");
  }

  return dataParse[entity];
}

export async function writeData(entity: string, saveData: any) {
  const data = await fs.readFile(databasePath);
  const dataParse = JSON.parse(data.toString());

  if (!dataParse[entity]) {
    throw new Error("entity not found.");
  }

  dataParse[entity].push(saveData);

  await fs.writeFile(databasePath, JSON.stringify(dataParse, null, "\t"));
}

export async function deleteData(entity: string, bookId: string) {
  const data = await fs.readFile(databasePath);
  const dataParse = JSON.parse(data.toString());

  if (!dataParse[entity]) {
    throw new Error("entity not found.");
  }

  const updatedEntity = dataParse[entity].filter(
    (item: any) => item.id !== bookId
  );

  if (updatedEntity.length === dataParse[entity].length) {
    throw new Error("Item not found.");
  }

  dataParse[entity] = updatedEntity;

  await fs.writeFile(databasePath, JSON.stringify(dataParse, null, "\t"));
}

export async function updateData(
  entity: string,
  id: string,
  updatedFields: any
) {
  const data = await fs.readFile(databasePath);
  const dataParse = JSON.parse(data.toString());

  if (!dataParse[entity]) {
    throw new Error("entity not found.");
  }

  const entityList = dataParse[entity];

  const itemIndex = entityList.findIndex((item: any) => item.id === id);

  if (itemIndex === -1) {
    throw new Error("Item not found.");
  }

  const updatedItem = {
    ...entityList[itemIndex],
    ...updatedFields,
  };

  entityList[itemIndex] = updatedItem;

  await fs.writeFile(databasePath, JSON.stringify(dataParse, null, "\t"));

  return updatedItem;
}
