import {TextHelper} from './texthelper';
declare var diffString: any;
declare var soundex: any;
// { OriginalWords: originalWords, DeletedWords: deletedWords,
// Insertedwords: insertedWords, MatchingSounds : matchingSounds };
export class TextCompareStats {
  public OriginalWords = 0;
  public DeletedWords = 0;
  public Insertedwords = 0;
  public MatchingSounds = 0;
  public Accuracy = 0;
}

export class TextComparer {
  private delPatteren: RegExp;
  private insPatteren: RegExp;
  private postProcessPatteren: RegExp;

  constructor() {
    this.delPatteren = /<del>\s*(.*?)\s*<\/del>/gmi;
    this.insPatteren = /(?<ins><ins>\s*(?<insString>(.*?))\s*<\/ins>)/gmi;
    this.postProcessPatteren = /(<del>\s*(?<delString>[^<.]*?\s*){1}<\/del>){1}(<ins>\s*(?<insString>.*?)\s*<\/ins>){1}/gmi;
  }

  private diffTexts(sourceText: string, spokenText: string) {
    sourceText = TextHelper.cleanText(sourceText);
    spokenText = TextHelper.cleanText(spokenText);
    return diffString(sourceText, spokenText);
  }

  private processDiffStatus(diff) {
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

  public getTextsMatch(sourceText: string, targetText: string ) {
    sourceText = soundex(sourceText);
    targetText = soundex(targetText);
    let matchPercetage = 0;
    if ( sourceText === targetText) {
      matchPercetage = 4;
    } else {
      // tslint:disable-next-line: prefer-for-of
      for ( let srcIndex = 0, tgtIndex = 0; srcIndex < sourceText.length && tgtIndex < targetText.length;
        srcIndex++, tgtIndex++ ) {
          if ( sourceText[srcIndex] === targetText[tgtIndex] ) {
            matchPercetage++;
          }
      }
    }
    return matchPercetage;
  }

  public getOmitedTexts(sourceText: string, spokenText: string): string[] {
    const diffText = this.processDiff(sourceText, spokenText);
    const array = [...diffText['matchAll'](this.delPatteren)];
    const omittedWords = array.map((item) => item[1]);
    return omittedWords;
  }

  public processDiff(sourceText: string, spokenText: string) {
      const diff = this.diffTexts(sourceText, spokenText);
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

  public getTextCompareStats(sourceText: string, spokenText: string) {
    let deletedWords = 0;
    let insertedWords = 0;
    let originalWords = 0;
    let accuracy = 0;
    let matchingSounds ;
    sourceText = TextHelper.cleanText(sourceText);
    spokenText = TextHelper.cleanText(spokenText);
    const message = this.processDiff(sourceText, spokenText);
    originalWords = sourceText.split(' ').length;
    try {
        deletedWords = message.match(this.delPatteren).length;
        insertedWords = message.match(this.insPatteren).length;
        matchingSounds = this.processDiffStatus(message);
        const matchingSoundsSum = matchingSounds
                                  .map(item => item.match)
                                  .reduce((tot, item) => tot + item);
        accuracy = (originalWords - deletedWords + matchingSoundsSum ) / originalWords * 100;
    } catch (exp) {
        console.log(exp.message);
    }


    const  stats: TextCompareStats = new TextCompareStats();
    stats.DeletedWords = deletedWords;
    stats.OriginalWords = originalWords;
    stats.Insertedwords = insertedWords;
    stats.MatchingSounds = matchingSounds;
    stats.Accuracy = accuracy;
    return stats;
  }
}
