import { Body, Controller, Get, Post, Req } from '@nestjs/common';

import { Public } from 'src/auth/auth.guard';
import Stripe from 'stripe';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) { }

  @Get()
  getSubscriptions(@Req() request) {
    return this.subscriptionService.getSubscriptions(request);
  }

  @Post()
  createSubscriptionSession(
    @Req() request,
    @Body() body: any,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    const { priceId } = body;
    return this.subscriptionService.createSubscriptionSession(
      request.user,
      priceId,
    );
  }

  @Public()
  @Post('webhook')
  onWebhookSucces(@Req() request) {
    const reqObj = request.body.data.object;
    if (reqObj.object === 'checkout.session') {
      console.log('checkout.session')
      if (reqObj.status === 'complete') {
        console.log('complete')
        return undefined
        // return this.subscriptionService.createUserSubscription(request.body.data.object);
      }
    }
  }
}