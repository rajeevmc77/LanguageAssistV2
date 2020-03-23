declare var diffString: any;
declare var soundex: any;

export class TextComparer {
  private delPatteren: RegExp;
  private insPatteren: RegExp;
  private postProcessPatteren: RegExp;
  private revisedDelTag: string;


  constructor() {
    // this.delPatteren = /(?<del><del>\s*(?<delString>(.*?))\s*<\/del>)/gmi;
    this.delPatteren = /<del>\s*(.*?)\s*<\/del>/gmi;
    this.insPatteren = /(?<ins><ins>\s*(?<insString>(.*?))\s*<\/ins>)/gmi;
    this.postProcessPatteren = /(<del>\s*(?<delString>[^<.]*?\s*){1}<\/del>){1}(<ins>\s*(?<insString>.*?)\s*<\/ins>){1}/gmi;
    this.revisedDelTag = '<a href="#" onclick="myfunc(\'$<delString>\')">$<del></a>';
  }

  public diffTexts(sourceText: string, spokenText: string) {
    return diffString(sourceText, spokenText);
  }

  public getOmitedTexts(diffText: string): string[] {
    const array = [...diffText['matchAll'](this.delPatteren)];
    const omittedWords = array.map((item) => item[1]);
    return omittedWords;
  }

  public getPostProcessedOmitedTexts(sourceText: string, spokenText: string): string[] {
    let  diffText = this.diffTexts(sourceText, spokenText);
    diffText = this.postProcessDiffResult(diffText);
    const omittedWords = this.getOmitedTexts(diffText);
    return omittedWords;
  }


  // public getmodifiedDiffString(sourceString, modifiedString,
  //                              callbackDelFunc = 'delCallBack', callbackInsFunc = 'insCallBack') {
  //     // tslint:disable-next-line: one-variable-per-declaration
  //     let modifiedDiffString = '', diff =  '';
  //     // tslint:disable-next-line: max-line-length
  //     this.revisedDelTag = `<a class="assessment" onclick="'  ${callbackDelFunc}  '(\'$<delString>\',\'play\')"> <i class="fa fa-volume-up "></i></a> <span> $<del> </span>
  //         <a class="assessment" onclick="' ${callbackDelFunc} '(\'$<delString>\',\'record\')"> <i class="fa fa-microphone"></i></a> `;
  //     try {
  //         diff = diffString(sourceString, modifiedString);
  //         diff = this.postProcessDiffResult(diff);
  //         modifiedDiffString = diff.replace(this.delPatteren, this.revisedDelTag);
  //     } catch (exp) {
  //         console.log('exception ocured.', exp.message);
  //     }
  //     return modifiedDiffString;
  // }

  public postProcessDiffResult(diff) {
      let diffNew = diff;
      const matches = diff.matchAll(this.postProcessPatteren);
      try {
          for (const match of matches) {
              const { delString, insString } = match.groups;
              if (soundex(delString) === soundex(insString)) {
                diffNew = diffNew.replace(match[0], delString);
              }
          }
      } catch (exp) {
          console.log(exp.message);
      }
      return diffNew;
  }

  public getAssessmentStats(message) {
      let deletedWords = 0;
      let insertedWords = 0;
      try {
          deletedWords = message.match(this.delPatteren).length;
          insertedWords = message.match(this.insPatteren).length;
      } catch (exp) {
          console.log(exp.message);
      }
      return { DeletedWords: deletedWords, Insertedwords: insertedWords };
  }
}
