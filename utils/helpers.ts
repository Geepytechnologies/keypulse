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
  static getFormattedSubDate = (dt: any) => {
    if (!dt) {
      return "";
    }
    if (!(dt instanceof Date)) {
      dt = new Date(dt);
      if (!dt || isNaN(dt)) {
        return;
      }
    }
    let day = dt.getDate();
    day = day < 10 ? "0" + day : day;
    let month = dt.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    // const year = dt.getFullYear();
    return month + "/" + day;
  };
}
