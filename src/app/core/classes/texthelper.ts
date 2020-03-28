export class TextHelper {

  public static cleanText(message) {
    try {
        let pattern = /[^A-Za-z0-9\s]/g;
        message = message.replace(pattern, '').toLowerCase();
        pattern = /\s+/gi;
        message = message.replace(pattern, ' ');
    } catch (exp) {
        console.log(exp.message);
    }
    return message;
  }
}
