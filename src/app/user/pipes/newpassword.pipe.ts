import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "newPassword",
})
export class NewPasswordPipe implements PipeTransform {
  transform(username: string, ...args: unknown[]): string {
    let result = "@";
    for (let i = 0; i < username.length; i++) {
      const char = username[i];
      if (char >= "A" && char <= "Z") {
        result += char.toLowerCase();
      } else if (char >= "a" && char <= "z") {
        result += char.toUpperCase();
      } else {
        result += char;
      }
    }
    return result;
  }
}
