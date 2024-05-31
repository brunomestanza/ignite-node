import { Elysia, t } from 'elysia'
import { db } from '../../db/connection'
import { authLinks } from '../../db/schema'
import { createId } from '@paralleldrive/cuid2'
import nodemailer from 'nodemailer'
import { env } from '../../env'
import { mail } from '../../lib/mail'

export const sendAuthLink = new Elysia().post(
  '/authenticate',
  async ({ body }) => {
    const { email } = body

    const userWithEmail = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      },
    })

    if (!userWithEmail) {
      throw new Error('User not found')
    }

    const authLinkCode = createId()
    await db.insert(authLinks).values({
      userId: userWithEmail.id,
      code: authLinkCode,
    })

    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)
    authLink.searchParams.set('code', authLinkCode)
    authLink.searchParams.set('redict', env.AUTH_REDIRECT_URL)

    const mailInfo = await mail.sendMail({
      from: {
        name: 'Pizza shop',
        address: 'hi@pizzashop.com',
      },
      to: email,
      subject: 'Authenticate to Pizza shop',
      text: `Use the following link to authenticate on Pizza Shop: ${authLink.toString()}`,
    })

    console.log(nodemailer.getTestMessageUrl(mailInfo))
  },
  {
    body: t.Object({
      email: t.String({ format: 'email' }),
    }),
  },
)
