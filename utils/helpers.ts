import { Auth } from "aws-amplify";

export class Helpers {
  static async Logout() {
    await Auth.signOut();
  }
  static formatDate(timestamp: string) {
    const date = new Date(timestamp);

    const options: any = { day: "2-digit", month: "short", year: "numeric" };

    const formattedDate = date.toLocaleDateString("en-GB", options);

    return formattedDate;
  }
  static namify = (field: any) => {
    return field.replace(/_/g, " ");
  };
}
