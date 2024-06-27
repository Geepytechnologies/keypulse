import { Auth } from "aws-amplify";

export class Helpers {
  static async Logout() {
    await Auth.signOut();
  }
}
