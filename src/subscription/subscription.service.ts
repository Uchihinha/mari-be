import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(@InjectStripeClient() private stripe: Stripe, private prisma: PrismaService) { }

  async getSubscriptions(req: any) {
    const userCustomerId = (await this.prisma.user.findUniqueOrThrow({ where: { id: req.user.userId } })).stripeCustomerId;
    const stripeSub = await this.stripe.subscriptions.list({ customer: userCustomerId });
    return stripeSub;
  }


  async createSubscriptionSession(
    user: any,
    priceId: string,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    console.log(priceId)
    try {
      const sub = this.stripe.checkout.sessions.create({
        success_url: 'http://localhost:3001/minha-assinatura',
        customer_email: user.email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
      });

      return sub;
    } catch (error) {
      console.error('Error from stripe:', error);
    }
  }

  // async createUserSubscription(request) {
  //   const user = await this.prisma.user.update({
  //     where: {
  //       email: request.customer_email
  //     },
  //     data: {
  //       stripeCustomerId: request.customer
  //     }
  //   });

  //   const payload: CreateSubscriptionDto = {
  //     userId: user.id,
  //     isActive: true,
  //     stripeSubscriptionId: request.subscription,
  //   }

  //   return this.prisma.userSubscription.create({ data: payload });
  // }
}