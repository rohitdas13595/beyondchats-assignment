"use server";

import { db } from "../db/connection";
import { User } from "../db/schema";
import { checkPassword, hashPassword, signJWT, verifyJWT } from "../helpers";
import { sign } from "crypto";
import { eq, sql } from "drizzle-orm";
import { error } from "console";
import { cookies } from "next/headers";
import { redirect } from "next/dist/server/api-utils";

export const makeGoogleUser = async (user: {
  id: string;
  name: string;
  email: string;
  image: string;
}) => {
  try {
    const userExists = await db
      .select()
      .from(User)
      .where(eq(User.email, user.email.toLowerCase()));

    if (userExists && userExists[0]) {
      const query = sql`UPDATE users SET is_verified = true , logo = ${user.image}, name = ${user.name} WHERE id = ${userExists[0].id} RETURNING *`;

      const result = await db.execute(query);
      const accessToken = await signJWT({
        payload: {
          userId: userExists[0].id,
          signUpType: userExists[0].signUpType,
        },
        expiresIn: "7d",
      });
      const refreshToken = await signJWT({
        payload: {
          userId: userExists[0].id,
          signUpType: userExists[0].signUpType,
        },
        expiresIn: "30d",
      });
      if (!accessToken || !refreshToken) {
        return {
          data: null,
          error: "Something went wrong, please try again later",
        };
      }
      const cookiesData = await cookies();
      cookiesData.set("accessToken", accessToken, {
        maxAge: 60 * 60 * 24 * 7,
      });
      cookiesData.set("refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
      });
      return {
        data: {
          user: {
            name: userExists[0].name,
            email: userExists[0].email,
            company: userExists[0].company,
            signUpType: userExists[0].signUpType,
            isVerified: userExists[0].isVerified,
            logo: userExists[0].logo,
          },
          accessToken,
          refreshToken,
        },
      };
    } else {
      const users = await db
        .insert(User)
        .values({
          name: user.name,
          email: user.email.toLowerCase(),
          signUpType: "google",
          id: user.id,
          logo: user.image,
          isVerified: true,
        })
        .returning();
      if (users && users[0]) {
        const user = users[0];
        const accessToken = await signJWT({
          payload: {
            userId: user.id,
            signUpType: user.signUpType,
          },
          expiresIn: "7d",
        });
        const refreshToken = await signJWT({
          payload: {
            userId: user.id,
            signUpType: user.signUpType,
          },
          expiresIn: "30d",
        });
        if (!accessToken || !refreshToken) {
          return {
            data: null,
            error: "Something went wrong, please try again later",
          };
        }
        const cookiesData = await cookies();
        cookiesData.set("accessToken", accessToken, {
          maxAge: 60 * 60 * 24 * 7,
        });
        cookiesData.set("refreshToken", refreshToken, {
          maxAge: 60 * 60 * 24 * 30,
        });
        return {
          data: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              company: user.company,
              signUpType: user.signUpType,
            },
            accessToken,
            refreshToken,
          },
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: "Something went wrong, please try again later",
    };
  }
};

export const deleteTokens = async () => {
  const cookiesData = await cookies();
  const all = cookiesData.getAll();
  cookiesData.delete("accessToken");
  cookiesData.delete("refreshToken");
};

const readAccessTokenData = async () => {
  const cookiesData = await cookies();
  const accessToken = cookiesData.get("accessToken")?.value;
  const refreshToken = cookiesData.get("refreshToken")?.value;

  if (accessToken) {
    const isVerified = await verifyJWT(accessToken);
    if (isVerified) {
      return {
        data: isVerified,
        error: null,
      };
    }
  }
  if (refreshToken) {
    const isVerified = await verifyJWT(refreshToken);
    if (isVerified) {
      const newToken = await signJWT({
        payload: isVerified,
        expiresIn: "7d",
      });
      if (newToken) {
        cookiesData.set("accessToken", newToken, {
          maxAge: 60 * 60 * 24 * 7,
        });
      }
      const newCookiesData = await cookies();
      const newAccessToken = newCookiesData.get("accessToken")?.value;
      if (newAccessToken) {
        return {
          data: isVerified,
          error: null,
        };
      }
    }
  }
  return {
    data: null,
    error: "Something went wrong, please try again later",
  };
};

export const signUp = async (signUpData: {
  name: string;
  email: string;
  password: string;
  company: string;
  signUpType: "password" | "google";
}) => {
  try {
    const userExists = await db
      .select()
      .from(User)
      .where(eq(User.email, signUpData.email.toLowerCase()));

    if (userExists && userExists[0]) {
      return {
        data: null,
        error: "User already exists",
      };
    }
    const hashedPassword = await hashPassword(signUpData.password);
    const users = await db
      .insert(User)
      .values({
        name: signUpData.name,
        email: signUpData.email.toLowerCase(),
        company: signUpData.company,
        password: hashedPassword,
        signUpType: signUpData.signUpType,
      })
      .returning();
    if (users && users[0]) {
      const user = users[0];
      const accessToken = await signJWT({
        payload: {
          userId: user.id,
          signUpType: signUpData.signUpType,
        },
        expiresIn: "7d",
      });

      const refreshToken = await signJWT({
        payload: {
          userId: user.id,
          signUpType: signUpData.signUpType,
        },
        expiresIn: "30d",
      });

      if (!accessToken || !refreshToken) {
        return {
          data: null,
          error: "Something went wrong, please try again later",
        };
      }
      const cookiesData = await cookies();
      cookiesData.set("accessToken", accessToken, {
        maxAge: 60 * 60 * 24 * 7,
      });
      cookiesData.set("refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
      });
      return {
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            company: user.company,
            signUpType: user.signUpType,
            isVerified: user.isVerified,
          },
          accessToken,
          refreshToken,
        },
        error: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: "Something went wrong, please try again later",
    };
  }
};

export const verifyUserOtp = async (otp: string, email: string) => {
  try {
    const user = await db
      .select()
      .from(User)
      .where(eq(User.email, email.toLowerCase()));
    if (user && user[0]) {
      const query = sql`UPDATE users SET is_verified = true WHERE id = ${user[0].id} RETURNING *`;

      const result = await db.execute(query);
      console.log("result.......................", result);
      if (result) {
        return result.rows[0];
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (signInData: {
  email: string;
  password: string;
}) => {
  try {
    const user = await db
      .select()
      .from(User)
      .where(eq(User.email, signInData.email.toLowerCase()));

    if (user && user[0]) {
      if (!user[0].password) {
        if (user[0].signUpType === "google") {
          return {
            data: null,
            error: "No password found, please Sign In with Google",
          };
        } else {
          return {
            data: null,
            error: "No password found, please Reset Password",
          };
        }
      }
      if (await checkPassword(signInData.password, user[0].password)) {
        const accessToken = await signJWT({
          payload: {
            userId: user[0].id,
            signUpType: user[0].signUpType,
          },
          expiresIn: "7d",
        });

        const refreshToken = await signJWT({
          payload: {
            userId: user[0].id,
            signUpType: user[0].signUpType,
          },
          expiresIn: "30d",
        });

        if (!accessToken || !refreshToken) {
          return {
            data: null,
            error: "Something went wrong, please try again later",
          };
        }
        const cookiesData = await cookies();
        cookiesData.set("accessToken", accessToken, {
          maxAge: 60 * 60 * 24 * 7,
        });
        cookiesData.set("refreshToken", refreshToken, {
          maxAge: 60 * 60 * 24 * 30,
        });

        return {
          data: {
            user: {
              id: user[0].id,
              name: user[0].name,
              email: user[0].email,
              company: user[0].company,
              signUpType: user[0].signUpType,
              isVerified: user[0].isVerified,
            },
            accessToken,
            refreshToken,
          },
          error: null,
        };
      } else {
        return {
          data: null,
          error: "Incorrect password",
        };
      }
    } else {
      return {
        data: null,
        error: "User not found ",
      };
    }
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong, please try again later",
    };
    console.log(error);
  }
};

export const getIdentity = async () => {
  try {
    const verifiedData = await readAccessTokenData();

    if (!verifiedData?.data) {
      return {
        data: null,
        error: "User id not found",
      };
    }

    const userId = (verifiedData.data as any).userId;
    if (!userId) {
      return {
        data: null,
        error: "User id not found in token",
      };
    }
    const user = await db.select().from(User).where(eq(User.id, userId));
    if (user && user[0]) {
      return {
        data: {
          user: {
            id: user[0].id,
            name: user[0].name,
            email: user[0].email,
            company: user[0].company,
            signUpType: user[0].signUpType,
            isVerified: user[0].isVerified,
          },
        },
        error: null,
      };
    } else {
      return {
        data: null,
        error: "User not found ",
      };
    }
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong, please try again later",
    };
    console.log(error);
  }
};
