"use server";

import { and, desc, ilike, count, or, eq } from "drizzle-orm";
import { db } from "../db/connection";
import { User } from "../db/schema";

export const listUsers = async ({
  limit = 10,
  offset = 0,
  query = "",
}: {
  limit: number;
  offset: number;
  query?: string;
}) => {
  console.log("query.........", query);
  const doctorList = await db.query.User.findMany({
    limit,
    offset,
    where: (User, { eq, or }) => {
      return and(
        !!query
          ? or(ilike(User.name, `%${query}%`), ilike(User.email, `%${query}%`))
          : undefined
      );
    },
    orderBy: [desc(User.createdAt)],
  });

  const Numbers = await db
    .select({ count: count(User.id) })
    .from(User)
    .where(
      and(
        !!query
          ? or(ilike(User.name, `%${query}%`), ilike(User.email, `%${query}%`))
          : undefined
      )
    );

  if (
    doctorList &&
    Numbers &&
    Numbers.length > 0 &&
    Numbers[0] &&
    Numbers[0].count
  ) {
    return {
      data: doctorList,
      total: Numbers[0].count,
    };
  }
  return null;
};

export const getAllUsers = async () => {
  const doctorList = await db.query.User.findMany();
  if (doctorList) {
    return doctorList;
  }
  return null;
};

export const getUser = async (userId: string) => {
  const user = await db.select().from(User).where(eq(User.id, userId));
  if (user && user[0]) {
    return {
      data: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        company: user[0].company,
        signUpType: user[0].signUpType,
        isVerified: user[0].isVerified,
        logo: user[0].logo,
      },
    };
  }
  return null;
};
