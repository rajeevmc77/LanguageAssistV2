export class TextHelper {

  public static cleanText(message) {
    try {
        const pattern = /[^A-Za-z0-9\s]/g;
        message = message.replace(pattern, '').toLowerCase();
    } catch (exp) {
        console.log(exp.message);
    }
    return message;
  }
}
