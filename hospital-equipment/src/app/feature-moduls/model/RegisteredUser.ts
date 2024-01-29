import { LoyaltyProgram } from './LoyaltyProgram';
import { User } from './User';

export enum UserCategory {
    Regular = 'REGULAR',
    Silver = 'SILVER',
    Gold = 'GOLD'
  }

export interface RegisteredUser extends User {
  penaltyPoints: number;
  accumulatedPoints:number,
  userCategory: UserCategory; 
  loyaltyProgram:LoyaltyProgram;

}
