import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { brands, getBrandsByIds, normalizeBrandQuery } from "../shared/medicines";
import { analyzeSafety } from "../shared/safety";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  medicines: router({
    list: publicProcedure.query(() => brands),
    search: publicProcedure.input(z.object({ query: z.string().max(80) })).query(({ input }) => normalizeBrandQuery(input.query).slice(0, 8)),
  }),
  safety: router({
    analyze: publicProcedure.input(z.object({ brandIds: z.array(z.string()).min(1).max(12), quantities: z.array(z.object({ brandId: z.string(), unitsPerDay: z.number().min(0).max(50) })) })).query(({ input }) => {
      const selected = getBrandsByIds(input.brandIds);
      return { selected, ...analyzeSafety(selected, input.quantities) };
    }),
  }),
});

export type AppRouter = typeof appRouter;
