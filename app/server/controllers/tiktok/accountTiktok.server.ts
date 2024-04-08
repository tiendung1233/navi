import prisma from "~/db.server";
export async function accountTiktok(accessTokenData: any, shop: string, profile: any) {
  await prisma.accountTiktok.create({
    data: {
      id: '',
      accessTokenData,
      shop,
      profile,
    }
  })
  return 1
}

export async function getAccount(shop: string) {
  const account = await prisma.accountTiktok.findFirst({
    where: { shop },
  });
  if (account) {
    return account;
  } else {
    return null;
  }
}


export async function deleteAccount(shop: string) {
  const account = await prisma.accountTiktok.findFirst({
    where: { shop },
  });

  if (account) {
    await prisma.accountTiktok.delete({
      where: { id: account.id },
    });
    return { success: true, message: "Account has been deleted." };
  } else {
    return { success: false, message: "Account not found." };
  }
}
