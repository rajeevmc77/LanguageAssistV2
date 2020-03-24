import {TextHelper} from './texthelper';
declare var diffString: any;
declare var soundex: any;

export class TextComparer {
  private delPatteren: RegExp;
  private insPatteren: RegExp;
  private postProcessPatteren: RegExp;

  constructor() {
    this.delPatteren = /<del>\s*(.*?)\s*<\/del>/gmi;
    this.insPatteren = /(?<ins><ins>\s*(?<insString>(.*?))\s*<\/ins>)/gmi;
    this.postProcessPatteren = /(<del>\s*(?<delString>[^<.]*?\s*){1}<\/del>){1}(<ins>\s*(?<insString>.*?)\s*<\/ins>){1}/gmi;
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
    sourceText = TextHelper.cleanText(sourceText);
    spokenText = TextHelper.cleanText(spokenText);
    let  diffText = this.diffTexts(sourceText, spokenText);
    diffText = this.postProcessDiffResult(diffText);
    const omittedWords = this.getOmitedTexts(diffText);
    return omittedWords;
  }

  private postProcessDiffResult(diff) {
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

  private postProcessDiffStatus(diff) {
    const diffstats = [];
    let delStringSound;
    let insStringSound;
    let matchPercetage = 0;
    const matches = diff.matchAll(this.postProcessPatteren);
    try {
        for (const match of matches) {
            const { delString, insString } = match.groups;
            delStringSound = soundex(delString);
            insStringSound = soundex(insString);
            matchPercetage = 0;
            if ( delStringSound === insStringSound) {
              continue;
            }
            // tslint:disable-next-line: prefer-for-of
            for ( let delIndex = 0, insIndex = 0; delIndex < delStringSound.length && insIndex < insStringSound.length;
              delIndex++, insIndex++ ) {
                if ( delStringSound[delIndex] === insStringSound[insIndex] ) {
                  matchPercetage++;
                }
            }
            matchPercetage = matchPercetage / 4 ;
            diffstats.push({'word': delString, 'match': matchPercetage});
        }
    } catch (exp) {
        console.log(exp.message);
    }
    return diffstats;
}

  public getTextCompareStats(sourceText: string, spokenText: string) {
      let deletedWords = 0;
      let insertedWords = 0;
      let originalWords = 0;
      let matchingSounds ;
      sourceText = TextHelper.cleanText(sourceText);
      spokenText = TextHelper.cleanText(spokenText);
      let message = this.diffTexts(sourceText, spokenText);
      originalWords = sourceText.split(' ').length;
      message = this.postProcessDiffResult(message);
      try {
          deletedWords = message.match(this.delPatteren).length;
          insertedWords = message.match(this.insPatteren).length;
          matchingSounds = this.postProcessDiffStatus(message);
      } catch (exp) {
          console.log(exp.message);
      }

      return { OriginalWords: originalWords, DeletedWords: deletedWords, Insertedwords: insertedWords, MatchingSounds : matchingSounds };
  }
}
